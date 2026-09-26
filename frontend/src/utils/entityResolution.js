/**
 * Calculates Jaro-Winkler similarity between two strings (0.0 to 1.0)
 */
export function jaroWinkler(s1, s2) {
  const str1 = (s1 || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const str2 = (s2 || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (str1 === str2) return 1.0;
  if (!str1.length || !str2.length) return 0.0;

  const matchDistance = Math.floor(Math.max(str1.length, str2.length) / 2) - 1;
  const str1Matches = new Array(str1.length).fill(false);
  const str2Matches = new Array(str2.length).fill(false);

  let matches = 0;
  let transpositions = 0;

  for (let i = 0; i < str1.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, str2.length);

    for (let j = start; j < end; j++) {
      if (str2Matches[j]) continue;
      if (str1[i] !== str2[j]) continue;
      str1Matches[i] = true;
      str2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  for (let i = 0; i < str1.length; i++) {
    if (!str1Matches[i]) continue;
    while (!str2Matches[k]) k++;
    if (str1[i] !== str2[k]) transpositions++;
    k++;
  }

  const jaro =
    (matches / str1.length +
      matches / str2.length +
      (matches - transpositions / 2) / matches) /
    3.0;

  let prefix = 0;
  const maxPrefix = 4;
  for (let i = 0; i < Math.min(maxPrefix, Math.min(str1.length, str2.length)); i++) {
    if (str1[i] === str2[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1 - jaro);
}

/**
 * Computes record similarity score based on weighted field matching
 */
export function computeRecordSimilarity(r1, r2) {
  const nameScore = jaroWinkler(r1.name, r2.name);
  const addrScore = jaroWinkler(r1.address, r2.address);

  const p1 = (r1.phone || '').replace(/[^0-9]/g, '');
  const p2 = (r2.phone || '').replace(/[^0-9]/g, '');
  const phoneScore = p1 && p2 ? (p1 === p2 || p1.includes(p2) || p2.includes(p1) ? 1.0 : 0.2) : 0.5;

  const t1 = (r1.taxId || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const t2 = (r2.taxId || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const taxScore = t1 && t2 ? (t1 === t2 || t1.includes(t2) || t2.includes(t1) ? 1.0 : 0.3) : 0.5;

  const totalScore = (nameScore * 0.45) + (addrScore * 0.25) + (phoneScore * 0.15) + (taxScore * 0.15);

  const matchedFields = [];
  if (nameScore > 0.8) matchedFields.push('Business Name');
  if (addrScore > 0.75) matchedFields.push('Address');
  if (phoneScore > 0.8) matchedFields.push('Phone Number');
  if (taxScore > 0.8) matchedFields.push('Tax Identifier');

  return {
    score: Math.round(totalScore * 100) / 100,
    matchedFields
  };
}

/**
 * Runs the entity resolution matching process on 3 source datasets
 */
export function performEntityResolution(source1, source2, source3, threshold = 0.68) {
  return (source1 || []).map(s1Record => {
    const s2Matches = [];
    const s3Matches = [];

    (source2 || []).forEach(s2Record => {
      const res = computeRecordSimilarity(s1Record, s2Record);
      if (res.score >= threshold) {
        s2Matches.push({ record: s2Record, score: res.score, matchedFields: res.matchedFields });
      }
    });

    (source3 || []).forEach(s3Record => {
      const res = computeRecordSimilarity(s1Record, s3Record);
      if (res.score >= threshold) {
        s3Matches.push({ record: s3Record, score: res.score, matchedFields: res.matchedFields });
      }
    });

    const s2Ids = s2Matches.map(m => m.record.id);
    const s3Ids = s3Matches.map(m => m.record.id);

    let status = 'No match';
    const totalMatchesCount = (s2Ids.length > 0 ? 1 : 0) + (s3Ids.length > 0 ? 1 : 0);

    if (totalMatchesCount === 2) {
      status = '2 matches';
    } else if (totalMatchesCount === 1) {
      status = '1 match';
    } else {
      status = 'No match';
    }

    const confidenceScores = {};
    s2Matches.forEach(m => { confidenceScores[m.record.id] = m.score; });
    s3Matches.forEach(m => { confidenceScores[m.record.id] = m.score; });

    return {
      source1Id: s1Record.id,
      source1Record: s1Record,
      matchedSource2Ids: s2Ids,
      matchedSource3Ids: s3Ids,
      status,
      confidenceScores,
      details: {
        s2Matches,
        s3Matches
      }
    };
  });
}

/**
 * Formats matching results into TSV string for matching_results.tsv export
 */
export function generateMatchingResultsTSV(results) {
  let tsv = "Source_1_ID\tMatched_Source_2_3_IDs\tStatus\tConfidence_Score\tEntity_Name\n";
  (results || []).forEach(r => {
    const matchedIds = [...r.matchedSource2Ids, ...r.matchedSource3Ids].join(", ") || "-";
    const scores = Object.values(r.confidenceScores);
    const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : "0.00";
    tsv += `${r.source1Id}\t${matchedIds}\t${r.status}\t${avgScore}\t${r.source1Record.name}\n`;
  });
  return tsv;
}

/**
 * Formats candidate pairs into TSV string for candidate_pairs.tsv export
 */
export function generateCandidatePairsTSV(source1, source2, source3) {
  let tsv = "Pair_ID\tSource_A\tRecord_A_ID\tSource_B\tRecord_B_ID\tSimilarity_Score\tBlocking_Key\n";
  let count = 1;

  const getBlockingKey = (name) => (name || '').replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();

  (source1 || []).forEach(s1 => {
    const key1 = getBlockingKey(s1.name);
    (source2 || []).forEach(s2 => {
      const key2 = getBlockingKey(s2.name);
      if (key1 === key2 || jaroWinkler(s1.name, s2.name) > 0.5) {
        const sim = computeRecordSimilarity(s1, s2).score;
        tsv += `CP-${String(count++).padStart(4, '0')}\tSource_1\t${s1.id}\tSource_2\t${s2.id}\t${sim}\t${key1}\n`;
      }
    });
    (source3 || []).forEach(s3 => {
      const key3 = getBlockingKey(s3.name);
      if (key1 === key3 || jaroWinkler(s1.name, s3.name) > 0.5) {
        const sim = computeRecordSimilarity(s1, s3).score;
        tsv += `CP-${String(count++).padStart(4, '0')}\tSource_1\t${s1.id}\tSource_3\t${s3.id}\t${sim}\t${key1}\n`;
      }
    });
  });

  return tsv;
}

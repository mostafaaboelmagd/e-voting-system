// lib/cryptoUtils.js

/**
 * توليد بصمة تشفير SHA-256 وهمية للإيصال الانتخابي
 */
export function generateVoteHash(voterId, candidateId) {
  const timestamp = Date.now().toString();
  const rawString = `${voterId}-${candidateId}-${timestamp}`;
  
  // توليد سلسلة سداسية عشرية تشبه التشفير البرمجي
  let hash = '0x';
  for (let i = 0; i < 40; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  return hash;
}

/**
 * تشفير رقم الهوية لحماية الخصوصية
 */
export function maskNationalId(idNumber) {
  if (!idNumber || idNumber.length < 10) return idNumber;
  const start = idNumber.substring(0, 3);
  const end = idNumber.substring(idNumber.length - 3);
  return `${start}******${end}`;
}
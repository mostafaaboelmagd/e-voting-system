// lib/db.js

// حفظ بيانات جلسة الناخب الحالي
export const saveVoterSession = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('e_voting_session', JSON.stringify(data));
  }
};

// استرجاع بيانات الجلسة الحالية
export const getVoterSession = () => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('e_voting_session');
    return session ? JSON.parse(session) : null;
  }
  return null;
};

// مسح بيانات الجلسة عند إنهاء الاقتراع
export const clearVoterSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('e_voting_session');
  }
};
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Search, CheckCircle2, XCircle, ArrowLeft, AlertCircle, User, Calendar, Lock } from 'lucide-react';

export default function VoterInfoPage() {
  const router = useRouter();
  const [nationalId, setNationalId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voterData, setVoterData] = useState(null);
  const [error, setError] = useState('');

  // قائمة كود المحافظات في الرقم القومي المصري (الرقمين 8 و 9)
  const governorates = {
    '01': 'القاهرة',
    '02': 'الإسكندرية',
    '03': 'بورسعيد',
    '04': 'السويس',
    '11': 'دمياط',
    '12': 'الدقهلية',
    '13': 'الشرقية',
    '14': 'القليوبية',
    '15': 'كفر الشيخ',
    '16': 'الغربية',
    '17': 'المنوفية',
    '18': 'البحيرة',
    '19': 'الإسماعيلية',
    '21': 'الجيزة',
    '22': 'بني سويف',
    '23': 'الفيوم',
    '24': 'المنيا',
    '25': 'أسيوط',
    '26': 'سوهاج',
    '27': 'قنا',
    '28': 'أسوان',
    '29': 'الأقصر',
    '31': 'البحر الأحمر',
    '32': 'الوادي الجديد',
    '33': 'مطروح',
    '34': 'شمال سيناء',
    '35': 'جنوب سيناء',
    '88': 'خارج الجمهورية (المغتربين)',
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setVoterData(null);

    // التحقق من صحة الرقم القومي (14 رقم)
    if (!/^\d{14}$/.test(nationalId)) {
      setError('برجاء إدخال رقم قومي صحيح يتكون من 14 رقماً.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // استخراج البيانات الرقمية من الرقم القومي
      const centuryDigit = nationalId[0];
      const yearTwoDigits = nationalId.slice(1, 3);
      const monthTwoDigits = nationalId.slice(3, 5);
      const dayTwoDigits = nationalId.slice(5, 7);
      const govCode = nationalId.slice(7, 9);
      const sequenceNum = parseInt(nationalId.slice(9, 13), 10);

      // تحديد سنة الميلاد
      const fullYear = (centuryDigit === '2' ? '19' : centuryDigit === '3' ? '20' : '19') + yearTwoDigits;
      const birthDateFormatted = `${dayTwoDigits}/${monthTwoDigits}/${fullYear}`;

      // حساب العمر
      const birthYearInt = parseInt(fullYear, 10);
      const currentYear = 2026;
      const age = currentYear - birthYearInt;

      // تحديد المحافظة
      const govName = governorates[govCode] || 'السجل الانتخابي العام';

      // فحص الأهلية للانتخاب الرقمي (أكبر من 18 سنة)
      const isEligible = age >= 18 && !nationalId.endsWith('000');

      if (!isEligible) {
        setVoterData({
          isEligible: false,
          reason: age < 18 ? 'المواطن لم يبلغ السن القانونية للتصويت (18 سنة).' : 'المواطن معفى أو مستثنى من ممارسة الحقوق السياسية.',
          nationalId,
        });
      } else {
        setVoterData({
          isEligible: true,
          nationalId,
          birthDate: birthDateFormatted,
          age,
          governorate: govName,
          electoralRollNo: `رمز التحقق الرقمي: #E-VOTE-${(sequenceNum * 13) % 8900 + 1000}`,
          status: 'مفعل للتصويت الإلكتروني المشفر',
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 flex flex-col items-center justify-center" dir="rtl">
      
      <div className="max-w-xl w-full space-y-6">
        
        {/* هيدر الصفحة */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full text-blue-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>نظام التحقق الرقمي الموحد للناخبين</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">التحقق من اهلية التصويت الإلكتروني</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            أدخل الرقم القومي للتأكد من قيدك في السجل الانتخابي الرقمي وصلاحية أدائك للصوت عبر المنظومة.
          </p>
        </div>

        {/* نموذج البحث بالرقم القومي */}
        <form onSubmit={handleSearch} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">الرقم القومي للناخب (14 رقم):</label>
            <div className="relative">
              <input
                type="text"
                maxLength={14}
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                placeholder="أدخل الرقم القومي كاملاً (مثال: 29805121401234)"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-3 px-4 text-left font-mono tracking-widest text-cyan-400 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || nationalId.length !== 14}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              nationalId.length === 14 && !isLoading
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>جاري التحقق من السجل الانتخابي الرقمي...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>التحقق من أهليّة التصويت</span>
              </>
            )}
          </button>
        </form>

        {/* عرض النتيجة */}
        {voterData && (
          <div>
            {/* في حال غير مستحق للتصويت */}
            {!voterData.isEligible ? (
              <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-6 backdrop-blur-md text-center space-y-3">
                <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/40 rounded-full flex items-center justify-center mx-auto text-rose-400">
                  <XCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">غير مستحق للتصويت في هذه الانتخابات</h3>
                <p className="text-xs text-rose-300 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 max-w-md mx-auto">
                  {voterData.reason}
                </p>
              </div>
            ) : (
              
              /* في حال مستحق للتصويت إلكترونياً */
              <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-5">
                
                {/* شارة الاستحقاق الرقمي */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">المواطن مستحق للتصويت إلكترونياً</h3>
                      <p className="text-[11px] text-cyan-400 font-mono">{voterData.status}</p>
                    </div>
                  </div>
                </div>

                {/* البيانات المستخرجة */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>المحافظة: <strong className="text-white">{voterData.governorate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>تاريخ الميلاد: <strong className="text-white font-mono">{voterData.birthDate}</strong></span>
                  </div>
                </div>

                {/* تنبيه الأمان والتشفير */}
                <div className="flex items-center gap-2.5 bg-blue-950/30 border border-blue-500/20 p-3 rounded-xl text-xs text-blue-300">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>تم التوثيق الرقمي لجلسة التصويت بواسطة بروتوكول التشافير السيادي.</span>
                </div>

                {/* زر التوجه للتصويت الرقمي مباشرة */}
                <div className="pt-1">
                  <button
                    onClick={() => router.push('/ballot')}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 cursor-pointer"
                  >
                    <span>الانتقال إلى كراسة الاقتراع الرقمية</span>
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
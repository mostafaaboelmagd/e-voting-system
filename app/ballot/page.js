'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

export default function BallotPage() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // قائمة 10 مرشحين فرديين ببيانات وصور كاملة
  const candidates = [
    {
      id: 1,
      name: 'أحمد محمود الفارس',
      symbol: 'الأسد 🦁',
      party: 'حزب النهضة والمستقبل',
      slogan: 'من أجل اقتصاد قوي وتنمية مستدامة للجميع',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 2,
      name: 'د. سارة عبد الرحمن',
      symbol: 'الشمس ☀️',
      party: 'مستقل - تحالف الابتكار',
      slogan: 'التعليم الرقمي والتمكين التكنولوجي للشباب',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 3,
      name: 'م. طارق فاروق السيد',
      symbol: 'الميزان ⚖️',
      party: 'حزب العدالة والتنمية',
      slogan: 'شفافية حقيقية وحوكمة رقمية عادلة',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 4,
      name: 'د. خالد توفيق النجار',
      symbol: 'النجمة ⭐️',
      party: 'مستقل',
      slogan: 'تطوير الرعاية الصحية ودعم الابتكار والبحث العلمي',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 5,
      name: 'أ.د. منى إبراهيم الشريف',
      symbol: 'القلم ✏️',
      party: 'حزب الإصلاح والتعليم',
      slogan: 'تطوير المناهج التعليمية ودعم المعلم المصري',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 6,
      name: 'م. عمر صلاح الألفي',
      symbol: 'البرج 🏰',
      party: 'مستقل',
      slogan: 'تطوير البنية التحتية والمشاريع الذكية',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 7,
      name: 'د. هبة جابر القاضي',
      symbol: 'الحمامة 🕊️',
      party: 'تحالف السلام والتضامن',
      slogan: 'تعزيز الحماية الاجتماعية ودعم حقوق المرأة',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 8,
      name: 'أ. كريم عبد الله السيد',
      symbol: 'السفينة 🚢',
      party: 'حزب التجارة والاستثمار',
      slogan: 'تمكين الاستثمار وتسهيل الإجراءات للمشاريع الناشئة',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 9,
      name: 'د. رانيا فهمي العسكري',
      symbol: 'الهلال 🌙',
      party: 'مستقل',
      slogan: 'دعم القطاع الطبي المجاني وتوسيع التغطية التأمينية',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 10,
      name: 'م. يوسف أحمد الحكيم',
      symbol: 'المصباح 💡',
      party: 'حزب رواد التكنولوجيا',
      slogan: 'تحول رقمي شامل وبناء اقتصاد المعرفة',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    },
  ];

  const handleVoteSubmit = () => {
    if (!selectedCandidate) return;
    setIsSubmitting(true);

    // محاكاة إرسال وتشفير الصوت
    setTimeout(() => {
      localStorage.setItem('votedCandidate', JSON.stringify(selectedCandidate));
      localStorage.setItem('hasVoted', 'true');
      router.push('/receipt');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 flex flex-col items-center" dir="rtl">
      
      {/* هيدر الصفحة */}
      <div className="max-w-5xl w-full text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full text-blue-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>بطاقة الاقتراع السرية - النظام الفردي</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">اختر مرشحك لانتخابات المنظومة</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          قم بالنقر على كارت المرشح لاختياره، ثم اضغط على زر "تأكيد وإرسال الصوت المشفر" في الأسفل.
        </p>
      </div>

      {/* شبكة كروت المرشحين الـ 10 */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-8">
        {candidates.map((candidate) => {
          const isSelected = selectedCandidate?.id === candidate.id;

          return (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] backdrop-blur-md overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950/80 border-cyan-400 shadow-2xl shadow-cyan-500/20 ring-2 ring-cyan-400/50'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {/* شارة الاختيار (Checked Badge) */}
              {isSelected && (
                <div className="absolute top-3 left-3 z-10 bg-cyan-400 text-slate-950 p-1.5 rounded-full shadow-lg">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}

              {/* محتوى الكارت: الصورة والبيانات */}
              <div className="flex items-start gap-4">
                
                {/* صورة المرشح */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-700/60 shrink-0 shadow-md">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // صورة احتياطية في حال تعثر التحميل
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300';
                    }}
                  />
                </div>

                {/* تفاصيل المرشح */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/50 text-cyan-300 font-mono font-bold">
                      {candidate.symbol}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{candidate.party}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{candidate.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    "{candidate.slogan}"
                  </p>
                </div>
              </div>

              {/* الشريط السفلي داخل الكارت */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className={`font-medium ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {isSelected ? 'تم الاختيار ✓' : 'انقر لاختيار المرشح'}
                </span>
                <span className="text-[10px] text-slate-600 font-mono">مرشح رقم #{candidate.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* زر تأكيد وإرسال الصوت */}
      <div className="max-w-5xl w-full flex flex-col items-center gap-3">
        <button
          onClick={handleVoteSubmit}
          disabled={!selectedCandidate || isSubmitting}
          className={`w-full max-w-md py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
            selectedCandidate && !isSubmitting
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/25'
              : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>جاري تشفير وتأكيد الصوت في صندوق الاقتراع...</span>
            </>
          ) : (
            <>
              <UserCheck className="w-4 h-4" />
              <span>
                {selectedCandidate
                  ? `تأكيد وإرسال الصوت لـ (${selectedCandidate.name})`
                  : 'برجاء اختيار مرشح للمتابعة'}
              </span>
            </>
          )}
        </button>

        {/* تنبيه السرية والتشفير */}
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-cyan-500" />
          <span>صوتك مشفر برمز SHA-256 لا يمكن كشفه أو تعديله بعد الإرسال.</span>
        </p>
      </div>

    </div>
  );
}
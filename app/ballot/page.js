'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Vote, CheckCircle2, ShieldCheck, ArrowRight,
  Watch, BookOpen, Lighthouse, Sun, Scale, Sprout, Building2, Feather, Compass, HeartPulse
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import StepIndicator from '../../components/StepIndicator';
import Footer from '../../components/Footer';

export default function BallotPage() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const candidates = [
    { id: 'cand-1', name: 'م. أحمد إبراهيم علي', symbolName: 'ساعة اليد', icon: Watch, slogan: 'التحول الرقمي والاستدامة', party: 'مستقل' },
    { id: 'cand-2', name: 'د. منى محمود حسان', symbolName: 'الكتاب المفتوح', icon: BookOpen, slogan: 'تطوير التعليم والصحة للجميع', party: 'ائتلاف المستقبل' },
    { id: 'cand-3', name: 'أ. كريم عبد الفتاح', symbolName: 'المنارة', icon: Lighthouse, slogan: 'دعم الشباب والمشروعات الناشئة', party: 'حزب النهضة' },
    { id: 'cand-4', name: 'د. طارق عبد العزيز', symbolName: 'الشمس المشرقة', icon: Sun, slogan: 'الطاقة النظيفة والتنمية المستدامة', party: 'حزب مصر الخضراء' },
    { id: 'cand-5', name: 'المستشار / سمير نصر', symbolName: 'ميزان العدالة', icon: Scale, slogan: 'سيادة القانون والعدالة الاجتماعية', party: 'مستقل' },
    { id: 'cand-6', name: 'د. سارة فاروق الجندي', symbolName: 'السُنبلة', icon: Sprout, slogan: 'الأمن الغذائي ودعم القطاع الزراعي', party: 'تحالف الزراعة والصناعة' },
    { id: 'cand-7', name: 'م. محمود جودة', symbolName: 'البرج السكني', icon: Building2, slogan: 'تطوير البنية التحتية والعمران', party: 'حزب البناء' },
    { id: 'cand-8', name: 'أ. نهى الشافعي', symbolName: 'الريشة', icon: Feather, slogan: 'ترسيخ الهوية الثقافية والفنون', party: 'ائتلاف الثقافة' },
    { id: 'cand-9', name: 'د. خالد توفيق', symbolName: 'البوصلة', icon: Compass, slogan: 'التخطيط الاستراتيجي وتمكين الاقتصاد', party: 'حزب الريادة' },
    { id: 'cand-10', name: 'د. رانيا زكي', symbolName: 'النبض', icon: HeartPulse, slogan: 'الرعاية الصحية التكافلية الشاملة', party: 'مستقل' }
  ];

  const handleVoteSubmit = () => {
    if (!selectedCandidate) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const voteData = {
        candidateId: selectedCandidate,
        timestamp: new Date().toISOString(),
        txHash: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('e_voting_receipt', JSON.stringify(voteData));
      }

      setIsSubmitting(false);
      router.push('/receipt');
    }, 1200);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-8 flex flex-col justify-between">
      <div>
        <Navbar />
        <StepIndicator currentStep={3} />

        <div className="max-w-2xl mx-auto w-full">
          {/* Header Card */}
          <div className="bg-slate-800/80 backdrop-blur-xl border border-blue-700/30 rounded-2xl p-5 mb-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/30 shrink-0">
                <Vote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-300">بطاقة الاقتراع الإلكترونية المشفرة</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  اختر مرشحاً واحداً فقط. يتم تشفير اختيارك وفصله تماماً عن هويتك.
                </p>
              </div>
            </div>
          </div>

          {/* Candidates List (تم حل مشكلة السكروول الأفقي هنا) */}
          <div className="space-y-3 mb-6 max-h-[460px] overflow-y-auto overflow-x-hidden pr-2">
            {candidates.map((candidate) => {
              const isSelected = selectedCandidate === candidate.id;
              const CandidateIcon = candidate.icon;

              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-900/40 border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800/50 border-slate-700/80 hover:border-slate-500 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                        isSelected ? 'border-blue-400 bg-blue-500 text-white' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-white truncate">{candidate.name}</h3>
                        <span className="text-[10px] bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full font-medium shrink-0">
                          {candidate.party}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{candidate.slogan}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
                      isSelected 
                        ? 'bg-blue-600/30 border-blue-400 text-blue-200' 
                        : 'bg-slate-900/60 border-slate-700 text-slate-300'
                    }`}>
                      <CandidateIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-[11px] hidden sm:inline">{candidate.symbolName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleVoteSubmit}
            disabled={!selectedCandidate || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري إرسال الصوت وتوليد التشفير...</span>
              </div>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>تأكيد الاختيار وإصدار الإيصال المشفر</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
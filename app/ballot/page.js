'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vote, CheckCircle2, Lock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import StepIndicator from '../../components/StepIndicator';
import Footer from '../../components/Footer';

export default function BallotPage() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const candidates = [
    { id: 1, name: 'المهندس / أحمد إبراهيم علي', party: 'حزب النهضة والفرص', symbol: '☀️' },
    { id: 2, name: 'الدكتورة / منى محمود حسان', party: 'مستقل - برنامج التنمية الرقمية', symbol: '📚' },
    { id: 3, name: 'الأستاذ / كريم عبد الفتاح', party: 'ائتلاف المستقبل الحديث', symbol: '🚀' }
  ];

  const handleVoteSubmit = () => {
    if (!selectedCandidate) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/receipt');
    }, 1500);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-8 flex flex-col justify-between">
      <div>
        <Navbar />
        <StepIndicator currentStep={3} />

        <div className="max-w-2xl mx-auto w-full bg-slate-800/80 backdrop-blur-xl border border-blue-700/30 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="mb-6 flex justify-between items-start border-b border-slate-700/60 pb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-300">
                <Vote className="w-6 h-6 text-blue-400" /> ورقة الاقتراع الإلكترونية
              </h2>
              <p className="text-xs text-slate-400 mt-1">اختر مرشحاً واحداً فقط. صوتك مشفر ومفصول تماماً عن هويتك.</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <Lock className="w-3 h-3" /> جلسة تصويت آمنة
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {candidates.map((cand) => {
              const isSelected = selectedCandidate === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/40'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl p-2 bg-slate-800 rounded-lg">{cand.symbol}</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">{cand.name}</h3>
                      <p className="text-xs text-slate-400">{cand.party}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-400' : 'border-slate-600'}`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleVoteSubmit}
            disabled={!selectedCandidate || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium py-3.5 rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? 'جاري تشفير صوتك وإرساله للصندوق...' : 'تأكيد وإرسال الصوت'}
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle, Download, Home } from 'lucide-react';
import Navbar from '../../components/Navbar';
import StepIndicator from '../../components/StepIndicator';
import Footer from '../../components/Footer';

export default function ReceiptPage() {
  const router = useRouter();
  const voteHash = "0x8f3a...92b4c7e1"; // محاكاة لهش التشفير

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-8 flex flex-col justify-between">
      <div>
        <Navbar />
        <StepIndicator currentStep={4} />

        <div className="max-w-xl mx-auto w-full bg-slate-800/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">تم تسجيل صوتك بنجاح!</h2>
          <p className="text-xs text-slate-400 mb-6">نشكر مشاركتك في العملية الانتخابية الرقمية.</p>

          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 mb-6 text-right space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">حالة الصوت:</span>
              <span className="text-emerald-400 font-medium">مكتمل ومسجل بالبلوكشين</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">بصمة التشفير (Vote Hash):</span>
              <span className="font-mono text-blue-300">{voteHash}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> طباعة الإيصال
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <Home className="w-4 h-4" /> العودة للرئيسية
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
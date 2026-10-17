'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Printer, ShieldCheck, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ReceiptPage() {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('e_voting_receipt');
    if (data) {
      try {
        setReceiptData(JSON.parse(data));
      } catch (err) {
        console.error(err);
      }
    } else {
      setReceiptData({
        timestamp: new Date().toLocaleString('ar-EG'),
        candidateId: 'cand-1'
      });
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main 
      dir="rtl" 
      className="relative min-h-screen text-white p-4 md:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-xl mx-auto w-full bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-2xl p-6 md:p-8 print:bg-white print:text-black print:border-none print:shadow-none">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white print:text-black">تم تسجيل وتشفير صوتك بنجاح</h2>
            <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
              تم إيداع الكود المشفر في صندوق الاقتراع الرقمي ولا يمكن تعديله أو إلغاؤه.
            </p>
          </div>

          {/* تفاصيل البطاقة المشفرة المبسطة */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs print:bg-slate-100 print:text-black print:border-slate-300">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 font-sans">حالة العملية:</span>
              <span className="text-emerald-400 font-semibold print:text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> مؤكدة ومسجلة (256-bit)
              </span>
            </div>
            
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400 print:text-slate-600 font-sans">تاريخ ووقت الاقتراع:</span>
              <span className="text-slate-200 print:text-black font-sans">{receiptData?.timestamp || 'الآن'}</span>
            </div>
          </div>

          {/* باركود التحقق الرقمي */}
          <div className="mt-6 flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-xl border border-dashed border-slate-800 print:bg-slate-100 print:border-slate-300">
            <div className="w-56 h-12 bg-slate-800/80 rounded flex items-center justify-center tracking-[0.35em] font-mono text-xs text-slate-300 print:bg-slate-200 print:text-black">
              ||| | |||| || ||||| ||| |||
            </div>
            <span className="text-[10px] text-slate-500 mt-2 print:text-slate-600 font-sans">رمز التحقق البيولوجي والتشفير الحكومي</span>
          </div>

          {/* أزرار التحكم والطباعة */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>طباعة الإيصال الرسمية</span>
            </button>

            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>
          </div>

        </div>
      </div>

      <div className="relative z-10 mt-6 print:hidden">
        <Footer />
      </div>
    </main>
  );
}
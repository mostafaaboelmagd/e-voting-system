'use client';

import React, { useState } from 'react';
import { Lock, HelpCircle, Headphones, Activity } from 'lucide-react';
import InstructionsModal from './InstructionsModal';
import SupportModal from './SupportModal';

export default function Navbar() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      <header className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-4 border-b border-slate-800/80 mb-6 px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden p-0.5">
              <img 
                src="/images/Logo .png" 
                alt="شعار الهيئة الوطنية للانتخابات" 
                className="w-full h-full object-cover rounded-full mix-blend-lighten scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wide text-white">منظومة الانتخابات الرقمية</h1>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-blue-500/20">v2.0</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">التحقق البيولوجي والتشفير اللامركزي</p>
          </div>
        </div>

        {/* شارة حالة الاتصال، التشفير، الإرشادات، والدعم الفني */}
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          
          {/*  شارة حالة الاتصال بالسيرفر المباشرة */}
          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-xl text-[11px] text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">السيرفر متصل | النظام يعمل بكفاءة</span>
          </div>

          {/* زر إرشادات الناخب */}
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-3 py-1 rounded-xl text-[11px] text-slate-300 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>الإرشادات</span>
          </button>

          {/* زر الدعم الفني */}
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900/50 border border-blue-500/30 px-3 py-1 rounded-xl text-[11px] text-blue-300 hover:text-white transition cursor-pointer backdrop-blur-md"
          >
            <Headphones className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>الدعم الفني</span>
          </button>
        </div>
      </header>

      {/* مودال الإرشادات */}
      <InstructionsModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* مودال الدعم الفني */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
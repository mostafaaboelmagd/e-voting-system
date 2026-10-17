'use client';

import React, { useState } from 'react';
import { Lock, HelpCircle } from 'lucide-react';
import InstructionsModal from './InstructionsModal';

export default function Navbar() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <header className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-4 border-b border-slate-800/80 mb-6 px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden p-0.5">
              <img 
                src="/images/image.png" 
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

        {/* شارة التشفير وزر الإرشادات */}
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 px-3.5 py-1 rounded-xl text-[11px] text-slate-300 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>تشفير مؤمن 256-bit</span>
          </div>

          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-3 py-1 rounded-xl text-[11px] text-slate-300 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>إرشادات الناخب</span>
          </button>
        </div>
      </header>

      {/* مودال الإرشادات */}
      <InstructionsModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
}
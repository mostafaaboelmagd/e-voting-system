import React from 'react';
import { Fingerprint, Lock } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="max-w-4xl mx-auto w-full flex justify-between items-center py-4 border-b border-slate-800/80 mb-6 px-4">
      <div className="flex items-center gap-3.5">
        {/* اللوجو الجديد مع تأثير التوهج gradient & glow */}
        <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Fingerprint className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold tracking-wide text-white">منظومة الانتخابات الرقمية</h1>
            <span className="bg-blue-500/10 text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-blue-500/20">v2.0</span>
          </div>
          <p className="text-[11px] text-slate-400">التحقق البيولوجي والتشفير اللامركزي</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 px-3.5 py-1.5 rounded-xl text-xs text-slate-300 backdrop-blur-md hidden sm:flex">
        <Lock className="w-3.5 h-3.5 text-emerald-400" />
        <span>تشفير 256-bit</span>
      </div>
    </header>
  );
}
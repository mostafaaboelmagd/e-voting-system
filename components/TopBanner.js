import React from 'react';
import { ShieldCheck, Wifi } from 'lucide-react';

export default function TopBanner() {
  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800/80 text-[11px] py-1.5 px-4 text-slate-400">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-slate-300">الشبكة الانتخابية المؤمنة — جمهورية مصر العربية</span>
        </div>
        <div className="flex items-center gap-3 hidden sm:flex">
          <span className="flex items-center gap-1 text-slate-400">
            <Wifi className="w-3 h-3 text-emerald-400" /> اتصال متصل وشبكة خادمة مستقرة
          </span>
          <span className="flex items-center gap-1 text-blue-400 font-mono">
            <ShieldCheck className="w-3 h-3" /> Node-ID: #EGY-VOTE-2026
          </span>
        </div>
      </div>
    </div>
  );
}
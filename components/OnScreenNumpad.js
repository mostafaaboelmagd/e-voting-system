'use client';

import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';

export default function OnScreenNumpad({ value, onChange, maxLength = 14 }) {
  // إضافة رقم
  const handleNumberClick = (num) => {
    if (value.length < maxLength) {
      onChange(value + num);
    }
  };

  // حذف آخر رقم
  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  // مسح الكل
  const handleClear = () => {
    onChange('');
  };

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 p-4 rounded-2xl shadow-xl space-y-3" dir="rtl">
      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
        <span>لوحة أرقام سهلة الإدخال:</span>
        <span className="font-mono text-cyan-400 font-bold">{value.length} / {maxLength} رقم</span>
      </div>

      {/* أزرار الأرقام 1-9 */}
      <div className="grid grid-cols-3 gap-2">
        {digits.slice(0, 9).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleNumberClick(num)}
            className="py-3.5 bg-slate-900 hover:bg-cyan-600/20 hover:border-cyan-500/50 border border-slate-800 rounded-xl text-lg font-bold font-mono text-white active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center"
          >
            {num}
          </button>
        ))}

        {/* أزرار التحكم والسطر الأخير */}
        <button
          type="button"
          onClick={handleClear}
          className="py-3.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 rounded-xl text-xs font-bold text-rose-300 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
          title="مسح الكل"
        >
          <RotateCcw className="w-4 h-4" />
          <span>مسح</span>
        </button>

        <button
          type="button"
          onClick={() => handleNumberClick('0')}
          className="py-3.5 bg-slate-900 hover:bg-cyan-600/20 hover:border-cyan-500/50 border border-slate-800 rounded-xl text-lg font-bold font-mono text-white active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center"
        >
          0
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-amber-300 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
          title="حذف رقم"
        >
          <Delete className="w-4 h-4" />
          <span>حذف</span>
        </button>
      </div>
    </div>
  );
}
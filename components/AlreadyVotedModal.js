'use client';

import React from 'react';
import { AlertTriangle, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AlreadyVotedModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 text-white dir-rtl text-center">
        
        <div className="w-14 h-14 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">عفواً، لقد قمت بالتصويت مسبقاً!</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          مسجل لدينا أن هذا الرقم القومي قد أتم عملية الاقتراع بنجاح. تقتضي القوانين والأنظمة الأمنية عدم السماح بإعادة التصويت أكثر من مرة.
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push('/receipt');
            }}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>عرض الإيصال المشفر الخاص بك</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-2.5 rounded-xl transition cursor-pointer"
          >
            إغلاق التنبيه
          </button>
        </div>

      </div>
    </div>
  );
}
'use client';

import React from 'react';
import { HelpCircle, X, ShieldCheck, Lock, EyeOff, CheckCircle2 } from 'lucide-react';

export default function InstructionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl p-6 text-white dir-rtl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* العنوان */}
        <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">إرشادات الناخب ومعايير الأمان</h3>
            <p className="text-[11px] text-slate-400">دليل استخدام المنظومة وحماية سرية الصوت</p>
          </div>
        </div>

        {/* قائمة الأسئلة والإرشادات */}
        <div className="space-y-4 text-xs">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-blue-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>كيف يضمن النظام عدم تكرار التصويت؟</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              يتم ربط الرقم القومي بقاعدة بيانات وطنية مشفرة. فور إتمام عملية الاقتراع، يُسجل الرقم القومي كـ "تم التصويت" لمنع محاولات الإدخال المكرر.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-cyan-300 mb-1">
              <EyeOff className="w-4 h-4 text-cyan-400" />
              <span>هل يتم ربط هويتي باختياري للمرشح؟</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              لا، إطلاقاً. يتم فصل بيانات الهوية الشخصية تماماً عن الورقة الانتخابية الرقمية قبل خضوعها لتشفير 256-bit لضمان السرية المطلقة للاقتراع.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-emerald-300 mb-1">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>ما هي فائدة مطابقة بصمة الوجه؟</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              تُستخدم تقنية التحقق البيولوجي للتأكد من حضور الناخب بنفسه أمام الشاشة ومطابقة ملامحه مع بيانات الرقم القومي المدخل للحمايات الأمنية.
            </p>
          </div>
        </div>

        {/* زر الفهم والمتابعة */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          حسناً، فهمت ذلك
        </button>

      </div>
    </div>
  );
}
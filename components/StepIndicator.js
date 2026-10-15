import React from 'react';

export default function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: 'البيانات والهوية' },
    { num: 2, label: 'بصمة الوجه' },
    { num: 3, label: 'صندوق الاقتراع' },
    { num: 4, label: 'الإيصال المشفر' }
  ];

  return (
    <div className="flex justify-between items-center mb-8 relative max-w-xl mx-auto px-4">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2 z-0"></div>
      {steps.map((s) => (
        <div key={s.num} className={`relative z-10 flex flex-col items-center ${currentStep >= s.num ? 'text-blue-400' : 'text-slate-400'}`}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            currentStep > s.num ? 'bg-blue-600 text-white' : currentStep === s.num ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : 'bg-slate-700 text-slate-400'
          }`}>
            {currentStep > s.num ? '✓' : s.num}
          </div>
          <span className="text-[11px] mt-1 font-medium hidden sm:block">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
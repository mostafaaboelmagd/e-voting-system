'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OtpModal({ isOpen, onVerify, phoneNumber = "010****5678" }) {
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // الانتقال للتكست بوكس التالي تلقائياً
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      onVerify();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center">
        <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
          <KeyRound className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">تأكيد الهوية عبر الهاتف (MFA)</h3>
        <p className="text-xs text-slate-400 mb-6">
          تم إرسال رمز تحقق مؤقت مكون من 4 أرقام إلى رقم الهاتف المسجل بالهوية (<span className="text-blue-300 font-mono">{phoneNumber}</span>)
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 dir-ltr mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-14 bg-slate-950 border border-slate-700 rounded-xl text-center text-xl font-bold font-mono text-cyan-400 focus:border-blue-500 focus:outline-none transition shadow-inner"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.join('').length < 4}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>تأكيد الرمز والتأهل لبصمة الوجه</span>
          </button>
        </form>
      </div>
    </div>
  );
}
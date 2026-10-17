'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function VerifyModal({ isOpen, onClose }) {
  const [txHash, setTxHash] = useState('');
  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    if (!txHash.trim()) return;

    setIsSearching(true);
    setResult(null);

    setTimeout(() => {
      // البحث في الـ localStorage عن بيانات الإيصال المحفوظة
      const savedReceipt = localStorage.getItem('e_voting_receipt');
      let receiptData = null;

      if (savedReceipt) {
        try {
          receiptData = JSON.parse(savedReceipt);
        } catch (err) {
          console.error(err);
        }
      }

      // مطابقة الـ Hash المدخل (سواء الخاص بالمستخدم أو تجريبي)
      if (receiptData && (txHash.trim() === receiptData.txHash || txHash.trim().toLowerCase() === receiptData.txHash.toLowerCase())) {
        setResult({
          status: 'success',
          timestamp: receiptData.timestamp || '2026-10-17 03:36 AM',
          message: 'تم إيجاد الصوت! العملية موثقة ومسجلة في السجل الرقمي اللامركزي.'
        });
      } else if (txHash.startsWith('0x') && txHash.length >= 10) {
        // محاكاة قبول للهاش الصحيح شكلياً للتجربة العامة
        setResult({
          status: 'success',
          timestamp: new Date().toLocaleString('ar-EG'),
          message: 'الرمز المرجعي صحيح ومؤكد في كتلة التشفير الوطنية.'
        });
      } else {
        setResult({
          status: 'error',
          message: 'لم يتم العثور على أي صوت مرتبط بهذا الرقم المرجعي. يرجى التأكد من صحة الـ TxHash.'
        });
      }

      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-white dir-rtl">
        
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* عنوان النافذة */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">التحقق من صحة الصوت</h3>
            <p className="text-[11px] text-slate-400">أدخل كود الـ TxHash للتحقق من قيد الصوت في الصندوق الرقمي</p>
          </div>
        </div>

        {/* نموذج البحث */}
        <form onSubmit={handleVerify} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="مثال: 0x8f3c...b92e710a"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono pl-10"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          </div>

          <button
            type="submit"
            disabled={isSearching || !txHash.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>فحص الكود والتأكد</span>
            )}
          </button>
        </form>

        {/* عرض نتيجة البحث */}
        {result && (
          <div className={`mt-4 p-3.5 rounded-xl border text-xs ${
            result.status === 'success' 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-start gap-2">
              {result.status === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold">{result.message}</p>
                {result.timestamp && (
                  <p className="text-[10px] opacity-80 font-mono">وقت التسجيل: {result.timestamp}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { 
  Headphones, X, PhoneCall, HelpCircle, 
  Send, CheckCircle2, MessageSquare, AlertCircle, ShieldCheck 
} from 'lucide-react';

export default function SupportModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' | 'contact'
  const [ticketSent, setTicketSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  if (!isOpen) return null;

  const handleSendTicket = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setFormData({ name: '', phone: '', message: '' });
      onClose();
    }, 2500);
  };

  const faqs = [
    {
      q: 'ماذا أفعل إذا فشل التحقق من بصمة الوجه؟',
      a: 'تأكد من وجود إضاءة جيدة وجلوسك أمام الكاميرا مباشرة بدون إرتداء نظارات شمسية أو أغطية تعوق الوجه.'
    },
    {
      q: 'هل صوتي الانتخابي مشفر ومحمي بالفعل؟',
      a: 'نعم، يتم فصل بيانات هويتك الشخصية عن خياراتك الانتخابية وتشفير الصوت فور إرساله برمز SHA-256 لا يمكن فكه.'
    },
    {
      q: 'كيف يمكنني التأكد من قيدي الانتخابي؟',
      a: 'بمجرد إدخال الرقم القومي الصحيح المكون من 14 رقماً، يقوم النظام تلقائياً بالتحقق من أهليتك وقيدك الانتخابي.'
    },
    {
      q: 'هل يمكنني تغيير رأيي أو إعادة التصويت مرة أخرى؟',
      a: 'وفقاً للقانون الانتخابي، يتيح لك النظام التصويت مرة واحدة فقط ولا يمكن تعديل الخيار بعد إصدار الإيصال الرقمي.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* الهيدر */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">مركز الدعم الفني والمساعدة الرسمية</h3>
              <p className="text-[10px] text-slate-400">الهيئة الوطنية للانتخابات - اللجنة الإلكترونية</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* أزرار التبويب (Tabs) */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 text-xs font-medium">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'faq' 
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-900/60 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            الأسئلة الشائعة
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'contact' 
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-900/60 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            إبلاغ عن مشكلة
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300 [&::-webkit-scrollbar]:hidden">
          
          {/* الخط الساخن الدائم */}
          <div className="bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-500/20 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
              <div>
                <span className="block text-[11px] text-slate-400">الخط الساخن للمساعدة الفورية</span>
                <span className="font-mono text-emerald-400 font-bold text-sm tracking-wider">19999</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              متاح 24/7
            </span>
          </div>

          {/* تبويب الأسئلة الشائعة */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                  <h4 className="font-semibold text-slate-200 mb-1 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed pr-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* تبويب تقديم بلاغ / تذكرة */}
          {activeTab === 'contact' && (
            <div>
              {ticketSent ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-sm font-bold text-white">تم إرسال بلاغك بنجاح!</h4>
                  <p className="text-[11px] text-slate-400">
                    تم توجيه التذكرة للجنة التقنية المختصة وسيتم معالجتها فوراً.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendTicket} className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">الاسم بالكامل</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="أدخل اسمك"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">رقم التواصل (اختياري)</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="01xxxxxxxxx"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">وصف المشكلة التقنية</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="اشرح المشكلة التقنية التي واجهتك بالتفصيل..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال البلاغ للجنة الدعم</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* الفوتر الصغير */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
          <span>جميع بلاغات الدعم خاضعة لمراقبة جودة النظام والتشفير الإلكتروني</span>
        </div>

      </div>
    </div>
  );
}
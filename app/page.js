'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Fingerprint, ArrowLeft, ShieldCheck, CreditCard, 
  User, MapPin, Upload, FileCheck, Image as ImageIcon 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import StepIndicator from '../components/StepIndicator';
import Footer from '../components/Footer';
import AlreadyVotedModal from '../components/AlreadyVotedModal';

export default function HomePage() {
  const router = useRouter();

  // الحالات الخاصّة بالنموذج
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [idCardImage, setIdCardImage] = useState(null);

  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // قائمة المحافظات المصرية
  const egyptGovernorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية', 'القليوبية', 'كفر الشيخ', 
    'المنوفية', 'الغربية', 'البحيرة', 'دمياط', 'بورسعيد', 'الإسماعيلية', 'السويس', 
    'شمال سيناء', 'جنوب سيناء', 'الفيوم', 'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 
    'قنا', 'الأقصر', 'أسوان', 'البحر الأحمر', 'الوادي الجديد', 'مطروح'
  ];

  // التعامل مع رفع الصورة
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardImage(reader.result);
        if (error) setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من اكتمال البيانات
    if (!fullName.trim() || fullName.trim().split(' ').length < 3) {
      setError('يرجى إدخال الاسم رباعي كما هو مدون بالمستند الرسمي');
      return;
    }

    if (nationalId.trim().length !== 14) {
      setError('يرجى إدخال رقم قومي صحيح مكون من 14 رقماً');
      return;
    }

    if (!governorate) {
      setError('يرجى اختيار المحافظة التابع لها');
      return;
    }

    if (!idCardImage) {
      setError('يرجى رفع صورة الوجه الأمامي للبطاقة أو جواز السفر');
      return;
    }

    setError('');
    const id = nationalId.trim();

    // فحص منع التكرار
    const votedIds = JSON.parse(localStorage.getItem('voted_national_ids') || '[]');

    if (votedIds.includes(id)) {
      setShowModal(true);
      return;
    }

    // حفظ بيانات الناخب في الجلسة
    const voterData = {
      fullName: fullName.trim(),
      nationalId: id,
      governorate,
      idCardImage
    };

    localStorage.setItem('current_voter_id', id);
    localStorage.setItem('current_voter_info', JSON.stringify(voterData));

    // التوجيه إلى المسار الصحيح المطابق لاسم المجلد لديك (verify-id)
    router.push('/verify-id');
  };

  return (
    <main 
      dir="rtl" 
      className="relative min-h-screen text-white p-4 md:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="relative z-10">
        <Navbar />
        <StepIndicator currentStep={1} />

        <div className="max-w-xl mx-auto w-full bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl mb-8">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-3">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">تسجيل هويّة الناخب الرسمية</h2>
            <p className="text-xs text-slate-400 mt-1">
              أدخل بياناتك الشخصية كما هي مدونة ببطاقة الرقم القومي أو جواز السفر
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. الاسم الرباعي */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" /> الاسم الرباعي بالكامل
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="أحمد محمد علي إبراهيم"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* 2. الرقم القومي والمحافظة في صف واحد */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> الرقم القومي (14 رقم)
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={nationalId}
                  onChange={(e) => {
                    setNationalId(e.target.value.replace(/\D/g, ''));
                    if (error) setError('');
                  }}
                  placeholder="29901011234567"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs font-mono text-center tracking-wider text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> المحافظة التابع لها
                </label>
                <select
                  value={governorate}
                  onChange={(e) => {
                    setGovernorate(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-900 text-slate-500">اختر المحافظة</option>
                  {egyptGovernorates.map((gov) => (
                    <option key={gov} value={gov} className="bg-slate-900 text-white">
                      {gov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. رفع صورة الهوية / جواز السفر */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> صورة الوجه الأمامي للبطاقة أو جواز السفر
              </label>

              {!idCardImage ? (
                <label className="border-2 border-dashed border-slate-800 hover:border-blue-500/60 bg-slate-950/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition group">
                  <Upload className="w-6 h-6 text-slate-500 group-hover:text-blue-400 mb-2 transition" />
                  <span className="text-xs text-slate-300 font-medium">اضغط لرفع صورة إثبات الشخصية</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">صيغ مدعومة: JPG, PNG (حد أقصى 5MB)</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              ) : (
                <div className="relative rounded-xl border border-blue-500/40 bg-slate-950 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={idCardImage} 
                      alt="مستند الهوية" 
                      className="w-14 h-10 object-cover rounded-lg border border-slate-700" 
                    />
                    <div>
                      <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                        <FileCheck className="w-3.5 h-3.5" /> تم رفع الصورة بنجاح
                      </div>
                      <span className="text-[10px] text-slate-400">جاهزة للمطابقة الرقمية</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIdCardImage(null)}
                    className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    تغيير
                  </button>
                </div>
              )}
            </div>

            {/* رسالة الخطأ */}
            {error && (
              <p className="text-rose-400 text-[11px] text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* زر المتابعة */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer text-xs mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>تأكيد البيانات والمتابعة لبصمة الوجه</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>

      {/* مودال منع التكرار */}
      <AlreadyVotedModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
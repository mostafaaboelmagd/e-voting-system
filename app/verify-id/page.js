'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ScanFace, CheckCircle2, UserCheck, Lock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import StepIndicator from '../../components/StepIndicator';
import Footer from '../../components/Footer';
import FaceCamera from '../../components/FaceCamera';

export default function VerifyIdPage() {
  const router = useRouter();
  const [voterInfo, setVoterInfo] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    // جلب بيانات الناخب المسجلة من الجلسة
    const info = localStorage.getItem('current_voter_info');
    if (info) {
      setVoterInfo(JSON.parse(info));
    }
  }, []);

  const handleVerify = () => {
    if (!capturedImage) return;

    setIsVerifying(true);
    setVerificationStatus('جاري فتح قناة التشفير ومطابقة ملامح الوجه...');

    // محاكاة عملية التحقق البيولوجي مع تحديث الحالة
    setTimeout(() => {
      setVerificationStatus('فحص الحيوية (Liveness Check) ومطابقة قاعدة البيانات...');
    }, 1000);

    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
      setVerificationStatus('تمت المطابقة الحيوية بنجاح بنسبة 99.2% - الهوية مؤكدة');

      // الانتقال التلقائي لصفحة الاقتراع
      setTimeout(() => {
        router.push('/ballot');
      }, 1500);
    }, 2500);
  };

  return (
    <main 
      dir="rtl" 
      className="relative min-h-screen text-white p-4 md:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="relative z-10">
        <Navbar />
        <StepIndicator currentStep={2} />

        <div className="max-w-md mx-auto w-full bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl text-center mb-8 space-y-5">
          
          {/* بيانات الناخب للتأكيد */}
          {voterInfo && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">{voterInfo.fullName}</span>
              </div>
              <span className="font-mono text-cyan-400 text-[11px]">{voterInfo.governorate}</span>
            </div>
          )}

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-2">
              <ScanFace className="w-6 h-6 text-cyan-400" />
            </div>
            
            <h2 className="text-lg font-bold text-white">التحقق البيولوجي (بصمة الوجه)</h2>
            <p className="text-xs text-slate-400 mt-1">
              قم بتوجيه وجهك نحو الكاميرا لالتقاط الصورة ومطابقة الهوية الرقمية
            </p>
          </div>

          {/* مكون الكاميرا */}
          <FaceCamera
            capturedImage={capturedImage}
            setCapturedImage={setCapturedImage}
            isVerifying={isVerifying}
            verifySuccess={verifySuccess}
            onVerify={handleVerify}
          />

          {/* نص حالة التحقق التفاعلية */}
          {verificationStatus && (
            <div className={`p-3 rounded-xl text-xs flex items-center justify-center gap-2 border ${
              verifySuccess 
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                : 'bg-blue-950/40 border-blue-500/30 text-cyan-300'
            }`}>
              {verifySuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
              )}
              <span>{verificationStatus}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <Lock className="w-3.5 h-3.5 text-cyan-500" />
            <span>معالجة بصمة الوجه تتم محلياً وبطريقة مشفرة تماماً</span>
          </div>

        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
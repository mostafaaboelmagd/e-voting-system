'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ScanFace } from 'lucide-react';
import Navbar from '../../components/Navbar';
import StepIndicator from '../../components/StepIndicator';
import Footer from '../../components/Footer';
import FaceCamera from '../../components/FaceCamera';

export default function VerifyIdPage() {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const handleVerify = () => {
    if (!capturedImage) return;

    setIsVerifying(true);

    // محاكاة عملية التحقق البيولوجي
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);

      // الانتقال التلقائي لصفحة الاقتراع
      setTimeout(() => {
        router.push('/ballot');
      }, 1200);
    }, 2000);
  };

  return (
    <main 
      dir="rtl" 
      className="relative min-h-screen text-white p-4 md:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="relative z-10">
        <Navbar />
        <StepIndicator currentStep={2} />

        <div className="max-w-md mx-auto w-full bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-3">
            <ScanFace className="w-6 h-6" />
          </div>
          
          <h2 className="text-lg font-bold text-white">التحقق البيولوجي (بصمة الوجه)</h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            قم بتوجيه وجهك نحو الكاميرا لالتقاط الصورة ومطابقة الهوية الرقمية
          </p>

          <FaceCamera
            capturedImage={capturedImage}
            setCapturedImage={setCapturedImage}
            isVerifying={isVerifying}
            verifySuccess={verifySuccess}
            onVerify={handleVerify}
          />
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
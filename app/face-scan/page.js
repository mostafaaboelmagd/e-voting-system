'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScanFace, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '../../components/Navbar';
import StepIndicator from '../../components/StepIndicator';
import Footer from '../../components/Footer';
import FaceCamera from '../../components/FaceCamera';

export default function FaceScanPage() {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
    }, 2000);
  };

  const handleProceedToBallot = () => {
    router.push('/ballot');
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-8 flex flex-col justify-between">
      <div>
        <Navbar />
        <StepIndicator currentStep={2} />

        <div className="max-w-xl mx-auto w-full bg-slate-800/80 backdrop-blur-xl border border-blue-700/30 rounded-2xl shadow-2xl p-6 md:p-8 text-center">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-blue-300">
              <ScanFace className="w-6 h-6 text-blue-400" /> التحقق البيولوجي (بصمة الوجه)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              يرجى التواجد في مكان مضاء جلياً والنظر مباشرة إلى الكاميرا للتحقق من مطابقة وجهك مع البطاقة.
            </p>
          </div>

          <FaceCamera 
            capturedImage={capturedImage}
            setCapturedImage={setCapturedImage}
            isVerifying={isVerifying}
            verifySuccess={verifySuccess}
            onVerify={handleVerification}
          />

          {verifySuccess && (
            <button
              onClick={handleProceedToBallot}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer animate-fade-in"
            >
              <span>الانتقال لكشف الاقتراع السرّي</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
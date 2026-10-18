'use client';

import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, CheckCircle2, Scan } from 'lucide-react';

export default function FaceCamera({ capturedImage, setCapturedImage, isVerifying, verifySuccess, onVerify }) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef, setCapturedImage]);

  return (
    <div className="flex flex-col items-center space-y-5">
      {/* إطار الكاميرا الدائري مع التأثيرات والتوجيه */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-500/70 shadow-2xl shadow-cyan-500/20 bg-slate-950 flex items-center justify-center">
        {!capturedImage ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              mirrored={true}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
              }}
            />

            {/* شعاع ومؤشر التوجيه البيولوجي وشبكة الذكاء الاصطناعي */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* شبكة نقاط ملامح الوجه */}
              <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:14px_14px] opacity-20" />
              <div className="w-48 h-48 border-2 border-dashed border-cyan-400/60 rounded-full animate-pulse" />
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-[bounce_2s_infinite]" />
            </div>
          </>
        ) : (
          /* عرض الصورة الملتقطة بـ scale-x-100 لتطابق اتجاه الكاميرا بالضبط */
          <div className="relative w-full h-full">
            <img 
              src={capturedImage} 
              alt="Captured Face" 
              className="w-full h-full object-cover -scale-x-100" 
            />
            {/* إطار دليلي تثبيتي فوق الصورة الملتقطة */}
            <div className="absolute inset-0 pointer-events-none border-2 border-cyan-500/30 rounded-full" />
          </div>
        )}

        {/* مؤشر المسح الضوئي عند التحليل والمطابقة الحيوية */}
        {isVerifying && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center animate-fadeIn z-10 space-y-2">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <Scan className="w-5 h-5 text-cyan-400 absolute animate-pulse" />
            </div>
            <span className="text-[11px] font-bold text-cyan-300">جاري مطابقة بصمة الوجه...</span>
            <span className="text-[9px] text-slate-400 font-mono">Liveness Check: 99.2%</span>
          </div>
        )}
      </div>

      {/* أزرار التحكم وحالة التحقق */}
      {verifySuccess ? (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 py-2.5 px-6 rounded-xl text-xs font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم التحقق البيولوجي والمطابقة بنجاح!</span>
        </div>
      ) : (
        <div className="flex gap-3 pt-1">
          {!capturedImage ? (
            <button
              type="button"
              onClick={capture}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Camera className="w-4 h-4" /> التقاط صورة الوجه
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCapturedImage(null)}
                disabled={isVerifying}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> إعادة التقاط
              </button>
              <button
                type="button"
                onClick={onVerify}
                disabled={isVerifying}
                className="bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 disabled:opacity-50 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                تأكيد وبدء التحقق
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
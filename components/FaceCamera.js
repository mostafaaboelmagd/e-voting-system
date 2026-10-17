'use client';

import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, CheckCircle2 } from 'lucide-react';

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
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500/70 shadow-2xl shadow-blue-500/20 bg-slate-950 flex items-center justify-center">
        {!capturedImage ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              mirrored={true} // 👈 يضبط الاتجاه التلقائي الطبيعي للوجه أمام الكاميرا
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
              }}
            />

            {/* شعاع ومؤشر التوجيه البيولوجي */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-dashed border-cyan-400/60 rounded-full animate-pulse"></div>
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[bounce_2s_infinite]"></div>
            </div>
          </>
        ) : (
          /* عرض الصورة الملتقطة بـ scale-x-100 لتطابق اتجاه الكاميرا بالضبط */
          <img 
            src={capturedImage} 
            alt="Captured Face" 
            className="w-full h-full object-cover -scale-x-100" 
          />
        )}

        {/* مؤشر المسح الضوئي عند التحليل والمطابقة */}
        {isVerifying && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center animate-pulse z-10">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-xs font-semibold text-cyan-300">جاري مطابقة بصمة الوجه...</span>
          </div>
        )}
      </div>

      {/* أزرار التحكم وحالة التحقق */}
      {verifySuccess ? (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 py-2.5 px-6 rounded-xl text-xs font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم التحقق البيولوجي والمطابقة بنجاح!</span>
        </div>
      ) : (
        <div className="flex gap-3 pt-1">
          {!capturedImage ? (
            <button
              type="button"
              onClick={capture}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Camera className="w-4 h-4" /> التقاط صورة الوجه
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCapturedImage(null)}
                disabled={isVerifying}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> إعادة التقاط
              </button>
              <button
                type="button"
                onClick={onVerify}
                disabled={isVerifying}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition shadow-lg shadow-emerald-600/30 cursor-pointer"
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
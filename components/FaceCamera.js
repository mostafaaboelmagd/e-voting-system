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
    <div className="flex flex-col items-center space-y-4">
      {/* إطار الكاميرا الدائري */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500/60 shadow-2xl bg-slate-900 flex items-center justify-center">
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: 'user' }}
          />
        ) : (
          <img src={capturedImage} alt="Captured Face" className="w-full h-full object-cover" />
        )}

        {/* مؤشر المسح الضوئي عند التحليل */}
        {isVerifying && (
          <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm flex flex-col items-center justify-center animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-xs font-semibold text-blue-200">جاري مطابقة ملامح الوجه...</span>
          </div>
        )}
      </div>

      {/* أزرار التحكم وحالة التحقق */}
      {verifySuccess ? (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 py-2.5 px-6 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم التحقق البيولوجي بنجاح!</span>
        </div>
      ) : (
        <div className="flex gap-3 pt-2">
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
                className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> إعادة
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
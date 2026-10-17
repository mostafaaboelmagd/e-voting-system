'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isEnded: false });

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(20, 0, 0, 0); // ينتهي الاقتراع الساعة 8 مساءً

    const difference = target - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds, isEnded: false };
  };

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // عدم عرض المكون على السيرفر لمنع التعارض حتى يكتمل التحميل في متصفح العميل
  if (!mounted) {
    return null;
  }

  if (timeLeft.isEnded) {
    return (
      <div className="max-w-xl mx-auto w-full px-4 mb-3">
        <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-xs text-rose-300 backdrop-blur-md">
          <Clock className="w-4 h-4" />
          <span>انتهى الوقت الرسمي للاقتراع اليوم</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto w-full px-4 mb-3">
      <div className="bg-slate-900/60 border border-blue-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs backdrop-blur-md">
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>متبقي على غلق اللجان الرقمية:</span>
        </div>
        
        <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold tracking-wider">
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
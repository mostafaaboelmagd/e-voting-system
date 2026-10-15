'use client';

import React from 'react';
import { BarChart3, Users, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function DashboardPage() {
  const stats = [
    { title: 'إجمالي الأصوات المسجلة', value: '1,420,890', change: '+12.5%', color: 'text-blue-400' },
    { title: 'نسبة المشاركة الوطنية', value: '68.4%', change: '+4.2%', color: 'text-emerald-400' },
    { title: 'المحافظة الأعلى مشاركة', value: 'الدقهلية', change: '81.2%', color: 'text-cyan-400' }
  ];

  const results = [
    { name: 'المهندس / أحمد إبراهيم علي', votes: 612400, percent: 43 },
    { name: 'الدكتورة / منى محمود حسان', votes: 483100, percent: 34 },
    { name: 'الأستاذ / كريم عبد الفتاح', votes: 325390, percent: 23 }
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-8 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/80 backdrop-blur-xl border border-blue-700/30 rounded-2xl p-6">
            <div>
              <h2 className="text-xl font-bold text-blue-300 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-400" /> لوحة النتائج والإحصائيات المباشرة
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                تحديث لحظي ومستمر للمشاركة في الانتخابات عبر الشبكة المشفرة.
              </p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              بث حي ومباشر
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-md">
                <p className="text-xs text-slate-400 mb-2">{s.title}</p>
                <div className="flex justify-between items-baseline">
                  <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
                  <span className="text-[11px] text-emerald-400 flex items-center font-mono">
                    {s.change} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Results Progress Bars */}
          <div className="bg-slate-800/80 backdrop-blur-xl border border-blue-700/30 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> توزيع الأصوات المباشر بين المرشحين
            </h3>

            <div className="space-y-6">
              {results.map((r, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{r.name}</span>
                    <span className="font-mono text-cyan-300">{r.percent}% ({r.votes.toLocaleString()} صوت)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000"
                      style={{ width: `${r.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
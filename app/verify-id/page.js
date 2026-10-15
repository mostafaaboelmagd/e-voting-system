"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ShieldAlert,
  ArrowRight,
  UploadCloud,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import Footer from "@/components/Footer";

export default function VerifyIdPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    district: "القاهرة",
  });

  const [idImage, setIdImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.fullName.trim().split(" ").length < 3) {
      setErrorMsg(
        "الرجاء إدخال الاسم ثلاثياً أو رباعياً كما هو مكتوب في الهوية.",
      );
      return;
    }

    if (formData.idNumber.length < 10) {
      setErrorMsg("رقم الهوية غير صحيح، يجب ألا يقل عن 10 أرقام.");
      return;
    }

    if (!idImage) {
      setErrorMsg("الرجاء رفع صورة وجه بطاقة الرقم القومي أو جواز السفر.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/face-scan");
    }, 1200);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-8 flex flex-col justify-between"
    >
      <div>
        <Navbar />
        <StepIndicator currentStep={1} />

        {/* Card Container */}
        <div className="max-w-xl mx-auto w-full bg-slate-800/80 backdrop-blur-xl border border-blue-700/30 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-300">
              <FileText className="w-5 h-5 text-blue-400" /> التحقق من بيانات
              الهوية الرسمية
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              يتم تشفير وتأمين كافة البيانات المدخلة وفصلها عن سجلات الاقتراع
              لضمان السرية المطلقة.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 bg-rose-500/20 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                الاسم الرباعي (مطابق للهوية)
              </label>
              <input
                type="text"
                placeholder="مثال: أحمد محمد محمود علي"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                الرقم القومي (14 رقم) أو رقم جواز السفر
              </label>
              <input
                type="text"
                maxLength={14}
                placeholder="أدخل الأرقام بدقة"
                value={formData.idNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    idNumber: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white placeholder:text-slate-600 font-mono tracking-wider"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                اختر المحافظة / الدائرة الانتخابية
              </label>
              <select
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-white"
              >
                <option value="القاهرة">القاهرة</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الإسكندرية">الإسكندرية</option>
                <option value="الدقهلية">الدقهلية</option>
                <option value="الشرقية">الشرقية</option>
                <option value="الغربية">الغربية</option>
                <option value="المنوفية">المنوفية</option>
                <option value="القليوبية">القليوبية</option>
                <option value="البحيرة">البحيرة</option>
                <option value="كفر الشيخ">كفر الشيخ</option>
                <option value="دمياط">دمياط</option>
                <option value="بورسعيد">بورسعيد</option>
                <option value="الإسماعيلية">الإسماعيلية</option>
                <option value="السويس">السويس</option>
                <option value="شمال سيناء">شمال سيناء</option>
                <option value="جنوب سيناء">جنوب سيناء</option>
                <option value="المرج البحر الأحمر">البحر الأحمر</option>
                <option value="الفيوم">الفيوم</option>
                <option value="بني سويف">بني سويف</option>
                <option value="المنيا">المنيا</option>
                <option value="أسيوط">أسيوط</option>
                <option value="سوهاج">سوهاج</option>
                <option value="قنا">قنا</option>
                <option value="الأقصر">الأقصر</option>
                <option value="أسوان">أسوان</option>
                <option value="الوادي الجديد">الوادي الجديد</option>
                <option value="مطروح">مطروح</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                صورة بطاقة الرقم القومي أو جواز السفر (الوجه الأمامي)
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/50 rounded-xl p-4 cursor-pointer transition group">
                {imagePreview ? (
                  <div className="flex items-center gap-3 w-full">
                    <img
                      src={imagePreview}
                      alt="ID Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-slate-600"
                    />
                    <div className="flex-1 truncate">
                      <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> تم رفع المستند
                        بنجاح
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {idImage?.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-2">
                    <UploadCloud className="w-8 h-8 text-blue-400 mb-1 group-hover:scale-110 transition duration-300" />
                    <span className="text-xs text-slate-300 font-medium">
                      اضغط لرفع صورة البطاقة أو جواز السفر أو اسحبها هنا
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      PNG, JPG حتى 10MB
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري معالجة وتشفير البيانات...</span>
                </div>
              ) : (
                <>
                  <span>الانتقال لبصمة الوجه الحية</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // 1. โหลดข้อมูล user จาก localStorage ทันที
  const [user] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user_info");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error("Failed to parse user info", e);
        }
      }
    }
    return null;
  });

  // 2. ใช้ useEffect ทำงานเรื่อง Redirect อย่างเดียว Pure-side effect (ไม่มี setState)
  useEffect(() => {
    const token = localStorage.getItem("mock_token");
    if (!token || !user) {
      router.push("/");
    }
  }, [router, user]);

  const handleLogout = () => {
    localStorage.removeItem("mock_token");
    localStorage.removeItem("user_info");
    router.push("/");
  };

  // 3. ถ้ายังไม่มี user ให้แสดง Loading หน้าสว่างไว้ก่อน (ไม่ต้องใช้ useState เพิ่ม)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-emerald-700 font-bold text-xl">
        กำลังตรวจสอบสิทธิ์...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-gray-900 font-extrabold text-lg shadow-inner">
            ฿
          </div>
          <div>
            <h1 className="text-sm md:text-base font-extrabold leading-tight">
              Income & Expense
            </h1>
            <p className="text-[10px] md:text-xs font-semibold text-emerald-600">
              ระบบรายรับรายจ่าย
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-700">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs md:text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            ออกจากระบบ
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
            สวัสดี, {user.name}! 👋
          </h2>
          <p className="text-emerald-50 text-sm md:text-base opacity-90">
            นี่คือภาพรวมทางการเงินของคุณในเดือนนี้ ขอให้สนุกกับการออมเงินนะ!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                ↓
              </div>
              <span className="text-sm font-bold text-slate-500">
                รายรับทั้งหมด
              </span>
            </div>
            <p className="text-3xl font-extrabold text-emerald-600">
              ฿45,000.00
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                ↑
              </div>
              <span className="text-sm font-bold text-slate-500">
                รายจ่ายทั้งหมด
              </span>
            </div>
            <p className="text-3xl font-extrabold text-rose-500">฿12,450.00</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md hover:shadow-lg transition-shadow text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-amber-400 font-bold">
                ฿
              </div>
              <span className="text-sm font-bold text-slate-400">
                คงเหลือสุทธิ
              </span>
            </div>
            <p className="text-3xl font-extrabold text-amber-400">฿32,550.00</p>
          </div>
        </div>
      </main>
    </div>
  );
}

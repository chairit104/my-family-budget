"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  role: string;
}

const menuItems = [
  { label: "ภาพรวม", icon: "🏠" },
  { label: "รายรับ", icon: "💵" },
  { label: "รายจ่าย", icon: "🪙" },
  { label: "เป้าหมายออม", icon: "🐷" },
  { label: "รายงาน", icon: "📊" },
];

const transactions = [
  {
    name: "อาหารกลางวัน",
    date: "5 ต.ค.",
    amount: "120 THB",
    icon: "🍱",
  },
  {
    name: "บิลเติมเงิน",
    date: "5 ต.ค.",
    amount: "160 THB",
    icon: "🧴",
  },
  {
    name: "ซื้อของ",
    date: "7 ต.ค.",
    amount: "430 THB",
    icon: "📕",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user_info");

      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (error) {
          console.error("Failed to parse user info", error);
        }
      }
    }

    return null;
  });

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] text-emerald-700 font-bold">
        กำลังตรวจสอบสิทธิ์...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f2e9] text-slate-800">
      <div className="flex min-h-screen">
        {/* =========================================================
            SIDEBAR
        ========================================================= */}
        <aside className="hidden md:flex w-[105px] shrink-0 bg-white border-r border-slate-200 flex-col items-center py-5">
          {/* Logo */}
          <div className="w-14 h-14 rounded-full bg-[#fff4cf] border border-slate-200 flex items-center justify-center text-3xl mb-8">
            👨‍👩‍👧
          </div>

          {/* Menu */}
          <nav className="flex-1 w-full px-3">
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all ${
                    index === 0
                      ? "bg-[#fff4d6] text-slate-800 shadow-sm"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>

                  <span className="text-[11px] font-semibold whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Settings */}
          <button className="w-full px-3">
            <div className="flex flex-col items-center gap-1 py-3 rounded-2xl text-slate-500 hover:bg-slate-50">
              <span className="text-xl">⚙️</span>
              <span className="text-[11px] font-semibold">ตั้งค่า</span>
            </div>
          </button>
        </aside>

        {/* =========================================================
            MAIN
        ========================================================= */}
        <main className="flex-1 min-w-0">
          {/* =======================================================
              TOP HEADER
          ======================================================= */}
          <header className="bg-white border-b border-slate-200 px-5 md:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Title */}
              <div className="flex items-center gap-3">
                {/* Mobile menu icon */}
                <button className="md:hidden text-2xl">☰</button>

                <div>
                  <h1 className="text-lg md:text-xl font-extrabold text-slate-800">
                    หน้าภาพรวมการเงินของคุณ
                  </h1>

                  <p className="text-xs md:text-sm text-slate-500">
                    Financial Overview
                  </p>
                </div>
              </div>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-slate-700">
                    {user.name}
                  </p>

                  <p className="text-[11px] text-slate-400 capitalize">
                    {user.role}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#fff1cf] flex items-center justify-center text-xl border border-slate-200">
                  👩🏻
                </div>

                <button
                  onClick={handleLogout}
                  className="hidden lg:block text-xs font-bold text-rose-500 hover:text-rose-600"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </header>

          {/* =======================================================
              CONTENT
          ======================================================= */}
          <div className="p-4 md:p-6 lg:p-7">
            <div className="max-w-[1500px] mx-auto space-y-5">
              {/* ===================================================
                  SUMMARY CARDS
              =================================================== */}
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {/* Income */}
                <div className="bg-[#e7f7e9] border border-[#cfe9d2] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-600">
                        รายรับรวมเดือนนี้
                      </p>

                      <p className="text-2xl font-extrabold mt-2">12,000 THB</p>
                    </div>

                    <span className="text-2xl">💵</span>
                  </div>
                </div>

                {/* Expense */}
                <div className="bg-[#fff0ef] border border-[#f3d8d6] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-600">
                        รายจ่ายรวมเดือนนี้
                      </p>

                      <p className="text-2xl font-extrabold mt-2">8,500 THB</p>
                    </div>

                    <span className="text-2xl">🛒</span>
                  </div>
                </div>

                {/* Balance */}
                <div className="bg-[#fff8dc] border border-[#f1e7bb] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-600">
                        ยอดเงินคงเหลือ
                      </p>

                      <p className="text-2xl font-extrabold mt-2">3,500 THB</p>
                    </div>

                    <span className="text-2xl">💳</span>
                  </div>
                </div>

                {/* Saving */}
                <div className="bg-[#f2edf8] border border-[#ded5ec] rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-slate-600">
                        สถานะกระปุกออมเงิน
                      </p>

                      <p className="text-2xl font-extrabold mt-2">75%</p>
                    </div>

                    <span className="text-2xl">🐷</span>
                  </div>

                  <div className="mt-3">
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-700 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>

                    <p className="text-[10px] text-slate-500 mt-1">
                      15,000 / 20,000 THB
                    </p>
                  </div>
                </div>

                {/* Japan goal */}
                <div className="bg-[#fff0f5] border border-[#efd6e0] rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-slate-600">
                        เป้าหมาย
                      </p>

                      <p className="text-2xl font-extrabold mt-2">60%</p>
                    </div>

                    <span className="text-2xl">🗻</span>
                  </div>

                  <div className="mt-3">
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-700 rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>

                    <p className="text-[10px] text-slate-500 mt-1">
                      30,000 / 50,000 THB
                    </p>
                  </div>
                </div>
              </section>

              {/* ===================================================
                  MIDDLE
              =================================================== */}
              <section className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr] gap-5">
                {/* =================================================
                    CHART
                ================================================= */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-extrabold text-base">
                        รายรับรายจ่ายรายเดือน
                      </h2>

                      <p className="text-xs text-slate-400 mt-1">
                        Income & Expense
                      </p>
                    </div>

                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-[#8ac88f]" />
                        รายรับ
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-[#dc7770]" />
                        รายจ่าย
                      </div>
                    </div>
                  </div>

                  {/* Fake chart */}
                  <div className="h-[230px] flex items-end justify-between gap-2 px-2">
                    {[
                      [70, 35],
                      [82, 45],
                      [75, 50],
                      [85, 48],
                      [100, 42],
                      [70, 60],
                      [88, 54],
                      [92, 40],
                      [86, 46],
                      [110, 48],
                    ].map(([income, expense], index) => (
                      <div
                        key={index}
                        className="flex-1 h-full flex items-end justify-center gap-1"
                      >
                        <div
                          className="w-3 md:w-5 rounded-t-md bg-[#8ac88f]"
                          style={{
                            height: `${income}%`,
                          }}
                        />

                        <div
                          className="w-3 md:w-5 rounded-t-md bg-[#dc7770]"
                          style={{
                            height: `${expense}%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Months */}
                  <div className="grid grid-cols-10 text-[10px] text-slate-400 text-center mt-2">
                    <span>พ.ย.</span>
                    <span>ธ.ค.</span>
                    <span>ม.ค.</span>
                    <span>ก.พ.</span>
                    <span>มี.ค.</span>
                    <span>เม.ย.</span>
                    <span>พ.ค.</span>
                    <span>มิ.ย.</span>
                    <span>ก.ค.</span>
                    <span>ส.ค.</span>
                  </div>
                </div>

                {/* =================================================
                    RECENT TRANSACTIONS
                ================================================= */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⏰</span>

                      <h2 className="font-extrabold text-base">รายการล่าสุด</h2>
                    </div>

                    <button className="text-xs font-bold text-emerald-600 hover:underline">
                      ดูทั้งหมด
                    </button>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.name}
                        className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#f8f4e9] flex items-center justify-center text-xl">
                            {transaction.icon}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {transaction.name}
                            </p>

                            <p className="text-[11px] text-slate-400">
                              {transaction.date}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm font-extrabold text-slate-700">
                          {transaction.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ===================================================
                  BOTTOM
              =================================================== */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Saving Goal */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-extrabold">เป้าหมายการออม</h2>

                      <p className="text-xs text-slate-400 mt-1">
                        วางแผนเพื่อเป้าหมายของครอบครัว
                      </p>
                    </div>

                    <span className="text-3xl">🎯</span>
                  </div>

                  <div className="mt-5">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-bold">เที่ยวญี่ปุ่น</span>

                      <span className="font-bold">60%</span>
                    </div>

                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#91b79a] rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>

                    <div className="flex justify-between mt-2 text-[11px] text-slate-400">
                      <span>30,000 THB</span>
                      <span>50,000 THB</span>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-[#fff7e5] border border-[#eee0bc] rounded-2xl p-5">
                  <div className="flex gap-4">
                    <div className="text-4xl">💡</div>

                    <div>
                      <h2 className="font-extrabold">เคล็ดลับการออมเงิน</h2>

                      <ul className="text-xs text-slate-600 mt-2 space-y-1">
                        <li>• เก็บเงินออมก่อนใช้ เพื่อไม่ให้เงินเหลือศูนย์</li>

                        <li>• หารายจ่ายที่ไม่จำเป็นออกทุกเดือน</li>

                        <li>• ตั้งเป้าหมายเล็ก ๆ เพื่อสร้างนิสัยการออม</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

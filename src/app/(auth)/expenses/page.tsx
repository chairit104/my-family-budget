"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  role: string;
}

interface Expense {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  icon: string;
}

const initialExpenses: Expense[] = [
  {
    id: 1,
    title: "อาหารกลางวัน",
    category: "อาหาร",
    date: "5 ก.ย. 2026",
    amount: 120,
    icon: "🍱",
  },
  {
    id: 2,
    title: "ค่าเดินทาง",
    category: "เดินทาง",
    date: "5 ก.ย. 2026",
    amount: 160,
    icon: "🚗",
  },
  {
    id: 3,
    title: "ซื้อของใช้",
    category: "ของใช้",
    date: "7 ก.ย. 2026",
    amount: 430,
    icon: "🛒",
  },
  {
    id: 4,
    title: "ค่าอินเทอร์เน็ต",
    category: "บิล",
    date: "10 ก.ย. 2026",
    amount: 599,
    icon: "📱",
  },
];

const menuItems = [
  { label: "ภาพรวม", icon: "🏠", href: "/dashboard" },
  { label: "รายรับ", icon: "💵", href: "/income" },
  { label: "รายจ่าย", icon: "🪙", href: "/expenses" },
  { label: "เป้าหมายออม", icon: "🐷", href: "#" },
  { label: "รายงาน", icon: "📊", href: "#" },
];

export default function ExpensesPage() {
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

  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("อาหาร");
  const [amount, setAmount] = useState("");

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

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    const categoryIcons: Record<string, string> = {
      อาหาร: "🍱",
      เดินทาง: "🚗",
      ของใช้: "🛒",
      บิล: "📱",
      ช้อปปิ้ง: "🛍️",
      สุขภาพ: "💊",
      อื่นๆ: "🧾",
    };

    const newExpense: Expense = {
      id: Date.now(),
      title,
      category,
      date: new Date().toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      amount: Number(amount),
      icon: categoryIcons[category] || "🧾",
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setTitle("");
    setAmount("");
  };

  const totalExpense = expenses.reduce((total, item) => total + item.amount, 0);

  const foodExpense = expenses
    .filter((item) => item.category === "อาหาร")
    .reduce((total, item) => total + item.amount, 0);

  const transportExpense = expenses
    .filter((item) => item.category === "เดินทาง")
    .reduce((total, item) => total + item.amount, 0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f2e9] text-emerald-700 font-bold">
        กำลังตรวจสอบสิทธิ์...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f2e9] text-slate-800">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden md:flex w-[105px] shrink-0 bg-white border-r border-slate-200 flex-col items-center py-5">
          <div className="w-14 h-14 rounded-full bg-[#fff4cf] border border-slate-200 flex items-center justify-center text-3xl mb-8">
            👨‍👩‍👧
          </div>

          <nav className="flex-1 w-full px-3">
            <div className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.href !== "#" && router.push(item.href)}
                  className={`w-full flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all ${
                    item.href === "/expenses"
                      ? "bg-[#fff0ef] text-slate-800 shadow-sm"
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

          <button className="w-full px-3">
            <div className="flex flex-col items-center gap-1 py-3 rounded-2xl text-slate-500 hover:bg-slate-50">
              <span className="text-xl">⚙️</span>

              <span className="text-[11px] font-semibold">ตั้งค่า</span>
            </div>
          </button>
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0">
          {/* HEADER */}
          <header className="bg-white border-b border-slate-200 px-5 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="md:hidden text-xl"
                >
                  ☰
                </button>

                <div>
                  <h1 className="text-lg md:text-xl font-extrabold">รายจ่าย</h1>

                  <p className="text-xs md:text-sm text-slate-400">
                    Expense Management
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold">{user.name}</p>

                  <p className="text-[11px] text-slate-400">{user.role}</p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#fff1cf] flex items-center justify-center text-xl border border-slate-200">
                  👩🏻
                </div>

                <button
                  onClick={handleLogout}
                  className="hidden lg:block text-xs font-bold text-rose-500"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="p-4 md:p-6 lg:p-7">
            <div className="max-w-[1200px] mx-auto space-y-5">
              {/* SUMMARY */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#fff0ef] border border-[#f0d6d3] rounded-2xl p-5">
                  <p className="text-xs font-bold text-slate-500">
                    รายจ่ายเดือนนี้
                  </p>

                  <p className="text-3xl font-extrabold mt-2">
                    {totalExpense.toLocaleString()} THB
                  </p>

                  <p className="text-xs text-rose-500 mt-2">
                    ↑ ค่าใช้จ่ายทั้งหมด
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <p className="text-xs font-bold text-slate-500">
                    จำนวนรายการ
                  </p>

                  <p className="text-3xl font-extrabold mt-2">
                    {expenses.length}
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    รายการในเดือนนี้
                  </p>
                </div>

                <div className="bg-[#fff8dc] border border-[#eee2b9] rounded-2xl p-5">
                  <p className="text-xs font-bold text-slate-500">
                    ค่าใช้จ่ายเฉลี่ย
                  </p>

                  <p className="text-3xl font-extrabold mt-2">
                    {expenses.length
                      ? Math.round(
                          totalExpense / expenses.length,
                        ).toLocaleString()
                      : 0}{" "}
                    THB
                  </p>

                  <p className="text-xs text-slate-400 mt-2">เฉลี่ยต่อรายการ</p>
                </div>
              </section>

              {/* CATEGORY */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span>🍱</span>

                    <span className="text-xs font-bold">อาหาร</span>
                  </div>

                  <p className="font-extrabold mt-2">
                    {foodExpense.toLocaleString()} THB
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span>🚗</span>

                    <span className="text-xs font-bold">เดินทาง</span>
                  </div>

                  <p className="font-extrabold mt-2">
                    {transportExpense.toLocaleString()} THB
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span>🛒</span>

                    <span className="text-xs font-bold">ของใช้</span>
                  </div>

                  <p className="font-extrabold mt-2">
                    {expenses
                      .filter((item) => item.category === "ของใช้")
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}{" "}
                    THB
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span>📱</span>

                    <span className="text-xs font-bold">บิล</span>
                  </div>

                  <p className="font-extrabold mt-2">
                    {expenses
                      .filter((item) => item.category === "บิล")
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}{" "}
                    THB
                  </p>
                </div>
              </section>

              {/* FORM + LIST */}
              <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
                {/* FORM */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <h2 className="font-extrabold">เพิ่มรายการรายจ่าย</h2>

                  <p className="text-xs text-slate-400 mt-1">
                    บันทึกค่าใช้จ่ายของครอบครัว
                  </p>

                  <form onSubmit={handleAddExpense} className="mt-5 space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        รายการ
                      </label>

                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="เช่น ค่าอาหาร"
                        className="mt-1 w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        หมวดหมู่
                      </label>

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-rose-300"
                      >
                        <option>อาหาร</option>
                        <option>เดินทาง</option>
                        <option>ของใช้</option>
                        <option>บิล</option>
                        <option>ช้อปปิ้ง</option>
                        <option>สุขภาพ</option>
                        <option>อื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        จำนวนเงิน
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="mt-1 w-full h-11 px-4 pr-14 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-rose-300"
                        />

                        <span className="absolute right-4 top-4 text-xs text-slate-400">
                          THB
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-11 rounded-xl bg-[#d9827b] hover:bg-[#c97069] text-white font-bold text-sm transition"
                    >
                      + เพิ่มรายจ่าย
                    </button>
                  </form>
                </div>

                {/* LIST */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-extrabold">รายการรายจ่าย</h2>

                      <p className="text-xs text-slate-400 mt-1">
                        รายการล่าสุดของเดือนนี้
                      </p>
                    </div>

                    <span className="text-xs font-bold text-rose-500">
                      {expenses.length} รายการ
                    </span>
                  </div>

                  <div className="space-y-3">
                    {expenses.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#faf9f5] border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-[#fff0ef] flex items-center justify-center text-xl">
                            {item.icon}
                          </div>

                          <div>
                            <p className="text-sm font-bold">{item.title}</p>

                            <div className="flex gap-2 mt-1">
                              <span className="text-[10px] text-slate-400">
                                {item.category}
                              </span>

                              <span className="text-[10px] text-slate-300">
                                •
                              </span>

                              <span className="text-[10px] text-slate-400">
                                {item.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm font-extrabold text-rose-500">
                          -{item.amount.toLocaleString()} THB
                        </p>
                      </div>
                    ))}
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

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 1. นำเข้า useRouter สำหรับย้ายหน้า

export function LoginForm() {
  const router = useRouter(); // 2. สร้าง instance router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 3. ปรับฟังก์ชั่น handleSubmit ให้จัดการ Mock Login & Redirect
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setIsLoading(true);

    // สร้างข้อมูล Mock User สำหรับทดสอบ
    const mockUser = {
      id: "user_01",
      name: email || "User Developer",
      role: "admin",
    };

    // บันทึก Mock Token ลง localStorage
    localStorage.setItem("mock_token", "token_123456789");
    localStorage.setItem("user_info", JSON.stringify(mockUser));

    // จำลองการโหลดเล็กน้อย (300ms) แล้วเปลี่ยนหน้าไปยัง /dashboard
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden font-sans select-none">
      {/* 1. Background Image */}
      <img
        src="/image/login/background_login.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
        {/* 2. Central Glassmorphism Card */}
        <div className="relative w-full rounded-3xl p-6 sm:p-7 ">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ใส่ชื่อผู้ใช้ของคุณ"
                  className="w-full pl-9 pr-3 py-4.5 text-lg bg-white/70 border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:bg-white text-gray-900 placeholder-gray-500 shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="pt-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ใส่รหัสผ่านของคุณ"
                  className="w-full pl-9 pr-3 py-4.5 text-lg bg-white/70 border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:bg-white text-gray-900 placeholder-gray-500 shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Space reservation for Paper Login Button overlay */}
            <div className="h-10" />
          </form>

          {/* 3. Paper Login Button Overlay (login-removebg-preview.png) */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="absolute z-20 w-36 sm:w-44 hover:scale-105 active:scale-95 transition-transform drop-shadow-md focus:outline-none cursor-pointer"
          >
            <img
              src="/image/login/login-removebg-preview.png"
              alt="เข้าสู่ระบบ"
              className={`w-full h-auto pointer-events-none ${
                isLoading ? "opacity-60 animate-pulse" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, CircleCheck, CircleX } from "lucide-react";
import { motion } from "framer-motion";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import * as React from "react";
import { Spinner } from "@heroui/react";
import Link from "next/link";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    hasLowerAndUpperCase,
    hasNumericCharacter,
    meetsMinimumLength,
    isSpecialCharacterValid,
    strengthScore,
    control,
    handleRegister,
    handleSubmit,
    isPendingRegister,
    errors,
  } = useRegister(password);
  const progressColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-600",
  ];
  const textprogressColor = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-emerald-600",
  ];
  const strengthLabel = ["Sangat Lemah", "Lemah", "Kuat", "Sangat Kuat"];

  return (
    <section className="flex min-h-screen p-6">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-1 md:w-1/2 lg:px-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-1 text-gray-500">
            Silakan isi data untuk membuat akun baru.
          </p>
        </div>

        {errors.root && (
          <div className="mt-4 rounded-md bg-red-50 p-2 text-sm text-red-500">
            {errors?.root?.message}
          </div>
        )}

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Full Name */}
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...field}
                  type="text"
                  placeholder="Full Name"
                  className={`mt-1 w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm focus:bg-white focus:ring-1 focus:outline-none ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  {...field}
                  type="text"
                  placeholder="Username"
                  className={`mt-1 w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm focus:bg-white focus:ring-1 focus:outline-none ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className={`mt-1 w-full rounded-lg border bg-gray-50 px-3 py-3 text-sm focus:bg-white focus:ring-1 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`mt-1 w-full rounded-lg border bg-gray-50 px-3 py-3 pr-10 text-sm focus:bg-white focus:ring-1 focus:outline-none ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 pr-10 text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isPendingRegister}
            className="mt-4 flex items-center justify-center rounded-lg bg-green-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
          >
            {isPendingRegister ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Right Side */}
      <div className="hidden w-1/2 items-center justify-center rounded-3xl bg-green-900 text-white lg:flex">
        <div className="max-w-md text-left">
          <h3 className="mb-4 text-2xl font-semibold">
            Mulai perjalanan eventmu sekarang
          </h3>
          <p className="mb-6 text-sm text-indigo-100">
            Daftar sebagai pengguna untuk membeli tiket atau sebagai EO untuk
            mengelola event dengan mudah.
          </p>

          <Image
            src="/images/general/logo-white-jokindes.png"
            alt="illustration"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;

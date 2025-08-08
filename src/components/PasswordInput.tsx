"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  value: string;
  onChange: (val: string) => void;
  showStrengthBar?: boolean;
};

export default function PasswordInput({
  value,
  onChange,
  showStrengthBar = true,
}: Props) {
  const [show, setShow] = useState(false);

  const getStrength = (password: string) => {
    const forbiddenChars = /[\/\\'"`]/;
    if (forbiddenChars.test(password)) return 1; // ⛔ Jika ada karakter terlarang, skor 0

    let score = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9\s]/.test(password)) score++;
    if (password.length >= 8) score++;
    return score;
  };

  const score = getStrength(value);

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
    <div className="space-y-2">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Kata sandi"
          required
        />
        <button
          type="button"
          className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showStrengthBar && (
        <>
          {/* Strength Bar */}
          <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
            <motion.div
              className={`h-full ${progressColor[score - 1] || "bg-gray-300"}`}
              initial={{ width: 0 }}
              animate={{ width: `${(score / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Strength Label */}
          <p
            className={`text-xs font-medium ${
              score === 0 ? "text-gray-400" : textprogressColor[score - 1]
            }`}
          >
            {strengthLabel[score - 1] || "Sangat Lemah"}
          </p>
        </>
      )}
    </div>
  );
}

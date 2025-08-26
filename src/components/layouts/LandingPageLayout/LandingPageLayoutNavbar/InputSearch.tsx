"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@heroui/react";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      {!isOpen ? (
        // Icon search sebelum input terbuka
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
        >
          <Search className="h-5 w-5 text-gray-700" />
        </button>
      ) : null}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-box"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center overflow-hidden"
          >
            <Input
              type="text"
              placeholder="Search Event"
              onClear={() => {}}
              onChange={() => {}}
              startContent={<Search className="h-4 w-4 text-gray-500" />}
              classNames={{
                input: "text-sm text-gray-700",
                inputWrapper: "shadow-sm border border-gray-200",
              }}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

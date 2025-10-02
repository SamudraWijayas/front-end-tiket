import React, { useState, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { Search as SearchIcon, X, History } from "lucide-react";
import { Input } from "@heroui/react";

interface PropTypes {
  onClose?: () => void;
}

const Search = ({ onClose }: PropTypes) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  // matikan scroll body saat modal muncul
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ambil history dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveHistory = (term: string) => {
    const updated = [term, ...history.filter((q) => q !== term)].slice(0, 5); // max 5
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const deleteHistoryItem = (term: string) => {
    const updated = history.filter((q) => q !== term);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();
      saveHistory(query.trim());
      router.push(`/search/${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  const handleClickHistory = (term: string) => {
    setQuery(term);
    saveHistory(term);
    router.push(`/search/${encodeURIComponent(term)}`);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-full items-start justify-center bg-black/50 backdrop-blur-sm">
      {/* Box search */}
      <div className="relative mt-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header close button */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
          <h1 className="text-lg font-semibold tracking-wide text-gray-800">
            🔍 Pencarian
          </h1>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-red-100 hover:text-red-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input search */}
          <Input
            isClearable
            radius="lg"
            placeholder="Cari event ..."
            startContent={<SearchIcon className="text-gray-400" size={18} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full"
          />

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 flex items-center gap-1 text-sm font-semibold text-gray-600">
              <History size={16} /> Riwayat Pencarian
            </p>
            <div className="flex flex-wrap gap-2">
              {history.map((term, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  <button
                    onClick={() => handleClickHistory(term)}
                    className="hover:underline"
                  >
                    {term}
                  </button>
                  <button
                    onClick={() => deleteHistoryItem(term)}
                    className="ml-1 text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

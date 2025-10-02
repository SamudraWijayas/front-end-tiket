"use client";

import React, { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { IEvent } from "@/types/Event";
import useSearch from "./useSearchh";
interface PropTypes {
  onClose?: () => void;
}

const Search = ({ onClose }: PropTypes) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const {
    handleSearch,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
  } = useSearch();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim() !== "") {
        router.push(`/search/${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="mb-4 text-xl font-semibold">Search</h1>
      <button
        onClick={onClose}
        className="text-sm text-gray-600 hover:text-red-500"
      >
        Close ✖
      </button>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari sesuatu..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div>
        {isLoadingEventsSearch || isRefetchingEventsSearch ? (
          <p className="text-gray-600">Loading...</p>
        ) : dataEventsSearch?.data && dataEventsSearch?.data.length > 0 ? (
          <ul className="space-y-2">
            {dataEventsSearch?.data.map((event: IEvent) => (
              <li
                key={event._id}
                className="rounded-lg border border-gray-200 p-3 shadow-sm"
              >
                <h2 className="font-medium">{event.name}</h2>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Tidak ada hasil ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default Search;

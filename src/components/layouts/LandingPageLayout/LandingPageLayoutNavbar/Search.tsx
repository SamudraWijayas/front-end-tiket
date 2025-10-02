import React, { useEffect } from "react";

interface PropTypes {
  onClose?: () => void;
}

const Search = ({ onClose }: PropTypes) => {
  // matikan scroll body saat komponen muncul
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // balikin lagi
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[30] flex h-screen w-full flex-col bg-white">
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-sm text-gray-600 hover:text-red-500"
        >
          Close ✖
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-gray-700">Search Component</p>
      </div>
    </div>
  );
};

export default Search;

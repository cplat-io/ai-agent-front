"use client";

import { useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  return (
    <div className="flex flex-col w-screen h-[2000px] max-w-[800px] mx-auto pt-[60px] relative">
      <header className="relative sticky top-0 py-[16px] bg-white">
        <textarea
          className="w-full border-2 resize-none pr-[48px]"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></textarea>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2">
          검색
        </button>
      </header>
      <main className="flex flex-grow bg-green-50">{inputText}</main>
      <footer className="bg-blue-50 sticky bottom-0">footer</footer>
    </div>
  );
};

export default Home;

"use client";

import { useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  return (
    <div className="flex flex-col w-screen h-[2000px] max-w-[800px] mx-auto pt-[60px] relative">
      <header className="relative sticky top-0 bg-white border-2">
        <div>
          <textarea
            className="w-full resize-none pr-[48px] border-b-2 border-black"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          ></textarea>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-[10px]">
            {inputText && (
              <button className="" onClick={() => setInputText("")}>
                지우기
              </button>
            )}
            <button className="">검색</button>
          </div>
        </div>
        <div className="flex gap-[10px] items-center">
          <button>파일</button>
          <button>음성</button>
        </div>
      </header>
      <main className="flex flex-grow bg-green-50 flex-col justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </main>
      <footer className="bg-blue-50 sticky bottom-0 border-2 h-[50px]">
        footer
      </footer>
    </div>
  );
};

export default Home;

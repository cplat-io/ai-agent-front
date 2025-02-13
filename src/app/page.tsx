"use client";

import ServerSentEvent from "@/containers/ServerSentEvent";
import SpeechToText from "@/containers/SpeechToText";
import { useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isDragOverInFileArea, setIsDragOverInFileArea] =
    useState<boolean>(false);
  const [dataUrl, setDataUrl] = useState<string>("");

  // 공통 파일 읽기 로직
  const readFile = (file: File) => {
    // MIME 타입이 이미지인 파일만 읽기
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setDataUrl(dataUrl);
    };
    reader.readAsDataURL(file); // Base64 인코딩 방식
  };

  // 파일 업로드
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  // 기존 event를 막아야 onDrop 핸들러가 동작가능
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragOverInFileArea(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (
      event.relatedTarget &&
      !event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      setIsDragOverInFileArea(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      readFile(file);
      setIsDragOverInFileArea(false);
    }
  };

  return (
    <div className="flex flex-col w-screen h-[2000px] max-w-[800px] mx-auto pt-[60px] relative">
      <div
        className={`sticky top-0 bg-white border-2 w-full mx-auto bg-gray-200 border-2 flex flex-col items-center justify-center transition-all ${
          isDragOverInFileArea
            ? "bg-blue-200 border-blue-500 border-dashed"
            : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="relative w-full">
          <textarea
            className={`w-full resize-none pr-[48px] focus:outline-none focus:border-transparent bg-red-100 h-[70px] ${
              isDragOverInFileArea && "pointer-events-none" // textarea가 div drag 이벤트와 충돌하는 것 때문에 drag 중에는 막기
            }`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
        <div className="flex gap-[10px] w-full">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            파일
          </label>
          <div>|</div>
          <SpeechToText setInputText={setInputText} />
        </div>
        {dataUrl && (
          <div className="relative">
            <img
              src={dataUrl}
              alt="upload image"
              className="w-full h-auto object-contain rounded-[20px]"
            />
            <div
              className="absolute top-0 right-0 cursor-pointer bg-green-200"
              onClick={() => {
                setDataUrl("");
              }}
            >
              닫기
            </div>
          </div>
        )}
      </div>

      <main className="flex flex-grow bg-green-50 flex-col justify-between">
        {/* {Array.from({ length: 10 }, (_, i) => i + 1).map((item, index) => (
          <div key={index}>{item}</div>
        ))} */}
        <ServerSentEvent />
      </main>
      <footer className="bg-blue-50 sticky bottom-0 border-2 h-[50px]">
        footer
      </footer>
    </div>
  );
};

export default Home;

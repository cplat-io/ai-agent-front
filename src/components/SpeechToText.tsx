"use client";

import {
  SpeechRecognition,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
} from "@/types/speech";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SpeechToTextProps {
  setInputText: Dispatch<SetStateAction<string>>;
}

const SpeechToText = ({ setInputText }: SpeechToTextProps) => {
  const [isListening, setIsListening] = useState<boolean>(false);

  // 음성 인식 객체 생성
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        setRecognition(new SpeechRecognition());
      } else {
        alert("Web Speech API를 지원하지 않는 브라우저입니다.");
      }
    }
  }, []);

  const startListening = () => {
    if (!recognition) {
      alert("Web Speech API를 지원하지 않는 브라우저입니다.");
      return;
    }

    recognition.lang = "ko-KR"; // 한국어로 설정 (원하는 언어로 변경 가능)
    recognition.interimResults = true; // 실시간 결과를 받을 수 있게 설정
    recognition.maxAlternatives = 1; // 가능한 결과 수

    recognition.onstart = () => {
      setIsListening(true); // 음성 인식 시작
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const lastResult = event.results[event.results.length - 1];
      const spokenText = lastResult[0].transcript;
      setInputText(spokenText); // 음성 인식 결과를 텍스트로 저장
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      alert(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start(); // 음성 인식 시작
  };

  // 음성 인식 종료
  const stopListening = () => {
    if (recognition) {
      recognition.stop(); // 음성 인식 종료
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center gap-[20px]">
      <div>음성 인식 : </div>
      <button
        onClick={() => {
          startListening();
        }}
      >
        {isListening ? "듣는 중..." : "시작"}
      </button>
      {isListening && (
        <button
          onClick={() => {
            stopListening();
          }}
        >
          종료
        </button>
      )}
    </div>
  );
};

export default SpeechToText;

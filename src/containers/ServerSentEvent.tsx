import { useEffect, useState } from "react";

interface Message {
  text: string;
}

const ServerSentEvent = () => {
  const [messageList, setMessageList] = useState<Array<Message>>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  const handleClick = () => {
    const newEventSource = new EventSource("/api/sse");

    newEventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessageList((prev) => [...prev, newMessage]);
    };

    newEventSource.onerror = () => {
      newEventSource.close();
    };

    setEventSource(newEventSource);
  };

  return (
    <div>
      <button onClick={handleClick}>SSE 메시지 스트림 시작</button>
      <div>
        {messageList.map((message, idx) => (
          <span key={idx}>{message.text}</span>
        ))}
      </div>
    </div>
  );
};

export default ServerSentEvent;

// FIXME: 정적 사이트 배포할 때는 서버 사이드 기능 사용 불가

export {};

// export async function GET() {
//   const stream = new ReadableStream({
//     start(controller) {
//       let count = 0;
//       const encoder = new TextEncoder();

//       function sendEvent() {
//         if (count >= 10) {
//           controller.close();
//           return;
//         }

//         const data = `data: ${JSON.stringify({ text: `Event ${count}` })}\n\n`;
//         controller.enqueue(encoder.encode(data));
//         count++;

//         setTimeout(sendEvent, 1000);
//       }

//       sendEvent();
//     },
//   });

//   return new Response(stream, {
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//     },
//   });
// }

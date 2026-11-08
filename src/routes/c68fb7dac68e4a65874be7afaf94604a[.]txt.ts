import { createFileRoute } from "@tanstack/react-router";

// IndexNow key (Bing, Yandex, Seznam, Naver). Search engines fetch this file
// to confirm that update pings for createdbylewis.com really come from the owner.
export const INDEXNOW_KEY = "c68fb7dac68e4a65874be7afaf94604a";

export const Route = createFileRoute("/c68fb7dac68e4a65874be7afaf94604a.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(INDEXNOW_KEY, {
          headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" },
        }),
    },
  },
});

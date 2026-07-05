type FramesMessage = {
  type: "frames";
  payload: { frames: string[] };
};

type BitmapsMessage = {
  type: "bitmaps";
  payload: { items: { frame: string; bitmap: ImageBitmap }[] };
};

let queue = Promise.resolve();

self.addEventListener("message", (event: MessageEvent<FramesMessage>) => {
  if (event.data.type !== "frames") return;

  const { frames } = event.data.payload;

  queue = queue.then(async () => {
    const results = await Promise.all(
      frames.map(async (frame) => {
        try {
          const response = await fetch(frame);
          if (!response.ok) return null;
          const blob = await response.blob();
          const bitmap = await createImageBitmap(blob);
          return { frame, bitmap };
        } catch {
          return null;
        }
      }),
    );

    const items = results.filter(
      (item): item is { frame: string; bitmap: ImageBitmap } => item !== null,
    );

    if (items.length === 0) return;

    const transferables = items.map((item) => item.bitmap);
    const message: BitmapsMessage = { type: "bitmaps", payload: { items } };
    self.postMessage(message, { transfer: transferables });
  });
});

export {};

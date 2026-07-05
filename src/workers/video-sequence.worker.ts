type FramesMessage = {
  type: "frames";
  payload: { frames: string[] };
};

type BlobsMessage = {
  type: "blobs";
  payload: { blobs: { blob: Blob; frame: string }[] };
};

self.addEventListener("message", async (event: MessageEvent<FramesMessage>) => {
  if (event.data.type !== "frames") return;

  const { frames } = event.data.payload;
  const blobs = await Promise.all(
    frames.map(async (frame) => ({
      blob: await (await fetch(frame)).blob(),
      frame,
    })),
  );

  const response: BlobsMessage = { type: "blobs", payload: { blobs } };
  self.postMessage(response);
});

export {};

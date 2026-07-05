export type FitMode = "cover" | "contain" | "fill" | "none" | "scale-down";

export function fitAndPosition(
  container: { width: number; height: number },
  image: { width: number; height: number },
  mode: FitMode = "cover",
  left = "50%",
  top = "50%",
) {
  let fitMode = mode;

  if (
    fitMode === "scale-down" &&
    image.width <= container.width &&
    image.height <= container.height
  ) {
    fitMode = "none";
  }

  let width = image.width;
  let height = image.height;

  if (fitMode === "cover" || fitMode === "contain") {
    const scaleX = container.width / image.width;
    const scaleY = container.height / image.height;
    const scale = fitMode === "cover" ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    width = image.width * scale;
    height = image.height * scale;
  } else if (fitMode === "fill") {
    width = container.width;
    height = container.height;
  }

  const parseOffset = (value: string, containerSize: number, contentSize: number) =>
    value.endsWith("%")
      ? (containerSize - contentSize) * (parseFloat(value) / 100)
      : parseFloat(value);

  const x = parseOffset(left, container.width, width);
  const y = parseOffset(top, container.height, height);

  return { x, y, width, height };
}

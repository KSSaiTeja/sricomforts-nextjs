type TextRevealCharProps = {
  text: string;
  progress: number;
  className?: string;
};

export function TextRevealChar({ text, progress, className }: TextRevealCharProps) {
  const characters = [...text];

  return (
    <p
      className={["text-reveal-char__wrapper", className].filter(Boolean).join(" ")}
      aria-label={text}
    >
      {characters.map((character, index) => (
        <span
          key={`${text}-${index}`}
          className={[
            "text-reveal-char",
            progress > index / characters.length ? "show" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        >
          {character}
        </span>
      ))}
    </p>
  );
}

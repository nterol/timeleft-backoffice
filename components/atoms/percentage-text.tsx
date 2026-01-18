export function PercentageText({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = current ? Math.round((current / total) * 100) : 0;

  const percentClamped = Math.max(0, Math.min(percent, 100));

  const colorPair =
    percentClamped <= 50 ? ["green", "orange"] : ["orange", "red"];

  return (
    <span
      className="bg-clip-text font-semibold text-transparent"
      style={{
        background: `linear-gradient(90deg, ${colorPair[0]}, ${colorPair[1]})`,
        WebkitBackgroundClip: "text",
      }}
    >
      {percent}% booked
    </span>
  );
}

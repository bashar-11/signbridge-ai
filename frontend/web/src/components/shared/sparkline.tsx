interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkline({ data, width = 96, height = 32, className }: SparklineProps) {
  if (data.length < 2) {
    return <div className={className} style={{ width, height }} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent-live))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--accent-live))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#spark-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--accent-live))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

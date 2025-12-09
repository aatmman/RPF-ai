interface SparklineProps {
  points: string;
  color?: "primary" | "secondary";
}

const Sparkline = ({ points, color = "primary" }: SparklineProps) => {
  const strokeColor = color === "primary" ? "hsl(var(--primary-500))" : "hsl(var(--secondary-600))";
  
  return (
    <svg className="w-full h-10" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
      <polyline
        fill="none"
        points={points}
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;






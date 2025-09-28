import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts";

export default function ChartPanel({ data, selectedId, setSelectedId }) {
  const [minMag, setMinMag] = useState(3);
  const [focusMode, setFocusMode] = useState(false);

  const numericFields = ["mag", "depth", "latitude", "longitude"];
  const [xKey, setXKey] = useState("mag");
  const [yKey, setYKey] = useState("depth");

  const filtered = data.filter((d) => d.mag >= minMag);

  const selectedPoint = data.find((d) => d.id === selectedId);

  const chartData = focusMode
    ? selectedPoint
      ? [selectedPoint]
      : []
    : filtered;

  // Sort chartData by X, then by Y (so points appear ordered)
  const sortedChartData = [...chartData].sort((a, b) => {
    if (a[xKey] !== b[xKey]) return a[xKey] - b[xKey];
    return a[yKey] - b[yKey];
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold mb-2">Earthquake Chart</h2>

      <div className="flex flex-wrap gap-4 mb-2 items-center">
        <label>
          Min Magnitude:{" "}
          <select
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
            disabled={focusMode}
          >
            <option value={0}>All</option>
            <option value={2}>≥ 2</option>
            <option value={3}>≥ 3</option>
            <option value={4}>≥ 4</option>
            <option value={5}>≥ 5</option>
          </select>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={focusMode}
            onChange={() => setFocusMode(!focusMode)}
          />
          Focus Mode
        </label>

        <label>
          X-Axis:{" "}
          <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
            {numericFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </label>
        <label>
          Y-Axis:{" "}
          <select value={yKey} onChange={(e) => setYKey(e.target.value)}>
            {numericFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ScatterChart
        width={500}
        height={500}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis dataKey={xKey} name={xKey} />
        <YAxis dataKey={yKey} name={yKey} />
        <ZAxis dataKey="id" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />

        <Scatter
          data={sortedChartData}
          shape={(props) => {
            const { cx, cy, payload } = props;
            const isSelected = payload.id === selectedId;
            return (
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 8 : 3}
                fill={isSelected ? "red" : "blue"}
                onClick={() => setSelectedId && setSelectedId(payload.id)}
              />
            );
          }}
        />

        {!focusMode && selectedPoint && !filtered.includes(selectedPoint) && (
          <Scatter
            data={[selectedPoint]}
            shape={(props) => {
              const { cx, cy } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={8}
                  fill="red"
                  stroke="black"
                  strokeWidth={2}
                />
              );
            }}
          />
        )}
      </ScatterChart>
    </div>
  );
}

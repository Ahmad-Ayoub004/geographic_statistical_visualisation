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

export default function chartPanel({ data, selectedId, setSelectedId }) {
  const [minMag, setMinMag] = useState(3);
  const [focusMode, setFocusMode] = useState(false);

  const filtered = data.filter((d) => d.mag >= minMag);

  const selectedPoint = data.find((d) => d.id === selectedId);

  const chartData = focusMode
    ? selectedPoint
      ? [selectedPoint]
      : []
    : filtered;

  const xKey = "mag";
  const yKey = "depth";

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold mb-2">Earthquake Chart</h2>

      <div className="flex gap-4 mb-2">
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

        <label>
          <input
            type="checkbox"
            checked={focusMode}
            onChange={() => setFocusMode(!focusMode)}
          />
          Focus Mode
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
          data={chartData}
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

        {/*if not in chartData, still render selected point */}
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

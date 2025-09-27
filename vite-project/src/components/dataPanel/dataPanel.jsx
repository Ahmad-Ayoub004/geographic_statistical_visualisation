import { useEffect, useRef, useState } from "react";

export default function DataTable({
  data,
  headers,
  selectedId,
  setSelectedId,
}) {
  const rowRefs = useRef({});
  const [activeCols, setActiveCols] = useState([
    "time",
    "place",
    "mag",
    "depth",
  ]);

  useEffect(() => {
    if (selectedId && rowRefs.current[selectedId]) {
      rowRefs.current[selectedId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  const toggleColumn = (col) => {
    setActiveCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="flex flex-col h-[500px] border rounded">
      <h2 className="font-semibold p-2 border-b">Earthquake Data</h2>

      <div className="flex flex-wrap gap-2 p-2 border-b text-sm">
        {headers.map((h) => (
          <label key={h} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={activeCols.includes(h)}
              onChange={() => toggleColumn(h)}
            />
            {h}
          </label>
        ))}
      </div>

      <div className="flex-1 overflow-y-scroll">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {activeCols.map((h) => (
                <th key={h} className="px-2 py-1 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                ref={(el) => (rowRefs.current[row.id] = el)}
                onClick={() => setSelectedId && setSelectedId(row.id)}
                className={`cursor-pointer ${
                  selectedId === row.id ? "bg-yellow-200" : ""
                }`}
              >
                {activeCols.map((h) => (
                  <td key={h} className="px-2 py-1 border-b">
                    {row[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

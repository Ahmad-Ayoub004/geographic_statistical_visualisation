import { useState } from "react";
import ChartPanel from "../components/chartPanel/ChartPanel";
import DataPanel from "../components/dataPanel/DataPanel";

export default function PropsDemo({ data, headers }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      {/* Chart Panel for visualizing earthquakes (Scatterplot) */}
      <ChartPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {/* Data Panel for viewing info (Table) */}
      <DataPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
}

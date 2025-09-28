import { useState } from "react";
import chartPanel from "../components/chartPanel/chartPanel";
import dataPanel from "../components/dataPanel/dataPanel";

export default function PropsDemo({ data, headers }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      {/* Chart Panel for visualizing earthquakes (Scatterplot) */}
      <chartPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {/* Data Panel for viewing info (Table) */}
      <dataPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
}

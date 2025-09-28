import ChartPanel from "../components/chartPanel/ChartPanel";
import DataPanel from "../components/dataPanel/DataPanel";
import { SelectionProvider, useSelection } from "../context/selectContext";

function ContextWrapper({ data, headers }) {
  const { selectedId, setSelectedId } = useSelection();

  return (
    <>
      <ChartPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <DataPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
}

export default function ContextDemo({ data, headers }) {
  return (
    <SelectionProvider>
      <ContextWrapper data={data} headers={headers} />
    </SelectionProvider>
  );
}

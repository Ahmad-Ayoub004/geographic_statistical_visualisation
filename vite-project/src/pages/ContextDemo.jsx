import chartPanel from "../components/chartPanel/chartPanel";
import dataPanel from "../components/dataPanel/dataPanel";
import { SelectionProvider, useSelection } from "../context/selectContext";

function ContextWrapper({ data, headers }) {
  const { selectedId, setSelectedId } = useSelection();

  return (
    <>
      <chartPanel
        data={data}
        headers={headers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <dataPanel
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

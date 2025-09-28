import ChartPanel from "../components/chartPanel/ChartPanel";
import DataPanel from "../components/dataPanel/DataPanel";
import { useSelectStore } from "../store/useSelectStore";

export default function ZustandDemo({ data, headers }) {
  const selectedId = useSelectStore((state) => state.selectedId);
  const setSelectedId = useSelectStore((state) => state.setSelectedId);

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

import chartPanel from "../components/chartPanel/chartPanel";
import dataPanel from "../components/dataPanel/dataPanel";
import { useSelectStore } from "../store/useSelectStore";

export default function ZustandDemo({ data, headers }) {
  const selectedId = useSelectStore((state) => state.selectedId);
  const setSelectedId = useSelectStore((state) => state.setSelectedId);

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

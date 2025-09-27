import { useState } from "react";
import { useGeoData } from "./hooks/useGeoData";

import PropsDemo from "./pages/PropsDemo";
import ContextDemo from "./pages/ContextDemo";
import ZustandDemo from "./pages/ZustandDemo";

export default function App() {
  const { data, headers, isLoading, error } = useGeoData();
  const [mode, setMode] = useState("props");

  if (isLoading) return <p className="p-4">Loading data...</p>;

  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex gap-4 justify-center bg-gray-100">
        <button
          onClick={() => setMode("props")}
          className={`px-3 py-1 rounded ${
            mode === "props" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Props
        </button>

        <button
          onClick={() => setMode("context")}
          className={`px-3 py-1 rounded ${
            mode === "context" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Context
        </button>

        <button
          onClick={() => setMode("zustand")}
          className={`px-3 py-1 rounded ${
            mode === "zustand" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Zustand
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {mode === "props" && <PropsDemo data={data} headers={headers} />}
        {mode === "context" && <ContextDemo data={data} headers={headers} />}
        {mode === "zustand" && <ZustandDemo data={data} headers={headers} />}
      </div>
    </div>
  );
}

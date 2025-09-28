import { createContext, useContext, useState } from "react";

const selectContext = createContext();

export function SelectionProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <selectContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </selectContext.Provider>
  );
}

export function useSelection() {
  return useContext(selectContext);
}

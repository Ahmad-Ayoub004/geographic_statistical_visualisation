import { create } from "zustand";

export const useSelectStore = create((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));

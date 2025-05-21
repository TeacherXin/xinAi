import { create } from 'zustand';

interface ModelStore {
  model: string
  setModel: (model: string) => void
}

export const useModelStore = create<ModelStore>((set) => ({
  model: 'gpt-3.5-turbo',
  setModel: (model: string) => set({ model }),
}));

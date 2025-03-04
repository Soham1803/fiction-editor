import { create } from 'zustand';

type State = {
  rightOpen: boolean;
  toggleRight: () => void;
};

const useStore = create<State>((set) => ({
    rightOpen: true,
    toggleRight: () => set((state) => ({ rightOpen: !state.rightOpen })),
}));

export default useStore;
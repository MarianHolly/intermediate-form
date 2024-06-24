import create from "zustand";

type State = { username: string };
type Actions = { updateUser: (newName: string) => void };

export const useZustand = create<State & Actions>((set) => ({
  username: "",
  updateUser: (newName: string) => set({ username: newName }),
}));

import create from "zustand";

type State = { username: string; bio: string };

type Actions = { updateUser: (newName: string) => void; updateBio: (newBio: string) => void };

export const useZustand = create<State & Actions>((set) => ({
  username: "",
  bio: "",
  updateUser: (newName: string) => set({ username: newName }),
  updateBio: (newBio: string) => set({ bio: newBio }),
}));

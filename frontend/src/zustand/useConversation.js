import { create } from "zustand";

const useConversation = create((set) => ({
    socketConnection: null,
    setSocketConnection: (socketConnection) => set({ socketConnection }),

}));

export default useConversation;
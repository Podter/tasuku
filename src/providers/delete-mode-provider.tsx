import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface DeleteModeContextType {
  deleteMode: boolean;
  setDeleteMode: Dispatch<SetStateAction<boolean>>;
}

const DeleteModeContext = createContext<DeleteModeContextType | null>(null);

export function useDeleteMode() {
  const context = useContext(DeleteModeContext);
  if (!context) {
    throw new Error("useDeleteMode must be used within a DeleteModeProvider");
  }
  return context;
}

export function DeleteModeProvider({ children }: PropsWithChildren) {
  const [deleteMode, setDeleteMode] = useState(false);
  return (
    <DeleteModeContext.Provider value={{ deleteMode, setDeleteMode }}>
      {children}
    </DeleteModeContext.Provider>
  );
}

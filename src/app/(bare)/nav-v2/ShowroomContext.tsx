"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ShowroomContextType = {
  showroom: boolean;
  setShowroom: (v: boolean) => void;
};

const ShowroomContext = createContext<ShowroomContextType>({
  showroom: false,
  setShowroom: () => {},
});

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const [showroom, setShowroom] = useState(false);
  return (
    <ShowroomContext.Provider value={{ showroom, setShowroom }}>
      {children}
    </ShowroomContext.Provider>
  );
}

export function useShowroom() {
  return useContext(ShowroomContext);
}

import { FC, ReactElement, createContext, useState } from "react";

type GlobalStoreType = {
  title: string;
  setTitle: (str: string) => void;
};

export const GlobalContext = createContext({} as GlobalStoreType);

export const GlobalStore: FC<{ children: ReactElement }> = ({ children }) => {
  const [title, setTitle] = useState("react-electron-template");

  return (
    <GlobalContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

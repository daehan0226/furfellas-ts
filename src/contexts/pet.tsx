import React, { createContext, useEffect, useContext, useState } from "react";
import { MainApi } from "../ApiService";
import { Pet } from "../models"

interface AppContextInterface {
  data: Pet[],
  refresh: () => void
}

const PetContext = createContext<AppContextInterface | null>(null);

export const PetContextProvider: React.FC = (props) => {
  const [data, setData] = useState<Pet[]>([]);

  const refresh = async () => {
    const api = new MainApi()
    const petData = await api.getPets()
    setData([...petData.data.result])
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <PetContext.Provider value={{ data, refresh }}>
      {props.children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  return useContext(PetContext);
};

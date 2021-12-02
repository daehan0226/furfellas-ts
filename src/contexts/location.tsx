import React, { createContext, useEffect, useContext, useState } from "react";
import { MainApi } from "../ApiService";
import { Location } from "../models"

interface AppContextInterface {
  data: Location[],
  refresh: () => void
}

const LocationContext = createContext<AppContextInterface | null>(null);

export const LocationContextProvider: React.FC = (props) => {
  const [data, setData] = useState<Location[]>([]);

  const refresh = async () => {
    const api = new MainApi()
    const locationData = await api.getLocations()
    setData([...locationData.result])
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <LocationContext.Provider value={{ data, refresh }}>
      {props.children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};

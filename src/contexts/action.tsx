import React, { createContext, useEffect, useContext, useState } from "react";
import { MainApi } from "../ApiService";
import { Action } from "../models"

interface AppContextInterface {
  data: Action[],
  refresh: () => void
}

const ActionContext = createContext<AppContextInterface | null>(null);

export const ActionContextProvider: React.FC = (props) => {
  const [data, setData] = useState<Action[]>([]);

  const refresh = async () => {
    const api = new MainApi()
    const actionData = await api.getActions()
    setData([...actionData.result])
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ActionContext.Provider value={{ data, refresh }}>
      {props.children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  return useContext(ActionContext);
};

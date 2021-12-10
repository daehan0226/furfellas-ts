import React, { createContext, useEffect, useContext, Dispatch, useReducer, } from "react";
import { MainApi } from "../ApiService";
import { Location as ILocation } from "../models"


type State = {
  items: ILocation[]
}

type Location =
  | { type: 'SET'; payload: { items: ILocation[] } }
  | { type: 'ADD'; payload: { id: number, name: string } }
  | { type: 'UPDATE'; payload: { id: number, name: string } }
  | { type: 'DELETE'; payload: { id: number } };

type LocationDispatch = Dispatch<Location>;

const LocationStateContext = createContext<State>({ items: [] });
const LocationDispatchContext = createContext<LocationDispatch>(() => null);

function reducer(state: State, action: Location): State {
  switch (action.type) {
    case 'SET':
      return { items: [...state.items, ...action.payload.items] }
    case 'ADD':
      return {
        items: [action.payload, ...state.items,]
      };
    case 'UPDATE':
      return {
        items: [...state.items.map(item => {
          if (item.id !== action.payload.id) {
            return item
          } else {
            return action.payload
          }
        })]
      };
    case 'DELETE':
      return { items: [...state.items.filter(item => item.id !== action.payload.id)] };
    default:
      throw new Error('Unhandled action');
  }
}


export function LocationContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const refresh = async () => {
    const api = MainApi.getInstance()
    const locationData = await api.getLocations()
    dispatch({ type: 'SET', payload: { items: locationData.data.result } })
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <LocationStateContext.Provider value={state}>
      <LocationDispatchContext.Provider value={dispatch}>
        {children}
      </LocationDispatchContext.Provider>
    </LocationStateContext.Provider>
  );
}

export function useLocationState(): State {
  const state = useContext(LocationStateContext);
  if (!state) throw new Error('Cannot find locationProvider');
  return state;
}

export function useLocationDispatch(): LocationDispatch {
  const dispatch = useContext(LocationDispatchContext);
  if (!dispatch) throw new Error('Cannot find actionProvider');
  return dispatch;
}
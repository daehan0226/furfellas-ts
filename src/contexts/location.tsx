
import React, { useReducer, useContext, createContext, Dispatch, useEffect } from 'react';
import { MainApi } from "../ApiService";
import { Location } from "../models"


type State = Location[]

type Action =
  | { type: 'SET'; payload: { items: Location[] } }
  | { type: 'ADD'; payload: { name: string } }
  | { type: 'UPDATE'; payload: { id: number, name: string } }
  | { type: 'DELETE'; payload: { id: number } };

type LocationDispatch = Dispatch<Action>;

const LocationStateContext = createContext<State>([]);
const LocationDispatchContext = createContext<LocationDispatch>(() => null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':
      return [...action.payload.items]
    case 'ADD':
      return {
        ...state
      };
    case 'UPDATE':
      return {
        ...state
      };
    case 'DELETE':
      return [...state.filter(item => item.id !== action.payload.id)];
    default:
      throw new Error('Unhandled action');
  }
}

export function LocationContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []);

  const refresh = async () => {
    const api = new MainApi()
    const locationData = await api.getLocations()
    dispatch({ type: 'SET', payload: { items: locationData.result } })
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

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useLocationState(): State {
  const state = useContext(LocationStateContext);
  if (!state) throw new Error('Cannot find locationProvider');
  return state;
}

export function useLocationDispatch(): LocationDispatch {
  const dispatch = useContext(LocationDispatchContext);
  if (!dispatch) throw new Error('Cannot find locationProvider');
  return dispatch;
}
// https://react.vlpt.us/using-typescript/04-ts-context.html
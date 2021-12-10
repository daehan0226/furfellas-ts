
import React, { createContext, useEffect, useContext, Dispatch, useReducer } from "react";
import { MainApi } from "../ApiService";
import { Pet as IPet } from "../models"

type State = {
  items: IPet[]
}

type Pet =
  | { type: 'SET'; payload: { items: IPet[] } }
  | { type: 'ADD'; payload: IPet }
  | { type: 'UPDATE'; payload: IPet }
  | { type: 'DELETE'; payload: { id: number } };

type PetDispatch = Dispatch<Pet>;

const PetStateContext = createContext<State>({ items: [] });
const PetDispatchContext = createContext<PetDispatch>(() => null);

function reducer(state: State, action: Pet): State {
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


export function PetContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const refresh = async () => {
    const api = MainApi.getInstance()
    const petData = await api.getPets()
    dispatch({ type: 'SET', payload: { items: petData.data.result } })
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <PetStateContext.Provider value={state}>
      <PetDispatchContext.Provider value={dispatch}>
        {children}
      </PetDispatchContext.Provider>
    </PetStateContext.Provider>
  );
}

export function usePetState(): State {
  const state = useContext(PetStateContext);
  if (!state) throw new Error('Cannot find Pet Provider');
  return state;
}

export function usePetDispatch(): PetDispatch {
  const dispatch = useContext(PetDispatchContext);
  if (!dispatch) throw new Error('Cannot find actionProvider');
  return dispatch;
}
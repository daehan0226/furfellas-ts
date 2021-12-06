import React, { createContext, useEffect, useContext, Dispatch, useReducer, } from "react";
import { MainApi } from "../ApiService";
import { Action as IAction } from "../models"


type State = {
  items: IAction[]
}

type Action =
  | { type: 'SET'; payload: { items: IAction[] } }
  | { type: 'ADD'; payload: { id: number, name: string } }
  | { type: 'UPDATE'; payload: { id: number, name: string } }
  | { type: 'DELETE'; payload: { id: number } };

type ActionDispatch = Dispatch<Action>;

const ActionStateContext = createContext<State>({ items: [] });
const ActionDispatchContext = createContext<ActionDispatch>(() => null);

function reducer(state: State, action: Action): State {
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


export function ActionContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const refresh = async () => {
    const api = MainApi.getInstance()
    const actionData = await api.getActions()
    dispatch({ type: 'SET', payload: { items: actionData.data.result } })
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ActionStateContext.Provider value={state}>
      <ActionDispatchContext.Provider value={dispatch}>
        {children}
      </ActionDispatchContext.Provider>
    </ActionStateContext.Provider>
  );
}

export function useActionState(): State {
  const state = useContext(ActionStateContext);
  if (!state) throw new Error('Cannot find actionProvider');
  return state;
}

export function useActionDispatch(): ActionDispatch {
  const dispatch = useContext(ActionDispatchContext);
  if (!dispatch) throw new Error('Cannot find actionProvider');
  return dispatch;
}
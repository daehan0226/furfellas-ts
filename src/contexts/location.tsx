
import React, { useReducer, useContext, createContext, Dispatch, useEffect } from 'react';
import { MainApi } from "../ApiService";
import { Location } from "../models"


type State = {
  items: Location[]
}

type Action =
  | { type: 'SET'; payload: { items: Location[] } }
  | { type: 'ADD'; payload: { id: number, name: string } }
  | { type: 'UPDATE'; payload: { id: number, name: string } }
  | { type: 'DELETE'; payload: { id: number } };

type LocationDispatch = Dispatch<Action>;

const LocationStateContext = createContext<State>({ items: [] });
const LocationDispatchContext = createContext<LocationDispatch>(() => null);

// 리듀서 액션 함수들 따로 만들기?
// api call status에 따라 타입 결정
// 더 좋은 방법 있는지 찾아보기
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':
      return { items: [...state.items, ...action.payload.items] }
    case 'ADD':
      return {
        items: [...state.items, action.payload]
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
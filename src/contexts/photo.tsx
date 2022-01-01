
import React, { createContext, useEffect, useContext, Dispatch, useReducer } from "react";
import { MainApi } from "../ApiService";
import { Photo as IPhoto } from "../models"

type State = {
  items: IPhoto[]
}

type Photo =
  | { type: 'SET'; payload: { items: IPhoto[] } }
  | { type: 'ADD'; payload: IPhoto }
  | { type: 'UPDATE'; payload: IPhoto }
  | { type: 'DELETE'; payload: { id: number } };

type PhotoDispatch = Dispatch<Photo>;

const PhotoStateContext = createContext<State>({ items: [] });
const PhotoDispatchContext = createContext<PhotoDispatch>(() => null);

function reducer(state: State, action: Photo): State {
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


export function PhotoContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const refresh = async () => {
    const api = MainApi.getInstance()
    const photoData = await api.getPhotos('')
    dispatch({ type: 'SET', payload: { items: photoData.data.result } })
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <PhotoStateContext.Provider value={state}>
      <PhotoDispatchContext.Provider value={dispatch}>
        {children}
      </PhotoDispatchContext.Provider>
    </PhotoStateContext.Provider>
  );
}

export function usePhotoState(): State {
  const state = useContext(PhotoStateContext);
  if (!state) throw new Error('Cannot find Photo Provider');
  return state;
}

export function usePhotoDispatch(): PhotoDispatch {
  const dispatch = useContext(PhotoDispatchContext);
  if (!dispatch) throw new Error('Cannot find actionProvider');
  return dispatch;
}
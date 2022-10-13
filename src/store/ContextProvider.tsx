import React, { Reducer, useReducer } from "react";
import {
  Action,
  registrationFormReducer,
} from "./reducers/registrationFormReducer";

interface AppContextInterface {
  state: any;
  action: any;
}

interface Props {
  children: React.ReactNode;
}

export interface InitialState {
  registration: any;
}
export const AppContext = React.createContext<AppContextInterface | null>(null);

const initialState = {
  registration: {},
};

const mainReducers: Reducer<InitialState, Action> = (reducer, action) => ({
  registration: registrationFormReducer(reducer, action),
});

const ContextProvider = ({ children }: Props) => {
  const [state, action] = useReducer(mainReducers, initialState);
  return (
    <AppContext.Provider value={{ state, action }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

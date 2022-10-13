import { InitialState } from "../ContextProvider";
export interface Action {
  type: string;
  payload: any;
}

export const TYPE = {
  add: "ADD_FORM",
};

export const registrationFormReducer = (
  state: InitialState,
  action: Action
) => {
  switch (action.type) {
    case TYPE.add:
      console.log(state, action.payload);

      return { ...state.registration, ...action.payload };
    default:
      return {};
  }
};

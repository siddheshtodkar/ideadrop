import { createReducer, on } from "@ngrx/store";
import { AuthObject } from "../types";
import { authObjectAction } from "./actions";

const initialState: AuthObject = {
  user: null,
  accessToken: null
}

export const authObjectReducer = createReducer(
  initialState,
  on(authObjectAction, (state, action) => action)
)
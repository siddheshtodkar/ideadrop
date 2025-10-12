import { createSelector } from "@ngrx/store";
import { AppState } from "../state";

const state = (appState: AppState) => appState.authObject

export const accessTokenSelector = createSelector(state, state => state.accessToken)
export const userSelector = createSelector(state, state => state.user)
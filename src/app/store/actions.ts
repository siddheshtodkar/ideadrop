import { createAction, props } from "@ngrx/store";
import { AuthObject } from "../../types";

export const authObjectAction = createAction('[Auth Page] save auth', props<AuthObject>())
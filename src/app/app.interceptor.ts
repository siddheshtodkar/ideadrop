import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, switchMap } from "rxjs";
import { accessTokenSelector, userSelector } from "./store/selectors";
import { AuthService } from "./services/auth.service";
import { authObjectAction } from "./store/actions";

export function accessTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const store = inject(Store)
  return store.select(accessTokenSelector).pipe(
    switchMap(token => {
      if (token && ['POST', 'PUT', 'DELETE'].includes(req.method))
        return next(req.clone({ headers: req.headers.append('Authorization', `Bearer ${token}`) }))
      else
        return next(req)
    }))
}

export function refreshTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService)
  const store = inject(Store)
  return next(req).pipe(switchMap(event => {
    if (event.type === HttpEventType.Response && event.status === 401 && !req.url.includes('/auth/refresh'))
      authService.refresh().pipe(switchMap(token => {
        store.select(userSelector).pipe(switchMap(user => {
          store.dispatch(authObjectAction({ user: user, accessToken: token.accessToken }))
          return next(req)
        }))
        return next(req)
      }))
    return next(req)
  }));
}
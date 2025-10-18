import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Store } from "@ngrx/store";
import { accessTokenSelector } from "./store/selectors";
import { authObjectAction } from "./store/actions";

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const store = inject(Store)

  if (req.url.includes('/auth/refresh'))
    return next(req)

  return store.select(accessTokenSelector).pipe(
    take(1),
    switchMap((token) => {
      const clonedReq = token ? addToken(req, token) : req;
      return next(clonedReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return handle401Error(req, next, authService, store);
          }
          return throwError(() => error);
        })
      );
    })
  );
};

// Helper: Add Authorization header
function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
}

// Handle token refresh and retry logic
function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, store: Store): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refresh().pipe(
      switchMap(response => {
        isRefreshing = false;
        const newToken = response.accessToken;
        store.dispatch(authObjectAction(response))
        refreshTokenSubject.next(newToken);
        return next(addToken(request, newToken!));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout(); // optional
        return EMPTY
      })
    );
  } else {
    // Wait for new token to be broadcasted
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addToken(request, token!)))
    );
  }
}

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true }));
};
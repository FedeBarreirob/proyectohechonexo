import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services/security/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {

            if (err.status === 401) {

                let tokenOk: boolean;

                let response = this.authenticationService.renovarToken();
                response.then((renovacionOk: boolean) => {
                    if (renovacionOk == true) {
                        this.authenticationService.loginCompleto();
                        tokenOk = true;
                    } else {
                        tokenOk = false;
                    }
                });

                if (tokenOk == true) {
                    return next.handle(request);
                } else {
                    this.authenticationService.logout();
                    location.reload(true);
                }
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

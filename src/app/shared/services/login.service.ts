import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ServiceGeneric } from './generic.service';
import { Observable } from 'rxjs';
import { GoogleLoginModel, LoginResponseModel } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ServiceGeneric<LoginResponseModel> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/User";

  constructor(public override injector: Injector) {
    super(injector);
  }

  doLogin(googleLogin: GoogleLoginModel): Observable<LoginResponseModel>{
    console.log("=== LOGIN SERVICE ===");
    console.log("URL:", this.urlServiceREST + "/Login");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<LoginResponseModel>(
      this.urlServiceREST + "/Login",
      googleLogin,
      { headers }
    );
  }
}

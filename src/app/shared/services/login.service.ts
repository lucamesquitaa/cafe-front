import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ServiceGeneric } from './generic.service';
import { Observable } from 'rxjs';
import { LoginResponseModel, ResultLoginModel } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ServiceGeneric<LoginResponseModel> {
  override urlServiceREST: string = environment.apiBaseUrl + "/api/User";

  constructor(public override injector: Injector) {
    super(injector);
  }

  doLogin(user: ResultLoginModel): Observable<LoginResponseModel>{
    console.log("=== LOGIN SERVICE ===");
    console.log("User object:", user);
    console.log("User JSON:", JSON.stringify(user, null, 2));
    console.log("URL:", this.urlServiceREST + "/Login");
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    return this.http.post<LoginResponseModel>(
      this.urlServiceREST + "/Login",
      user,
      { headers }
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ServiceGeneric } from './generic.service';
import { Observable } from 'rxjs';
import { LoginModel, LoginResponseModel, ResultLoginModel } from '../models/login.model';
import { ManagersModel } from '../models/managers.model';
import { ResponseApi } from '../models/response.api';
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



  updateManager(email: string, hotelId: string | null): Observable<ResponseApi> {
    if(hotelId === null) {
      throw new Error("hotelId não pode ser nulo");
    }

    const url = this.urlServiceREST + '/UpdateManager';
    const body = { email, hotelId };
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
  
    return this.http.post<ResponseApi>(url, body, { headers });
  }

  removeManager(email: string, hotelId: string | null): Observable<ResponseApi> {
    if(hotelId === null) {
      throw new Error("hotelId não pode ser nulo");
    }

    const url = this.urlServiceREST + '/RemovePermissionUsers';
    const body = { email, hotelId };
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
  
    return this.http.delete<ResponseApi>(url, { headers, body });
  }

   GetAllPermissionUsers(hotelId: string): Observable<ResponseApi<ManagersModel[]>> {
    return this.http.post<ResponseApi<ManagersModel[]>>(this.urlServiceREST + "/GetAllPermissionUsers", {hotelId});
  }
}

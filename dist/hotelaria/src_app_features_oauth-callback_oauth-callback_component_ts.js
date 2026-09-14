"use strict";
(self["webpackChunkhotelaria"] = self["webpackChunkhotelaria"] || []).push([["src_app_features_oauth-callback_oauth-callback_component_ts"],{

/***/ 6754
/*!*********************************************************************!*\
  !*** ./src/app/features/oauth-callback/oauth-callback.component.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OAuthCallbackComponent: () => (/* binding */ OAuthCallbackComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var src_app_shared_services_oauth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/services/oauth.service */ 2941);
/* harmony import */ var src_app_shared_services_login_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/services/login.service */ 1367);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ 9213);







function OAuthCallbackComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3)(1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Processando login...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function OAuthCallbackComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function OAuthCallbackComponent_div_2_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.redirectToLogin());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Voltar ao Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.errorMessage);
  }
}
// Cliente JWT decoder para decodificar o token do Google
function parseJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}
class OAuthCallbackComponent {
  constructor(authService, loginService, router, route, cookieService) {
    this.authService = authService;
    this.loginService = loginService;
    this.router = router;
    this.route = route;
    this.cookieService = cookieService;
    this.isProcessing = true;
    this.errorMessage = '';
  }
  ngOnInit() {
    console.log('=== GIS CALLBACK COMPONENT LOADED ===');
    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('Hash:', window.location.hash);
    this.processGoogleCallback();
  }
  processGoogleCallback() {
    console.log('=== GIS CALLBACK ===');
    // Obtém o credential dos query params (enviado pelo AuthService)
    const credential = this.route.snapshot.queryParams['credential'];
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cafeterias';
    if (!credential) {
      console.log('No credential found in URL params');
      this.errorMessage = 'Token de autenticação não encontrado.';
      this.isProcessing = false;
      return;
    }
    try {
      // Decodifica o JWT token do Google
      const userInfo = parseJWT(credential);
      if (!userInfo) {
        throw new Error('Failed to decode Google credential');
      }
      console.log('✓ Google credential decoded:', userInfo);
      // Armazena as informações do usuário no AuthService
      this.authService.setUserInfo(userInfo);
      // Chama o doLogin
      this.callDoLogin(userInfo, returnUrl);
    } catch (error) {
      console.error('✗ Error processing Google credential:', error);
      this.errorMessage = 'Erro ao processar credenciais do Google. Tente novamente.';
      this.isProcessing = false;
    }
  }
  callDoLogin(userInfo, returnUrl) {
    console.log('=== CALLING DO LOGIN ===');
    try {
      if (!userInfo.email || !userInfo.name) {
        throw new Error('Dados do usuário do Google incompletos');
      }
      // Mapeia para o formato esperado pelo doLogin
      const nameParts = userInfo.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const loginData = {
        Id: userInfo.sub,
        // Google user ID
        Email: userInfo.email,
        FirstName: firstName,
        LastName: lastName,
        Photo: userInfo.picture || ''
      };
      console.log('Calling doLogin with data:', loginData);
      // Chama o doLogin do backend
      this.loginService.doLogin(loginData).subscribe({
        next: response => {
          console.log('✓ DoLogin successful:', response);
          // Armazena o token do backend se fornecido
          if (response.token) {
            this.cookieService.set('access_token', response.token, {
              expires: 7,
              // 7 dias
              path: '/',
              secure: window.location.protocol === 'https:'
            });
            console.log('✓ Backend token stored');
          }
          // Armazena informações do usuário nos cookies
          const cookieOptions = {
            expires: 7,
            path: '/',
            secure: window.location.protocol === 'https:'
          };
          this.cookieService.set('user_first_name', loginData.FirstName, cookieOptions);
          this.cookieService.set('user_last_name', loginData.LastName, cookieOptions);
          this.cookieService.set('user_email', loginData.Email, cookieOptions);
          this.cookieService.set('user_photo', loginData.Photo, cookieOptions);
          console.log('✓ User info stored in cookies');
          // Redireciona para a URL apropriada
          console.log(`✓ Redirecting to: ${returnUrl}`);
          this.isProcessing = false;
          this.router.navigate([returnUrl]);
        },
        error: error => {
          console.error('✗ DoLogin failed:', error);
          this.errorMessage = 'Erro ao processar login no servidor. Tente novamente.';
          this.isProcessing = false;
        }
      });
    } catch (error) {
      console.error('✗ Error processing user data:', error);
      this.errorMessage = 'Erro ao obter dados do usuário. Tente novamente.';
      this.isProcessing = false;
    }
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  static {
    this.ɵfac = function OAuthCallbackComponent_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || OAuthCallbackComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_oauth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_login_service__WEBPACK_IMPORTED_MODULE_4__.LoginService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__.CookieService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: OAuthCallbackComponent,
      selectors: [["app-oauth-callback"]],
      decls: 3,
      vars: 2,
      consts: [[1, "callback-container"], ["class", "spinner", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "spinner"], [1, "loading-text"], [1, "error-message"], [1, "btn", "btn-primary", 3, "click"]],
      template: function OAuthCallbackComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, OAuthCallbackComponent_div_1_Template, 3, 0, "div", 1)(2, OAuthCallbackComponent_div_2_Template, 5, 1, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isProcessing);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.NgIf],
      styles: [".callback-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.loading-text[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 18px;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvb2F1dGgtY2FsbGJhY2svb2F1dGgtY2FsbGJhY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUFOOztBQUVJO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBQ047O0FBQ0k7RUFDRSxrQkFBQTtBQUVOOztBQUFJO0VBQ0Usa0JBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBR04iLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuY2FsbGJhY2stY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICB9XG4gICAgLmxvYWRpbmctdGV4dCB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuICAgIC5lcnJvci1tZXNzYWdlIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgLmJ0biB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 1367
/*!**************************************************!*\
  !*** ./src/app/shared/services/login.service.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginService: () => (/* binding */ LoginService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var _generic_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generic.service */ 2987);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7878);




class LoginService extends _generic_service__WEBPACK_IMPORTED_MODULE_1__.ServiceGeneric {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.urlServiceREST = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiBaseUrl + "/api/User";
  }
  doLogin(user) {
    console.log("=== LOGIN SERVICE ===");
    console.log("User object:", user);
    console.log("User JSON:", JSON.stringify(user, null, 2));
    console.log("URL:", this.urlServiceREST + "/Login");
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(this.urlServiceREST + "/Login", user, {
      headers
    });
  }
  static {
    this.ɵfac = function LoginService_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || LoginService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
      token: LoginService,
      factory: LoginService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=src_app_features_oauth-callback_oauth-callback_component_ts.js.map
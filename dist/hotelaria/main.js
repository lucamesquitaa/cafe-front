"use strict";
(self["webpackChunkhotelaria"] = self["webpackChunkhotelaria"] || []).push([["main"],{

/***/ 92
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _shared_components_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/components/component.base */ 125);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 9714);
/* harmony import */ var _shared_services_menubar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/services/menubar.service */ 5622);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var _shared_components_menubar_menubar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/components/menubar/menubar.component */ 6337);







function AppComponent_app_menubar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-menubar");
  }
}
function AppComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 6)(3, "div", 7)(4, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
}
class AppComponent extends _shared_components_component_base__WEBPACK_IMPORTED_MODULE_0__.ComponentBase {
  constructor(injector, ngbConfig, menubarService) {
    super(injector);
    this.injector = injector;
    this.menubarService = menubarService;
    this.menusVisivel = true;
    this.textSaudacao = "Olá";
    ngbConfig.animation = false;
  }
  ngOnInit() {}
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbConfig), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_menubar_service__WEBPACK_IMPORTED_MODULE_4__.MenubarService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
      decls: 6,
      vars: 8,
      consts: [[1, "telas"], [4, "ngIf"], [1, "app-content"], ["class", "overlay-spinner", 4, "ngIf"], [1, "overlay-spinner"], [1, "overlay"], [1, "d-flex", "justify-content-center", "spinner-container"], ["role", "status", 1, "spinner-border"], [1, "sr-only"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AppComponent_app_menubar_1_Template, 1, 0, "app-menubar", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AppComponent_div_5_Template, 6, 0, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.cookieService.get("access_token"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("page-with-menubar", ctx.cookieService.get("access_token"))("menu-collapsed", !_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 6, ctx.menubarService.isOpen$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.context.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _shared_components_menubar_menubar_component__WEBPACK_IMPORTED_MODULE_7__.MenubarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
      styles: ["*[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n}\n\n.telas[_ngcontent-%COMP%] {\n  height: 100vh;\n  margin: 0;\n  padding: 0;\n}\n\n.overlay-spinner[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 9999;\n}\n\n.overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1;\n}\n\n.spinner-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsU0FBQTtFQUNBLFVBQUE7QUFERjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFBUSxPQUFBO0VBQ1IsWUFBQTtFQUFjLGFBQUE7RUFDZCxhQUFBO0FBRUY7O0FBQ0E7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFBUSxPQUFBO0VBQ1IsWUFBQTtFQUFjLGFBQUE7RUFDZCw4QkFBQTtFQUNBLFVBQUE7QUFJRjs7QUFEQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUFVLFNBQUE7RUFDVixnQ0FBQTtFQUNBLFVBQUE7QUFLRiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuKiwgYm9keSB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuLnRlbGFze1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi5vdmVybGF5LXNwaW5uZXIge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDA7IGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMHZ3OyBoZWlnaHQ6IDEwMHZoO1xyXG4gIHotaW5kZXg6IDk5OTk7XHJcbn1cclxuXHJcbi5vdmVybGF5IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwOyBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDB2dzsgaGVpZ2h0OiAxMDB2aDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNSk7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLnNwaW5uZXItY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiA1MCU7IGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICB6LWluZGV4OiAyO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 635
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule),
/* harmony export */   initializeGoogleAuth: () => (/* binding */ initializeGoogleAuth)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 6264);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 8418);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 4727);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 495);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 4967);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/shared.module */ 3887);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.routes */ 2181);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-cookie-service */ 9213);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-toastr */ 4285);
/* harmony import */ var _shared_services_interceptor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/services/interceptor */ 2500);
/* harmony import */ var _shared_services_mock_api_interceptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/services/mock-api.interceptor */ 7325);
/* harmony import */ var _shared_services_oauth_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shared/services/oauth.service */ 2941);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 7878);



















// Função para inicializar Google Identity Services
function initializeGoogleAuth(authService) {
  return () => {
    return new Promise(resolve => {
      // Aguarda o carregamento do script do Google
      if (window.google) {
        authService.initializeGoogleAuth().then(() => {
          resolve();
        }).catch(() => {
          console.warn('Google Identity Services initialization failed');
          resolve(); // Não bloqueia a aplicação se falhar
        });
      } else {
        // Aguarda um pouco mais tempo para o script carregar
        setTimeout(() => {
          if (window.google) {
            authService.initializeGoogleAuth().then(() => {
              resolve();
            }).catch(() => {
              console.warn('Google Identity Services initialization failed');
              resolve();
            });
          } else {
            console.warn('Google Identity Services script not loaded');
            resolve();
          }
        }, 1000);
      }
    });
  };
}
class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({
      providers: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdown, ngx_cookie_service__WEBPACK_IMPORTED_MODULE_13__.CookieService, {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS,
        useClass: _shared_services_interceptor__WEBPACK_IMPORTED_MODULE_15__.AuthInterceptor,
        multi: true
      }, {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS,
        useClass: _shared_services_mock_api_interceptor__WEBPACK_IMPORTED_MODULE_16__.MockApiInterceptor,
        multi: true
      }, {
        provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__.APP_INITIALIZER,
        useFactory: initializeGoogleAuth,
        deps: [_shared_services_oauth_service__WEBPACK_IMPORTED_MODULE_17__.AuthService],
        multi: true
      }],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_11__.ROUTES), _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__.NgbNavModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__.SharedModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_14__.ToastrModule.forRoot()]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__.NgbNavModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__.SharedModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_14__.ToastrModule]
  });
})();

/***/ },

/***/ 2181
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROUTES: () => (/* binding */ ROUTES)
/* harmony export */ });
/* harmony import */ var _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/guards/auth.guard */ 1336);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 5312);


const devRoutes = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.devBypass ? [{
  path: 'dev-login',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_dev-login_dev-login_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/dev-login/dev-login.component */ 4594)).then(m => m.DevLoginComponent)
}, {
  path: 'mock-login',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_mock-login_mock-login_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/mock-login/mock-login.component */ 6184)).then(m => m.MockLoginComponent)
}] : [];
const ROUTES = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
}, {
  path: 'oauth-callback',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_oauth-callback_oauth-callback_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./features/oauth-callback/oauth-callback.component */ 6754)).then(m => m.OAuthCallbackComponent)
}, ...devRoutes, {
  path: 'login',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/login/login.module */ 6065)).then(m => m.LoginModule)
}, {
  path: 'cafeterias',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_cafeterias_cafeterias_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./features/cafeterias/cafeterias.module */ 985)).then(m => m.CafeteriasModule),
  canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}];

/***/ },

/***/ 125
/*!*****************************************************!*\
  !*** ./src/app/shared/components/component.base.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentBase: () => (/* binding */ ComponentBase)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var _services_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/context.service */ 7337);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ 9213);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ 4285);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7878);






/**
 * @description
 *
 * Componente básico
 */
class ComponentBase {
  get loading() {
    return this._loading;
  }
  constructor(injector) {
    this.injector = injector;
    this.literals = {};
    /**
     * Exibe ou não a animação de espera de consulta
     */
    this._loading = false;
    this._loadingCount = 0;
    this.http = injector.get(_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient);
    this.router = injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router);
    this.activatedRoute = injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_1__.ActivatedRoute);
    this.cookieService = injector.get(ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__.CookieService);
    this.toastr = injector.get(ngx_toastr__WEBPACK_IMPORTED_MODULE_4__.ToastrService);
    // Carrega o contexto global do usuário
    this.context = _services_context_service__WEBPACK_IMPORTED_MODULE_2__.ContextService.getContext();
  }
  ngOnInit() {}
  ngOnDestroy() {}
  /**
   * Exibe a animação de espera
   */
  showLoading() {
    this.context.isLoading = true;
  }
  /**
   * Esconde a animação de espera
   */
  hideLoading() {
    this.context.isLoading = false;
  }
  static {
    this.ɵfac = function ComponentBase_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || ComponentBase)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: ComponentBase,
      factory: ComponentBase.ɵfac
    });
  }
}

/***/ },

/***/ 6337
/*!****************************************************************!*\
  !*** ./src/app/shared/components/menubar/menubar.component.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenubarComponent: () => (/* binding */ MenubarComponent)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 8130);
/* harmony import */ var _component_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component.base */ 125);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _services_menubar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/menubar.service */ 5622);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _ng_bootstrap_ng_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap/dropdown */ 4727);






function MenubarComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function MenubarComponent_div_0_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.toggleMenu());
    })("keydown.enter", function MenubarComponent_div_0_Template_div_keydown_enter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r1.isOpen);
  }
}
function MenubarComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function MenubarComponent_div_1_Template_a_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function MenubarComponent_div_1_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.toggleMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ul", 10)(9, "li", 11)(10, "a", 12)(11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " Cafeterias ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "li", 11)(15, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " Nova Cafeteria ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " ____________________________________ ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 16)(21, "div", 17)(22, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Usu\u00E1rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "ul", 20)(27, "li")(28, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](31, "hr", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "li")(33, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function MenubarComponent_div_1_Template_a_click_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Sair");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("menu-open", ctx_r1.isOpen)("menu-collapsed", !ctx_r1.isOpen)("menu-expanded", ctx_r1.isOpen);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@collapseExpand", ctx_r1.isOpen ? "expanded" : "collapsed");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r1.isOpen ? "justify-content-between" : "justify-content-center");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("d-none", !ctx_r1.isOpen);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("d-none", !ctx_r1.isOpen);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r1.selected === "cafeterias");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx_r1.selected === "nova-cafeteria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", ctx_r1.cookieService.get("user_first_name") == "undefined" ? "" : ctx_r1.cookieService.get("user_first_name"), " ", ctx_r1.cookieService.get("user_last_name") == "undefined" ? "" : ctx_r1.cookieService.get("user_last_name"));
  }
}
class MenubarComponent extends _component_base__WEBPACK_IMPORTED_MODULE_1__.ComponentBase {
  constructor(injector, menubarService) {
    super(injector);
    this.injector = injector;
    this.menubarService = menubarService;
    this.selected = '';
    this.isOpen = true;
    this.window = window; // Adicionando propriedade window
  }
  ngOnInit() {
    super.ngOnInit();
    // Se inscreve no estado do menu
    this.menubarService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
  toggleMenu() {
    this.menubarService.toggle();
  }
  // Método para verificar se é mobile
  isMobile() {
    return window.innerWidth < 768;
  }
  logout() {
    console.log('=== LOGOUT CLICKED ===');
    // Limpa todos os cookies
    this.cookieService.deleteAll();
    // Limpa storage
    sessionStorage.clear();
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('nonce');
    localStorage.removeItem('PKCE_verifier');
    // Limpa os tokens do OAuth sem redirecionar
    // Navega para login e AGUARDA o usuário clicar no botão
    this.router.navigate(["/login"]);
    console.log('✓ Logout complete, redirected to login page');
  }
  static {
    this.ɵfac = function MenubarComponent_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || MenubarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_menubar_service__WEBPACK_IMPORTED_MODULE_4__.MenubarService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: MenubarComponent,
      selectors: [["app-menubar"]],
      inputs: {
        selected: "selected"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
      decls: 2,
      vars: 2,
      consts: [["class", "menu-overlay", "role", "button", "tabindex", "-1", "aria-label", "Fechar menu", 3, "active", "click", "keydown.enter", 4, "ngIf"], ["class", "d-flex flex-column flex-shrink-0 p-3 text-white contBar", 3, "menu-open", "menu-collapsed", "menu-expanded", 4, "ngIf"], ["role", "button", "tabindex", "-1", "aria-label", "Fechar menu", 1, "menu-overlay", 3, "click", "keydown.enter"], [1, "d-flex", "flex-column", "flex-shrink-0", "p-3", "text-white", "contBar"], [1, "d-flex", "justify-content-center", "align-items-center", 3, "ngClass"], [1, "menu-brand", 3, "click"], ["src", "assets/logosfundo2.png", "alt", "logo turify casinha", 1, "logoCasinha"], ["type", "button", 1, "btn", "btn-link", "text-white", "p-0", 3, "click"], [1, "bi", "bi-list", 2, "font-size", "1.5rem"], [1, "conteudoMeniu"], [1, "nav", "nav-pills", "flex-column", "mb-auto"], [1, "nav-item"], ["href", "/cafeterias", "routerLinkActive", "active", 1, "nav-link", "text-white", "d-flex", "justify-content-between", "align-items-center"], [1, "bi", "bi-cup-hot"], ["href", "/cafeterias/novo", "routerLinkActive", "active", 1, "nav-link", "text-white"], [1, "bi", "bi-plus-circle"], [1, "logout-buttom"], ["ngbDropdown", "", "placement", "top-end", 1, "dropdown"], ["id", "dropdownUser1", "ngbDropdownToggle", "", "aria-expanded", "false", 1, "user-info"], [1, "bi", "bi-person-circle"], ["ngbDropdownMenu", "", "aria-labelledby", "dropdownUser1", 1, "dropdown-menu", "dropdown-menu-dark", "text-small", "shadow"], [1, "dropdown-item"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"]],
      template: function MenubarComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, MenubarComponent_div_0_Template, 1, 2, "div", 0)(1, MenubarComponent_div_1_Template, 35, 18, "div", 1);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.cookieService.get("access_token") != "undefined");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.cookieService.get("access_token") != "undefined");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ng_bootstrap_ng_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_6__.NgbDropdown, _ng_bootstrap_ng_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownMenu],
      styles: ["@charset \"UTF-8\";\n.logoCasinha[_ngcontent-%COMP%] {\n  width: 120px;\n  height: auto;\n  margin-bottom: 10px;\n}\n\n.conteudoMeniu[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.contBar[_ngcontent-%COMP%] {\n  background-color: #34495e;\n  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);\n  border-right: 3px solid #3498db;\n  z-index: 1000;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow-y: auto;\n  transition: all 0.3s ease;\n}\n\n.shadow[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.contBar[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border-color: #4a5568;\n  margin: 1rem 0;\n}\n\n.nav-link[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  margin: 4px 0;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  color: #ffffff !important;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.nav-link[_ngcontent-%COMP%]:hover {\n  background: rgba(52, 152, 219, 0.2);\n  color: #ffffff !important;\n  transform: translateX(5px);\n}\n\n.nav-link.active[_ngcontent-%COMP%] {\n  background: #3498db;\n  color: #ffffff !important;\n}\n\n.nav-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  width: 16px;\n  height: 16px;\n}\n\n.menuBarIcon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  font-size: 24px;\n  cursor: pointer;\n  color: #cbd5e0;\n  transition: all 0.3s ease;\n  z-index: 1001;\n}\n\n.menuBarIcon[_ngcontent-%COMP%]:hover {\n  color: #ffffff;\n  transform: scale(1.1);\n}\n\n.menuBarIcon2[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 15px;\n  left: 15px;\n  font-size: 24px;\n  cursor: pointer;\n  color: #2c3e50;\n  background: white;\n  padding: 8px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  z-index: 1001;\n  transition: all 0.3s ease;\n}\n\n.menuBarIcon2[_ngcontent-%COMP%]:hover {\n  color: #3498db;\n  transform: scale(1.1);\n}\n\n.menu-brand[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  color: #ffffff;\n}\n\n.menu-brand[_ngcontent-%COMP%]:hover {\n  color: #ffffff;\n  text-decoration: none;\n}\n\n.brand-text[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n\n\n.menu-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n\n.setinha[_ngcontent-%COMP%] {\n  margin-left: 50px;\n}\n\n.divisoria[_ngcontent-%COMP%] {\n  margin-top: 100px;\n  margin-bottom: 10px;\n}\n\n.logout-buttom[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 8px;\n  border-top: 1px solid #4a5568;\n}\n\n.menu-overlay.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n\n\n@media (max-width: 768px) {\n  .contBar[_ngcontent-%COMP%] {\n    width: 280px !important;\n    transform: translateX(-100%);\n  }\n  .contBar.menu-open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .menuBarIcon[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n@media (min-width: 769px) {\n  .menuBarIcon2[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .menu-overlay[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n.dropdown[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  margin-top: 0px;\n}\n\n.dropdown-toggle[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  width: 100%;\n  text-align: left;\n}\n\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute !important;\n  top: auto !important;\n  bottom: 100% !important;\n  left: auto !important;\n  right: 0 !important;\n  transform: translateY(5px) !important;\n  min-width: 200px;\n  max-width: 250px;\n  width: calc(100% - 20px);\n  margin: 0 10px;\n  z-index: 1050;\n  border: 1px solid rgba(59, 59, 59, 0.1);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n}\n\n.dropdown-menu.show[_ngcontent-%COMP%] {\n  display: block !important;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  transition: all 0.2s ease;\n  border-radius: 6px;\n  margin: 2px 6px;\n}\n\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: #9c9c9c !important;\n  width: calc(100% - 22px);\n}\n\n.dropdown-divider[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  border-color: #fffdfd;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: white;\n  cursor: pointer;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  transition: background-color 0.2s;\n}\n.user-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.user-info[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n\n@media (max-width: 768px) {\n  .dropdown-menu[_ngcontent-%COMP%] {\n    position: fixed !important;\n    bottom: 60px !important;\n    left: 20px !important;\n    right: 20px !important;\n    top: auto !important;\n    transform: none !important;\n    width: calc(100% - 40px);\n    max-width: none;\n    margin: 0;\n  }\n  .dropdown-toggle[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbWVudWJhci9tZW51YmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUNoQjtFQUNJLFlBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFDQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7QUFFSjs7QUFBQTtFQUNJLHlCQUFBO0VBQ0EseUNBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQUdKOztBQURBO0VBQ0ksZUFBQTtBQUlKOztBQURBO0VBQ0kscUJBQUE7RUFDQSxjQUFBO0FBSUo7O0FBREE7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUFJSjs7QUFEQTtFQUNJLG1DQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtBQUlKOztBQURBO0VBQ0ksbUJBQUE7RUFDQSx5QkFBQTtBQUlKOztBQURBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUlKOztBQURBO0VBQ0ksa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtBQUlKOztBQURBO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0FBSUo7O0FBREE7RUFDSSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0FBSUo7O0FBREE7RUFDSSxjQUFBO0VBQ0EscUJBQUE7QUFJSjs7QUFEQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtBQUlKOztBQURBO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0FBSUo7O0FBREE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFJSjs7QUFEQSx3QkFBQTtBQUNBO0VBQ0ksZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQUlKOztBQUZBO0VBQ0ksaUJBQUE7QUFLSjs7QUFIQTtFQUNJLGlCQUFBO0VBQ0EsbUJBQUE7QUFNSjs7QUFIQTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtBQU1KOztBQUpBO0VBQ0ksVUFBQTtFQUNBLG1CQUFBO0FBT0o7O0FBSkEsbUJBQUE7QUFDQTtFQUNJO0lBQ0ksdUJBQUE7SUFDQSw0QkFBQTtFQU9OO0VBSkU7SUFDSSx3QkFBQTtFQU1OO0VBSEU7SUFDSSxjQUFBO0VBS047QUFDRjtBQUZBO0VBQ0k7SUFDSSxhQUFBO0VBSU47RUFERTtJQUNJLGFBQUE7RUFHTjtBQUNGO0FBREEsdUNBQUE7QUFDQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFHSjs7QUFBQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBR0o7O0FBQUE7RUFDSSw2QkFBQTtFQUNBLG9CQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLHVDQUFBO0VBQ0EseUNBQUE7QUFHSjs7QUFBQTtFQUNJLHlCQUFBO0FBR0o7O0FBQUE7RUFDSSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBR0o7O0FBQUE7RUFDSSw4QkFBQTtFQUNBLHdCQUFBO0FBR0o7O0FBQUE7RUFDSSxhQUFBO0VBQ0EscUJBQUE7QUFHSjs7QUFEQTtFQUNNLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQ0FBQTtBQUlOO0FBRk07RUFDRSxpQkFBQTtBQUlSO0FBRE07RUFDRSxnQkFBQTtBQUdSOztBQUNBLDZDQUFBO0FBQ0E7RUFDSTtJQUNJLDBCQUFBO0lBQ0EsdUJBQUE7SUFDQSxxQkFBQTtJQUNBLHNCQUFBO0lBQ0Esb0JBQUE7SUFDQSwwQkFBQTtJQUNBLHdCQUFBO0lBQ0EsZUFBQTtJQUNBLFNBQUE7RUFFTjtFQUNFO0lBQ0ksaUJBQUE7RUFDTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sb2dvQ2FzaW5oYXtcclxuICAgIHdpZHRoOiAxMjBweDtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuLmNvbnRldWRvTWVuaXV7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuLmNvbnRCYXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzQ0OTVlO1xyXG4gICAgYm94LXNoYWRvdzogNHB4IDAgMjBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCAjMzQ5OGRiO1xyXG4gICAgei1pbmRleDogMTAwMDtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbn1cclxuLnNoYWRvd3tcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNvbnRCYXIgaHJ7XHJcbiAgICBib3JkZXItY29sb3I6ICM0YTU1Njg7XHJcbiAgICBtYXJnaW46IDFyZW0gMDtcclxufVxyXG5cclxuLm5hdi1saW5re1xyXG4gICAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gICAgbWFyZ2luOiA0cHggMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5uYXYtbGluazpob3ZlcntcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoNTIsIDE1MiwgMjE5LCAwLjIpO1xyXG4gICAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1cHgpO1xyXG59XHJcblxyXG4ubmF2LWxpbmsuYWN0aXZle1xyXG4gICAgYmFja2dyb3VuZDogIzM0OThkYjtcclxuICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5uYXYtbGluayBzdmcsIC5uYXYtbGluayBpe1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgd2lkdGg6IDE2cHg7XHJcbiAgICBoZWlnaHQ6IDE2cHg7XHJcbn1cclxuXHJcbi5tZW51QmFySWNvbntcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTVweDtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgY29sb3I6ICNjYmQ1ZTA7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG4gICAgei1pbmRleDogMTAwMTtcclxufVxyXG5cclxuLm1lbnVCYXJJY29uOmhvdmVye1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbn1cclxuXHJcbi5tZW51QmFySWNvbjJ7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDE1cHg7XHJcbiAgICBsZWZ0OiAxNXB4O1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgY29sb3I6ICMyYzNlNTA7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICAgIHotaW5kZXg6IDEwMDE7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4ubWVudUJhckljb24yOmhvdmVye1xyXG4gICAgY29sb3I6ICMzNDk4ZGI7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbn1cclxuXHJcbi5tZW51LWJyYW5ke1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5tZW51LWJyYW5kOmhvdmVye1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5icmFuZC10ZXh0e1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi8qIE92ZXJsYXkgcGFyYSBtb2JpbGUgKi9cclxuLm1lbnUtb3ZlcmxheXtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHotaW5kZXg6IDk5OTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcbi5zZXRpbmhhe1xyXG4gICAgbWFyZ2luLWxlZnQ6IDUwcHg7XHJcbn1cclxuLmRpdmlzb3JpYXtcclxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmxvZ291dC1idXR0b20ge1xyXG4gICAgbWFyZ2luLXRvcDogYXV0bztcclxuICAgIHBhZGRpbmctdG9wOiA4cHg7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgIzRhNTU2ODtcclxufVxyXG4ubWVudS1vdmVybGF5LmFjdGl2ZXtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG59XHJcblxyXG4vKiBSZXNwb25zaXZpZGFkZSAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIC5jb250QmFye1xyXG4gICAgICAgIHdpZHRoOiAyODBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jb250QmFyLm1lbnUtb3BlbntcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5tZW51QmFySWNvbntcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OXB4KSB7XHJcbiAgICAubWVudUJhckljb24ye1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5tZW51LW92ZXJsYXl7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxufVxyXG4vKiBFc3RpbG9zIHBhcmEgbyBkcm9wZG93biBkbyB1c3XDg8KhcmlvICovXHJcbi5kcm9wZG93biB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxufVxyXG5cclxuLmRyb3Bkb3duLXRvZ2dsZSB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1tZW51IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xyXG4gICAgdG9wOiBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgICBib3R0b206IDEwMCUgIWltcG9ydGFudDtcclxuICAgIGxlZnQ6IGF1dG8gIWltcG9ydGFudDtcclxuICAgIHJpZ2h0OiAwICFpbXBvcnRhbnQ7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNXB4KSAhaW1wb3J0YW50O1xyXG4gICAgbWluLXdpZHRoOiAyMDBweDtcclxuICAgIG1heC13aWR0aDogMjUwcHg7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XHJcbiAgICBtYXJnaW46IDAgMTBweDtcclxuICAgIHotaW5kZXg6IDEwNTA7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDU5LCA1OSwgNTksIDAuMSk7XHJcbiAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcclxufVxyXG5cclxuLmRyb3Bkb3duLW1lbnUuc2hvdyB7XHJcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZHJvcGRvd24taXRlbSB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE2cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgbWFyZ2luOiAycHggNnB4O1xyXG4gICAgXHJcbn1cclxuLmRyb3Bkb3duLWl0ZW06aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzljOWM5YyAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDIycHgpO1xyXG59XHJcblxyXG4uZHJvcGRvd24tZGl2aWRlciB7XHJcbiAgICBtYXJnaW46IDhweCAwO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjZmZmZGZkIDtcclxufVxyXG4udXNlci1pbmZvIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgZ2FwOiAwLjVyZW07XHJcbiAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnM7XHJcbiAgICAgIFxyXG4gICAgICBpIHtcclxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLnVzZXItbmFtZSB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyogUmVzcG9uc2l2aWRhZGUgcGFyYSBvIGRyb3Bkb3duIGVtIG1vYmlsZSAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIC5kcm9wZG93bi1tZW51IHtcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDtcclxuICAgICAgICBib3R0b206IDYwcHggIWltcG9ydGFudDtcclxuICAgICAgICBsZWZ0OiAyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgcmlnaHQ6IDIwcHggIWltcG9ydGFudDtcclxuICAgICAgICB0b3A6IGF1dG8gIWltcG9ydGFudDtcclxuICAgICAgICB0cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gNDBweCk7XHJcbiAgICAgICAgbWF4LXdpZHRoOiBub25lO1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmRyb3Bkb3duLXRvZ2dsZSB7XHJcbiAgICAgICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"],
      data: {
        animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('collapseExpand', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('expanded', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          width: '280px'
        })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('collapsed', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          width: '60px'
        })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('expanded <=> collapsed', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('300ms ease-in-out')])])]
      }
    });
  }
}

/***/ },

/***/ 2961
/*!***********************************************************!*\
  !*** ./src/app/shared/directives/input-mask.directive.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputMaskDirective: () => (/* binding */ InputMaskDirective)
/* harmony export */ });
/* harmony import */ var _utils_mask_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mask.util */ 9218);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);



class InputMaskDirective {
  constructor(el, ngControl) {
    this.el = el;
    this.ngControl = ngControl;
  }
  onInput(event) {
    const input = event.target;
    const masked = (0,_utils_mask_util__WEBPACK_IMPORTED_MODULE_0__.applyMask)(this.maskType, input.value);
    this.el.nativeElement.value = masked;
    this.ngControl.control?.setValue(masked, {
      emitModelToViewChange: false
    });
  }
  onBlur() {
    this.ngControl.control?.markAsTouched();
  }
  static {
    this.ɵfac = function InputMaskDirective_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || InputMaskDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControl));
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: InputMaskDirective,
      selectors: [["", "appMask", ""]],
      hostBindings: function InputMaskDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function InputMaskDirective_input_HostBindingHandler($event) {
            return ctx.onInput($event);
          })("blur", function InputMaskDirective_blur_HostBindingHandler() {
            return ctx.onBlur();
          });
        }
      },
      inputs: {
        maskType: [0, "appMask", "maskType"]
      },
      standalone: false
    });
  }
}

/***/ },

/***/ 1336
/*!*********************************************!*\
  !*** ./src/app/shared/guards/auth.guard.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var _services_oauth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/oauth.service */ 2941);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3305);




class AuthGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate(route, state) {
    if (src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.devBypass) {
      return true;
    }
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Salva a URL tentada para redirecionar após login
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
  static {
    this.ɵfac = function AuthGuard_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_oauth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: AuthGuard,
      factory: AuthGuard.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 7149
/*!*********************************************************!*\
  !*** ./src/app/shared/mocks/cafeteria-detalhes.mock.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MOCK_CAFETERIA_DETALHES: () => (/* binding */ MOCK_CAFETERIA_DETALHES),
/* harmony export */   MOCK_REDES: () => (/* binding */ MOCK_REDES),
/* harmony export */   MOCK_REDE_POR_CNPJ: () => (/* binding */ MOCK_REDE_POR_CNPJ)
/* harmony export */ });
/* harmony import */ var _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/type-cafe.enum */ 5616);
/* harmony import */ var _cafeterias_mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cafeterias.mock */ 4439);


function enderecoCompleto(endereco, numero, complemento) {
  return [endereco, numero, complemento].filter(Boolean).join(', ');
}
// Detalhe completo de cada cafeteria do MOCK_CAFETERIAS, usado pelo GET /api/cafeterias e /api/cafeterias/:id
const MOCK_CAFETERIA_DETALHES = _cafeterias_mock__WEBPACK_IMPORTED_MODULE_1__.MOCK_CAFETERIAS.map((c, index) => ({
  id: c.id,
  nome: c.nome,
  endereco: enderecoCompleto(c.endereco, c.numero, c.complemento),
  lat: -25.4284 + index * 0.01,
  lng: -49.2733 + index * 0.01,
  notaMedia: [4.8, 4.5, 4.2, 4.9, 4.6, 0, 4.3, 4.7][index] ?? 4.5,
  qtdAvaliacoes: [128, 76, 54, 203, 41, 0, 19, 88][index] ?? 0,
  fotoUrl: c.fotoPrincipal || 'https://picsum.photos/seed/cafeteria-sem-foto/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnumLabel[c.categoriaPrincipal],
  criadoEm: new Date(2024, index % 12, index * 3 % 28 + 1).toISOString()
}));
// Redes de cafeterias usadas na autocomplete do cadastro (GET /api/cafeterias/redes)
const MOCK_REDES = ['Grão Especial', 'Café Colonial da Vovó', 'Doce Confeitaria', 'Aroma & Grãos'];
// CNPJs que já existem cadastrados, usados para simular a detecção de rede existente
const MOCK_REDE_POR_CNPJ = {
  '11222333000181': 'Grão Especial'
};

/***/ },

/***/ 4439
/*!*************************************************!*\
  !*** ./src/app/shared/mocks/cafeterias.mock.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MOCK_CAFETERIAS: () => (/* binding */ MOCK_CAFETERIAS)
/* harmony export */ });
/* harmony import */ var _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/type-cafe.enum */ 5616);

const MOCK_CAFETERIAS = [{
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000001',
  nome: 'Café da Esquina',
  endereco: 'Rua das Flores',
  numero: '123',
  complemento: '',
  cep: '90000-000',
  fotoPrincipal: 'https://picsum.photos/seed/cafe-esquina/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.CafeteriaTradicional
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000002',
  nome: 'Grão Especial',
  endereco: 'Avenida Central',
  numero: '450',
  complemento: 'Loja 2',
  cep: '90001-100',
  fotoPrincipal: 'https://picsum.photos/seed/grao-especial/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.CafeteriaEspecializada
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000003',
  nome: 'Padaria Bom Pão',
  endereco: 'Rua dos Pinheiros',
  numero: '78',
  complemento: '',
  cep: '90002-200',
  fotoPrincipal: 'https://picsum.photos/seed/padaria-bom-pao/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.Padaria
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000004',
  nome: 'Café Colonial da Vovó',
  endereco: 'Estrada do Vale',
  numero: '900',
  complemento: 'Km 3',
  cep: '90003-300',
  fotoPrincipal: 'https://picsum.photos/seed/cafe-colonial-vovo/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.CafeColonial
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000005',
  nome: 'Doce Confeitaria',
  endereco: 'Rua das Palmeiras',
  numero: '55',
  complemento: 'Sala 1',
  cep: '90004-400',
  fotoPrincipal: 'https://picsum.photos/seed/doce-confeitaria/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.Confeitaria
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000006',
  nome: 'Verde Café Vegano',
  endereco: 'Rua da Harmonia',
  numero: '210',
  complemento: '',
  cep: '90005-500',
  fotoPrincipal: null,
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.CafeteriaVeganaOuVegetariana
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000007',
  nome: 'Cantinho do Café',
  endereco: 'Alameda Santos',
  numero: '1020',
  complemento: 'Fundos',
  cep: '90006-600',
  fotoPrincipal: 'https://picsum.photos/seed/cantinho-do-cafe/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.CafeteriaTradicional
}, {
  id: '3f2e1a10-1a2b-4c3d-8e4f-000000000008',
  nome: 'Aroma & Grãos',
  endereco: 'Travessa das Acácias',
  numero: '33',
  complemento: '',
  cep: '90007-700',
  fotoPrincipal: 'https://picsum.photos/seed/aroma-e-graos/600/400',
  categoriaPrincipal: _models_type_cafe_enum__WEBPACK_IMPORTED_MODULE_0__.TypeCafeEnum.CafeteriaEspecializada
}];

/***/ },

/***/ 5616
/*!*************************************************!*\
  !*** ./src/app/shared/models/type-cafe.enum.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeCafeEnum: () => (/* binding */ TypeCafeEnum),
/* harmony export */   TypeCafeEnumLabel: () => (/* binding */ TypeCafeEnumLabel)
/* harmony export */ });
var TypeCafeEnum;
(function (TypeCafeEnum) {
  TypeCafeEnum[TypeCafeEnum["CafeteriaTradicional"] = 0] = "CafeteriaTradicional";
  TypeCafeEnum[TypeCafeEnum["CafeteriaEspecializada"] = 1] = "CafeteriaEspecializada";
  TypeCafeEnum[TypeCafeEnum["Padaria"] = 2] = "Padaria";
  TypeCafeEnum[TypeCafeEnum["CafeColonial"] = 3] = "CafeColonial";
  TypeCafeEnum[TypeCafeEnum["Confeitaria"] = 4] = "Confeitaria";
  TypeCafeEnum[TypeCafeEnum["CafeteriaVeganaOuVegetariana"] = 5] = "CafeteriaVeganaOuVegetariana";
})(TypeCafeEnum || (TypeCafeEnum = {}));
const TypeCafeEnumLabel = {
  [TypeCafeEnum.CafeteriaTradicional]: 'Cafeteria tradicional',
  [TypeCafeEnum.CafeteriaEspecializada]: 'Cafeteria especializada',
  [TypeCafeEnum.Padaria]: 'Padaria',
  [TypeCafeEnum.CafeColonial]: 'Café colonial',
  [TypeCafeEnum.Confeitaria]: 'Confeitaria',
  [TypeCafeEnum.CafeteriaVeganaOuVegetariana]: 'Cafeteria vegana/vegetariana'
};

/***/ },

/***/ 7337
/*!****************************************************!*\
  !*** ./src/app/shared/services/context.service.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextService: () => (/* binding */ ContextService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7878);

class ContextService {
  static {
    this.context = {
      usuarioAutenticado: false,
      token: "",
      usuario: {
        token: ""
      },
      isLoading: false
    };
  }
  static getContext() {
    return ContextService.context;
  }
  static {
    this.ɵfac = function ContextService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContextService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ContextService,
      factory: ContextService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 2500
/*!************************************************!*\
  !*** ./src/app/shared/services/interceptor.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthInterceptor: () => (/* binding */ AuthInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-cookie-service */ 9213);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ 4285);








class AuthInterceptor {
  constructor(cookieService, router, toastr) {
    this.cookieService = cookieService;
    this.router = router;
    this.toastr = toastr;
  }
  intercept(req, next) {
    // Ignorar requisições para Google ou OAuth
    const ignoreUrls = ['google', 'oauth'];
    if (ignoreUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }
    const token = this.getValidToken();
    // Se não há token válido e a requisição é para uma URL que precisa de autenticação
    if (!token && this.requiresAuth(req.url) && !src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.devBypass) {
      this.toastr.warning('Você precisa fazer login para acessar esta funcionalidade.', 'Login Necessário');
      this.router.navigate(['/login']);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)(new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpErrorResponse({
        status: 401,
        statusText: 'No token available'
      }));
    }
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => this.handleAuthError(error)));
    } else {
      return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => this.handleAuthError(error)));
    }
  }
  getValidToken() {
    // Primeiro verifica no cookie
    let token = this.cookieService.get('access_token');
    // Se não encontrou no cookie, verifica no sessionStorage
    if (!token) {
      token = sessionStorage.getItem('access_token') || sessionStorage.getItem('id_token') || '';
    }
    // Em modo dev bypass, usa o token do localStorage se existir
    if (!token && src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.devBypass) {
      token = localStorage.getItem('dev_access_token') || '';
    }
    // Verifica se o token expirou (ignora em modo dev bypass)
    if (token && !src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.devBypass && this.isTokenExpired()) {
      this.clearAllTokens();
      this.toastr.warning('Sua sessão expirou. Faça login novamente.', 'Sessão Expirada');
      this.router.navigate(['/login']);
      return null;
    }
    return token || null;
  }
  isTokenExpired() {
    const expiresAt = sessionStorage.getItem('id_token_expires_at');
    if (!expiresAt) return false;
    const expirationTime = parseInt(expiresAt);
    const currentTime = Date.now();
    return currentTime >= expirationTime;
  }
  clearAllTokens() {
    // Limpar tokens dos cookies
    this.cookieService.delete('access_token');
    // Limpar tokens do sessionStorage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('id_token_expires_at');
    sessionStorage.removeItem('refresh_token');
  }
  requiresAuth(url) {
    // URLs que NÃO precisam de autenticação
    const publicUrls = ['/login', '/register', '/public', 'google', 'oauth'];
    // Se a URL contém alguma das URLs públicas, não precisa de auth
    return !publicUrls.some(publicUrl => url.toLowerCase().includes(publicUrl.toLowerCase()));
  }
  handleAuthError(error) {
    // Verificar se é erro 401 (não autorizado) ou token expirado
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.devBypass && (error.status === 401 || error.error?.message?.toLowerCase().includes('token expired') || error.error?.message?.toLowerCase().includes('token expirado') || error.error?.message?.toLowerCase().includes('unauthorized'))) {
      // Limpar todos os tokens
      this.clearAllTokens();
      // Mostrar mensagem para o usuário
      this.toastr.warning('Sua sessão expirou. Faça login novamente.', 'Sessão Expirada');
      // Redirecionar para a página de login
      this.router.navigate(['/login']);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)(error);
  }
  static {
    this.ɵfac = function AuthInterceptor_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__.CookieService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_7__.ToastrService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: AuthInterceptor,
      factory: AuthInterceptor.ɵfac
    });
  }
}

/***/ },

/***/ 5622
/*!****************************************************!*\
  !*** ./src/app/shared/services/menubar.service.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenubarService: () => (/* binding */ MenubarService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7878);


class MenubarService {
  constructor() {
    this.isOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(true);
    this.isOpen$ = this.isOpenSubject.asObservable();
    // Inicializa baseado no tamanho da tela
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.isOpenSubject.next(false);
    }
  }
  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
  setOpen(isOpen) {
    this.isOpenSubject.next(isOpen);
  }
  get isOpen() {
    return this.isOpenSubject.value;
  }
  static {
    this.ɵfac = function MenubarService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MenubarService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: MenubarService,
      factory: MenubarService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 7325
/*!*********************************************************!*\
  !*** ./src/app/shared/services/mock-api.interceptor.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MockApiInterceptor: () => (/* binding */ MockApiInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 5074);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _mocks_cafeteria_detalhes_mock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mocks/cafeteria-detalhes.mock */ 7149);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7878);






const CAFETERIAS_URL_FRAGMENT = '/api/cafeterias';
/**
 * @description
 * Responde as chamadas para a API de cafeterias com dados mockados quando `environment.devBypass`
 * está ativo, permitindo navegar por toda a aplicação sem um backend real disponível.
 */
class MockApiInterceptor {
  intercept(req, next) {
    console.log('[MockApiInterceptor] url=', req.url, 'devBypass=', src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.devBypass, 'includesFragment=', req.url.includes(CAFETERIAS_URL_FRAGMENT));
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.devBypass || !req.url.includes(CAFETERIAS_URL_FRAGMENT)) {
      return next.handle(req);
    }
    const body = this.handleCafeteriasRequest(req);
    console.log('[MockApiInterceptor] handled body=', body);
    if (body === null) {
      return next.handle(req);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpResponse({
      status: 200,
      body
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.delay)(300));
  }
  handleCafeteriasRequest(req) {
    const path = req.url.split(CAFETERIAS_URL_FRAGMENT)[1] || '';
    const idMatch = path.match(/^\/([^/]+)$/);
    if (req.method === 'GET' && path === '/redes') {
      const termo = (req.params.get('termo') || '').toLowerCase();
      const data = _mocks_cafeteria_detalhes_mock__WEBPACK_IMPORTED_MODULE_4__.MOCK_REDES.filter(rede => rede.toLowerCase().includes(termo));
      return this.ok(data);
    }
    if (req.method === 'GET' && path === '/existe-cnpj') {
      const cnpj = req.params.get('cnpj') || '';
      const rede = _mocks_cafeteria_detalhes_mock__WEBPACK_IMPORTED_MODULE_4__.MOCK_REDE_POR_CNPJ[cnpj];
      const data = rede ? {
        existe: true,
        rede
      } : {
        existe: false
      };
      return this.ok(data);
    }
    if (req.method === 'GET' && path === '') {
      return this.ok(_mocks_cafeteria_detalhes_mock__WEBPACK_IMPORTED_MODULE_4__.MOCK_CAFETERIA_DETALHES);
    }
    if (req.method === 'GET' && idMatch) {
      const cafeteria = _mocks_cafeteria_detalhes_mock__WEBPACK_IMPORTED_MODULE_4__.MOCK_CAFETERIA_DETALHES.find(c => c.id === idMatch[1]);
      return this.ok(cafeteria ?? _mocks_cafeteria_detalhes_mock__WEBPACK_IMPORTED_MODULE_4__.MOCK_CAFETERIA_DETALHES[0]);
    }
    if (req.method === 'POST' && path === '') {
      const criada = {
        ...req.body,
        id: 'mock-' + Date.now()
      };
      return this.ok(criada, 'Cafeteria cadastrada com sucesso (mock).');
    }
    if (req.method === 'PUT' && idMatch) {
      const atualizada = {
        ...req.body,
        id: idMatch[1]
      };
      return this.ok(atualizada, 'Cafeteria atualizada com sucesso (mock).');
    }
    return null;
  }
  ok(data, mensagem = 'OK') {
    return {
      sucesso: true,
      success: true,
      mensagem,
      data
    };
  }
  static {
    this.ɵfac = function MockApiInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MockApiInterceptor)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: MockApiInterceptor,
      factory: MockApiInterceptor.ɵfac
    });
  }
}

/***/ },

/***/ 2941
/*!**************************************************!*\
  !*** ./src/app/shared/services/oauth.service.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var C_Users_luca_mesquita_Desktop_Pessoal_cafe_front_node_modules_babel_runtime_helpers_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator.js */ 5386);
/* harmony import */ var C_Users_luca_mesquita_Desktop_Pessoal_cafe_front_node_modules_babel_runtime_helpers_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_luca_mesquita_Desktop_Pessoal_cafe_front_node_modules_babel_runtime_helpers_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ 9213);





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
class AuthService {
  constructor(router, cookieService) {
    this.router = router;
    this.cookieService = cookieService;
    this.isAuthenticatedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.userInfoSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null);
    this.userInfo$ = this.userInfoSubject.asObservable();
    this.clientId = '838656343224-8cr24hdeobtu00kevkhj27sudbuq8g97.apps.googleusercontent.com';
    this.isInitialized = false;
    // Verifica se já existe um token salvo
    this.checkExistingAuthentication();
  }
  /**
   * Inicializa o Google Identity Services
   */
  initializeGoogleAuth() {
    var _this = this;
    return C_Users_luca_mesquita_Desktop_Pessoal_cafe_front_node_modules_babel_runtime_helpers_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0___default()(function* () {
      return new Promise((resolve, reject) => {
        if (_this.isInitialized || !window.google) {
          resolve();
          return;
        }
        try {
          const config = {
            client_id: _this.clientId,
            callback: response => {
              _this.handleCredentialResponse(response);
            },
            auto_select: false,
            cancel_on_tap_outside: true
          };
          window.google.accounts.id.initialize(config);
          _this.isInitialized = true;
          console.log('✓ Google Identity Services initialized');
          resolve();
        } catch (error) {
          console.error('Error initializing Google Identity Services:', error);
          reject(error);
        }
      });
    })();
  }
  /**
   * Processa a resposta de credencial do Google
   */
  handleCredentialResponse(response) {
    console.log('=== GOOGLE CREDENTIAL RESPONSE ===');
    console.log('Response:', response);
    try {
      const userInfo = parseJWT(response.credential);
      if (!userInfo) {
        throw new Error('Failed to parse credential');
      }
      console.log('User info parsed:', userInfo);
      // Armazena informações do usuário
      this.userInfoSubject.next(userInfo);
      this.cookieService.set('google_user_info', JSON.stringify(userInfo), {
        expires: 7,
        // 7 dias
        path: '/',
        secure: window.location.protocol === 'https:'
      });
      // Marca como autenticado
      this.isAuthenticatedSubject.next(true);
      // Se estamos na página de login, redireciona para o callback
      if (window.location.pathname === '/login') {
        this.router.navigate(['/oauth-callback'], {
          queryParams: {
            credential: response.credential,
            returnUrl: new URLSearchParams(window.location.search).get('returnUrl') || '/cafeterias'
          }
        });
      }
    } catch (error) {
      console.error('Error processing credential response:', error);
    }
  }
  /**
   * Inicia o processo de login com Google
   */
  login() {
    var _this2 = this;
    return C_Users_luca_mesquita_Desktop_Pessoal_cafe_front_node_modules_babel_runtime_helpers_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0___default()(function* () {
      yield _this2.initializeGoogleAuth();
      if (window.google) {
        // Mostra o prompt do Google
        window.google.accounts.id.prompt();
      } else {
        console.error('Google Identity Services not loaded');
      }
    })();
  }
  /**
   * Renderiza o botão do Google
   */
  renderGoogleButton(element, config) {
    if (!window.google || !this.isInitialized) {
      console.error('Google Identity Services not initialized');
      return;
    }
    const defaultConfig = {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: '100%',
      ...config
    };
    window.google.accounts.id.renderButton(element, defaultConfig);
  }
  /**
   * Realiza logout
   */
  logout() {
    // Remove informações armazenadas
    this.cookieService.delete('google_user_info', '/');
    this.cookieService.delete('access_token', '/');
    // Reseta estados
    this.isAuthenticatedSubject.next(false);
    this.userInfoSubject.next(null);
    // Revoga tokens do Google se possível
    if (window.google && this.getUserInfo()) {
      const userInfo = this.getUserInfo();
      if (userInfo) {
        window.google.accounts.id.revoke(userInfo.email, () => {
          console.log('Google tokens revoked');
        });
      }
    }
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated() {
    if (!this.isAuthenticatedSubject.value) return false;
    // Verifica se o token do backend existe (exigido pelo interceptor)
    const hasBackendToken = !!this.cookieService.get('access_token') || !!sessionStorage.getItem('access_token') || !!sessionStorage.getItem('id_token');
    if (!hasBackendToken) return false;
    const userInfo = this.userInfoSubject.value;
    if (this.isTokenExpired(userInfo)) {
      this.cookieService.delete('google_user_info', '/');
      this.cookieService.delete('access_token', '/');
      this.isAuthenticatedSubject.next(false);
      this.userInfoSubject.next(null);
      return false;
    }
    return true;
  }
  /**
   * Obtém as informações do usuário
   */
  getUserInfo() {
    return this.userInfoSubject.value;
  }
  /**
   * Obtém o nome do usuário
   */
  getUserName() {
    const userInfo = this.getUserInfo();
    return userInfo?.name || '';
  }
  /**
   * Obtém o email do usuário
   */
  getUserEmail() {
    const userInfo = this.getUserInfo();
    return userInfo?.email || '';
  }
  /**
   * Obtém a foto do usuário
   */
  getUserPicture() {
    const userInfo = this.getUserInfo();
    return userInfo?.picture || '';
  }
  /**
   * Obtém o token de acesso do backend (se existir)
   */
  getAccessToken() {
    return this.cookieService.get('access_token');
  }
  /**
   * Verifica autenticação existente nos cookies
   */
  checkExistingAuthentication() {
    const userInfoString = this.cookieService.get('google_user_info');
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        if (this.isTokenExpired(userInfo)) {
          console.warn('Token expirado, removendo autenticação');
          this.cookieService.delete('google_user_info', '/');
          this.cookieService.delete('access_token', '/');
          return;
        }
        this.userInfoSubject.next(userInfo);
        this.isAuthenticatedSubject.next(true);
        console.log('✓ Existing authentication found');
      } catch (error) {
        console.error('Error parsing existing user info:', error);
        // Remove cookie inválido
        this.cookieService.delete('google_user_info', '/');
      }
    }
  }
  /**
   * Verifica se o token JWT está expirado
   */
  isTokenExpired(userInfo) {
    if (!userInfo?.exp) return false;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return userInfo.exp < nowInSeconds;
  }
  /**
   * Define informações do usuário (usado pelo callback component)
   */
  setUserInfo(userInfo) {
    this.userInfoSubject.next(userInfo);
    this.isAuthenticatedSubject.next(true);
    this.cookieService.set('google_user_info', JSON.stringify(userInfo), {
      expires: 7,
      path: '/',
      secure: window.location.protocol === 'https:'
    });
  }
  static {
    this.ɵfac = function AuthService_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__.CookieService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 3887
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedModule: () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 8418);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 4131);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var _components_menubar_menubar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/menubar/menubar.component */ 6337);
/* harmony import */ var _directives_input_mask_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directives/input-mask.directive */ 2961);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6124);







class SharedModule {
  static {
    this.ɵfac = function SharedModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SharedModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
      type: SharedModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
      imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTypeaheadModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTypeaheadModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_components_menubar_menubar_component__WEBPACK_IMPORTED_MODULE_5__.MenubarComponent, _directives_input_mask_directive__WEBPACK_IMPORTED_MODULE_6__.InputMaskDirective],
    imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTypeaheadModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule],
    exports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTypeaheadModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule, _components_menubar_menubar_component__WEBPACK_IMPORTED_MODULE_5__.MenubarComponent, _directives_input_mask_directive__WEBPACK_IMPORTED_MODULE_6__.InputMaskDirective]
  });
})();

/***/ },

/***/ 9218
/*!*******************************************!*\
  !*** ./src/app/shared/utils/mask.util.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyMask: () => (/* binding */ applyMask),
/* harmony export */   onlyDigits: () => (/* binding */ onlyDigits)
/* harmony export */ });
function onlyDigits(value) {
  return (value || '').replace(/\D/g, '');
}
function applyMask(type, rawValue) {
  const digits = onlyDigits(rawValue);
  switch (type) {
    case 'cpf':
      return digits.slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    case 'cnpj':
      return digits.slice(0, 14).replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    case 'telefone':
      return digits.slice(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    case 'cep':
      return digits.slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    default:
      return digits;
  }
}

/***/ },

/***/ 5312
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  devBypass: true,
  apiBaseUrl: '',
  oauth: {
    redirectUri: 'http://localhost:4200/oauth-callback',
    postLogoutRedirectUri: 'http://localhost:4200/login',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html'
  }
};

/***/ },

/***/ 4429
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 4967);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 635);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule).catch(err => console.error(err));

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map
"use strict";
(self["webpackChunkhotelaria"] = self["webpackChunkhotelaria"] || []).push([["src_app_features_mock-login_mock-login_component_ts"],{

/***/ 6184
/*!*************************************************************!*\
  !*** ./src/app/features/mock-login/mock-login.component.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MockLoginComponent: () => (/* binding */ MockLoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ 9213);
/* harmony import */ var src_app_shared_services_oauth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/oauth.service */ 2941);







function MockLoginComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.message, " ");
  }
}
const MOCK_USER = {
  iss: 'mock-login',
  sub: 'mock-user-id',
  name: 'Usuário Mock',
  given_name: 'Usuário',
  family_name: 'Mock',
  picture: 'https://i.pravatar.cc/150?u=mock-user',
  email: 'usuario.mock@teste.com',
  email_verified: true
};
class MockLoginComponent {
  constructor(router, route, cookieService, authService) {
    this.router = router;
    this.route = route;
    this.cookieService = cookieService;
    this.authService = authService;
    this.message = '';
  }
  ngOnInit() {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.devBypass) {
      this.router.navigate(['/login']);
      return;
    }
    this.entrar();
  }
  entrar() {
    // Autentica com usuário mockado (sem depender de token real de backend)
    this.authService.setUserInfo(MOCK_USER);
    this.cookieService.set('access_token', 'mock-access-token', {
      expires: 1,
      path: '/'
    });
    localStorage.setItem('dev_access_token', 'mock-access-token');
    this.message = 'Login mock aplicado! Redirecionando...';
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cafeterias';
    setTimeout(() => this.router.navigate([returnUrl]), 500);
  }
  static {
    this.ɵfac = function MockLoginComponent_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || MockLoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__.CookieService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_oauth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: MockLoginComponent,
      selectors: [["app-mock-login"]],
      decls: 9,
      vars: 1,
      consts: [[2, "display", "flex", "justify-content", "center", "align-items", "center", "min-height", "100vh", "background", "#1e1e1e"], [2, "background", "#2d2d2d", "border", "2px solid #6dbe6d", "border-radius", "8px", "padding", "32px", "width", "420px", "color", "#fff", "font-family", "monospace", "text-align", "center"], [2, "color", "#6dbe6d", "margin", "0 0 8px 0"], [2, "color", "#aaa", "margin", "0 0 24px 0", "font-size", "13px"], [2, "width", "100%", "padding", "12px", "background", "#6dbe6d", "color", "#1e1e1e", "border", "none", "border-radius", "4px", "font-size", "14px", "font-weight", "bold", "cursor", "pointer", 3, "click"], ["style", "margin-top:12px;padding:8px;border-radius:4px;background:#1a4a1a;color:#6dbe6d;", 4, "ngIf"], [2, "margin-top", "12px", "padding", "8px", "border-radius", "4px", "background", "#1a4a1a", "color", "#6dbe6d"]],
      template: function MockLoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "\uD83E\uDDEA Mock Login");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Ambiente de desenvolvimento. Entra direto usando dados mockados, sem precisar de token.");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MockLoginComponent_Template_button_click_6_listener() {
            return ctx.entrar();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Entrar com usu\u00E1rio mock ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, MockLoginComponent_div_8_Template, 2, 1, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.message);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.NgIf],
      encapsulation: 2
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=src_app_features_mock-login_mock-login_component_ts.js.map
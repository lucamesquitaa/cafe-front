"use strict";
(self["webpackChunkhotelaria"] = self["webpackChunkhotelaria"] || []).push([["src_app_features_dev-login_dev-login_component_ts"],{

/***/ 4594
/*!***********************************************************!*\
  !*** ./src/app/features/dev-login/dev-login.component.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DevLoginComponent: () => (/* binding */ DevLoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 9748);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3305);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-cookie-service */ 9213);








function DevLoginComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background", ctx_r0.success ? "#1a4a1a" : "#4a1a1a")("color", ctx_r0.success ? "#6dbe6d" : "#e57373");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.message, " ");
  }
}
class DevLoginComponent {
  constructor(router, route, cookieService) {
    this.router = router;
    this.route = route;
    this.cookieService = cookieService;
    this.token = '';
    this.message = '';
    this.success = false;
  }
  ngOnInit() {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.devBypass) {
      this.router.navigate(['/login']);
      return;
    }
    // Suporte a /dev-login?token=xxx para aplicar diretamente via URL
    const tokenFromUrl = this.route.snapshot.queryParams['token'];
    if (tokenFromUrl) {
      this.token = tokenFromUrl;
      this.applyToken();
    }
  }
  applyToken() {
    const t = this.token.trim();
    if (!t) return;
    // Salva no cookie (usado pelo interceptor) e no localStorage (fallback)
    this.cookieService.set('access_token', t, {
      expires: 1,
      path: '/'
    });
    localStorage.setItem('dev_access_token', t);
    this.success = true;
    this.message = 'Token aplicado! Redirecionando...';
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cafeterias';
    setTimeout(() => this.router.navigate([returnUrl]), 800);
  }
  static {
    this.ɵfac = function DevLoginComponent_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || DevLoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__.CookieService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: DevLoginComponent,
      selectors: [["app-dev-login"]],
      decls: 12,
      vars: 3,
      consts: [[2, "display", "flex", "justify-content", "center", "align-items", "center", "min-height", "100vh", "background", "#1e1e1e"], [2, "background", "#2d2d2d", "border", "2px solid #f0a500", "border-radius", "8px", "padding", "32px", "width", "500px", "color", "#fff", "font-family", "monospace"], [2, "color", "#f0a500", "margin", "0 0 8px 0"], [2, "color", "#aaa", "margin", "0 0 24px 0", "font-size", "13px"], [2, "display", "block", "margin-bottom", "6px", "font-size", "13px", "color", "#ccc"], ["rows", "6", "placeholder", "Cole o token aqui...", 2, "width", "100%", "background", "#1e1e1e", "border", "1px solid #555", "border-radius", "4px", "color", "#fff", "padding", "10px", "font-size", "12px", "resize", "vertical", "box-sizing", "border-box", 3, "ngModelChange", "ngModel"], [2, "margin-top", "16px", "width", "100%", "padding", "12px", "background", "#f0a500", "color", "#1e1e1e", "border", "none", "border-radius", "4px", "font-size", "14px", "font-weight", "bold", "cursor", "pointer", 3, "click", "disabled"], ["style", "margin-top:12px;padding:8px;border-radius:4px;", 3, "background", "color", 4, "ngIf"], [2, "margin-top", "12px", "padding", "8px", "border-radius", "4px"]],
      template: function DevLoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\u2699 Dev Bypass");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Ambiente de desenvolvimento. Cole o access token para autenticar.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "label", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Access Token");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "textarea", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function DevLoginComponent_Template_textarea_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.token, $event) || (ctx.token = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵcontrolCreate"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DevLoginComponent_Template_button_click_9_listener() {
            return ctx.applyToken();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " Aplicar Token e Entrar ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, DevLoginComponent_div_11_Template, 2, 5, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.token);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵcontrol"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.token.trim());
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.message);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.NgModel],
      encapsulation: 2
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=src_app_features_dev-login_dev-login_component_ts.js.map
"use strict";
(self["webpackChunkhotelaria"] = self["webpackChunkhotelaria"] || []).push([["common"],{

/***/ 2987
/*!****************************************************!*\
  !*** ./src/app/shared/services/generic.service.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceGeneric: () => (/* binding */ ServiceGeneric)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 698);
/* harmony import */ var _services_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/context.service */ 7337);
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ 9213);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7878);




/**
 * @description
 *
 * Serviço REST genérico
 */
class ServiceGeneric {
  constructor(injector) {
    this.injector = injector;
    /**
      * Labels traduzidos
      */
    this.literals = {};
    this.http = this.injector.get(_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient);
    this.cookieService = injector.get(ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__.CookieService);
    this.context = this.objContext;
  }
  /**
   * Contexto do usuário
   */
  get objContext() {
    if (!this.context) {
      this.context = _services_context_service__WEBPACK_IMPORTED_MODULE_1__.ContextService.getContext();
    }
    return this.context;
  }
  set objContext(value) {
    this.context = value;
  }
  getBaseUrl() {
    return "https://localhost:4200";
  }
  getFullUrl() {
    return `${this.getBaseUrl()}${this.urlServiceREST}`;
  }
  static {
    this.ɵfac = function ServiceGeneric_Factory(__ngFactoryType__) {
      /* @ts-ignore */
      return new (__ngFactoryType__ || ServiceGeneric)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
      token: ServiceGeneric,
      factory: ServiceGeneric.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=common.js.map
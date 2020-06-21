"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ReporteProductoresDataSource = /** @class */ (function () {
    function ReporteProductoresDataSource(reporteProductoresService) {
        this.reporteProductoresService = reporteProductoresService;
        this.usuariosSubject = new rxjs_1.BehaviorSubject([]);
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
        this.dataLength = 0;
    }
    ReporteProductoresDataSource.prototype.connect = function (collectionViewer) {
        return this.usuariosSubject.asObservable();
    };
    ReporteProductoresDataSource.prototype.disconnect = function (collectionViewer) {
        this.usuariosSubject.complete();
        this.loadingSubject.complete();
    };
    ReporteProductoresDataSource.prototype.load = function () {
        var _this = this;
        this.loadingSubject.next(true);
        this.reporteProductoresService.reporte().pipe(operators_1.catchError(function () { return rxjs_1.of([]); }), operators_1.finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (response) {
            if (response.exito) {
                _this.dataLength = response.datos.length;
                _this.usuariosSubject.next(response.datos);
            }
        });
    };
    return ReporteProductoresDataSource;
}());
exports.ReporteProductoresDataSource = ReporteProductoresDataSource;
//# sourceMappingURL=reporte-productores-data-source.js.map
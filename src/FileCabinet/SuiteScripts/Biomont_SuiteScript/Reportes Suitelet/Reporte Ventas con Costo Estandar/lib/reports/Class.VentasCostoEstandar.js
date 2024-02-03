/**
 * @NApiVersion 2.1
 */
define(['./Class.ReportRenderer', '../data/Lib.Basic', '../data/Lib.Search', '../data/Lib.Process', '../data/Lib.Helper', 'N'],

    function (ReportRenderer, Basic, Search, Process, Helper, N) {

        const { log } = N;

        /******************/

        class VentasCostoEstandar extends ReportRenderer {

            constructor(params) {
                // Enviamos template a ReportRenderer
                if (params.xls === 'T') {
                    super(Basic.DATA.Report.VENTAS_DETALLADAS_XLS);
                } else {
                    super(Basic.DATA.Report.VENTAS_DETALLADAS);
                }

                // Obtener parametros
                let { subsidiary, dateFrom, dateTo } = params;

                // Debug
                // Helper.error_log('params', params);

                // Obtener datos para enviar
                let dataVentas = Search.getDataVentasDetalladasByFecha(subsidiary, dateFrom, dateTo);
                let dataRevaluacion = Search.getDataRevaluacion(subsidiary);
                let dataOV_RegistrosRelacionados = Search.getDataOrdenVenta_RegistrosRelacionados(dataVentas);
                let dataVentas_Completo = Process.getDataVentas_Completo(dataVentas, dataRevaluacion, dataOV_RegistrosRelacionados);

                // Procesar reporte
                let dataReporte = Process.getReporteFreeMarker(dataVentas_Completo);

                // Debug
                // Helper.error_log('dataVentas', dataVentas);
                // Helper.error_log('dataRevaluacion', dataRevaluacion);
                // Helper.error_log('dataOV_RegistrosRelacionados', dataOV_RegistrosRelacionados);
                // Helper.error_log('dataVentas_Completo', dataVentas_Completo);
                // Helper.error_log('dataReporte', dataReporte);

                // Enviar data a archivos HTML o Excel
                let titleDocument = 'Reporte de Ventas con Costo';
                this.addInput('name', titleDocument);
                this.addInput('transactions', dataReporte);
            }
        }

        return VentasCostoEstandar

    });

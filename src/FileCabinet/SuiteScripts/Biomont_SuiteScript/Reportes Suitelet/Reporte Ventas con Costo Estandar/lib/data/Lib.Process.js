/**
 * @NApiVersion 2.1
 */
define(['./Lib.Helper', 'N'],

    function (Helper, N) {

        function agruparRevaluacion(dataRevaluacion) {

            // Obtener revaluacion en formato agrupado por articulo, almacen y fecha
            let dataRevaluacionAgrupada = {}; // * Audit: Util, manejo de JSON

            dataRevaluacion.forEach(element => {

                // Obtener variables
                let item = element.item;
                let location = element.location;
                let trandate_number = element.trandate_number;

                // Agrupar data - revaluaciones por articulo, almacen y fecha
                dataRevaluacionAgrupada[item] = dataRevaluacionAgrupada[item] || {};
                dataRevaluacionAgrupada[item][location] = dataRevaluacionAgrupada[item][location] || {};
                dataRevaluacionAgrupada[item][location][trandate_number] = dataRevaluacionAgrupada[item][location][trandate_number] || {};
                dataRevaluacionAgrupada[item][location][trandate_number] = element;

                // Otra forma
                // dataRevaluacionAgrupada[item] ??= {};
                // dataRevaluacionAgrupada[item][location] ??= {};
                // dataRevaluacionAgrupada[item][location][trandate_number] ??= {};
                // dataRevaluacionAgrupada[item][location][trandate_number] = element;
            });

            return dataRevaluacionAgrupada;
        }

        function getDataVentas_Completo(dataVentas, dataRevaluacion, dataOV_RegistrosRelacionados) {

            if (Object.keys(dataRevaluacion || []).length > 0) {

                // Agrupar Revaluacion de Inventario
                let dataRevaluacionAgrupada = agruparRevaluacion(dataRevaluacion);

                // Validacion en consola del navegador
                // let prueba = {};
                // prueba['a']; // No genera error
                // prueba['a']['b']; // Generar error
                // prueba[1]; // No generar error
                // prueba[1][2]; // Generar error

                // Recorremos ventas para asignar revaluaciones
                dataVentas.forEach((value_ven, key_ven) => {

                    // Asignar datos por defecto del costo unitario estandar a la venta
                    let costo_estandar = 0;
                    dataVentas[key_ven]['costo_unitario_estandar'] = costo_estandar;
                    dataVentas[key_ven]['costo_total_estandar'] = parseFloat(value_ven.cantidad) * parseFloat(costo_estandar);

                    // Obtener variables
                    let item = value_ven.codigo;
                    let location = value_ven.almacen.id;
                    let trandate_number = value_ven.fecha_numero;

                    // Obtener JSON de revaluaciones por articulo y almacen
                    let dataCostoEstandarJson = dataRevaluacionAgrupada[item]?.[location];

                    // Asignar elementos del JSON a un Array
                    let dataCostoEstandarArray = [];
                    for (var key_cosest in dataCostoEstandarJson) {
                        dataCostoEstandarArray.push(dataCostoEstandarJson[key_cosest]);
                    }

                    // Verificar Array de revaluaciones
                    // if (value_ven.nro_doc === 'BV B001-00004602' && value_ven.codigo === 'SOT0000047'){
                    //     Helper.error_log('', dataCostoEstandarArray);
                    // }

                    // Ordenar Array por fecha, de mayor a menor
                    dataCostoEstandarArray.sort((a, b) => b.trandate_number - a.trandate_number);

                    // Verificar Array de revaluaciones
                    // if (value_ven.nro_doc === 'BV B001-00004602' && value_ven.codigo === 'SOT0000047'){
                    //     Helper.error_log('', dataCostoEstandarArray);
                    // }

                    // Recorrer Array de revaluaciones
                    dataCostoEstandarArray.forEach((value_cosest, key_cosest) => {

                        // Solo seguimos recorriendo revaluaciones si la venta aun no cuenta con costo unitario estandar
                        if (costo_estandar === 0) {

                            // Solo si la fecha de las revaluaciones es igual o menor a la fecha de la venta
                            if (parseInt(value_cosest.trandate_number) <= parseInt(trandate_number)) {

                                // Asignar costo unitario estandar a la venta
                                costo_estandar = parseFloat(value_cosest.costcomponentstandardcost || 0);
                                dataVentas[key_ven]['costo_unitario_estandar'] = costo_estandar;
                                dataVentas[key_ven]['costo_total_estandar'] = parseFloat(value_ven.cantidad) * parseFloat(costo_estandar);
                                return;
                            }
                        }
                    });
                });
            }

            if (Object.keys(dataOV_RegistrosRelacionados || []).length > 0) {

                // Recorremos ventas para asignar guias de remision
                let guias_remision;
                dataVentas.forEach((value_ven, key_ven) => {
                    guias_remision = '';

                    dataOV_RegistrosRelacionados.forEach((value_ov, key_ov) => {
                        if (value_ven.orden_venta_id_interno == value_ov.orden_venta_internal_id) {
                            guias_remision += `${value_ov.related_record_number},`;
                        }
                    });

                    guias_remision = guias_remision.substring(0, guias_remision.length - 1);
                    dataVentas[key_ven]['guias_remision'] = guias_remision;
                });
            }

            return dataVentas;
        }

        function getReporteFreeMarker(dataReporte) {

            // Convertir valores nulos en un objeto JavaScript a string - Al parecer FreeMarker no acepta valores nulos
            // dataReporte = Helper.convertObjectValuesToStrings(dataReporte);

            return dataReporte;
        }

        return { agruparRevaluacion, getDataVentas_Completo, getReporteFreeMarker }

    });

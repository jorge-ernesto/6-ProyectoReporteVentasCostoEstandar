/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Helper', 'N'],

    function (Basic, Helper, N) {

        const { search } = N;

        /******************/

        function getDataVentasDetalladasByFecha(subsidiary, dateFrom, dateTo) {

            // Declarar variables
            let resultTransaction = [];

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            addColumnsVentas(transactionQuery, 'reporte_ventas_costo_estandar')

            // Agregar filtros
            let filters = { subsidiary, dateFrom, dateTo };
            addFiltersVentas(transactionQuery, filters, 'reporte_ventas_costo_estandar');

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let tipo_doc = node.getValue(0);
                let tipo_doc_nombre = node.getText(0);
                let nro_doc = node.getValue(1);
                let ruc_dni = node.getValue(2);
                let nombre_cliente = node.getValue(3);
                let fecha = node.getValue(4);
                let linea = node.getValue(5);
                let linea_nombre = node.getText(5);
                let codigo = node.getValue(6);
                let descripcion = node.getValue(7);
                let present = node.getValue(8);
                let present_nombre = node.getText(8);
                let cantidad = node.getValue(9);
                let precio = node.getValue(10);
                let costo_unitario_estandar = 0;
                let costo_total_estandar = 0;
                let importe_bruto = node.getValue(13);
                let d1 = node.getValue(14);
                let d2 = node.getValue(15);
                let importe_neto = node.getValue(16);
                let importe_usd = node.getValue(17);
                let moneda = node.getValue(18);
                let moneda_nombre = node.getText(18);
                let tipo_cambio = node.getValue(19);
                let doc_referencia = node.getValue(20);
                let condicion_pago = node.getValue(21);
                let condicion_pago_nombre = node.getText(21);
                let vendedor = node.getValue(22);
                let departamento = node.getValue(23);
                let departamento_nombre = node.getText(23);
                let division = node.getValue(24); // Unidad de Negocio
                let division_nombre = node.getText(24); // Unidad de Negocio
                let zona = node.getValue(25);
                let zona_nombre = node.getText(25);
                let region = node.getValue(26);
                let region_nombre = node.getText(26);
                let tipo_impuesto = node.getValue(27);
                let tipo_impuesto_nombre = node.getText(27);
                let tipo_operacion = node.getValue(28);
                let tipo_operacion_nombre = node.getValue(29);
                let tipo_operacion_biomont = node.getValue(30);
                let tipo_operacion_biomont_nombre = node.getText(30);
                let guia_remision = node.getValue(31);
                let almacen = node.getValue(32);
                let almacen_nombre = node.getText(32);

                let porciones = fecha.split('/');
                let fecha_numero = parseInt(porciones[2] + '' + porciones[1]);
                let anio = porciones[2];
                let mes = porciones[1];
                let sector = (ruc_dni.length == 8 || ruc_dni.length == 11) ? 'NACIONAL' : 'EXTRANJERO';

                // Adicional
                let orden_venta_id_interno = node.getValue(33);
                let orden_venta_nombre = node.getValue(34);

                resultTransaction.push({
                    tipo_doc: { id: tipo_doc, nombre: tipo_doc_nombre },
                    nro_doc: nro_doc,
                    ruc_dni: ruc_dni,
                    nombre_cliente: nombre_cliente,
                    fecha: fecha,
                    linea: { id: linea, nombre: linea_nombre },
                    codigo: codigo,
                    descripcion: descripcion,
                    present: { id: present, nombre: present_nombre },
                    cantidad: cantidad,
                    precio: precio,
                    costo_unitario_estandar: costo_unitario_estandar,
                    costo_total_estandar: costo_total_estandar,
                    importe_bruto: importe_bruto,
                    d1: d1,
                    d2: d2,
                    importe_neto: importe_neto,
                    importe_usd: importe_usd,
                    moneda: { id: moneda, nombre: moneda_nombre },
                    tipo_cambio: tipo_cambio,
                    doc_referencia: doc_referencia,
                    condicion_pago: { id: condicion_pago, nombre: condicion_pago_nombre },
                    vendedor: vendedor,
                    departamento: { id: departamento, nombre: departamento_nombre },
                    division: { id: division, nombre: division_nombre }, // Unidad de Negocio
                    zona: { id: zona, nombre: zona_nombre },
                    region: { id: region, nombre: region_nombre },
                    tipo_impuesto: { id: tipo_impuesto, nombre: tipo_impuesto_nombre },
                    tipo_operacion: { id: tipo_operacion, nombre: tipo_operacion_nombre },
                    tipo_operacion_biomont: { id: tipo_operacion_biomont, nombre: tipo_operacion_biomont_nombre },
                    guia_remision: guia_remision,
                    almacen: { id: almacen, nombre: almacen_nombre },
                    fecha_numero: fecha_numero,
                    anio: anio,
                    mes: mes,
                    sector: sector,
                    orden_venta_id_interno: orden_venta_id_interno,
                    orden_venta_nombre: orden_venta_nombre,
                })
            });

            // Helper.error_log('getDataReporteVentasDetalladas', resultTransaction);
            return resultTransaction;
        }

        function getDataVentasDetalladasByPeriodo(subsidiary, periods) {

            // Declarar variables
            let resultTransaction = [];

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            addColumnsVentas(transactionQuery, 'reporte_bonificacion_descuento')

            // Agregar filtros
            let filters = { subsidiary, periods };
            addFiltersVentas(transactionQuery, filters, 'reporte_bonificacion_descuento');

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let ruc_dni = node.getValue(0);
                let fecha = node.getValue(1);
                let codigo = node.getValue(2);
                let cantidad = node.getValue(3);
                let costo_unitario_estandar = 0;
                let costo_total_estandar = 0;
                let tipo_impuesto = node.getValue(6);
                let tipo_impuesto_nombre = node.getText(6);
                let tipo_operacion = node.getValue(7);
                let tipo_operacion_nombre = node.getValue(8);
                let tipo_operacion_biomont = node.getValue(9);
                let tipo_operacion_biomont_nombre = node.getText(9);
                let almacen = node.getValue(10);
                let almacen_nombre = node.getText(10);

                let porciones = fecha.split('/');
                let fecha_numero = parseInt(porciones[2] + '' + porciones[1]);
                let sector = (ruc_dni.length == 8 || ruc_dni.length == 11) ? 'NACIONAL' : 'EXTRANJERO';

                // Adicional
                let periodo_contable_id_interno = node.getValue(11);
                let periodo_contable_nombre = node.getValue(12);

                resultTransaction.push({
                    ruc_dni: ruc_dni,
                    fecha: fecha,
                    codigo: codigo,
                    cantidad: cantidad,
                    costo_unitario_estandar: costo_unitario_estandar,
                    costo_total_estandar: costo_total_estandar,
                    tipo_impuesto: { id: tipo_impuesto, nombre: tipo_impuesto_nombre },
                    tipo_operacion: { id: tipo_operacion, nombre: tipo_operacion_nombre },
                    tipo_operacion_biomont: { id: tipo_operacion_biomont, nombre: tipo_operacion_biomont_nombre },
                    almacen: { id: almacen, nombre: almacen_nombre },
                    fecha_numero: fecha_numero,
                    sector: sector,
                    periodo_contable_id_interno: periodo_contable_id_interno,
                    periodo_contable_nombre: periodo_contable_nombre,
                })
            });

            // Helper.error_log('getDataReporteVentasDetalladas', resultTransaction);
            return resultTransaction;
        }

        function addColumnsVentas(transactionQuery, report) {

            if (report == 'reporte_ventas_costo_estandar') {
                transactionQuery.pushColumn({
                    name: "custbody_ns_document_type",
                    sort: search.Sort.ASC,
                    label: "Tipo Doc"
                });
                transactionQuery.pushColumn({
                    name: "tranid",
                    sort: search.Sort.ASC,
                    label: "Nro Doc"
                });
                transactionQuery.pushColumn({
                    name: "custentity_bio_num_doc",
                    join: "customer",
                    label: "RUC/DNI"
                });
                transactionQuery.pushColumn({
                    name: "altname",
                    join: "customer",
                    label: "Nombre del Cliente"
                });
                transactionQuery.pushColumn({
                    name: "trandate",
                    sort: search.Sort.ASC,
                    label: "Fecha"
                });
                transactionQuery.pushColumn({
                    name: "custitem3",
                    join: "item",
                    label: "Linea"
                });
                transactionQuery.pushColumn({
                    name: "itemid",
                    join: "item",
                    label: "Código"
                });
                transactionQuery.pushColumn({
                    name: "displayname",
                    join: "item",
                    label: "Descripción"
                });
                transactionQuery.pushColumn({
                    name: "custitem6",
                    join: "item",
                    label: "Present"
                });
                transactionQuery.pushColumn({ name: "quantity", label: "Cantidad" });
                transactionQuery.pushColumn({ name: "rate", label: "Precio" });
                transactionQuery.pushColumn({
                    name: "formulanumeric",
                    formula: "0",
                    label: "Costo Unitario Estandar"
                });
                transactionQuery.pushColumn({
                    name: "formulanumeric",
                    formula: "0",
                    label: "Costo Total Estandar"
                });
                transactionQuery.pushColumn({ name: "grossamount", label: "Importe S/. (bruto)" });
                transactionQuery.pushColumn({ name: "custcol_bio_desc_1", label: "D1" });
                transactionQuery.pushColumn({ name: "custcol_bio_desc_2", label: "D2" });
                transactionQuery.pushColumn({ name: "netamount", label: "Importe S/ (neto)" });
                transactionQuery.pushColumn({
                    name: "formulanumeric",
                    formula: "CASE WHEN  {currency} = 'Soles' THEN 0 ELSE {fxamount} END  ",
                    label: "Importe USD $"
                });
                transactionQuery.pushColumn({ name: "currency", label: "Moneda" });
                transactionQuery.pushColumn({ name: "exchangerate", label: "Tipo de Cambio" });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "CONCAT({custbody_ns_doc_serie_ref}, {custbody_ns_num_doc_ref})",
                    label: "Doc. refrencia"
                });
                transactionQuery.pushColumn({ name: "custbody12", label: "Condición pago" });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "REPLACE({salesteammember}, '  ' , ' ')",
                    label: "Vendedor"
                });
                transactionQuery.pushColumn({
                    name: "custrecord176",
                    join: "billingAddress",
                    label: "Departamento"
                });
                transactionQuery.pushColumn({
                    name: "custentity14",
                    join: "customer",
                    label: "División"
                });
                transactionQuery.pushColumn({
                    name: "territory",
                    join: "customer",
                    label: "Zona"
                });
                transactionQuery.pushColumn({
                    name: "custentity19",
                    join: "customer",
                    label: "Región"
                });
                transactionQuery.pushColumn({ name: "custcol_ns_afec_igv", label: "Tipo de Impuesto" });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "CASE WHEN {custbody_ns_document_type.internalid} = 8 OR UPPER({custbody_ns_document_type}) = 'NOTA DE CREDITO' THEN 'Nota de credito' WHEN {custbody_ns_document_type.internalid} = 9 OR UPPER({custbody_ns_document_type}) = 'NOTA DE DEBITO' THEN 'Nota de debito' ELSE TO_CHAR({custbody_ns_pe_oper_type.internalid}) END",
                    label: "Tipo de Operación"
                });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "CASE WHEN {custbody_ns_document_type.internalid} = 8 OR UPPER({custbody_ns_document_type}) = 'NOTA DE CREDITO' THEN 'Nota de credito' WHEN {custbody_ns_document_type.internalid} = 9 OR UPPER({custbody_ns_document_type}) = 'NOTA DE DEBITO' THEN 'Nota de debito' ELSE {custbody_ns_pe_oper_type} END",
                    label: "Tipo de Operación"
                });
                transactionQuery.pushColumn({ name: "custbody114", label: "Tipo de Operación BIOMONT" });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "CONCAT(CONCAT(TRIM(NVL({custbody_ns_gr_rel_serie},'')),'-'), TRIM(NVL({custbody_ns_gr_rel_num},'')))",
                    label: "Guía de Remisión"
                });
                transactionQuery.pushColumn({ name: "location", label: "Almacén" });

                // Adicional
                transactionQuery.pushColumn({
                    name: "internalid",
                    join: "createdFrom",
                    label: "Creado desde : ID interno"
                });
                transactionQuery.pushColumn({
                    name: "tranid",
                    join: "createdFrom",
                    label: "Creado desde : Número de documento"
                });
            } else if (report == 'reporte_bonificacion_descuento') {
                transactionQuery.pushColumn({
                    name: "custentity_bio_num_doc",
                    join: "customer",
                    label: "RUC/DNI"
                });
                transactionQuery.pushColumn({
                    name: "trandate",
                    sort: search.Sort.ASC,
                    label: "Fecha"
                });
                transactionQuery.pushColumn({
                    name: "itemid",
                    join: "item",
                    label: "Código"
                });
                transactionQuery.pushColumn({ name: "quantity", label: "Cantidad" });
                transactionQuery.pushColumn({
                    name: "formulanumeric",
                    formula: "0",
                    label: "Costo Unitario Estandar"
                });
                transactionQuery.pushColumn({
                    name: "formulanumeric",
                    formula: "0",
                    label: "Costo Total Estandar"
                });
                transactionQuery.pushColumn({ name: "custcol_ns_afec_igv", label: "Tipo de Impuesto" });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "CASE WHEN {custbody_ns_document_type.internalid} = 8 OR UPPER({custbody_ns_document_type}) = 'NOTA DE CREDITO' THEN 'Nota de credito' WHEN {custbody_ns_document_type.internalid} = 9 OR UPPER({custbody_ns_document_type}) = 'NOTA DE DEBITO' THEN 'Nota de debito' ELSE TO_CHAR({custbody_ns_pe_oper_type.internalid}) END",
                    label: "Tipo de Operación"
                });
                transactionQuery.pushColumn({
                    name: "formulatext",
                    formula: "CASE WHEN {custbody_ns_document_type.internalid} = 8 OR UPPER({custbody_ns_document_type}) = 'NOTA DE CREDITO' THEN 'Nota de credito' WHEN {custbody_ns_document_type.internalid} = 9 OR UPPER({custbody_ns_document_type}) = 'NOTA DE DEBITO' THEN 'Nota de debito' ELSE {custbody_ns_pe_oper_type} END",
                    label: "Tipo de Operación"
                });
                transactionQuery.pushColumn({ name: "custbody114", label: "Tipo de Operación BIOMONT" });
                transactionQuery.pushColumn({ name: "location", label: "Almacén" });

                // Adicional
                transactionQuery.pushColumn({
                    name: "internalid",
                    join: "accountingPeriod",
                    label: "Período contable : ID interno"
                });
                transactionQuery.pushColumn({
                    name: "periodname",
                    join: "accountingPeriod",
                    label: "Período contable : Nombre"
                });
            }
        }

        function addFiltersVentas(transactionQuery, filters, report) {

            let { subsidiary, dateFrom, dateTo, periods } = filters;

            // Filtro de subsidiary
            let array_where_subsidiary = ["subsidiary", "anyof", "@NONE@"];
            if (subsidiary != '') {
                array_where_subsidiary = ["subsidiary", "anyof", subsidiary];
            }

            // Filtro de fecha
            let array_where_date = ["trandate", "within", "today"];
            if (report == 'reporte_ventas_costo_estandar') {
                array_where_date = ["trandate", "within", dateFrom, dateTo];
            } else if (report == 'reporte_bonificacion_descuento') {
                array_where_date = ["accountingperiod.internalid", "anyof"].concat(periods);
            }

            if (report == 'reporte_ventas_costo_estandar' || report == 'reporte_bonificacion_descuento') {
                let filters = [
                    ["mainline", "is", "F"],
                    "AND",
                    ["taxline", "is", "F"],
                    "AND",
                    ["type", "anyof", "CustInvc", "CustCred"],
                    "AND",
                    ["custbody_ns_document_type", "anyof", "2", "4", "8", "60", "9", "61"],
                    "AND",
                    array_where_subsidiary,
                    "AND",
                    ["item.type", "noneof", "Discount"],
                    "AND",
                    ["status", "noneof", "CustInvc:V", "CustCred:V"],
                    "AND",
                    ["custcol_ns_afec_igv", "noneof", "@NONE@"],
                    "AND",
                    ["contribution", "greaterthan", "0"],
                    "AND",
                    array_where_date,
                    "AND",
                    ["currency", "anyof", "@ALL@"],
                    "AND",
                    [
                        [["item.custitem3", "anyof", "1", "3", "2", "9", "11", "10", "4", "37"], "OR",
                        [["item.custitem3", "anyof", "38"], "AND", ["item", "anyof", "8885", "8890", "8895", "8935", "17242"]]]
                    ],
                    "AND",
                    ["item", "noneof", "12727", "4511"]
                ];

                if (report == 'reporte_bonificacion_descuento') {
                    filters.push('AND');
                    filters.push(
                        [
                            ["custcol_ns_afec_igv", "anyof", "16"], "OR",
                            ["custbody_ns_pe_oper_type", "anyof", "33"], "OR",
                            ["custbody114", "anyof", "13"]
                        ]
                    );
                }

                transactionQuery.updateFilters(filters);
            }
        }

        function getDataRevaluacion(subsidiary) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de subsidiary
            let array_where_subsidiary = ["subsidiary", "anyof", "@NONE@"];
            if (subsidiary != '') {
                array_where_subsidiary = ["subsidiary", "anyof", subsidiary];
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('inventorycostrevaluation');

            // Agregar columnas
            transactionQuery.pushColumn({
                name: "internalid",
                summary: "MAX",
                label: "ID interno"
            });
            transactionQuery.pushColumn({
                name: "trandate",
                summary: "GROUP",
                sort: search.Sort.DESC,
                label: "Date"
            });
            transactionQuery.pushColumn({
                name: "tranid",
                summary: "GROUP",
                sort: search.Sort.DESC,
                label: "Nro Ref."
            });
            transactionQuery.pushColumn({
                name: "memo",
                summary: "MAX",
                label: "Nota"
            });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "location",
                summary: "MAX",
                label: "Almacén : ID interno"
            });
            transactionQuery.pushColumn({
                name: "location",
                summary: "MAX",
                label: "Almacén"
            });
            transactionQuery.pushColumn({
                name: "item",
                summary: "MAX",
                label: "Articulo"
            });
            transactionQuery.pushColumn({
                name: "custbody_bio_cam_cos_md",
                summary: "MAX",
                label: "Costo MD"
            });
            transactionQuery.pushColumn({
                name: "custbody_bio_cam_cos_mod",
                summary: "MAX",
                label: "Costo MOD"
            });
            transactionQuery.pushColumn({
                name: "custbody_bio_cam_cos_srv",
                summary: "MAX",
                label: "Costo SRV"
            });
            transactionQuery.pushColumn({
                name: "custbody_bio_cam_cos_cif",
                summary: "MAX",
                label: "Costo CIF"
            });
            transactionQuery.pushColumn({
                name: "formulanumeric",
                summary: "MAX",
                formula: "CASE WHEN {effectivestandardcost} = 'T' THEN {costcomponentstandardcost} END",
                label: "Costo Estandar (Efectivo)"
            });
            transactionQuery.pushColumn({
                name: "subsidiary",
                summary: "MAX",
                label: "Subsidiaria"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["type", "anyof", "InvReval"],
                // "AND",
                // ["trandate", "within", "previousoneyear"],
                "AND",
                array_where_subsidiary
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let internal_id = node.getValue(0);
                let trandate = node.getValue(1);
                let tranid = node.getValue(2);
                let memo = node.getValue(3);
                let location = node.getValue(4);
                let location_nombre = node.getValue(5);
                let item = node.getValue(6);
                let costo_estandar_md = node.getValue(7);
                let costo_estandar_mod = node.getValue(8);
                let costo_estandar_srv = node.getValue(9);
                let costo_estandar_cif = node.getValue(10);
                let costcomponentstandardcost = node.getValue(11);
                let subsidiary = node.getValue(12);

                let porciones = trandate.split('/');
                let trandate_number = parseInt(porciones[2] + '' + porciones[1]);

                resultTransaction.push({
                    internal_id: internal_id,
                    trandate: trandate,
                    tranid: tranid,
                    memo: memo,
                    location: location,
                    location_nombre: location_nombre,
                    item: item,
                    costo_estandar_md: costo_estandar_md,
                    costo_estandar_mod: costo_estandar_mod,
                    costo_estandar_srv: costo_estandar_srv,
                    costo_estandar_cif: costo_estandar_cif,
                    costcomponentstandardcost: costcomponentstandardcost,
                    subsidiary: subsidiary,
                    trandate_number: trandate_number,
                });
            });

            // Helper.error_log('getDataRevaluacion', resultTransaction);
            return resultTransaction;
        }

        function getDataOrdenVenta_RegistrosRelacionados(dataVentas) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de articulos
            let data_item_id_interno = getFilterOrdenVenta(dataVentas);
            let array_where_orden_venta = ["internalid", "anyof", "@NONE@"];
            if (Object.keys(dataVentas).length > 0) {
                array_where_orden_venta = ["internalid", "anyof"].concat(data_item_id_interno);
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('salesorder');

            // Agregar columnas
            transactionQuery.pushColumn({
                name: "internalid",
                summary: "GROUP",
                label: "Internal ID"
            });
            transactionQuery.pushColumn({
                name: "trandate",
                join: "applyingTransaction",
                summary: "MAX",
                label: "Related Records : DATE"
            });
            transactionQuery.pushColumn({
                name: "type",
                join: "applyingTransaction",
                summary: "MAX",
                label: "Related Records : TYPE"
            });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "applyingTransaction",
                summary: "GROUP",
                label: "Related Records : INTERNAL ID"
            });
            transactionQuery.pushColumn({
                name: "tranid",
                join: "applyingTransaction",
                summary: "GROUP",
                label: "Related Records : NUMBER"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["type", "anyof", "SalesOrd"],
                "AND",
                array_where_orden_venta,
                "AND",
                ["applyingtransaction.type", "anyof", "ItemShip"]
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let orden_venta_internal_id = node.getValue(0);
                let related_record_date = node.getValue(1);
                let related_record_type = node.getValue(2);
                let related_record_internal_id = node.getValue(3);
                let related_record_number = node.getValue(4);

                resultTransaction.push({
                    orden_venta_internal_id: orden_venta_internal_id,
                    related_record_date: related_record_date,
                    related_record_type: related_record_type,
                    related_record_internal_id: related_record_internal_id,
                    related_record_number: related_record_number,
                });
            });

            // Helper.error_log('getDataOrdenVenta_RegistrosRelacionados', resultTransaction);
            return resultTransaction;
        }

        function getFilterOrdenVenta(dataVentas) {

            // Obtener articulos
            let data_orden_venta_id_interno = [];
            dataVentas.forEach(element => {
                data_orden_venta_id_interno.push(element.orden_venta_id_interno)
            });
            // Helper.error_log('data_orden_venta_id_interno', data_orden_venta_id_interno);

            // Filtrar articulos duplicados
            // Referencia: https://matiashernandez.dev/blog/post/4-formas-de-eliminar-elementos-duplicados-en-un-arreglo-con-javascript
            let data_filter_orden_venta_id_interno = [];
            const dataArr = new Set(data_orden_venta_id_interno);
            data_filter_orden_venta_id_interno = [...dataArr];
            // Helper.error_log('data_filter_orden_venta_id_interno', data_filter_orden_venta_id_interno);

            return data_filter_orden_venta_id_interno;
        }

        return { getDataVentasDetalladasByFecha, getDataVentasDetalladasByPeriodo, getDataRevaluacion, getDataOrdenVenta_RegistrosRelacionados }

    });

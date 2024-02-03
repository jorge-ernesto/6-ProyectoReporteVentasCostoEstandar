/**
 * @NApiVersion 2.1
 */
define(['N', './data/Lib.Dao', './data/Lib.Basic', './data/Lib.Helper'],

    function (N, DAO, Basic, Helper) {

        const { log, redirect, runtime } = N;
        const { serverWidget } = N.ui;

        /******************/

        var formContext = {
            dao: null,
            form: null,
            params: {}
        }

        const SUITELET_RECORD = {
            title: 'custpage_report_title',
            groups: {
                main: 'custpage_report_group_criteria_1',
                criteria: 'custpage_report_group_criteria_2'
            },
            fields: {
                subsidiary: 'custpage_report_criteria_subsidiary',
                dateFrom: 'custpage_report_criteria_date_from',
                dateTo: 'custpage_report_criteria_date_to'
            },
            buttons: {
                generate: 'custpage_report_button_visualize',
                exportXLS: 'custpage_report_button_export_xls',
                exportCSV: 'custpage_report_button_export_csv'
            }
        }

        function setInput(params) {
            log.debug('Input.Report', params);
            formContext.params = params;
        }

        function selectedReport() {
            log.debug('selectedReport', formContext.params.report);
            return Number(formContext.params.report);
        }

        /**
         * description : Create Basic Form, add buttons and client script
         */
        function createReportForm() {

            formContext.dao = new DAO();
            formContext.form = serverWidget.createForm({
                title: formContext.dao.get(SUITELET_RECORD.title)
            });

            formContext.form.addSubmitButton({
                label: formContext.dao.get(SUITELET_RECORD.buttons.generate)
            });

            // formContext.form.clientScriptModulePath = '../Bio.ClientScript.ReporteVentasCostoEstandar'

            // formContext.form.addButton({
            //     id: SUITELET_RECORD.buttons.exportXLS,
            //     label: formContext.dao.get(SUITELET_RECORD.buttons.exportXLS),
            //     functionName: 'exportToExcel()'
            // });
        }

        /**
         * description : create criteria Fields
         */
        function createCriteriaGroup() {

            // Criteria Group
            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.criteria,
                label: formContext.dao.get(SUITELET_RECORD.groups.criteria),
            });

            // Subsidiary Field
            let subsidiaryField = formContext.form.addField({
                id: SUITELET_RECORD.fields.subsidiary,
                label: formContext.dao.get(SUITELET_RECORD.fields.subsidiary),
                type: 'select',
                source: 'subsidiary',
                container: SUITELET_RECORD.groups.criteria
            });
            subsidiaryField.updateBreakType({ breakType: 'STARTCOL' })
            subsidiaryField.isMandatory = true;

            if (formContext.params.subsidiary) {
                subsidiaryField.defaultValue = formContext.params.subsidiary;
            }

            // DateFrom Field
            let dateFromField = formContext.form.addField({
                id: SUITELET_RECORD.fields.dateFrom,
                label: formContext.dao.get(SUITELET_RECORD.fields.dateFrom),
                type: 'date',
                container: SUITELET_RECORD.groups.criteria
            });
            dateFromField.updateBreakType({ breakType: 'STARTCOL' })
            dateFromField.isMandatory = true;

            if (formContext.params.dateFrom) {
                dateFromField.defaultValue = formContext.params.dateFrom;
            }

            // DateTo Field
            let dateToField = formContext.form.addField({
                id: SUITELET_RECORD.fields.dateTo,
                label: formContext.dao.get(SUITELET_RECORD.fields.dateTo),
                type: 'date',
                container: SUITELET_RECORD.groups.criteria
            });
            dateToField.updateBreakType({ breakType: 'STARTCOL' })
            dateToField.isMandatory = true;

            if (formContext.params.dateTo) {
                dateToField.defaultValue = formContext.params.dateTo;
            }
        }

        /**
         * Create HTML Container Field
         */
        function createViewerModel(htmlReport) {

            let viewerModelField = formContext.form.addField({
                id: 'custpage_report_viewer_html',
                label: ' ',
                type: 'inlinehtml'
            });
            viewerModelField.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.OUTSIDEBELOW
            });

            let htmlContainer = new String();
            htmlContainer = htmlContainer.concat(Helper.getDefaultStyle());
            htmlContainer = htmlContainer.concat(htmlReport);
            viewerModelField.defaultValue = htmlContainer;
        }

        /**
         * Return form
         */
        function getForm() {
            return formContext.form;
        }

        /**
         * Redirect to the same suitelet
         */
        function loadReportForm(params) {

            let getParams = {};
            for (var x in SUITELET_RECORD.fields) {
                let value = params[SUITELET_RECORD.fields[x]];
                if (value) {
                    getParams[x] = value;
                }
            }
            getParams['report'] = 1;

            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: getParams
            });
        }

        return {
            setInput,
            selectedReport,
            createReportForm,
            createCriteriaGroup,
            createViewerModel,
            getForm,
            loadReportForm
        }

    });

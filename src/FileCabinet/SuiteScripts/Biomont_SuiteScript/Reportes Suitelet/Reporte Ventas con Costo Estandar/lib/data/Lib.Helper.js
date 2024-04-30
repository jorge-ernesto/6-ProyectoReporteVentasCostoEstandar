/**
 * @NApiVersion 2.1
 */
define(['N'],

    function (N) {

        const { runtime, email, file } = N;

        function error_log(title, data) {
            throw `${title} -- ${JSON.stringify(data)}`;
        }

        function email_log(title, data) {
            let user = runtime.getCurrentUser();
            email.send({
                author: user.id,
                recipients: user.id,
                subject: title,
                body: `<pre>${JSON.stringify(data)}</pre>`,
            })
        }

        /******************/

        // Convertir valores nulos en un objeto JavaScript a string - Al parecer FreeMarker no acepta valores nulos
        function convertObjectValuesToStrings(obj) {
            for (const key in obj) {
                if (obj[key] === null) {
                    obj[key] = '';
                } else if (typeof obj[key] === 'number') {
                    obj[key] = obj[key];
                    // obj[key] = obj[key].toString();
                } else if (typeof obj[key] === 'object') {
                    // Si el valor es un objeto, llamamos recursivamente a la función
                    convertObjectValuesToStrings(obj[key]);
                }
            }
            return obj;
        }

        /******************/

        function getDefaultStyle() {
            let style = file.load('../../assets/styles.css').url;
            return `<link rel="stylesheet" href="${style}">`;
        }

        return { error_log, email_log, convertObjectValuesToStrings, getDefaultStyle }

    });

const glob = require('glob')

let pages = {};
glob.sync('./src/pages/**/*.js').forEach(function(entry) {
    let tmp = entry.split('/').splice(-3);
    pages[tmp[1]] = {
        entry,
        template: 'public/template.html',
    };
});

module.exports = {
    pages: pages,
    lintOnSave: false,
    filenameHashing: false,
    pluginOptions: {
        i18n: {
            locale: 'ko',
            fallbackLocale: 'ko',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8192',
                withCredentials: true,
            },
            '/ws': {
                target: 'ws://localhost:8192',
                webSocketTransport: 'ws',
                withCredentials: true,
                ws: true,
            },
        },
        disableHostCheck: true,
    },
    outputDir: '/usr/local/etc/nginx/dist',
};

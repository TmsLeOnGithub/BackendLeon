import log4js from 'log4js'

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFile: { type: `file`, filename: 'error.log' },
        miLoggerFile2: { type: `file`, filename: 'warn.log' },
        loggerErrores: { type: 'logLevelFilter', appender: 'miLoggerFile', level: 'error'},
        loggerWarnings: { type: 'logLevelFilter', appender: 'miLoggerFile2', level: 'warn'}

    },
    categories: {
        default: { appenders: ['miLoggerConsole', "loggerErrores", "loggerWarnings"], level: "all" },
        prod: { appenders: ['miLoggerConsole', "loggerErrores", "loggerWarnings"], level: "warn" },
    }

})


let logger = null

if (process.env.NODE_ENV === 'PROD') {
    logger = log4js.getLogger('prod')
} else {
    logger = log4js.getLogger()
}

export default logger
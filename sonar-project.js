const sonarqubeScanner =  require('sonarqube-scanner');
const server = sonarqubeScanner(
    {
        serverUrl:  'http://localhost:9000',
        options : {
            'sonar.sources':  'server',
            'sonar.tests':  'server',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  'server/**/*.spec.js,server/**/*.spec.jsx,server/**/*.test.js,server/**/*.test.jsx',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});

module.exports  = server;
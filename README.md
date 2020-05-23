# 軟體測試期末報告 
自動化研討會活動建置與管理雲端系統後端 API 服務。

## Getting Started

### Prerequisites
該電腦需要有 Node 環境。

### Installing
把專案 clone 到本地段
```
git clone https://github.com/D0561910/AMW_Server.git
```

進入該文件
```
cd AMW_Server
```

Downloads a package and it's dependencies.
```
npm install
```

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
```
npm run up
```

Launches the test runner in the interactive watch mode.
```
npm run test
```

Start up sonarQube Docker image.
Open http://localhost:9000 to view it in the browser.
Login username and password by default "admin"
```
docker-compose -f docker-compose.sonar.yml up -d
```

This command is responsible for executing the pipeline and committing SonarQube
```
npm run sonar
```

# rn-game-land-web

건모의 보드게임 웹

`vue.js 3` 공부용 토이 프로젝트

[동시 개발중인 백엔드 서버](https://github.com/thak1411/rn-game-land-server)

---

# Documentation

## Architecture

~~~
-public    : Template For Build File
-dist      : Build File
-src       : All Project Source Code
  -assets  : Image & ttf Files
  -i18n    : vue-i18n Module
  -locales : Language Pack
  -pages   : MPA's End Point Page Builder
  -router  : Vue Router Module (Use For History Mode)
  -store   : Vuex Container
  -views   : Components & Sections Implementations
-test      : Unit & E2E Test Code
~~~

## Prerequisites

### Brew

오픈소스 패키지를 쉽게 사용 및 관리할 수 있는 [homebrew](https://brew.sh)를 설치해야 한다.

~~~shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
~~~

### Node

`brew install nvm` 후 `14.17.6`버전 설치를 권장.

`node`와 `node-sass@4.12.0`가 의존성을 갖는다. `node-sass@4.12.0` 은 node 14 까지 지원하기 때문에 최신 node 를 설치하면 빌드가 되지 않는다.

~~~shell
nvm install 14.17.6
~~~

### Npm

Node를 설치할 때 보통 같이 깔리지만, 깔리지 않았다면, 어떠한 경로로든 같이 깔아줘야 한다.

~~~shell
brew install npm
~~~

### Nginx

개발환경에서도 프록싱을 이용하려면 설치해야 한다.

~~~shell
brew install nginx
~~~

### @vue/cli

vue 프로젝트를 커맨드라인에서 빌드 및 실행을 하기위한 도구로 필수로 깔아야 한다. 커맨드라인으로 사용할 패키지이기 때문에 전역으로 깔아준다.

~~~shell
npm install -g @vue/cli
~~~

---

## Warnings

새로운 환경에서 배포할때 `vue.config.js`에 존재하는 `outputDir` 옵션과 nginx 설정을 동시에 바꾸어야한다.

---

컨텐츠

1. 유저 프로필 페이지
2. 게임 고를 수 있는 페이지
3. 유저를 보고 친추할 수 있는 페이지
4. 유저 랭킹 페이지

메인 페이지 컨텐츠

1. 모든 유저가 있는 채팅 시스템
2. 게임 추천 및 사진으로 게임 접근성 증가 컨텐츠

깔끔한 토스트 메시지 위치
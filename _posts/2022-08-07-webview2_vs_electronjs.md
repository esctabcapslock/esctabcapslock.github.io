---
layout: post
mathjax: false
highlightjs: true
title: "webview2와 Electronjs"
category: "Javascript"
---


> timetime 프로젝트 GUI를 만들기 위해 webview2를 사용해보았다.

- ICoreWebView2 모듈이 핵심임

- `windows.NavigateToString(html_txt)`하면 html을 로딩
- `window.Navigate(url_txt)` 하면 url 접속
- add_WebMessageReceived 같은 리스너 함수로 통신. 웹에서도 이벤트 리스너를 받어
-  `window.chrome.webview` 객체 활용

## 단점
- 구리다...
- rust+win32개발로 코드가 더럽다.
- 웹뷰 모시기라는 프로그램이 깔려 있어야 하고, 이거 설치 코드를 작성해야 한다.
- 뭔가 기록/쿠키 이런게 exe와 같은 디렉토리에 저장된다.

## 장점
- rust 공부
- exe 하나로 쉽게 합칠수 있음
- exe 용량이 적고, 한 파일로 나온다 (1.6MB)
    - 빌드 빠름
    - 당연하지 웹뷰를 따로 설치하니까
    - 일렉트론은 튜토리얼만 214MB이다...
- 컴파일되므로 코드 리버싱이 어렵다

# Electron인가 Webview2인가
- https://www.electronjs.org/blog/webview2/
- 어치피 같은 크로뮴이니 성능은 같음.
- webview 클로즈드 소스고 edge에 의존한다고 까네. c/c++과 크로뮴 사이 직렬화 존재한다고 까고.
- 굳이 rust까지 써서 개발할 이유가 없을 듯 함
- 일렉트론을 써보자
---
layout: post
mathjax: false
highlightjs: true
title: "패키지를 만들어 배포해보자"
category: 개발
---

## 개요

- npm 패키지 업로드 해보고 싶어짐.
- 내가 만든 프로그램 중, 자주 쓰는 것들을 공개 저장소에 배포하여 쉽게 관리할 수 있도록 하는것이 목적

## 방법

- npm 회원가입

### 모듈 만들기

- 전역 모듈로 만들것임
- 내가 2020년부터 만들어 쓰고 있는 [간단한 서버 프로그램](https://gist.github.com/esctabcapslock/2ad84370a0d8e5ced8b32948e22ba0ac)을 패키지로 배포해보자

### 배포하기

- [package.json](https://github.com/esctabcapslock/onweb/blob/main/package.json)을 잘 설정해야 한다.
    - `npmjs.com/package/[package name]`으로 검색해 중복되지 않는 이름 **onweb** 선정
    - `name`, `main` `bin` 등 속성 입력. `preferGlobal`속성은 전역 설치를 권고한다는 뜻.  
    - `bin`은 실행 바로가기(?)를 만드는 기능으로 추측
    - `main`은 주 프로그램 넣어주어야 함
    - `version`은 버전.
        - [Semantic Versioning](https://semver.org/lang/ko/)를 읽음
        - 초기 개발버전이므로 **0.0.0**부터 시작
- 커맨드창에서 `npm login`으로 로그인한 뒤, `npm publish`로 배포할 수 있다.
- [onweb](https://github.com/esctabcapslock/onweb) 래파지토리 업로드

### 배포 확인

- [NPM](https://npmjs.com/package/onweb)에 접속하면 업로드된 것을 볼 수 있다. CDN같은 걸 쓰는지 업데이트하고 같은 컴퓨터로 접속하면 버전업이 바로 반영이 안된다.
- [내 깃헙](https://github.com/esctabcapslock/onweb)에도 repository를 하나 팠다.

## 기타

- 깃헙을 통해 업로드하는 것도 고려할 필요 있을듯. [how-to-publish-npm-packages-with-github](https://www.wearecogworks.com/blog/how-to-publish-npm-packages-with-github/)
- 무조건 이름에 `/`가 들어가는건지 모르겠음

 
## 판올림

- ISC를 MIT로 바꾸고 버전을 **0.0.2**로 올림. 내용은 같은데 대충 막 써도 되는 것 같아 바꿈.
- 문자열에 따옴표를 안 붙여서 *알 수 없는 변수*라고 오류가 떴음. **0.0.3**으로 올림.
- 생각보다 버그가 많다. 1주일밖에 되지 않았는데 판올림이 3번이다.

## 그리고


- 개시하고 1주일도 지나지 않았는데. 다운로드 횟수가 120회(04.18)이다. 
    - 이튿날에 60회까지 수직상승하고 그 뒤로 완만하게 올라가는 걸 보아 최근에 올라온 패키지를 까는 무언가가 있는듯?
- 뭐지 뭐야 부담스러워;;;
- 내가 자주 쓰는 패키지를 정리해서 github action으로 npm에 업로드해 깔끔하게 관리할 수 있도록 하자.
- 래파지토리를 패키지 개수만큼 만들어야 하는지 찾아봐야 함 

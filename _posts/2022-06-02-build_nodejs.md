---
layout: post
mathjax: false
highlightjs: false
title: "node.js exe 파일로 만들기"
category: "기타"
---


- 예전에 했는데 까먹었음
- 시험기간이라 node.js 삭제하는 김에 알아봄
[https://www.npmjs.com/package/pkg](https://www.npmjs.com/package/pkg )
- 이걸로 빌드

1. npm 전역으로 설정
2. 패캐지 전역으로 추가 `npm install -g pkg` 
3. 환경변수에  `%AppData%\npm\node_modules` 추가
4. 원하는 폴더에서 `pkg main.js`


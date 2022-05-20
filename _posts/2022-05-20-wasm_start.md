---
layout: post
mathjax: false
highlightjs: true
title: "WebAssembly를 배워보자"
category: "WebAssembly"
---


## 발단
[책][book]를 번역하면서 `WebAssembly`문법을 접하게 되었다.

펙토리얼을 계산하는 함수
```wasm
(module
  (func $fac (param f64) (result f64)
    local.get 0 ;; 0번 인자 받아 스텍에 저장
    f64.const 1 ;; 스텍에 상수 1 저장
    f64.lt ;; 스텍 맨 앞 두개 가져와 비교연산 후 넣음
    if (result f64)
      f64.const 1 ;; 값이 1이면 반복
    else ;; fac(n-1)*n을 반복
      local.get 0
      local.get 0
      f64.const 1
      f64.sub
      call $fac
      f64.mul
    end)
  (export "fac" (func $fac)))
  ```
[^1]

이걸 이해하고 싶었다.


주석은 `;;`

이걸 바이너리고 바꾸고 웹브라우저에서 API를 이용해 불러와 실행할 수 있다.

먼저 [책][book]에 있는 [공식 표준(?) 문서](https://webassembly.github.io/spec/core/index.html) 를 읽으려고 시도했다. 하지만 형식문법이라는 괴상한 걸 마주하고 포기하려다...


[MDN](https://developer.mozilla.org/ko/docs/WebAssembly/Understanding_the_text_format#see_also)에 다행이 무려 **한국어 번역** 이 있길레 이걸 읽었다.

s-expression이라는 이상한 형식으로 되어 있다.

약간 어깨너머로 구경해본 어셈블리 나 brainfuck과 비슷한 느낌

아무 말 없으면 함수(?)의 스텍에 넣고...
또 메인 메모리가 있어 접근할 수 있는 듯. table은 아직 잘 모르겠다.


[^1]: 안타깝게도  Highlight.js로 wat를 하이라이팅하기 위해 설정을 손봐주어야 했다. 추가 언어 관련 스크립트를 추가해야 함.

[book]: https://esctabcapslock.github.io/rustwasmbook-ko

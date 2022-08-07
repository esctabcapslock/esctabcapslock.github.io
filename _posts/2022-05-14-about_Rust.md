---
layout: post
mathjax: false
highlightjs: true
title: "Rust? 그게 뭔데?"
category: "Rust"
---

## 글을 열며
내가 Rust 공부를 시작했다고 하면 주위에서 항상 듣는 말이 있다.

> Rust? 그게 뭔데? 뭐가 좋아?

어쩌고 저쩌고 열심히 대답을 해 주었긴 했지만 내 위대한 설명능력 덕에 전달에 한계가 있었다. 아니, 내가 **Rust**애 대해 잘 몰랐기 때문일 것이다.

그래서 이 글을 통해 위 질문에 대해 답변하고자 한다. 이 글을 통해 **Rust**를 왜 배워야 하는지, 뭐가 좋은지에 대한 내 스스로 정리하고 여러분의 궁금증을 해결하고자 한다.

**본인은 아직 Rust를 배운지 몇 개월밖에 지나지 않았다.** 정확한 정보를 일고 싶은 독자는 [나무위키 Rust 항목](https://namu.wiki/w/Rust#s-3.6)이나 [공식 문서의 한국어 번역본](https://rinthel.github.io/rust-lang-book-ko/)을 읽어보는 것이 좋을 것이다.


## Rust가 좋은 이유

### Stack Overflow 선정 개발자가 사랑하는 언어 1위
- [2016](https://insights.stackoverflow.com/survey/2016#technology-most-loved-dreaded-and-wanted),
[2017](https://insights.stackoverflow.com/survey/2017#most-loved-dreaded-and-wanted), 
[2018](https://insights.stackoverflow.com/survey/2018#most-loved-dreaded-and-wanted), 
[2019](https://insights.stackoverflow.com/survey/2019#most-loved-dreaded-and-wanted), 
[2020](https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted),
[2021](https://insights.stackoverflow.com/survey/2021#technology-most-loved-dreaded-and-wanted) 등 최근 5년 연속 개발자가 사랑받는 언어 1위. [^1]
- 물론 사용량 순위는 떨어짐
### 에러를 줄이는 메모리 관리 문법
- data race라는, 한 저장소를 두 프로세스가 접근할 때 생기는 오류가 프로그래밍 문법으로 차단됨
- 마찬가지로 널 포인터[^2], 댕글링 포인터[^3] 오류를 컴파일러가 차단
- 즉, **메모리를 안게 관리한다.**
- 그 대신 소유권과 라이프타임이라는 복잡한 개념이 추가됨
- 약간 답답한 느낌이 듦
### C 뺨치는 뛰어난 성능
- [kostya](https://github.com/kostya/benchmarks)의 벤치마크 결과를 보면 C, C++ 같은 언어와 실행시간이 비슷함
- 참고로, Rust 언어 내부에 C 코드를 이식할 수 있음.

![benchmarks 결과](https://raw.githubusercontent.com/GoodManWEN/Programming-Language-Benchmarks-Visualization/main/ranking.png)[^4]


## 난 왜 Rust를 시작했을까
### 내 코딩의 역사
- 주변에 있는 불편함들을 해결하는 코딩
- 주변에 있는 것들을 직접 구현해 보려는 코딩
### 편리한 점
- 간단한 종속성 관리
- 어려운 c/c++와 무거운 VS대신 적은 문법과 가벼운 메모장과 높은 성능의 프로그램 개발 가능

-> 시스템적으로 접근할 수 있으며, 안전한 Rust라는 언어를 찾음


[^1]: cf. 2015: 3위

[^2]: 아무것도 가르키지 않는 포인터. 

[^3]: 사용하지 않는 메모리 영역을 가리키는 포인터

[^4]: https://github.com/GoodManWEN/Programming-Language-Benchmarks-Visualization
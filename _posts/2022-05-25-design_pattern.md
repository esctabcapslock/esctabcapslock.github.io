---
layout: post
mathjax: false
highlightjs: true
title: "객체지향과 디자인 패턴"
category: "개발"
---

- 학교에서 객체지향을 배웠지만, [json2server][js]프로젝트를 하며, 더러운 클래스들과 씨름하며, 내가 잘 이해한건지 싶었다.
- Rust [객지 페턴 구현](https://rinthel.github.io/rust-lang-book-ko/ch17-03-oo-design-patterns.html) 문서에서 **상태 패턴**이라는 디자인 패턴을 구현
- 그래서 찾아봄

## 정리된 글
- [글1](https://incheol-jung.gitbook.io/docs/study/undefined/undefined)
- [글 2](https://junroot.github.io/programming/%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%B0%98%EB%93%9C%EC%8B%9C-%EC%A0%95%EB%B3%B5%ED%95%B4%EC%95%BC-%ED%95%A0-%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5%EA%B3%BC-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4/)
### 캡슐화
- Tell, Don’t Ask
    - check 이런 함수 만들지 말고 그냥 실행하라는 뜻인듯?
    -                                    :
    - 메서드에서 생성한 객체의 메서드만 호출
    - 파라미터로 받은 객체의 메서드만 호출
    - 필드로 참조하는 객체의 메서드만 호출

- [json2server][js]에서 1번  규칙 반영.
- 데미테르 하려면 구조를 좀 더 갈아 엎어야

[js]: https://github.com/esctabcapslock/JSON2Server


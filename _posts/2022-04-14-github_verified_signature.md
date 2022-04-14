---
layout: post
mathjax: false
highlightjs: true
title: "git bash 사용시 github에 verified signature 적용하기"
category: 보안
---

## 개요

- [chemical118](https://github.com/Chemical118)이 알려줌. 감사
- git bash 사용시 github에 커빗 히스토리에 Verified 뜬다.
- git에 커밋한 사람이 깃헙의 그 사람인지 확인해주는 용도(서명)로 추측된다.

## 방법

- [이거](https://docs.github.com/en/authentication/managing-commit-signature-verification/displaying-verification-statuses-for-all-of-your-commits)따라하면 됨
- [GnuPG](https://www.gnupg.org/download/) 설치함
    - 나무위키에 [문서](https://namu.wiki/w/GnuPG)도 있는 유명한 프로그램이었음.
    - 방문 기록이 있는 것으로 보아 읽고 까먹은듯
    - 써먹으면 유용할듯?
    - 이미 내 컴퓨터 어딘가 깔려있을것 같은 느낌이 든다 
- 방식은 RSA로 함
- S/MIME 안 깔아도 된다. 
- 결국 [add-signing-key-to-git-commit-by-gpg (한국어)](https://www.44bits.io/ko/post/add-signing-key-to-git-commit-by-gpg) 따라함
- commit 단계에서 비번 처야함.
- 서명 만들때 이메일은 git bash에 등록된 이메일과 같은 걸로 해야함. (이 문제로 서명 다시 만듦)
    - 내가 지난달에 했던 [뻘짓](https://github.com/esctabcapslock/learn_Rust/blob/master/readme.md)과 대충 관련된 듯 하다.


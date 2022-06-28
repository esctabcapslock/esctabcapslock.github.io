---
layout: post
mathjax: false
highlightjs: false
title: "firefox 설정 흥미로운"
category: "기타"
---

- [여기](https://gogilove.wordpress.com/2019/05/02/firefox/)랑 [이거](https://restoreprivacy.com/firefox-privacy/) 참조
- 2019년 기준이라 약간
- HTTPS 전용 모드
    - 설정>개인정보보안
- 검색 제안 해제
- 설정>개인정보>쿠키 및 사이트 데이터
    - Firefox를 닫을 때 쿠키와 사이트 데이터를 삭제 체크
    - 이러면 브라우저 창 닫으면 무조건 로그아웃
- 일반>네트워크설정
    - DNS over HTTPS
- `resistFingerprinting true`
    - 핑거프린팅 방지 기능인데,
    - 사이트 요청이 영어로 보내짐
    - canvas 테그가 이상해진다는 단점이 있음
- `privacy.firstparty.isolate` true
    - 페이지마다 다른 쿠키 저장소 사용
- `extensions.pocket.enabled` -> `false`
    - Pocket 플러그인 비활성화
- 확장기능 Firefox Multi-Account Containers
    - 탭별로 쿠키 설정을 다르게 할 수 있음.
        - ex. 동시에 두 계정으로 구글 로그인- 
- `browser.urlbar.speculativeConnect.enabled` false
    - 주소창에 뭐 치면 자동완성되는거 없엠
- `network.http.sendRefererHeader`
    - http 요쳥 referer 헤더에 대하여
    - 0: 무조건 안보냄 -> 사이트가 작동하지 않을 수 있음
    - 1: document.referrer 설정 or 링크 클릭
    - 2: (기본값) 1 + 이미지 클릭시
- `media.peerconnection.enabled `
    - WebRTC 끌수있음
- `devtools.inspector.showAllAnonymousContent`
    - Inspect Shadow DOM
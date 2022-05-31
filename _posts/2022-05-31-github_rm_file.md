---
layout: post
mathjax: true
highlightjs: true
title: "깃헙 기록에서 모든 파일 삭제"
category: "개발"
---

## 발단
- 실수로 비번, API key, 실명 등을 업로드할때가 있다.
- 모든 커밋에서 삭제해야 접근할 수 없을 것이다.
- 이거 매번 쓰고 여러번 까먹은 참에 이렇게 정리하는 것임

## 사용
- 다음의 코드를 실행한다
- https://stackoverflow.com/questions/44735141/git-remove-file-from-all-commits 참조
```bash
git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch <your-file>" \
    --prune-empty --tag-name-filter cat -- --all
```
- push해줘야 함

> hint: Updates were rejected because the tip of your current branch is behind
>
> hint: its remote counterpart. Integrate the remote changes (e.g.
>
> hint: 'git pull ...') before pushing again.
>
> hint: See the 'Note about fast-forwards' in 'git push --help' for details.

- 막 이러면서 오류난다.
- `git push --force`를 통해 강제로 해버리자.
- 뭐지 접속 되는데 경로를 못찾겠다.. 잘 모름;;;

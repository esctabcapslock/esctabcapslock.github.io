---
layout: post
mathjax: false
highlightjs: true
title: "자바스크립트와 다른 파이썬 특징"
category: Python  
---

## 개요

[itertools](https://docs.python.org/3/library/itertools.html#itertools.combinations) 모듈의 구현을 읽으며 이해가 잘 안됨
```python
def combinations(iterable, r):
    # combinations('ABCD', 2) --> AB AC AD BC BD CD
    # combinations(range(4), 3) --> 012 013 023 123
    pool = tuple(iterable)
    n = len(pool)
    if r > n:
        return
    indices = list(range(r))
    yield tuple(pool[i] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices[i] != i + n - r:
                break
        else:
            return
        indices[i] += 1
        for j in range(i+1, r):
            indices[j] = indices[j-1] + 1
        yield tuple(pool[i] for i in indices)

print([*combinations(range(7), 3)])
```

${}_7 C_3$이면 [6,5,4]를 뒤에서 부터 비교함.

[0,1,2] 하고 마자막 안겹침

-> [0,1,3] 나감

[0,1,6]되면 마지막 겹치니까 그 다음꺼 [0,2,3]되게끔 하는거임


## for - while 문

```python
for x in range(6):
  print(x)
else:
  print("Finally finished!")
```
## for 밖에서 참조 가능
```python
for x in range(6):
  pass

print(f"{x} 출력 가능!")
```

## yield 키워드

이터레이터(반복자)를 만드는 제네래이터를 만드는데 쓰임.

## 동기 처리

파이선은 단일 스레드


## 등호
파이썬은 `===`가 없음. 대신 `is`가 있다.
비슷한 내용(?)으로 `id`함수가 있어 같은 객체인지 볼 수 있고, 자바스크립트는 아님
```js
a=[1,2]
b=[1,2]
console.log(a==b,a===b)
```
자바스크립트 출력: `false false`

```python
a=[1,2]
b=[1,2]
print(a==b)
print(a===b)
```
파이썬 출력: 

`True`

`SyntaxError: invalid syntax`

## 연산
`'15'+23` -> `38`, `123+'eaw'`->`"123eaw"` 이런 연산은 JS만 됨
`[1]*10` 연산은 파이썬만 됨

## 생각

- 남이 쓴 코드를 이해하는 게 어려운 것 같다. 시간이 너무 오래 걸림
- 예시를 들어 넣는게 이해가 빠른듯. 숫자가 바뀌는 걸 보고 직관적으로 이해할 수 있다.


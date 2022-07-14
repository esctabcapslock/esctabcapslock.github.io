---
layout: post
mathjax: false
highlightjs: true
title: "자바스크립트 함수 가로채기"
category: "Javascript"
---

- 모바일 웹브라우저는 콘솔 기능이 없다.
- `console.log`나 `fetch` 같은 함수들을 가로체서 콘솔을 만들면 좋겠다는 생각을 개발 초기부터 자주 했으나 실행에 옮기지 않았다.
- 최근에 모바일 사파리 브라우저의 호환성을 체크하면서, 1시간의 노가다 구글링 끝에 [Eruda](https://github.com/liriliri/eruda)라는 웹브라우저용 콘솔 프로젝트를 발견했다.
    - 당연히 저 위에 내가 생각한 방식대로 돌아가는 것을 확인했다.
- 그리고 얼마 뒤, AJAX가 적용되는 사이트를 커스텀하기 위해 이 기술을 사용할 필요가 생겼고, 기초적인 래퍼런스를 참고해가며 코딩을 해보았다.

```javascript
function 외부함수(){
}

var script = document.createElement('script');
script.innerHTML = `
  console.log('run script')
  const 외부함수 = ${외부함수.toString()}
  const _fetch =  fetch.toString() == 'function fetch() { [native code] }' ? fetch : _fetch
  window.fetch = async (url,obj)=>{
  
  
      console.log('성공'); 
      외부함수()
      console.log(_fetch.toString, fetch.toString)
      return await _fetch(url, obj)
  }


  window.__XMLHttpRequest = XMLHttpRequest
delete window.XMLHttpRequest
const _window = window;
(()=>{
    class XMLHttpRequest extends __XMLHttpRequest{
        constructor(){
            const a = super()
            a.addEventListener('load',()=>{
                console.log(XMLHttpRequest.toString, __XMLHttpRequest.toString)
                console.log('성공')
                외부함수()
            })
            return a
        }
    }
    _window.XMLHttpRequest = XMLHttpRequest
})()

  `
```
- 이 코드를 만드는데 관건은 실행 순서였다.
- 자바스크립트는, 만약 함수가 정의되어 있으면 맨 위로 끌어 올려서 실행하기 때문
- 한참 고민하다가, 그냥 익명함수로 바꾸어서 실행하면 된다는 것을 깨달았다.
- 중간에 `console.log(_fetch.toString, fetch.toString)` 를 삽입하는게 작동 여부에 영향을 준다. 아마 실행 순서와 관련이 있는 것 같은데 잘 모르겠다.
- 크로미윰과 파이어폭스에서 호환성을 확인하였다.

---
layout: post
mathjax: false
highlightjs: true
title: "cmake로 opencv를 빌드해보자"
category: "cpp"
---
# 발단
- 특정 버전 opencv를 c++ 기반으로 돌려야 함.
- vs 깔기 싫음
- 어쩌다 하는김에 cmake도 써보는 김에 빌드해보기로 결정함.

# vscode opencv 설치하기
- 2.4.11 예전 버전을 설치할 것
- gcc 컴파일러를 사용할 것

- 이왕 김에 cmake로 빌드해보자. [이거](https://mickael-k.tistory.com/39)처럼 gcc용으로?
    - 그냥 다운받은건 vs라고 되어 있음.
    - vs에서 사용하는 ms 컴파일러를 위한건가?
    - [이거](https://docs.opencv.org/4.x/db/df5/tutorial_linux_gcc_cmake.html)볼때 비슷한듯?
- `/build`들어가서 `mingw32-make`실행하면 뭔가 진행됨
    - 중간중간 워닝 뜸
    - 20분? 걸림
    - 40%즘에서 뭔가 멈춤. BUTTON 어쩌고 변수가 없데. 그냥 소스코드에서 삭제하고 돌림. 잘 됨(?????)
    - `mingw32-make -j4` j 뒤에 코어수만큼 붙이기
    - 왜안됨? 지우도 다시해보기
    - https://stackoverflow.com/questions/11561261/how-can-i-compile-without-warnings-being-treated-as-errors
    - `-Werror=address`옵션이 경고를 에러로 바꿈. `.make`에서 제거
    - 빌드 성공!
- 그리고 이제 실행하기
    - `opencv\\build\\include`에 차곡차곡 소스코드가 있었는데 없음??
    - everything으로 찾으니까 `opencv\\sources\\modules\\[모듈명]\\include` 식으로 있다. 모든 경로를 수동으로 추가하자.
        - 컴파일시에는 `-I`옵션 붙이기
    - 이러고 빌드하면이따구 오류끔
    ```console
    undefined reference to `cv::imread(std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const&, int)'                                                                                         
    ```
    - `build\\bin`에 있는, 힘들게 위에서 만든 `dll`도 추가해야 할 것 같음. 
        - 구글링해보니까 [그냥](https://stackoverflow.com/questions/17968801/link-against-a-windows-dll-lib-file-combination-with-gcc-under-cygwin) 파일명을 붙이면 되는듯
        - 컴파일 성공
    - 그리고 실행하니까 실행이 안됨
        - 로컬 cmd로 실행
        - std::어쩌고가 없데
            - `-lstdc++"`옵션을 붙여서 `c++`의 std가 들어가도록 하자.
        - dll 파일이 없다고 오류
        - 이 디랙토리에 dll 파일들 모두 복붙하기

- 그리고보니까 그냥 빌드 안하고 윈도우버전 받아서 해도 성공했겠는데??

    

# (참고) vscode에서 빌드 이해하기
- `tasks.json`
    - 빌드 관련
- `c_cpp_properties.json`
    - 인텔리센스 관련
- `launch.json`
    - 디버깅 관련

그러므로, `tasks.json`에 인자를 모두 밀어넣으면 성공한다.
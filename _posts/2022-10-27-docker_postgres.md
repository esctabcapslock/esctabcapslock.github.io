---
layout: post
mathjax: false
highlightjs: true
title: "도커로 postgres 사용하기"
category: "database"
---

https://www.youtube.com/watch?v=iLcUr0EQdrM&list=PLuHgQVnccGMDeMJsGq2O-55Ymtx0IdKWf&index=4


## 0. 이미지 설치
- postage SQL 설치하기
- [이거](https://hub.docker.com/_/postgres) 깐듯
## 1. docker desktop 실행한다
- 안 하면 오류 뜸...

> error during connect: This error may indicate that the docker daemon is not running.: Post "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/images/create?fromImage=postgres&tag=latest": open //./pipe/docker_engine: The system cannot find the file specified.

## 2. 폴더에 명령어 입력
- `docker pull postgres`를 통해 이미지 다운로드

```
Using default tag: latest
latest: Pulling from library/postgres
e9995326b091: Pull complete
a0cb03f17886: Pull complete
bb26f7e78134: Pull complete
c8e073b7ae91: Pull complete
99b5b1679915: Pull complete
55c520fc03c5: Pull complete
d0ac84d6672c: Pull complete
4effb95d5849: Pull complete
f4c3677d4414: Pull complete
6707712b5af7: Pull complete
896a00668d28: Pull complete
50b8050f9af6: Pull complete
203e0ce1e9da: Pull complete
Digest: sha256:bab8d7be6466e029f7fa1e69ff6aa0082704db330572638fd01f2791824774d8
Status: Downloaded newer image for postgres:latest
docker.io/library/postgres:latest
```

- `docker images`를 통해 이미지 목록 확인    
```
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
postgres     latest    027eba2e8939   35 hours ago   377MB
mysql        latest    43fcfca0776d   6 weeks ago    449MB
```

## 3. 이미지 실행

초기 비번을 지정해 줘야 함.

- `docker run -d -e POSTGRES_PASSWORD=password --name test1 -p 5432:5432 postgres:latest` 명령을 실행한다. 비번을 저렇게 설정,
- 기본 유저명은 `postgres`라고 함.
- 포트 여기다 적기. `-p 5432:5432` 포트 맵핑

```
2022-10-27 00:54:16.752 UTC [1] LOG:  starting PostgreSQL 15.0 (Debian 15.0-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
2022-10-27 00:54:16.753 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2022-10-27 00:54:16.753 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2022-10-27 00:54:16.756 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2022-10-27 00:54:16.761 UTC [61] LOG:  database system was shut down at 2022-10-27 00:54:16 UTC
2022-10-27 00:54:16.765 UTC [1] LOG:  database system is ready to accept connections
```

## 4. 접속
`docker exec -it test1 bash`을 통해 해당 컨테이너의 접속이 가능한 것 같다.

## 5. `psql`
- `psql`은 postgreSQL의 Client Tool인 것 같다.
- `psql -U postgres`를 통해 로그인 가능
[기본적인 내용](https://mangkyu.tistory.com/71)과, [psql 명령어](https://king-minwook.tistory.com/85)을 참조.


- 명령어 모음
- 유저 생성

```sql
create user TEST_USER;
CREATE USER TEST_USER PASSWORD 'TEST_PASSWD' CREATEDB;
```
- `\l` or `\list`: table 출력
- `\c` or `\connect` + `<INSTANCE_NAME>`: 접속한 데이터베이스를 변경 / 인스턴스 접속. 
     - `\c [DB Name] [Connection User}` 
- `\du` 유저 목록
- `\dn` 스키마 목록
- `\?` 도움말
- ";"를 명령어 끝에 찍어야 함

- db 생성
```sql
CREATE DATABASE dbname TEMPLATE template0;
```

6. db 만들기.

7. node.js 연결하기
- 가장 큰 프로젝트는 [ps]()인데, 이게 좀 문법이 구림
- 문법이 깔끔한 [postgres](https://github.com/porsager/postgres)를 사용해보자.
- ORM 버리기
     - [Sequelize](https://www.npmjs.com/package/sequelize)


- 포드 재설정 [참고](https://www.baeldung.com/linux/assign-port-docker-container)
```bash
docker stop test
docker commit test1 test2
docker rm test1
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password  --name test1 test2
```

- https://dhna.tistory.com/270

- [다음 사이트와](https://www.tutorialspoint.com/postgresql/postgresql_create_database.htm 코드를 통해 db 생성
```sql
CREATE DATABASE planner;
```

해당db로 접속해야 하는데, datagrip에서는 해당되는 db 이름 우클릭 -> 콘솔 생성 한 뒤 입력하면 됨.
`psql`은 위에것 참조


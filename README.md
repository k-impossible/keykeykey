<br/>
<br/>

<div align="center">
<img src="src/assets/logo-jpg.jpg" width="150px">
<h3>키키키 (KEY KEY KEY)</h3>
</div>

> 프로젝트 이름 '키키키(keykeykey)'는 한글 채팅으로 웃음을 의미하는 'ㅋ'과 키보드를 뜻하는 영단어 keyboard의 'key'의 음성어를 합쳐서 <strong>"행복하게 코딩하자"</strong>라는 의미를 담았고, 로고는 'ㅋ'이 새겨진 키보드 모양을 표현했습니다.

<br>

![Home Screen Shot](/src/assets/readme/home.webp)
[키키키 - 개발자 키보드 전문 스토어](https://keykeykey.store)
<br>
<br>

## 프로젝트 소개

TypeScript, React 등 프론트엔드 기술들을 활용한 개인 사이드 프로젝트입니다. 개발자들이 선호하는 키보드 브랜드의 제품을 판매하는 온라인 키보드 쇼핑 웹 서비스를 주제로 정하고 구현하고 싶은 기능들을 개발중입니다. <br><br>

<strong>테스트 계정 (ID/PW)</strong>

- 사용자 : `test123@test.com` / `qwer1234@@`
- 관리자 : `admin@master.me` / `qwer1234@@`

<br>

## 기술 스택

![Static Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![Static Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Static Badge](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Static Badge](https://img.shields.io/badge/zustand-1E4CC9?style=for-the-badge&logo=react&logoColor=white)
<br>

![Static Badge](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Static Badge](https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Static Badge](https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Static Badge](https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
<br>

![Static Badge](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Static Badge](https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white)
![Static Badge](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
<br>

## 기술적 의사결정

## 성능 최적화

## 트러블 슈팅

## 주요 기능

<details> <summary style="font-weight:bold">로그인 / 회원가입</summary><br/><p>로그인</p><img src="https://raw.githubusercontent.com/k-impossible/my-assets/main/keykeykey/login.gif?token=GHSAT0AAAAAACQK7BWK7SGOXEQ55YNSDUVGZWFEA5A" width="600px"/><br/> <br/> <p>회원가입</p></details>

- 정규식 표현, React Hook Form을 활용해 입력값 유효성 검증
- 로그인 후 전역상태로 회원 정보 관리

## 폴더 구조

```text
📂src
 ┣ 📂assets      // 로고, 배경 이미지 파일
 ┣ 📂enum        // enum 파일
 ┣ 📂interfaces  // interface 파일
 ┣ 📂lib         // 기타 로컬 데이터 파일
 ┣ 📂hooks       // 커스텀 hooks 파일
 ┣ 📂queries     // react-query의 useQuery hooks 파일
 ┣ 📂store       // zustand의 store hooks 파일
 ┣ 📂router      // react-router의 router 파일
 ┣ 📂components  // header,nav,cart,form 등 UI 컴포넌트 파일
 ┃ ┗ 📂...
 ┗ 📂pages       // 유저 타입 별 페이지 컴포넌트 파일
   ┣ 📂admin
   ┃ ┗ 📂...
   ┣ 📂common
   ┃ ┗ 📂...
   ┗ 📂user
     ┗ 📂...
```

## Git 컨벤션

### 브랜치 컨벤션

- main : 최종 배포버전에 이상이 없을 시 deploy브랜치에서 pull 받음
- opt : 기본 기능 작업 외 추가적인 성능 최적화 작업 등
- deploy
  - dev브랜치에서 최종 작업 버전을 pull 받음
  - 수정되는 배포 버전만 올리기 위한 용도
  - 배포 버전이 이상없을 시 main으로 push
- dev
  - 최초 clone 후 환경세팅, 완료되면 feature 브랜치로 체크아웃
  - feature 브랜치에서 작업 완료된 기능을 push 받음, 다시 기능별 분기
  - 테스트가 완료 후 배포 버전 deploy로 push
- feat/{요구사항명}
  - feat/auth, feat/order …
  - 요구사항 기능 단위로 생성해 작업
  - 해당 작업이 완료되면 dev로 push

### 커밋 컨벤션

커밋 시 템플릿을 생성해 커밋 메세지의 type, title, body를 입력하게함

```text
# Commit Template
#####################
# Commit Title
# [커밋 타입] 커밋 제목

# Commit Body
# 커밋 설명
#####################
```

커밋 타입

- feat : 기능 로직 작업
- fix : 버그 수정 작업
- design : 뷰 로직 작업
- opt : 최적화, 리팩토링 작업
- test : 테스트 작업
- deploy : 배포 작업
- env : 환경 세팅, 라이브러리 추가 등
- doc : 기타 문서 작업 등

## 와이어프레임, 유저플로우

> 디자인 툴 : miro <br> [결과물 링크](https://miro.com/app/board/uXjVK6Caq5o=/?share_link_id=586957999401)

![Home Screen Shot](/src/assets/readme/wireframe.png)

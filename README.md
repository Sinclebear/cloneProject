
Clone AirBnB
-----------------
에어비엔비 클론코딩 하기!
<br/>
에어비엔비 페이지 중 `유연한 검색` 페이지를 기초로 하여 클론코딩을 진행했습니다.

<br/>

1, 제작기간 & 팀원 소개 🫂
------------------
**- 2022년 02월 18일 ~ 2022년 02년 24일**

  - FE : 김양수, 장혜진, 최연서
  - BE : 강경묵, 오세웅, 진상혁

📍BE 깃허브
https://github.com/G-moog/cloneProject 

📍FE 깃허브
https://github.com/Ryangsu/cloneAirBnB


<br/>
 
2.사용기술  📌
------------------
FE
- React

<br/>
BE

- node.js
- express
- mongo db

<br/>
라이브러리

- aws-sdk: S3 bucket 접근
- cors: Request resource 제한
- dotenv: 환경변수 설정
- joi: 패턴 인증
- JWT: 토큰 생성, 사용자 인증
- mongoose: mongodb model schema
- multer: 이미지 데이터 처리
- multer-S3: 사진 파일 업로드
- S3: AWS bucket

<br/>

3.배포
------------------
- EC2
- AWS S3

4.실행화면 😄
------------------

실행 영상:

https://www.youtube.com/watch?v=cnWW2IPvHQQ

<br/>


5.핵심기능🛠
------------------
**메인 페이지**

- 숙소 목록 보여주기 
- 숙소 클릭 시 해당 상세페이지로 전환
- 숙소 리스트 좋아요 기능 
- 숙소 사진 슬라이더 기능
- 버튼 누르면 지도 보여줌 기능
- 지도에 각 위도 경도 마커 표시 
- 카테고리 별로 카드가 다르게 나오는 기능 

**상세페이지**

- 사진은 기본 5장 (50%한장, 12.5%네장)
- 달력 기능 (2개씩 나옴)
- 후기 버튼 누르면 후기 작성 모달 보여주기 
- 모달 내에서 로그인 시 후기 작성 가능 (비 회원은 다시 화면이 뒤로가짐)


**로그인 회원가입 모달**

- 아이디 패스워드는 조건에 맞아야 함
- 아이디와 닉네임 중복 확인이 가능 
- 회원가입이 완료되면 로그아웃으로 바뀜

**게시글 작성 페이지**

- 로그인한 회원만 접근 가능 
- 숙소 이름, 위치, 사진, 가격 작성 가능 
- 이미지는 1장~ 5장까지 가능

**Header /Footer**

- 로그인을 안한경우에는 로그인 회원가입 버튼 노출
- 로그인을 하면 로그아웃 버튼 노출
- 로고클릭시 메인으로 이동 

모든 페이지는 반응형
<br/>

6.DB schema
------------------
![Untitled](https://user-images.githubusercontent.com/4746025/155489156-598f62c1-e27d-4e8a-9c73-a072f90ffe79.png)


<br/>

7.API
------------------

|데이터 테이블 |기능                   |METHOD|URL|API URL                        |request                                                                             |response                                                                                                                                                                                                                                                                                                                                        |담당              |기타                                                                                                               |완료 |
|--------|---------------------|------|---|-------------------------------|------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|-----------------------------------------------------------------------------------------------------------------|---|
|        |숙소 메인페이지 조회 - 숙소 종류 별|GET   |   |/api/homes/?category=%category%|?queryString category=”멋진 수영장” { Authorization: 토큰 }                                |{   homes: {   JSON   ...   category:”멋진 수영장”,   ...   }[] }                                                                                                                                                                                                                                                                                    |강경묵, 최연서        |보내줄 데이터 목록 축소                                                                                                    |Yes|
|        |숙소 상세페이지 조회          |GET   |   |/api/homes/:home_id            |{ Authorization: 토큰 }                                                               |{   homes: {   ...   isLike: true/false   } }                                                                                                                                                                                                                                                                                                   |강경묵, Ryangsu Kim|로그인 된 사용자 기준 isLike true/false 로 반환                                                                              |Yes|
|        |찜하기                  |POST  |   |/api/homes/:home_id/likes      |{ Authorization: 토큰 }                                                               |{   success: "찜하기를 완료하였습니다.” }                                                                                                                                                                                                                                                                                                                  |진상혁, 최연서        |                                                                                                                 |Yes|
|        |찜하기 취소               |DELETE|   |/api/homes/:home_id/likes      |{ Authorization: 토큰 }                                                               |{   success: "찜한 숙소를 취소하였습니다.” }                                                                                                                                                                                                                                                                                                                |진상혁, 최연서        |                                                                                                                 |Yes|
|예약      |예약 받기                |POST  |   |/api/reserve                   |                                                                                    |                                                                                                                                                                                                                                                                                                                                                |진상혁             |현재 미사용                                                                                                           |No |
|        |예약 수정                |PATCH |   |/api/reserve/modi              |                                                                                    |                                                                                                                                                                                                                                                                                                                                                |진상혁             |현재 미사용                                                                                                           |No |
|        |예약 취소                |DELETE|   |/api/reserve/del               |                                                                                    |                                                                                                                                                                                                                                                                                                                                                |진상혁             |현재 미사용                                                                                                           |No |
|        |                     |      |   |                               |                                                                                    |                                                                                                                                                                                                                                                                                                                                                |                |                                                                                                                 |No |
|후기      |후기 목록 전달             |GET   |   |/api/comment/:homeId           |                                                                                    |{ comment_list: {  { "_id": "Object_id", "user_nick": "String", "comment": "String", "home_rate": “Number”, "home_name": "String", "home_id": { "_id": "Object_id", "comment_count": “Number”, "HomesId": "Object_id", "id": "Object_id" }, "createdAt": "Date", "updatedAt": "Date", "__v": 0, "CommentsId": "Object_id", "id": "Object_id" } }|오세웅             |                                                                                                                 |Yes|
|        |후기 작성                |POST  |   |/api/comment/save/write/:homeId|{ Authorization: 토큰 } { comment: String home_rate: Number home_name: String }       |{ success: ‘후기 작성이 완료되었습니다.’ }                                                                                                                                                                                                                                                                                                                  |오세웅             |댓글 작성 + 해당 숙소 평균 별점 update                                                                                       |Yes|
|        |후기 수정                |PATCH |   |/api/comment/:commentId        |{ Authorizatoin: 토큰 } { comment: String home_rate: String }                         |{ success: ‘후기 수정이 완료되었습니다.’ }                                                                                                                                                                                                                                                                                                                  |오세웅             |수정기능 있어야 하는지 프론트에 묻기                                                                                             |Yes|
|        |후기 삭제                |DELETE|   |/api/comment/:commentId        |{ Authorization: 토큰 homeId : String }                                               |{ success: ‘후기 삭제가 완료되었습니다.’ }                                                                                                                                                                                                                                                                                                                  |오세웅             |삭제도 있어야 하는지 프론트에 묻기                                                                                              |Yes|
|        |                     |      |   |                               |                                                                                    |                                                                                                                                                                                                                                                                                                                                                |                |                                                                                                                 |No |
|인증      |로그인                  |POST  |   |/api/login                     |{   user_id : String,   user_pwd : String }                                         |{   result : true,   msg : “로그인에 성공하였습니다.”   token;   user: {     user_id: String,     user_nick: String,   } } OR {   result : false,   msg : “아이디 또는 비밀번호를 확인해주세요.” }                                                                                                                                                                         |강경묵, JJIN 찐     |                                                                                                                 |Yes|
|        |회원가입                 |POST  |   |/api/signup                    |{   user_id   user_nick   user_pwd   confirmPassword }                              |{ success: ‘회원가입이 완료되었습니다.’ } OR { fail: ‘회원가입 실패’ }                                                                                                                                                                                                                                                                                            |강경묵, JJIN 찐     |user_id: 한글+영문 대소문자+숫자, 4~16자 user_nick: 문자열 4~10자 user_pwd: 영문 대소문자+숫자, 4~16자 confirmPassword: 영문 대소문자+숫자, 4~16자|Yes|
|        |아이디 중복 체크            |POST  |   |/api/signup/checkid            |{   user_id : String }                                                              |{  success: “사용가능한 아이디 입니다.” } OR {   fail: “중복된 아이디입니다.” }                                                                                                                                                                                                                                                                                     |JJIN 찐          |                                                                                                                 |Yes|
|        |닉네임 중복 체크            |POST  |   |/api/signup/checknick          |{   user_nick : String }                                                            |{  success: “사용가능한 닉네임 입니다.” } OR {   fail: “중복된 닉네임입니다.” }                                                                                                                                                                                                                                                                                     |JJIN 찐          |                                                                                                                 |Yes|
|        |로그인 정보 인증            |GET   |   |/api/auth                      |{   Authorization: 토큰 }                                                             |{ success: success user:  {    userID : String,   //userNickname   } } OR { fail: 로그인후 이용하세요 }                                                                                                                                                                                                                                                  |강경묵, JJIN 찐     |                                                                                                                 |Yes|
|숙소 호스팅하기|호스트 등록               |PUT   |   |/api/host/regist               |{ Authorization: 토큰 }                                                               |{ fail: “이미 호스트로 등록되어있는 계정입니다.” } OR { success: ‘호스트 등록 성공’ }                                                                                                                                                                                                                                                                                   |오세웅             |                                                                                                                 |Yes|
|        |호스트 해제               |PUT   |   |/api/host/delete               |{ Authorization: 토큰 }                                                               |{ fail: “호스트로 등록되어있지 않은 계정입니다.” } OR { success: ‘호스트 해제 성공’ }                                                                                                                                                                                                                                                                                   |오세웅             |                                                                                                                 |Yes|
|        |숙소 등록                |POST  |   |/api/hosting                   |{ Authorization: 토큰 } { home_name: category: address: image_url: introduce: price: }|{ fail: “호스트 권한이 없는 계정입니다.” } OR { success: ‘숙소등록이 완료되었습니다.’ }                                                                                                                                                                                                                                                                                  |오세웅, JJIN 찐     |                                                                                                                 |Yes|
|        |이미지 업로드              |POST  |   |/api/imgs                      |{ formData[] }                                                                      |{ fail : “이미지가 존재하지 않습니다.” } OR { success : json({ imgurl : img_url}) }                                                                                                                                                                                                                                                                         |강경묵             |                                                                                                                 |Yes|


<br/>

8.트러블 슈팅 😮‍💨
------------------
**지도의 마커표기**
  
  : 지도에 마커를 각 데이터의 위도 경도로 넣었지만 무반응

**Airbnb 숙소 정보 관련, 실제 데이터 뽑아와서 데이터베이스에 쌓기**

  : 동작 가능한 URL 목록을 수동으로 찾아, 사진 및 숙소 정보의 스크래핑 도전.
  
  : `유연한 검색` 에서 URL 목록들을 파싱하여 상세페이지로 접근하는 것 또한 자동화 하려 하였으나, 실패.
  
    - Airbnb Plus, 슈퍼호스트 여부에 따라 세부 html 요소가 틀어지는 것을 확인. 
    - Airbnb Plus 가 아니고, 슈퍼호스트인 사용자의 목록만 수동으로 입력함.
  
  : 아래 프로젝트를 실행하여 수행. https://github.com/Sinclebear/pracPuppeteer
  
  : 동작 원리는 아래 링크 참고. https://github.com/Sinclebear/TIL/blob/main/TIL/2022/02/2022_02_21-TIL.md

<br/>
<br/>


9.개인회고 🤫
------------------

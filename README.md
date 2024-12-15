# ✅ Can Do: To-Do Application

"Can Do"는 개인 일정 및 작업 관리 효율성을 제공하며, "할 수 있다"는 긍정적인 마인드와 자신감을 기반으로 설계된 **To-Do 애플리케이션**입니다.  
일정 관리가 필요한 누구나 사용할 수 있습니다.

---

## 📚 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [주요 사용 기술 설명](#주요-사용-기술-설명)
4. [주요 기능](#주요-기능)
5. [화면 설계](#화면-설계)
6. [설치 방법](#설치-방법)
7. [소스 빌드 및 실행 방법 메뉴얼](#소스-빌드-및-실행-방법-메뉴얼)
8. [개발 환경 및 테스트 케이스](#개발-환경-및-테스트-케이스)
9. [API 명세서](#API-명세서)
---

## 📝 프로젝트 개요

### ✔ 제목
- **Can Do**

### ✨ 의미
"할 수 있다"는 긍정적인 마인드와 자신감을 기반으로  
해야 할 일을 **체계적으로 관리**할 수 있도록 설계되었습니다.

### 🎯 목표
- 개인 일정 및 작업 관리 효율성 제공

### 👤 주요 사용자
- **직장인**, **학생**  
- 그 외 일정 관리를 필요로 하는 모든 사용자

## 🛠️ 기술 스택

### 🎨 프론트엔드
- ReactJS v18  
- React-Router-Dom  
- Axios  
- React-Bootstrap, Bootstrap  
- React-Transition-Group  

### 💻 백엔드
- Spring Boot v3  
  - Java 17  
  - Spring Web  
  - Spring Data JPA  
  - MySQL Driver  
  - Spring Boot DevTools  
  - Lombok  
  - JavaMailSender (spring-boot-starter-mail)  
  - .env 파일 지원 (spring-boot-starter-dotenv)

### 🗃️ 데이터베이스
- MySQL  

### 📂 기타
- **버전 관리**: GitHub

## 📦 주요 사용 기술 설명
### 🎨 프론트엔드
```
<주력으로 사용한 컴포넌트 설명 및 사용 이유>
1. Cando
설명: API 호출과 데이터 처리를 담당하는 핵심 컴포넌트입니다.
사용 이유: API 호출을 단일 컴포넌트에 모아 관리함으로써 코드의 재사용성과 유지보수성을 높였습니다. async/await를 사용해 비동기 요청을 처리했으며, 에러 발생 시 사용자에게 메시지를 표시합니다.

2. TodoItem
설명: 할 일 목록의 개별 아이템을 관리하는 컴포넌트입니다.
사용 이유: 개별 할 일을 독립적으로 관리하고, 유지보수를 용이하게 하기 위해 컴포넌트로 분리했습니다.

3. TodoList
설명: 할 일 목록 전체를 렌더링하는 컴포넌트입니다.
사용 이유: 데이터 흐름을 효율적으로 관리하고, 컴포넌트 간 역할 분담을 명확히 하기 위해 설계했습니다. map() 함수를 사용해 할 일 목록 데이터를 반복적으로 렌더링하며, 상태 변화에 따라 동적으로 UI를 업데이트합니다.
```
### 💻 백엔드
```
<주력으로 사용한 라이브러리 설명 및 사용 이유>
1. JavaMailSender(spring-boot-starter-mail)
설명: 이메일 알림을 구현합니다.
사용 이유: 사용자에게 실시간 알림을 제공해 작업 완료 여부를 효과적으로 전달하기 위함입니다. 알림을 예약하거나 사용자 동작(전송 버튼)에 따라 메일을 전송하도록 구현했습니다.

2. dotenv
설명: 환경 변수 파일(.env)에서 설정값을 읽어와 애플리케이션에 로드하는 라이브러리입니다.
사용 이유: 데이터베이스 URL과 API 키 같은 민감한 정보를 안전하게 관리하고, 환경별 설정값을 분리하여 유연하게 관리하기 위함입니다.

3. MyBatis
설명: SQL을 기반으로 데이터베이스와 객체를 매핑하는 퍼시스턴스 라이브러리입니다.
사용 이유: SQL문을 직접 작성해 복잡한 쿼리를 처리하고, 데이터의 조회, 수정, 삭제 기능을 효율적으로 구현했습니다.

4. Spring Data JPA
설명: 데이터베이스와 객체 간의 매핑을 자동화하는 라이브러리입니다.
사용 이유: SQL 작성 부담을 줄이고, 데이터를 효율적으로 조회, 저장, 수정하기 위해 사용했습니다.

=> MyBatis, Spring Data JPA를 함께 사용한 이유는 프로젝트의 다양한 요구사항에 맞게 적용하기 위함입니다. 
- MyBatis: SQL이 명확한 단순 CRUD 작업에 사용했습니다.  
- Spring Data JPA: 객체 지향적 데이터 접근이 필요한 기능(이메일 전송 관련)에 적용했습니다. 
```


## 🚀 주요 기능

### 🔧 기본 기능 (CRUD)
- 할 일 **생성, 조회, 수정, 삭제** 기능 제공

### 💡 추가 기능
- ✅ **완료 상태 변경**: 체크박스를 통해 완료/미완료 상태 전환  
- 🔍 **검색 기능**: **내용 기반** 검색 지원  
- ✉️ **이메일 전송**: **전송 버튼**을 통한 수동 전송 및 **특정 시간대 자동 알림** 제공

## 🎨 화면 설계
[Figma 화면 디자인 링크](https://www.figma.com/board/vQIls9bQct97K9OU3PXfqZ/Can-Do?node-id=0-1&t=SOmFVMWYLn4avybM-1)

## ⚙️ 설치 방법
### 📥 프로젝트 클론
```bash
git clone https://github.com/bus94/ToDo_Application.git
```
## 📂 소스 빌드 및 실행 방법 메뉴얼
### 🎨 프론트엔드
**애플리케이션 메인 URL**: 
[http://localhost:3000/cando](http://localhost:3000/cando)  
```
VS Code, ReactJS v18

<추가 라이브러리>
· npm install react-router-dom
· npm install axios
· npm install react-bootstrap bootstrap
· npm install react-transition-group
```
### 💻 백엔드
```
Java 17, Spring Boot v3, Spring Tool Suite(STS)
Maven, MySQL

<주요 의존성>
· Spring Web
· Spring Data JPA
· MySQL Driver
· Spring Boot DevTools
· Lombok
· spring-boot-starter-dotenv(Spring Boot에서 .env 파일을 읽기 위한 라이브러리)
· spring-boot-starter-mail(JavaMailSender)

<환경 변수 설정>
· MySQL DB 설정(application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=(your_db_username)
spring.datasource.password=(your_db_password)

· SMTP 메일 발송 설정(.env 생성 필요)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=(your_email@gmail.com)
SMTP_PASSWORD=(your_email_password)
NOTIFICATION_EMAIL=lbs927@naver.com
```
```sql
[프로젝트 내 "db 쿼리문.txt" 파일 참고]

-- Status Table : 완료/미완료 상태 관리  
CREATE TABLE status (
    status_id INT PRIMARY KEY,
    status_name TEXT
);

-- Todo Table : 할 일 정보 저장  
CREATE TABLE todo (
    todo_id INT AUTO_INCREMENT PRIMARY KEY,
    todo_content VARCHAR(225),
    todo_status INT,
    FULLTEXT ( todo_content ),
    FOREIGN KEY (todo_status)
        REFERENCES status (status_id)
);

-- NotificationLog : 알림 테이블 기록  
CREATE TABLE notificationlog (
    notificationlog_id INT AUTO_INCREMENT PRIMARY KEY,
    notificationlog_sent_date DATE NOT NULL,
    notificationlog_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Status 데이터  
INSERT INTO status (status_id, status_name) values (0, '미완료'), (1, '완료');

-- Todo 데이터  
INSERT INTO todo (todo_id, todo_content, todo_status) VALUES
(1, '프로젝트 계획 작성', 1),
(2, '데이터베이스 설계', 1),
(3, '테스트 케이스 작성', 1),
(4, '코드 리뷰 및 피드백 작성', 0),
(5, '12/21 배드민턴 약속', 0),
(6, '마트 장보기', 0);
```

## 🧩 개발 환경 및 테스트 케이스 
### 🧪 개발 도구
Visual Studio Code (VS Code), Spring Tool Suite (STS)
 
### 🧾 테스트 케이스
```
[프로젝트 내 "ToDo_TestCase.xlsx" 파일 참고]

<주요 테스트 시나리오>
1. **할 일 추가**  
   - 입력 후 "추가" 버튼 클릭 시 목록에 정상 추가 확인  

2. **할 일 완료 상태 변경**  
   - 체크박스 클릭 시 완료 상태로 변경 및 "완료된 일" 분류 확인  

3. **검색 기능**  
   - 키워드 입력 시 일치하는 항목만 필터링 확인  

4. **이메일 전송**  
   - 전송 버튼 클릭 및 특정 시간대 자동 알림 정상 전송 확인  
```
## 📜 API 명세서
API 문서화는 **Swagger**를 사용하여 작성되었습니다.

### Swagger UI
- **URL**: `http://localhost:8080/swagger-ui.html`

### 주요 엔드포인트
1. **할 일 목록 조회 (GET)**  
   - URL: `/api/todo`  
   - 설명: 모든 할 일 목록 데이터를 조회합니다.  

2. **할 일 추가 (POST)**  
   - URL: `/api/todo`  
   - 설명: 새로운 할 일을 추가합니다.  

3. **할 일 수정 (PUT)**  
   - URL: `/api/todo/{id}`  
   - 설명: 기존 할 일의 내용을 수정합니다.  

4. **할 일 삭제 (DELETE)**  
   - URL: `/api/todo/{id}`  
   - 설명: 선택한 할 일을 삭제합니다.  
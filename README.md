# 🚖 TaxiCallApp Backend

## 📢 소개  
TaxiCallApp의 백엔드 서비스로, 택시 호출, 사용자 관리, 운전자 배차 등의 기능을 제공  
Node.js와 MariaDB를 기반의 개발

---

## 🏗 기술 스택  
- **Backend**: Node.js (Express)  
- **Database**: MariaDB  

---

## 🗃 데이터베이스 스키마  

### 📌 `tb_user` (사용자 테이블)
| Column      | Type         | Description  |
|------------|-------------|--------------|
| `user_id`  | VARCHAR(10) | 사용자 ID (Primary Key) |
| `user_pw`  | VARCHAR(10) | 사용자 비밀번호 |
| `fcm_token` | VARCHAR(255) | 푸시 알림용 FCM 토큰 |

### 📌 `tb_driver` (운전자 테이블)
| Column      | Type         | Description  |
|------------|-------------|--------------|
| `driver_id`  | VARCHAR(10) | 운전자 ID (Primary Key) |
| `driver_pw`  | VARCHAR(10) | 운전자 비밀번호 |
| `fcm_token` | VARCHAR(255) | 푸시 알림용 FCM 토큰 |

### 📌 `tb_call` (콜 요청 테이블)
| Column      | Type         | Description  |
|------------|-------------|--------------|
| `id`       | INT (PK) | 콜 요청 ID (자동 증가) |
| `user_id`  | VARCHAR(10) | 호출 사용자 ID |
| `start_lat` | VARCHAR(100) | 출발지 위도 |
| `start_lng` | VARCHAR(100) | 출발지 경도 |
| `start_addr` | VARCHAR(255) | 출발지 주소 |
| `end_lat` | VARCHAR(100) | 목적지 위도 |
| `end_lng` | VARCHAR(100) | 목적지 경도 |
| `end_addr` | VARCHAR(255) | 목적지 주소 |
| `call_state` | VARCHAR(10) | 콜 상태 (대기, 배차 완료 등) |
| `driver_id` | VARCHAR(10) | 배정된 운전자 ID (nullable) |

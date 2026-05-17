# Smart Voting Platform - Backend

Spring Boot REST API backend for the Smart Voting Platform.

This backend handles poll creation, voting, searching, filtering, pagination, and database operations.

---

# Features

* Create Poll API
* Vote API
* Search Polls
* Category Filtering
* Pagination
* DTO Validation
* RESTful APIs
* MySQL Integration
* Exception Handling
* Layered MVC Architecture

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Programming Language |
| Spring Boot | Backend Framework |
| Spring MVC | REST APIs |
| Spring Data JPA | Database Operations |
| Hibernate | ORM Framework |
| MySQL | Database |
| Maven | Dependency Management |

---

# Project Structure

```text
src
└── main
    ├── java
    │   └── com.app.voting
    │       ├── controller
    │       │   └── PollController.java
    │       │
    │       ├── dto
    │       │   ├── PollRequestDTO.java
    │       │   └── VoteRequestDTO.java
    │       │
    │       ├── model
    │       │   ├── Poll.java
    │       │   └── PollOption.java
    │       │
    │       ├── payload
    │       │   └── ApiResponse.java
    │       │
    │       ├── repository
    │       │   └── PollRepository.java
    │       │
    │       ├── service
    │       │   └── PollService.java
    │       │
    │       └── VotingApplication.java
    │
    └── resources
        ├── application.properties
        └── application-dev.properties
```

---

# Database Configuration

## Create Database

```sql
CREATE DATABASE VotingApp;
```

---

# application.properties

```properties
spring.application.name=voting

spring.datasource.url=jdbc:mysql://localhost:3306/VotingApp

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

spring.jpa.show-sql=true

server.error.include-message=always

spring.profiles.active=dev
```

---

# application-dev.properties

```properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

# Run Backend

## Install Dependencies

```bash
mvn clean install
```

---

## Start Application

```bash
mvn spring-boot:run
```

Application runs on:

```text
http://localhost:8080
```

---

# REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/polls | Create Poll |
| GET | /api/polls | Get All Polls |
| GET | /api/polls/{id} | Get Poll By ID |
| POST | /api/polls/vote | Submit Vote |

---

# Important Spring Boot Concepts Used

* REST Controllers
* DTO Validation
* Dependency Injection
* Service Layer Pattern
* Repository Pattern
* Hibernate ORM
* Pagination
* Exception Handling

---

# Future Improvements

* JWT Authentication
* Duplicate Vote Prevention
* WebSocket Support
* Swagger Documentation
* Docker Deployment
* Redis Caching

---

# Author

AMARAVADI SANJAY
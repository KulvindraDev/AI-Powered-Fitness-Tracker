# 🏃‍♂️ AI-Powered Fitness Tracker

<div align="center">

![Fitness Tracker](https://img.shields.io/badge/Fitness-Tracker-brightgreen)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue)
![AI Powered](https://img.shields.io/badge/AI-Powered-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)

A full-stack microservices-based fitness tracking application with AI-powered workout recommendations using GPT-4o.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Setup](#-setup) • [API Docs](#-api-documentation)

</div>

---

## 📋 Overview

A comprehensive fitness tracking platform that leverages microservices architecture and artificial intelligence to provide personalized workout recommendations. Users can track their activities, view detailed analytics, and receive AI-generated suggestions for improving their fitness journey.

## ✨ Features

### 🔐 Authentication & Authorization
- **OAuth 2.0** integration with Keycloak
- Secure user authentication and session management
- JWT-based token validation across microservices
- Automatic user synchronization between Keycloak and user service

### 📊 Activity Tracking
- Track multiple activity types (Running, Cycling, Swimming, etc.)
- Record duration, calories burned, and performance metrics
- View historical activity data
- Real-time activity statistics

### 🤖 AI-Powered Recommendations
- **GPT-4o integration** via OpenRouter API
- Personalized workout analysis including:
  - Performance assessment (pace, heart rate, calories)
  - Targeted improvement suggestions
  - Next workout recommendations
  - Safety guidelines
- Intelligent prompt engineering for fitness-specific insights

### 📈 Analytics Dashboard
- Activity history visualization
- Detailed performance metrics
- Progress tracking over time

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Material-UI (MUI)** - Component library
- **Redux** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **react-oauth2-code-pkce** - OAuth authentication

### Backend Microservices
- **Spring Boot 3.x** - Java microservices framework
- **Spring Cloud** - Microservices infrastructure
  - Eureka - Service discovery
  - Spring Cloud Config - Centralized configuration
  - Spring Cloud Gateway - API gateway with load balancing
- **Spring Security** - OAuth2 resource server
- **Spring Data JPA** - PostgreSQL ORM
- **Spring Data MongoDB** - MongoDB integration
- **Spring Kafka** - Event-driven architecture

### Databases
- **PostgreSQL** - User data persistence
- **MongoDB** - Activity and recommendation storage

### Authentication
- **Keycloak** - Identity and access management
- **OAuth 2.0 / OIDC** - Authentication protocol

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Kafka & Zookeeper** - Message streaming
- **Nginx** - Frontend web server

### AI Integration
- **OpenRouter API** - AI model gateway
- **GPT-4o** - Natural language processing for recommendations

## 🏗 Architecture

### Microservices Architecture

```
┌─────────────┐
│   Client    │
│  (React)    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│         API Gateway                      │
│  (Spring Cloud Gateway + Security)       │
└─────────┬───────────────────────────────┘
          │
    ┌─────┴──────┬──────────┬─────────┐
    ▼            ▼          ▼         ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ User   │  │Activity│  │  AI    │  │Config  │
│Service │  │Service │  │Service │  │Server  │
└───┬────┘  └───┬────┘  └───┬────┘  └────────┘
    │           │           │
    ▼           ▼           ▼
┌────────┐  ┌────────┐  ┌────────┐
│Postgres│  │MongoDB │  │MongoDB │
└────────┘  └───┬────┘  └────────┘
                │
                ▼
            ┌────────┐
            │ Kafka  │
            └────────┘
```

### Service Responsibilities

| Service | Technology | Database | Purpose |
|---------|-----------|----------|---------|
| **Gateway** | Spring Cloud Gateway | - | API routing, load balancing, authentication |
| **User Service** | Spring Boot + JPA | PostgreSQL | User management, authentication sync |
| **Activity Service** | Spring Boot + MongoDB | MongoDB | Activity CRUD, Kafka producer |
| **AI Service** | Spring Boot + WebClient | MongoDB | AI recommendations, Kafka consumer |
| **Config Server** | Spring Cloud Config | - | Centralized configuration management |
| **Eureka** | Spring Cloud Netflix | - | Service discovery and registration |
| **Frontend** | React + Nginx | - | User interface |

### Key Design Patterns

- 🔄 **Event-Driven Architecture** - Kafka for asynchronous AI processing
- 🔌 **API Gateway Pattern** - Centralized entry point with security
- 🔍 **Service Discovery** - Dynamic service registration with Eureka
- ⚙️ **Externalized Configuration** - Spring Cloud Config Server
- 🛡️ **Security Filter Chain** - JWT validation and user synchronization
- 📦 **Repository Pattern** - Data access abstraction

## 🚀 Setup

### Prerequisites

- Docker & Docker Compose
- Java 21 (for local development)
- Node.js 20+ (for local development)
- OpenRouter API Key ([Get one here](https://openrouter.ai/))

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/KulvindraDev/AI-Powered-Fitness-Tracker.git
   cd AI-Powered-Fitness-Tracker
   ```

2. **Create `.env` file**
   ```bash
   cat > .env << EOF
   OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
   OPENROUTER_API_KEY=your_api_key_here
   
   POSTGRES_DB=user-service
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres123
   
   KEYCLOAK_ADMIN=admin
   KEYCLOAK_ADMIN_PASSWORD=admin
   
   KAFKA_EXTERNAL_PORT=9093
   EOF
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Wait for services to start** (2-3 minutes)
   ```bash
   docker-compose ps
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Keycloak Admin: http://localhost:8181/admin (admin/admin)
   - Eureka Dashboard: http://localhost:8761

### Creating Your First User

1. Go to Keycloak Admin Console: http://localhost:8181/admin
2. Login with `admin` / `admin`
3. Select `fitness-tracker-app` realm
4. Navigate to **Users** → **Add user**
5. Set username, email, and save
6. Go to **Credentials** tab and set password
7. Use these credentials to login at http://localhost:3000

## 📡 API Documentation

### Gateway Routes

All requests go through the API Gateway at `http://localhost:8080`

### User Service

```
GET    /api/users/profile          - Get current user profile
POST   /api/users/register         - Register new user
GET    /api/users/{id}/validate    - Validate user exists
```

### Activity Service

```
GET    /api/activities                    - Get all user activities
POST   /api/activities/track              - Track new activity
GET    /api/activities/{id}               - Get activity details
GET    /api/activities/{id}/recommendation - Get AI recommendation
```

### Example: Track Activity

```bash
curl -X POST http://localhost:8080/api/activities/track \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "RUNNING",
    "duration": 30,
    "caloriesBurned": 250,
    "additionalMetrics": {}
  }'
```

## 🔧 Configuration

### Service Ports

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Gateway | 8080 |
| User Service | 8081 |
| Activity Service | 8082 |
| AI Service | 8083 |
| Config Server | 8888 |
| Eureka | 8761 |
| Keycloak | 8181 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |
| Kafka | 9093 |

### Environment Variables

See `.env.example` for all available configuration options.

## 🧪 Development

### Running Locally (without Docker)

1. Start infrastructure services (Postgres, MongoDB, Kafka, Keycloak):
   ```bash
   docker-compose up -d postgres mongodb kafka zookeeper keycloak
   ```

2. Start Spring Boot services:
   ```bash
   cd configserver && ./mvnw spring-boot:run &
   cd ../eureka && ./mvnw spring-boot:run &
   cd ../gateway && ./mvnw spring-boot:run &
   cd ../userservice && ./mvnw spring-boot:run &
   cd ../activityservice && ./mvnw spring-boot:run &
   cd ../aiservice && ./mvnw spring-boot:run &
   ```

3. Start frontend:
   ```bash
   cd frontend-service
   npm install
   npm run dev
   ```

## 🎯 Key Features Implementation

### 1. Keycloak User Synchronization
Custom filter in Gateway service automatically registers Keycloak users in the User Service:
```java
@Component
public class KeycloakUserSyncFilter implements GatewayFilter
```

### 2. Event-Driven AI Processing
Activities are published to Kafka, processed asynchronously by AI Service:
```java
@KafkaListener(topics = "${kafka.topic.name}")
public void processActivity(Activity activity)
```

### 3. AI Prompt Engineering
Structured prompts ensure consistent, high-quality recommendations:
```java
private String createPromptForActivity(Activity activity)
```

## 🐛 Troubleshooting

### Services not starting?
```bash
docker-compose down -v
docker-compose up -d
```

### Frontend not loading?
Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### AI recommendations not generating?
Check AI service logs:
```bash
docker logs fitness-ai-service --tail 100
```

## 📊 Project Statistics

- **7 Microservices** - Highly scalable architecture
- **3 Databases** - PostgreSQL, MongoDB (2 instances)
- **2 Message Brokers** - Kafka + Zookeeper
- **OAuth 2.0** - Enterprise-grade authentication
- **AI Integration** - GPT-4o powered recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kulvindra**
- GitHub: [@KulvindraDev](https://github.com/KulvindraDev)
- Project: [AI-Powered-Fitness-Tracker](https://github.com/KulvindraDev/AI-Powered-Fitness-Tracker)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ and ☕

</div>

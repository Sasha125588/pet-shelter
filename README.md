# 🐾 Притулок для Тварин API

## 📝 Опис

Це серверна частина застосунку для управління притулком для тварин, розроблена з використанням NestJS. Система дозволяє керувати процесами прихистку тварин, їх усиновлення та взаємодії з користувачами.

## 🚀 Основні можливості

- 🔐 Автентифікація та авторизація користувачів
- 🐈 Управління картками тварин
- 📋 Процес усиновлення
- 👥 Управління користувачами
- 📊 Swagger документація API

## 🛠 Технічний стек

- **Framework**: NestJS
- **Мова програмування**: TypeScript
- **База даних**: PostgreSQL
- **ORM**: TypeORM
- **Автентифікація**: JWT + Passport
- **Документація**: Swagger + Scalar
- **Валідація**: class-validator
- **Хешування паролів**: Argon2

## 🗂 Структура проекту

```
📁 src/
├── 📁 modules/                    # Основні модулі застосунку
│   ├── 📁 adoption/              # Модуль усиновлення
│   │   ├── 📁 dto/              # Data Transfer Objects
│   │   │   ├── create-adoption.dto.ts
│   │   │   ├── get-adoptions.dto.ts
│   │   │   └── update-adoption.dto.ts
│   │   ├── 📁 entities/         # Сутності бази даних
│   │   └── adoption.{controller|model|module|service}.ts
│   ├── 📁 auth/                 # Модуль автентифікації
│   │   ├── 📁 dto/             # DTO для авторизації
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── 📁 jwt/             # JWT конфігурація
│   │   │   ├── jwt.guard.ts
│   │   │   └── jwt.strategy.ts
│   │   └── auth.{controller|model|module|service}.ts
│   ├── 📁 pet/                  # Модуль управління тваринами
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   └── pet.{controller|model|module|service}.ts
│   └── 📁 user/                 # Модуль користувачів
│       ├── 📁 entities/
│       └── user.{controller|module|service}.ts
├── 📁 shared/                    # Спільні компоненти
│   ├── 📁 base/                 # Базові класи
│   │   ├── base.model.ts
│   │   ├── base.resolver.ts
│   │   └── base.service.ts
│   ├── 📁 configs/              # Конфігурації
│   │   ├── db.config.ts        # Налаштування бази даних
│   │   ├── jwt.config.ts       # Налаштування JWT
│   │   └── swagger.config.ts   # Налаштування Swagger
│   └── 📁 utils/                # Утиліти
│       ├── is-dev.ts
│       └── swagger.ts
├── app.module.ts                 # Головний модуль застосунку
└── main.ts                       # Точка входу застосунку

📁 Додаткові файли
├── 🐳 Dockerfile                # Конфігурація Docker
├── ⚙️ docker-compose.yml        # Налаштування Docker Compose
├── 📄 .env.example             # Приклад змінних середовища
├── 📄 nest-cli.json           # Конфігурація NestJS CLI
└── 📄 tsconfig.json           # Налаштування TypeScript
```

## 🔧 Налаштування проекту

### Передумови

- Node.js (версія 18 або вище)
- PostgreSQL
- Docker (опціонально)

### Змінні середовища

Створіть файл `.env` в корені проекту з наступними змінними:

```env
# Налаштування середовища
NODE_ENV=development
PORT=3000

# Налаштування домену для cookies
COOKIE_DOMAIN=localhost

# JWT налаштування
JWT_SECRET=some-secret
JWT_ACCESS_TOKEN_TTL='1h'
JWT_REFRESH_TOKEN_TTL='7d'

# Налаштування бази даних PostgreSQL
POSTGRES_DB=pet-shelter
POSTGRES_USER=user
POSTGRES_PASSWORD=123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
PGDATA=/var/lib/postgresql/data

# Налаштування Ngrok (опціонально)
NGROK_AUTH_TOKEN=token
```

### Встановлення

```bash
# Встановлення залежностей
yarn install

# Запуск у режимі розробки
yarn dev

# Збірка проекту
yarn build

# Запуск у продакшн режимі
yarn start:prod
```

### Docker

```bash
# Запуск з Docker Compose у фоновому режимі
docker-compose up -d

# Перегляд логів застосунку (включно з URL ngrok тунелю)
docker-compose logs -f app

# Щоб побачити лише URL ngrok тунелю
docker-compose logs app | grep "ngrok tunnel established at"
```

> **Примітка**: Після запуску в фоновому режимі, URL ngrok тунелю можна знайти в логах застосунку. Цей URL буде вашою публічною точкою доступу до API.

## 📚 API Документація

Після запуску застосунку, документація API доступна за адресами:

- Swagger UI: `http://localhost:3000/api`
- Scalar API Reference: `http://localhost:3000/reference`

## 📝 Ліцензія

Цей проект розповсюджується під ліцензією [UNLICENSED].

## 👥 Автори

Розроблено з ❤️ для допомоги тваринам.

# cars-graphql

Каталог автомобилей: просмотр, добавление, удаление и нечёткий поиск по бренду, модели и цвету.

Учебный проект из двух частей — GraphQL API на Node и SPA на React.

| | Стек |
|---|---|
| **backend** | Express 5, Apollo Server 5, Prisma 7, PostgreSQL 16 |
| **frontend** | React 19, Vite 8, TypeScript 6, Tailwind 4, shadcn/ui (Base UI) |
| | TanStack Query, react-hook-form + zod, graphql-request + GraphQL Codegen |

Поиск построен на расширении Postgres `pg_trgm`: запрос режется на токены, для каждого считается схожесть с полями `brand`, `model`, `color`, результаты сортируются по среднему баллу.

## Локальный запуск

Нужны Node 22+ и Docker.

### 1. База данных

```bash
docker compose up -d
```

Поднимет PostgreSQL 16 в контейнере `car_graphql_catalog_db`. Порт наружу — **5433**, чтобы не конфликтовать с локально установленным Postgres. Данные сохраняются в томе `postgres_data` и переживают перезапуск.

Остановить: `docker compose down`. Удалить вместе с данными: `docker compose down -v`.

### 2. Бэкенд

```bash
cd backend
npm install
```

Создать `.env`:

```
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5433/car_catalog
CORS_ORIGINS=http://localhost:5173
```

Накатить миграции и запустить:

```bash
npm run prisma:migrate
npm run dev
```

API поднимется на `http://localhost:3000/graphql`.

### 3. Фронтенд

```bash
cd frontend
npm install
```

Создать `.env`:

```
VITE_API_URL=http://localhost:3000/graphql
```

Сгенерировать типы из схемы и запустить (бэкенд должен быть уже поднят — схема тянется по HTTP):

```bash
npm run codegen
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Команды

### backend

| Команда | Что делает |
|---|---|
| `npm run dev` | Запуск в режиме разработки с автоперезагрузкой (nodemon + tsx) |
| `npm run build` | Компиляция TypeScript в `dist/` |
| `npm start` | Запуск собранной версии |
| `npm run prisma:migrate` | Применить миграции и обновить клиент Prisma |
| `npm run prisma:reset` | Сбросить базу и накатить миграции заново |
| `npm run prisma:studio` | Веб-интерфейс для просмотра данных |
| `npm run lint` | ESLint по `src/` |
| `npm run format` | Prettier по `src/` |
| `npm run format:check` | Проверка форматирования без правок |

### frontend

| Команда | Что делает |
|---|---|
| `npm run dev` | Dev-сервер Vite с HMR |
| `npm run build` | Проверка типов и production-сборка |
| `npm run preview` | Локальный просмотр собранной версии |
| `npm run codegen` | Генерация типов из GraphQL-схемы |
| `npm run codegen:watch` | То же в режиме наблюдения — держать рядом с `dev` |
| `npm test` | Vitest в режиме наблюдения |
| `npm run lint` | ESLint |
| `npm run format` | Prettier по `src/` |
| `npm run format:check` | Проверка форматирования без правок |

## Заметки

**Кодогенерация.** Типы GraphQL-документов генерируются из живой схемы. Изменил запрос в `src/api/` — перезапусти `npm run codegen`, иначе `graphql()` вернёт `unknown`. Проще держать запущенным `codegen:watch`.

**Компоненты shadcn.** Каталоги `frontend/src/components/ui` и `frontend/src/api/generated` выведены из-под Prettier и ESLint: это сгенерированный код, править его руками не нужно.

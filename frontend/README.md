# frontend

SPA каталога автомобилей: React 19, Vite 8, TypeScript 6, Tailwind 4, shadcn/ui на Base UI.

Данные — TanStack Query поверх `graphql-request`, типы запросов генерируются из схемы бэкенда через GraphQL Codegen. Формы — react-hook-form с валидацией на zod.

Общее описание проекта и порядок запуска целиком — в [README репозитория](../README.md).

## Быстрый старт

Бэкенд должен быть уже запущен: `codegen` тянет схему по HTTP.

```bash
npm install
npm run codegen
npm run dev
```

Переменные окружения — в `.env`:

```
VITE_API_URL=http://localhost:3000/graphql
```

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Dev-сервер Vite с HMR на `http://localhost:5173` |
| `npm run build` | Проверка типов (`tsc -b`) и production-сборка |
| `npm run preview` | Локальный просмотр собранной версии |
| `npm run codegen` | Генерация типов из GraphQL-схемы |
| `npm run codegen:watch` | То же в режиме наблюдения — держать рядом с `dev` |
| `npm test` | Vitest в режиме наблюдения |
| `npm run lint` | ESLint |
| `npm run format` | Prettier по `src/` |
| `npm run format:check` | Проверка форматирования без правок |

## Структура

```
src/
  api/cars/        GraphQL-документы и производные типы
  api/generated/   сгенерировано кодогенератором — не править
  components/ui/   компоненты shadcn — обновляются через CLI
  components/cars/ компоненты каталога
  hooks/           хуки данных и темы
  lib/schemas/     zod-схемы форм
```

`api/generated` и `components/ui` выведены из-под Prettier и ESLint: это внешний код.

## Заметки

**Кодогенерация.** Изменил текст запроса — перезапусти `codegen`, иначе `graphql()` вернёт `unknown` и TypeScript не примет документ.

**Тема.** Класс `dark` ставится синхронным скриптом в `index.html` до первой отрисовки — иначе при загрузке мелькает светлый фон. Ключ хранилища и значение по умолчанию продублированы там и в `App.tsx`, менять нужно в обоих местах.

# Vue 3 Document Management App

Страница для управления документами с поиском и предпросмотром. Сделано на Vue 3 + TypeScript + Pinia.

## Что сделано

- Vue 3 с Composition API
- TypeScript для типизации
- Pinia для состояния
- Поиск документов через API
- Предпросмотр с изображениями
- Скачивание .txt файлов
- Удаление документов
- Адаптивный дизайн
- Docker для деплоя

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Docker

```bash
docker build -t test-page .
docker run -p 3000:80 test-page
```

Или через docker-compose:

```bash
docker-compose up -d
```

# API Setup Guide

## Текущая конфигурация

Ваш сайт настроен для работы с API на: **https://roni-plus-server.onrender.com/api**

## Структура конфигурации

### 1. Основной файл конфигурации
- `src/config/api.ts` - содержит настройки API для разных окружений

### 2. Сервисы API
- `src/services/api.ts` - все API вызовы используют конфигурацию из `config/api.ts`

## Переключение между окружениями

### Для продакшена (текущая настройка)
```typescript
// В файле src/config/api.ts
export const API_CONFIG = {
  CURRENT: 'https://roni-plus-server.onrender.com/api'
};
```

### Для локальной разработки
```typescript
// В файле src/config/api.ts
export const API_CONFIG = {
  CURRENT: 'http://localhost:3000/api'
};
```

## Использование переменных окружения (опционально)

Если хотите использовать переменные окружения, создайте файл `.env.local`:

```bash
VITE_API_BASE_URL=https://roni-plus-server.onrender.com/api
```

И раскомментируйте соответствующую строку в `src/config/api.ts`:

```typescript
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || API_CONFIG.PRODUCTION;
};
```

## Проверка подключения

После настройки API:

1. Запустите сайт: `npm run dev`
2. Откройте консоль браузера
3. Проверьте, что API запросы идут на правильный URL
4. Убедитесь, что данные загружаются корректно

## Возможные проблемы

### CORS ошибки
Если получаете CORS ошибки, убедитесь что:
- API сервер настроен для работы с вашим доменом
- В заголовках ответа есть `Access-Control-Allow-Origin`

### SSL/HTTPS
При работе с HTTPS API убедитесь что:
- Все запросы идут по HTTPS
- Сертификаты API сервера действительны

## Восстановление локальной разработки

Если нужно вернуться к локальному API:

1. Измените `CURRENT` в `src/config/api.ts` на `LOCAL`
2. Убедитесь что локальный сервер запущен на порту 3000
3. Перезапустите dev сервер

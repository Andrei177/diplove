# Diplove

> Прототип сайта знакомств  
> Коммерческий проект с анкетами, профилем, чатом и ИИ-ассистентом

## Описание

Полноценный прототип dating-приложения: онбординг, анкеты, лайки, чаты и интеграция ИИ-ассистента через API Yandex GPT.

## Основной функционал

- Многошаговый онбординг (имя, пол, дата рождения, интересы, предпочтения поиска)
- Профиль пользователя
- Поиск и просмотр анкет
- Система лайков
- Чаты между пользователями
- ИИ-ассистент (Yandex GPT)
- Авторизация с refresh-токенами
- Адаптивная вёрстка

## Стек

| Категория       | Технологии                              |
|-----------------|-----------------------------------------|
| Core            | React 18, TypeScript, Vite              |
| State           | Zustand                                 |
| HTTP            | Axios (interceptors + refresh token)    |
| Routing         | React Router DOM                        |
| UI / Utils      | Swiper, rc-slider, react-responsive     |
| Deploy          | Docker + Nginx                          |

## Структура проекта
```text
src/
├── app/              # router, store, api (public / private)
├── pages/            # Auth, Profile, Chats, Likes, Forms, онбординг
├── shared/           # Layouts, UI-компоненты, helpers, stores
└── assets/
```

## Запуск

```bash
npm install
npm run dev
```

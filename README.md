# React todo project

npm run dev - запустить проект

## Пример итогового проекта

https://todo-liga-internship.vercel.app/

## Технологии которые используются в проекте

React, React-router-dom, Typescript, Redux, Axios, React Hook Form, Yup
Webpack, Eslint, Prettier

## Структура шаблона

```
.
├── .vscode                                  # конфигурация под vs-code
├── dist                                     # папка для билда (появится после npm run build)
├── config
│   ├── constants.js                           # константные пути к файлам и папкам
│   ├── css.modules.config.js                   # конфигурация css modules
│   ├── jest.config.js                          # конфигурация jest
│   ├── postcss.config.js                       # конфигурация postcss
│   ├── svgo.config.js                          # конфигурация обработки svg
│   ├── test.config.js                          # конфигурация окружения Jest, React Testing Library
│   ├── webpack.config.cache.js                 # конфигурация кеширования окружения webpack
│   ├── webpack.config.dev.js                   # конфигурация dev окружения webpack
│   ├── webpack.config.env.js                   # парсинг .env и проброс переменных в webpack
│   ├── webpack.config.https.js                 # конфигурация dev сервера с https
│   ├── webpack.config.js                       # базовый конфиг webpack
│   ├── webpack.config.modules.js               # обработка путей к папкам из tsconfig для webpack
│   ├── webpack.config.prod.js                  # конфигурация сборки
│   └── webpack.config.styles.js                # конфигурация обработчиков css
├── src
|   ├── api                                    # папка для работы с сетью, создаются файлы под каждую сущность
│   ├── app                                    # основные компоненты с бизнес-логикой
│       ├── taskList                             # например, папка taskList, в которой содержится компонент страницы списка задач
│           ├── components                         # внутренние компоненты
│           ├── integration                        # файлы для redux
|           ├── TaskList.tsx                       # корневой файл компонента
|           ├── TaskList.types.ts                  # типы для компонента, например интерфейс пропсов TaskListProps
│   ├── components                             # папка для компонентов без бизнес-логики (dumb components)
│   ├── constants                              # общие константы разбитые по файлам
│   ├── mocks                                  # папка для всех моков
│   ├── types                                  # интерфейсы для сущностей, например для Task
│   ├── utils                                  # вспомогательные функции, также разбиваем по файлам. Например, delay.ts
│   ├── index.html                             # корневой html
│   ├── index.tsx                              # точка входа в приложение для webpack
│   ├── App.tsx                                # точка входа в приложение, роутер
│   ├── react-app-env.d.ts                     # декларация модулей и переменных
├── .browserlistsrc                          # список браузеров для autoprefixer
├── .editorconfig                             # настройки для редакторов
├── .eslintignore                            # игнорирование eslint
├── .eslintrc                                # Конфиг Eslint
├── .gitignore                               # Игнор файл для гита
├── .prettierrc                              # Конфиг prettier
├── package.json
├── tsconfig.json                             # Конфиг тайпскрипта
└── README.md
```

## Правила по проекту

1. Один файл – один компонент
2. Импорты должны быть абсолютными
3. Типы (types), константы (constants), вспомогательные функции (utils), редьюсеры (reducers), экшены (actions) в отдельных файлах

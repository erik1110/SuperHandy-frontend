<p align="center">
  <a href="./README.md"> English </a> | <a href="./README.zh-TW.md"> 繁體中文
  </a>
</p>
  
<p align="center">
  Developed by Taipei Group 3<br></a>
<br>

</p>

# SuperHandy-frontend

"Our mission is to empower individuals with superhuman abilities in their daily lives. This philosophy represents our commitment to providing a platform that makes it easy for users to find tasks they need help with, while also inspiring them to feel like superheroes who have the power to help others and increase their own self-worth."

## Preview

[Launch Live Preview](https://superhandy-frontend-fork.herokuapp.com/)

<img src="./public/images/home.png">

## System Architecture

This project adopts a frontend-backend separation approach. The frontend is developed using Vue.js with the Nuxt.js framework, while the backend is built with Node.js and MongoDB.

You can check more [Backend-Repo](https://github.com/erik1110/SuperHandy-backend).

<img src="./public/images/system-structure.png">

## Special Features

1. Map GPS location search
   <img src="./public/images/maps.png">

2. Chat room function
   <img src="./public/images/chat.png">

3. Skill rating system
   <img src="./public/images/rating.png">

4. Provide value-added services for members' points
   <img src="./public/images/points.png">

## Other Features

1. Find Tasks
   <img src="./public/images/find-tasks.png">

2. Tasks Management
   <img src="./public/images/tasks-management.png">

3. Notifications
   <img src="./public/images/notifications.png">

4. Transaction
   <img src="./public/images/save-money.png" width=400px height=200px>
   <img src="./public/images/transaction.png">

## Getting Started

- (1) Create the `config.env`. (You can get copy from `example.env`)
- (2) Run the `pnpm install`.
- (3) Depends on your environment and follow the script below.

## Development Server

```bash
pnpm run dev
```

## Production

```bash
pnpm run build
```

```bash
pnpm run preview
```

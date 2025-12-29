# FocusFlow – Backend Requirements & Architecture

This document defines the **complete backend structure** for the FocusFlow Study Planner & Focus Timer app. It covers collections (models), controllers, routes, middleware, and critical backend responsibilities.

---

## 1. Backend Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Auth:** JWT (Access Token)
* **Password Hashing:** bcrypt
* **Storage:** Cloudinary / S3 (optional, future)
* **Notifications:** Firebase Cloud Messaging (FCM)

---

## 2. Database Collections (Models)

---

## 2.1 User Collection

### Purpose

Stores user account information and preferences.

### Fields

* `_id`
* `name`
* `email` (unique)
* `passwordHash`
* `timezone`
* `settings`

  * `focusDuration`
  * `shortBreakDuration`
  * `longBreakDuration`
  * `notificationsEnabled`
  * `theme`
* `createdAt`
* `updatedAt`

---

## 2.2 Task Collection

### Purpose

Stores study tasks created by users.

### Fields

* `_id`
* `userId` (reference: User)
* `title`
* `description`
* `category` (Study / Revision / Practice)
* `priority` (Low / Medium / High)
* `estimatedMinutes`
* `dueDate`
* `status` (Pending / Completed)
* `syncStatus` (Pending / Synced)
* `createdAt`
* `updatedAt`

---

## 2.3 FocusSession Collection

### Purpose

Tracks every Pomodoro focus session.

### Fields

* `_id`
* `userId`
* `taskId` (optional)
* `startTime`
* `endTime`
* `durationMinutes`
* `sessionType` (Focus / ShortBreak / LongBreak)
* `completed` (Boolean)
* `createdAt`

---

## 2.4 DistractionLog Collection

### Purpose

Stores distraction data for analytics.

### Fields

* `_id`
* `userId`
* `focusSessionId`
* `distractionType` (SocialMedia / Phone / Noise / Fatigue)
* `timestamp`

---

## 2.5 Streak Collection

### Purpose

Tracks consistency and motivation metrics.

### Fields

* `_id`
* `userId`
* `currentStreak`
* `longestStreak`
* `lastActiveDate`

---

## 3. Controllers (Business Logic)

---

## 3.1 Auth Controller

### Responsibilities

* User registration
* User login
* Token generation

### Methods

* `registerUser()`
* `loginUser()`
* `refreshToken()` (optional)

---

## 3.2 Task Controller

### Responsibilities

* Create task
* Update task
* Delete task
* Fetch tasks (filters: date, status)

### Methods

* `createTask()`
* `getTasks()`
* `updateTask()`
* `deleteTask()`

---

## 3.3 Focus Session Controller

### Responsibilities

* Save focus sessions
* Sync offline sessions
* Calculate daily totals

### Methods

* `createSession()`
* `syncSessions()`
* `getDailySummary()`

---

## 3.4 Distraction Controller

### Responsibilities

* Log distractions
* Provide analytics data

### Methods

* `logDistraction()`
* `getDistractionStats()`

---

## 3.5 Analytics Controller

### Responsibilities

* Aggregate productivity data
* Return weekly/monthly stats

### Methods

* `getWeeklyAnalytics()`
* `getMonthlyAnalytics()`
* `getCompletionRate()`

---

## 3.6 Streak Controller

### Responsibilities

* Update streaks
* Detect streak breaks

### Methods

* `updateStreak()`
* `getStreakInfo()`

---

## 4. API Routes Structure

```
/api/auth
  ├── POST /register
  ├── POST /login

/api/tasks
  ├── GET /
  ├── POST /
  ├── PUT /:id
  ├── DELETE /:id

/api/sessions
  ├── POST /
  ├── POST /sync
  ├── GET /daily

/api/distractions
  ├── POST /
  ├── GET /stats

/api/analytics
  ├── GET /weekly
  ├── GET /monthly

/api/streaks
  ├── GET /
  ├── PUT /update
```

---

## 5. Middleware

### 5.1 Auth Middleware

* Verifies JWT
* Attaches `req.user`

### 5.2 Error Handling Middleware

* Centralized error responses

### 5.3 Rate Limiting

* Prevent brute-force attacks

---

## 6. Sync Strategy (Backend Role)

### Backend Responsibilities

* Accept bulk offline data
* Store synced records
* Resolve conflicts (last-write-wins)

### Backend Does NOT

* Manage timers
* Block offline usage

---

## 7. Security Requirements

* Password hashing (bcrypt)
* JWT expiration
* Input validation (Joi / Zod)
* HTTPS only
* CORS configuration

---

## 8. Performance & Scalability

* Indexed queries (userId, date)
* Pagination for analytics
* Background jobs (cron) for streak checks

---

## 9. Folder Structure (Backend)

```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── utils/
 ├── config/
 ├── app.js
 └── server.js
```

---

## 10. Future Backend Enhancements

* AI recommendation engine
* Calendar integration
* Team study rooms
* Export analytics (PDF)
* Web dashboard

---

## 11. Why This Backend Is Portfolio-Grade

✔ Clean REST architecture
✔ Offline sync support
✔ Secure authentication
✔ Analytics-ready schema
✔ Scalable design

---

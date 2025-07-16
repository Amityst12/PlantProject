# Smart Campus – Full Stack Project 🌱

מערכת השקיה חכמה לניהול צמחיה בקמפוס  
**Fullstack: React + TailwindCSS + Node.js (Express) + MySQL**

---

## 📁 מבנה הפרויקט

Project/
├── client/      # צד לקוח (React + TailwindCSS)
├── server/      # צד שרת (Node.js + Express)
├── db/          # קבצי SQL - יצירת מסד נתונים
│   └── init.sql
├── README.md
├── .gitignore

---

## 🚀 הפעלה מהירה (Quick Start)

### 1. הגדרת מסד נתונים (MySQL)
1. התקן והפעל שרת MySQL מקומי (XAMPP/Workbench/CLI).
2. פתח את הקובץ db/init.sql והרץ אותו (ב־phpMyAdmin / Workbench / CLI).

### 2. התקנת צד שרת (Backend)
cd server  
npm install

ערוך קובץ .env בהתאם להגדרות MySQL שלך:

PORT=5000  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=yourpassword  
DB_NAME=smartcampus

הרץ את השרת:
node index.js  
# או עם nodemon (בפיתוח)  
npx nodemon index.js

### 3. התקנת צד לקוח (Frontend)
cd ../client  
npm install  
npm start

האתר יעלה בברירת מחדל על http://localhost:3000/

---

## 🧑‍💻 פיתוח בצוות
1. יש ליצור branch לכל פיצ'ר/באג חדש.
2. Pull Requests – חובה לכל Merge ל-main.
3. יש לעדכן את README לפי שינויי פרויקט.

---

## 📋 טכנולוגיות בשימוש
- Frontend: React, TailwindCSS
- Backend: Node.js, Express.js, MySQL2
- DB: MySQL

---

## 💡 הערות
- אין להעלות קבצי .env או node_modules (כלול ב-.gitignore).
- יש להפעיל את מסד הנתונים לפני הרצת השרת.

---

בהצלחה!  
עמית והצוות 🚀

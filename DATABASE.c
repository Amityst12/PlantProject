--טבלת משתמשים
CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY, --מזהה ייחודי לכל משתמש, עולה אוטומטית
    username VARCHAR(50) NOT NULL, --שם המשתמש
    password CHAR(60) NOT NULL, --סיסמה מוצפנת(hash), עד 60 תווים
    email VARCHAR(100) NOT NULL, --כתובת מייל, ייחודית ובלתי ריקה
    phone VARCHAR(20), --מספר טלפון בפורמט בינלאומי
    role ENUM('admin', 'manager', 'student', 'guest') NOT NULL, --תפקיד המשתמש במערכת
  
);

--טבלת מבנים
CREATE TABLE building(
    id INT AUTO_INCREMENT PRIMARY KEY, --מזהה ייחודי לכל מבנה, עולה אוטומטית
    name VARCHAR(100) NOT NULL , --שם המבנה, ייחודי ובלתי ריק

);

--טבלת קומות
CREATE TABLE floor(
    id INT AUTO_INCREMENT PRIMARY KEY, --מזהה ייחודי לכל קומה, עולה אוטומטית
    number INT NOT NULL, --מספר הקומה
    building_id INT NOT NULL, --המזהה של המבנה שאליו שייכת הקומה
    FOREIGN KEY(building_id)              --הגדרת מפתח זר
    REFERENCES building(id)              --קישור לטבלת building
    ON DELETE CASCADE                    -- מחיקת הקומות אוטומטית עם מחיקת מבנה
);

--טבלת חדרים
CREATE TABLE room(
    id INT AUTO_INCREMENT PRIMARY KEY, --מזהה ייחודי לכל חדר, עולה אוטומטית
    name VARCHAR(50) NOT NULL, --שם החדר
    room_type ENUM('class', 'storage', 'office', 'lab', 'toilet') NOT NULL, --סוג החדר
    floor_id INT NOT NULL, --המזהה של הקומה שאליה שייך החדר
    FOREIGN KEY(floor_id)                 --הגדרת מפתח זר
    REFERENCES floor(id)                 --קישור לטבלת floor
    ON DELETE CASCADE                    -- מחיקת חדרים אוטומטית עם מחיקת קומה
);

CREATE TABLE sensor(
    id INT AUTO_INCREMENT PRIMARY KEY,

    serial_number      VARCHAR(100) NOT NULL UNIQUE COMMENT 'מספר סידורי ייחודי',
    model              VARCHAR(50)  NOT NULL       COMMENT 'דגם החיישן',
    manufacturer       VARCHAR(50)  NOT NULL       COMMENT 'יצרן החיישן',
    type               VARCHAR(50)  NOT NULL       COMMENT 'סוג החיישן (לחות, טמפרטורה, תנועה וכו\')',
    name               VARCHAR(100) NOT NULL       COMMENT 'שם תיאורי',
    unit               VARCHAR(20)  NOT NULL       COMMENT 'יחידת מידה (°C, %, ppm וכו\')',

    status             ENUM('active', 'inactive', 'error', 'maintenance')
    NOT NULL DEFAULT 'active' COMMENT 'מצב עבודה',

    installed_at       DATE         NOT NULL       COMMENT 'תאריך התקנה',
    last_maintenance   DATE                       COMMENT 'תחזוקה אחרונה',

    room_id            INT          NOT NULL       COMMENT 'מזהה חדר',

    --מיקום פיזי בתוך החדר(במטרים)
    x_coord            DECIMAL(6, 2) NULL           COMMENT 'מיקום X בתוך החדר (מטרים)',
    y_coord            DECIMAL(6, 2) NULL           COMMENT 'מיקום Y בתוך החדר (מטרים)',

    --מיקום יחסי עבור תצוגה גרפית(למשל אחוזים על גבי תוכנית קומה)
    x_percent          DECIMAL(5, 2) NULL           COMMENT 'אחוז מיקום X מתוך רוחב התמונה',
    y_percent          DECIMAL(5, 2) NULL           COMMENT 'אחוז מיקום Y מתוך גובה התמונה',

    --קשר לחדר
    FOREIGN KEY(room_id) REFERENCES room(id) ON DELETE CASCADE
);








import React from "react";
import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 relative" dir="rtl">
      
      {/* Badge עליון */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-3"
      >
        <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-semibold shadow">
          מערכת ניהול הצמחייה של HIT
        </span>
      </motion.div>

      {/* כותרת ראשית */}
      <motion.h1
        className="w-full text-center text-5xl font-black text-emerald-700 mb-10 mt-2 tracking-tight drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
      >
        SmartPlantProject — מערכת ההשקיה של הקמפוס
      </motion.h1>

      {/* בלוק מרכזי */}
      <motion.div
        className="bg-white/80 shadow-lg rounded-xl px-4 sm:px-8 py-10 flex flex-col items-center max-w-xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
      >
        {/* אנימציית אייקון */}
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg relative"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, type: "spring", stiffness: 60 }}
        >
          <Droplets className="w-10 h-10 text-white" />
          <span className="sr-only">אייקון השקיה</span>
        </motion.div>

        <h2 className="text-3xl font-extrabold text-emerald-800 mb-4 tracking-tight text-center">
          מערכת ההשקיה החכמה של קמפוס HIT
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          ניהול, שליטה ובקרה על חיישני לחות ונתוני הצמחים בקמפוס – הכל בדשבורד נוח ומתקדם.
        </p>
        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-8 py-3 shadow transition text-lg"
          >
            מעבר לדשבורד
          </motion.button>
        </Link>
      </motion.div>

      {/* קרדיט + אייקונים חברתיים */}
      <div className="flex flex-col items-center mt-8 gap-2">
        <p className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} PlantProject • כל הזכויות שמורות
        </p>
        <p className="text-sm text-gray-400 text-center">
          פותח ע"י צוות PlantProject – המחלקה למדעי המחשב, HIT
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://github.com/Amityst12/PlantProject"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-emerald-600 transition"
          >
            {/* אייקון GitHub SVG */}
            <svg
              className="w-6 h-6 inline"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.34.7-4-1.5-4-1.5-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.2.8.1-.6.3-1.1.5-1.4-2.67-.3-5.5-1.34-5.5-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.4 1.2.9-.2 1.9-.3 2.8-.3s1.9.1 2.8.3c2.4-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.7-2.8 5.7-5.5 6 .3.3.6.8.6 1.7v2.6c0 .4.2.7.8.6A12 12 0 0 0 12 .3" />
            </svg>
          </a>
        </div>
      </div>

      {/* רקע SVG דינמי עדין (אפשר למחוק אם לא רוצים) */}
      <svg
        className="absolute bottom-0 left-0 w-72 h-72 opacity-20 -z-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#34d399"
          d="M36.7,-54.1C47.1,-47.6,54.2,-36.7,59.8,-25.1C65.5,-13.5,69.8,-1.3,68.3,10.5C66.7,22.4,59.3,33.9,49.4,41.6C39.5,49.3,27.1,53.2,15.1,56.1C3.1,59,-8.5,60.9,-21.2,58.7C-33.9,56.5,-47.7,50.2,-53.7,39.6C-59.7,28.9,-58,14.4,-58.6,-0.3C-59.2,-14.9,-62.2,-29.7,-56.3,-38.6C-50.5,-47.5,-35.9,-50.6,-22.5,-54.9C-9.1,-59.2,3.1,-64.6,16.2,-66.2C29.4,-67.8,42.6,-65.8,36.7,-54.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

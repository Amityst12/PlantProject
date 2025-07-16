import logo from './logo.svg';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-blue-300">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
        Tailwind עובד! 🎉
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        ברוך הבא לפרויקט שלך. כל הכבוד על ההתמדה!
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow hover:bg-blue-700 transition">
        כפתור דוגמה
      </button>
    </div>
  );
}

export default App;

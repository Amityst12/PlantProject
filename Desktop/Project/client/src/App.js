import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import MapView from "./Pages/MapView";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapView />} />
          {/* Add more routes as needed */}


          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import React from "react";
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Movie from "./pages/Movie/Movie";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/detail/:category/:id" element={<Detail />} />
            <Route path="/:category/:type" element={<Movie />} />
            <Route path="/:category/search/:keyword" element={<Movie />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

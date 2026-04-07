import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Playground from './pages/Playground';
import Features from './pages/Features';
import About from './pages/About';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="playground" element={<Playground />} />
            <Route path="features" element={<Features />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

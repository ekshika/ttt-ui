// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative overflow-hidden">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
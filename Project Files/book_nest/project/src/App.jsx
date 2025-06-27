import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import LandingPage from './components/LandingPage';
import UserLogin from './components/auth/UserLogin';
import SellerLogin from './components/auth/SellerLogin';
import AdminLogin from './components/auth/AdminLogin';
import UserDashboard from './components/user/UserDashboard';
import SellerDashboard from './components/seller/SellerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import BookView from './components/user/BookView'; // ✅ Add this line

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/seller/login" element={<SellerLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/user/*" element={<UserDashboard />} />
              <Route path="/seller/*" element={<SellerDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/book/:id" element={<BookView />} /> {/* ✅ This needs the import */}
            </Routes>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;

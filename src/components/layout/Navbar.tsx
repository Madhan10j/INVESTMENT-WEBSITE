import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, TrendingUp, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#0A2463] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold">INVESTO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-[#3E885B] transition-colors">Home</Link>
          {user ? (
            <>
              <Link to="/portfolio" className="hover:text-[#3E885B] transition-colors">Portfolio</Link>
              <div className="relative group">
                <button className="flex items-center hover:text-[#3E885B] transition-colors">
                  <User className="h-5 w-5 mr-1" />
                  {user.name || 'Account'}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#3E885B] transition-colors">Login</Link>
              <Link 
                to="/signup" 
                className="bg-[#3E885B] hover:bg-[#2D6A45] px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0A2463] pb-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 hover:bg-[#0D2B7A] px-2 rounded" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  to="/portfolio" 
                  className="py-2 hover:bg-[#0D2B7A] px-2 rounded" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center py-2 hover:bg-[#0D2B7A] px-2 rounded text-left"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 hover:bg-[#0D2B7A] px-2 rounded" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-[#3E885B] hover:bg-[#2D6A45] py-2 px-4 rounded-md" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
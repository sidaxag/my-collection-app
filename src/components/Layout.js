import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';

const Layout = ({ children }) => {
  const history = useHistory();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <div>
            <Link to="/home" className="text-xl font-bold">Home</Link>
          </div>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li>
                  <Link to="/collections" className="hover:underline">My Collections</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:underline">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;

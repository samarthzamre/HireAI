import Footer from './src/components/Footer';
import Navbar from './src/components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './src/components/ScrollTop';
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const location = useLocation();
  const { user } = useUser(); // Get user information from Clerk

  // Check if the current path is the dashboard path
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div>
      <ScrollToTop />

      {/* Conditionally show the Navbar and Footer on non-dashboard pages */}
      {!isDashboard && <Navbar />}

      {/* Dashboard Header with Avatar and Profile Information */}
      {isDashboard && (
        <div className="flex justify-end items-center p-2">
          <SignedIn>
            <div className="flex items-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10', // Increase the size of the avatar
                  },
                }}
              />
              {/* Display Profile Information */}
              <div className="ml-3 text-gray-800 dark:text-white text-right">
                <p className="font-medium">{user?.fullName || 'User'}</p>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
          </SignedIn>
        </div>
      )}

      {/* Main Content Outlet */}
      <Outlet />

      {/* Conditionally show the Footer on non-dashboard pages */}
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;

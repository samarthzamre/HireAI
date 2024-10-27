import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from './ScrollTop';
import { SignedIn, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();
  const { user } = useUser(); // Get user information from Clerk
  const clerk = useClerk(); // Access Clerk methods

  // Check if the current path is the dashboard path
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Sign out the user when the browser window is closed
      clerk.signOut();
    };

    // Add event listener to window beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clerk]);

  // Redirect to the dashboard if the user is authenticated and not on the dashboard
  if (user && !isDashboard) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <ScrollToTop />

      {/* Conditionally show the Navbar and Footer on non-dashboard pages */}
      {!isDashboard && <Navbar />}

      {/* Dashboard Header with Avatar and Profile Information */}
      {isDashboard && user && (
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

import logo from "../assets/logo.jpg";
import { Menu, X, MoveRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"; // Clerk components

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser(); // Clerk user object

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/workflow", label: "Workflow" },
    { path: "/services", label: "Services" },
    { path: "/aboutus", label: "About" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2 rounded-full" src={logo} alt="Logo" />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `relative transition-all duration-300 ease-in-out ${
                      isActive ? "text-white font-bold text-lg" : "hover:text-purple-600 hover:font-bold text-lg"
                    }`
                  }
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-purple-600 transition-transform duration-300 ease-in-out ${
                      location.pathname === path ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <SignedOut>
              {/* Show the Get Started button for signed-out users */}
              <SignInButton mode="modal">
                <button
                  className="bg-gradient-to-r from-purple-500 to-orange-700 py-2 px-3 rounded-md transition-transform duration-300 ease-in-out hover:bg-gradient-to-l hover:from-purple-600 hover:to-orange-800 hover:scale-105 hover:font-bold flex items-center"
                >
                  Get Started
                  <MoveRight className="ml-2 w-5 h-5 transition-transform duration-300 ease-in-out hover:fill-white" />
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* Display user avatar and logout button when logged in */}
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
                {user && <span className="ml-2 text-gray-800 dark:text-neutral-200">{user.fullName}</span>}
              </div>
            </SignedIn>
          </div>

          <div className="lg:hidden md-flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navLinks.map(({ path, label }) => (
                <li className="py-4" key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `relative transition-all duration-300 ease-in-out ${
                        isActive ? "text-white font-bold text-lg" : "hover:text-purple-600 hover:font-bold text-lg"
                      }`
                    }
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-purple-600 transition-transform duration-300 ease-in-out ${
                        location.pathname === path ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-orange-700 transition-transform duration-300 ease-in-out hover:bg-gradient-to-l hover:from-purple-600 hover:to-orange-800 hover:scale-105 hover:font-bold flex items-center"
                  >
                    Get Started
                    <MoveRight className="ml-2 w-5 h-5 transition-transform duration-300 ease-in-out hover:fill-white" />
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

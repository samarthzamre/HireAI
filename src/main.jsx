import { ClerkProvider } from '@clerk/clerk-react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import IntroSection from "./components/IntroSection.jsx";
import FeatureSection from "./components/FeatureSection.jsx";
import WorkFlow from "./components/WorkFlow.jsx";
import ServiceSection from "./components/ServiceSection.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Faq from "./components/Faq.jsx";
import Dashboard from "./components/Dashboard.jsx"; // Import the Dashboard component
import ScrollToTop from "./components/ScrollTop.jsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<IntroSection />} />
      <Route path="features" element={<FeatureSection />} />
      <Route path="workflow" element={<WorkFlow />} />
      <Route path="services" element={<ServiceSection />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="faq" element={<Faq />} />
      <Route path="dashboard" element={<Dashboard />} /> {/* Add the Dashboard route */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignInUrl="/dashboard" afterSignOutUrl="/">
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  </ClerkProvider>
);

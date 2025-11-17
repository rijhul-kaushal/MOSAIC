import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Styling

// Components
// FIX: Changed all '@/' imports to relative './' paths
import Layout from './components/Layout.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Bath from './pages/Categories/Bath.jsx';
import Complexion from './pages/Categories/Complexion.jsx';
import Eyes from './pages/Categories/Eyes.jsx';
import Fragrance from './pages/Categories/Fragrance.jsx';
import Hair from './pages/Categories/Hair.jsx';
import Lips from './pages/Categories/Lips.jsx';
import Nails from './pages/Categories/Nails.jsx';
import Skin from './pages/Categories/Skin.jsx';
import Tools from './pages/Categories/Tools.jsx';
import Brands from './pages/Brands/Brands.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Home from './pages/Home/Home.jsx';
import Men from './pages/Men/Men.jsx';
import Tutorials from './pages/Tutorials/Tutorials.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Login from './pages/Login/Login.jsx';
import Partnerships from './pages/Partnerships/Partnerships.jsx';
import FindShade from './pages/FindShade/FindShade.jsx';
import Undertone from './pages/Undertone/Undertone.jsx';
import YourShade from './pages/YourShade/YourShade.jsx';

// Lazy-loaded components
// FIX: Changed all '@/' imports to relative './' paths
const Bookings = lazy(() => import('./pages/Bookings/Bookings.jsx'));
const Rewards = lazy(() => import('./pages/Rewards/Rewards.jsx'));
const Play = lazy(() => import('./pages/Play/Play.jsx'));

// This component handles scrolling to hash links (e.g., /#bestsellers)
// and scrolling to top on normal page navigation.
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // If element exists, scroll to it smoothly
        element.scrollIntoView({ behavior: 'smooth' });
        return; // Exit after scrolling
      }
    }

    // If no hash, or element not found, scroll to top
    // Use 'auto' behavior for immediate scrolling on page change
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]); // Re-run on path or hash change

  return null;
};

const App = () => (
  <>
    <ScrollToHash />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/bath" element={<Bath />} />
        <Route path="categories/complexion" element={<Complexion />} />
        <Route path="categories/eyes" element={<Eyes />} />
        <Route path="categories/fragrance" element={<Fragrance />} />
        <Route path="categories/hair" element={<Hair />} />
        <Route path="categories/lips" element={<Lips />} />
        <Route path="categories/nails" element={<Nails />} />
        <Route path="categories/skin" element={<Skin />} />
        <Route path="categories/tools" element={<Tools />} />
        <Route path="brands" element={<Brands />} />
        <Route path="men" element={<Men />} />
        <Route
          path="bookings"
          element={
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Bookings />
            </Suspense>
          }
        />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="find-my-shade" element={<FindShade />} />
        <Route path="find-my-shade/undertone" element={<Undertone />} />
        <Route path="find-my-shade/your-shade" element={<YourShade />} />
        <Route
          path="rewards"
          element={
            // FIX: Corrected typo from 'SuspDRAFTnse' to 'Suspense'
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Rewards />
            </Suspense>
          }
        />
        <Route
          path="play"
          element={
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Play />
            </Suspense>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="partnerships" element={<Partnerships />} />
        <Route path="*" element={<div className="page-not-found">Page not found</div>} />
      </Route>
    </Routes>
  </>
);

export default App;
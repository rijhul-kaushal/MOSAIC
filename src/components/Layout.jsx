import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import TopPromoBar from './TopPromoBar.jsx';

const Layout = () => (
  <>
    <TopPromoBar />
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default Layout;


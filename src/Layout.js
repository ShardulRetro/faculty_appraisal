import { useLocation } from 'react-router-dom';
import SideMenu from './components/SideMenu';

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Conditionally render the SideMenu based on the current route */}
      {location.pathname !== '/' && <SideMenu />}
      <div className="content-container">{children}</div>
    </div>
  );
}

export default Layout;

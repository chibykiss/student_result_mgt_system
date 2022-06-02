import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
export default function HeaderSidebar() {
  return (
      <>
    <Header />
    <div className='mainWrapper'>
      <Sidebar />
      <Outlet />
    </div>
    </>
  )
}

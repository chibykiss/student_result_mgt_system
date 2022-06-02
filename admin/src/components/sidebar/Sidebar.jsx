import './sidebar.css';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import AdjustIcon from '@mui/icons-material/Adjust';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';  
import { Link, useNavigate } from "react-router-dom";
import useLogout from '../../hooks/useLogout';
export default function Sidebar() {
  const logout = useLogout()
  const navigate = useNavigate()
  const signOut = async () => {
      await logout()
      navigate('/')
  }
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className='sidebarTitle'>Dashboard</h3>
                <ul className="sidebarList">
                <Link className='text-decoration-none' to="/admin">
                  <li className='sidebarListItem'><LineStyleIcon  className='sidebarIcon'/> Home</li>
                </Link> 
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className='sidebarTitle'>Class</h3>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="create_class">
                    <li className='sidebarListItem'><ClassIcon className='sidebarIcon'/> Create Class</li>
                  </Link>
                </ul>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="class">
                  <li className='sidebarListItem'><SchoolIcon className='sidebarIcon'/> Manage Class</li>
                  </Link>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className='sidebarTitle'>Subject</h3>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="create_subject">
                    <li className='sidebarListItem'><CreateIcon className='sidebarIcon'/> Create Subject</li>
                  </Link>
                </ul>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="subject">
                  <li className='sidebarListItem'><SubjectIcon className='sidebarIcon'/> Manage Subject</li>
                  </Link>
                </ul>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="comboadd">
                  <li className='sidebarListItem'><AddIcon className='sidebarIcon'/> Add Subject Combo</li>
                  </Link>
                </ul>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="combo">
                  <li className='sidebarListItem'><AdjustIcon className='sidebarIcon'/> Manage Subject Combo</li>
                  </Link>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className='sidebarTitle'>Student</h3>
                <ul className="sidebarList">
                  <Link className='text-decoration-none' to="studentadd">
                  <li className='sidebarListItem'><AddBoxIcon className='sidebarIcon'/> Create Student</li>
                  </Link>
                </ul>
                <ul className="sidebarList">
                  <Link className="text-decoration-none" to="students">
                  <li className='sidebarListItem'><ManageAccountsIcon className='sidebarIcon'/> Manage Student</li>
                  </Link>
                </ul>
              
            </div>
            <div className="sidebarMenu">
                <h3 className='sidebarTitle'>Result</h3>
                <ul className="sidebarList">
                  <Link to="resultadd" className="text-decoration-none">
                  <li className='sidebarListItem'><AddIcon className='sidebarIcon'/> Add Result</li>
                  </Link>
                </ul>
                <ul className="sidebarList">
                  <Link to="result" className="text-decoration-none">
                  <li className='sidebarListItem'><EditIcon className='sidebarIcon'/> Manage Result</li>
                  </Link>
                </ul>
              
            </div>
            <div className="sidebarMenu SidebarLogout">
                <ExitToAppIcon className='sidebarIcon' />
                <h3 onClick={signOut} className='sidebarTitle'>Logout</h3>
            </div>
        </div>
    </div>
  )
}


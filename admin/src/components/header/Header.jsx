import "./header.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useLogout from '../../hooks/useLogout';
import { useNavigate } from "react-router-dom";
//import { AccessAlarm, ThreeDRotation, NotificationsNoneIcon } from '@mui/icons-material';
export default function Header() {
    const logout = useLogout()
    const navigate = useNavigate()
    const signOut = async () => {
        await logout()
        navigate('/login')
    }
  return (
 <div className="header">
     <div className="headerWrapper">
         <div className="topRight">
             <span className="logo"> Student Result Mangement</span>
         </div>
        <div className="topLeft">
            <div className="headerIcons">
                <NotificationsNoneIcon />
                <span className="headerIconBadge">2</span>
            </div>
            <div className="headerIcons">
                <SettingsIcon />
            </div>
            <div className="headerIcons">
                <AccountCircleIcon />
            </div>
            <div className="headerIcons headerLogout">
                <ExitToAppIcon />
                <span onClick={signOut}>Logout</span>
            </div>
        </div>
     </div>
 </div>
    )
}
 
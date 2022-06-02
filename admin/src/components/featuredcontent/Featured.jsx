import "./featured.css";
import { useEffect,useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useLocation, useNavigate } from "react-router-dom";
export default function Featured() {
    const privateAxios = useAxiosPrivate()
    const [totals,setTotals] = useState({})
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
            let isMounted = true
            const controller = new AbortController()
        
            const getTotals = async() => {
                try {
                    const response = await privateAxios.get('/total', {
                        signal: controller.signal
                    })
                    console.log(response.data)
                    isMounted && setTotals(response.data)
                } catch (error) {
                    console.error(error)
                    //navigate('/login', {state: {from: location}, replace: true})
                }
            }
            getTotals()

            return () => {
                isMounted = false
                controller.abort()
            }
    },[])
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">
                Registered Students
            </span>
            <p className="featuredNumber">{totals?.totalStudents}</p>
            <p className="featuredIcon"><GroupIcon className="mainIcon"/></p>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">
                Total Classes
            </span>
            <p className="featuredNumber">{totals?.totalClasses}</p>
            <p className="featuredIcon"><ClassIcon className="mainIcon"/></p>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">
                Total Subjects
            </span>
            <p className="featuredNumber">{totals?.totalSubjects}</p>
            <p className="featuredIcon"><CollectionsBookmarkIcon className="mainIcon"/></p>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">
                Declared Results
            </span>
            <p className="featuredNumber">{totals?.totalResults}</p>
            <p className="featuredIcon"><MenuBookIcon className="mainIcon" /></p>
        </div>
    </div>
  )
}

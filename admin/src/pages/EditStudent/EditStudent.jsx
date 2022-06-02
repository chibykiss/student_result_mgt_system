import StudentForm from "../../components/StudentForm/StudentForm"
import { useParams } from "react-router-dom"
export default function EditStudent() {
  const {studentid} = useParams();
  return (
    <div className='mainPageWrapper'>
    <div className="pageWrapper">
    <div className="pageTitle">
      <h5>Edit Students</h5>
    </div>
    <div className="contentWrapper">
       <StudentForm btntext="update" studentid={studentid} />
    </div>
  </div>
</div>
  )
}

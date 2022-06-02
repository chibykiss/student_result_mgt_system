import CreateClassForm from "../../components/CreateClassForm/CreateClassForm"
import { useParams } from "react-router-dom"
export default function EditClass() {
  //console.log(useParams())
  const {classid} = useParams();

  return (
    <div className="mainPageWrapper">
         <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Edit Student Class</h5>
        </div>
        <div className="contentWrapper">
            <CreateClassForm btntext="update" classid={classid} />
        </div>
      </div>
    </div>
  )
}

import CreateSubForm from "../../components/CreateSubjectForm/CreateSubForm"
import { useParams } from "react-router-dom"
export default function EditSubject() {
  const {subjectid} = useParams()
  return (
    <div className="mainPageWrapper">
         <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Edit Subject</h5>
        </div>
        <div className="contentWrapper">
            <CreateSubForm btntext="update" subjectid={subjectid} />
        </div>
      </div>
    </div>
  )
}

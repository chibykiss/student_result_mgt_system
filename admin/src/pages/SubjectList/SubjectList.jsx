
import SubjectTable from "../../components/SubjectTable/SubjectTable"
export default function SubjectList() {
  return (
    <div className="mainPageWrapper">
             <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Manage Subject</h5>
        </div>
        <div className="contentWrapper">
            <SubjectTable />
        </div>
      </div>
    </div>
  )
}

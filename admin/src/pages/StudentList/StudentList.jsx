import StudentTable from "../../components/StudentTable/StudentTable"

export default function StudentList() {
  return (
    <div className='mainPageWrapper'>
    <div className="pageWrapper">
    <div className="pageTitle">
      <h5>Manage Students</h5>
    </div>
    <div className="contentWrapper">
        <StudentTable />
    </div>
  </div>
</div>
  )
}

import ClassTable from "../../components/classtable/ClassTable"

export default function ClassList() {
  return (
    <div className="mainPageWrapper">
         <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Manage Classes</h5>
        </div>
        <div className="contentWrapper">
            <ClassTable />
        </div>
      </div>
    </div>
  )
}

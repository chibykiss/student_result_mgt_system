import AddResultForm from "../../components/AddResultForm/AddResultForm"
export default function AddResult() {
  return (
    <div className='mainPageWrapper'>
        <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Add Result</h5>
        </div>
        <div className="contentWrapper">
          <AddResultForm btntext="Declare result" isactive={false}/>
        </div>
      </div>
    </div>
  )
}

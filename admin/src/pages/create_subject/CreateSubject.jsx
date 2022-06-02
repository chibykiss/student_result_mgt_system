import CreateSubForm from "../../components/CreateSubjectForm/CreateSubForm"
export default function CreateSubject() {
  return (
    <div className='mainPageWrapper'>
          <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Create Subject</h5>
        </div>
        <div className="contentWrapper">
            <CreateSubForm  btntext="submit"/>
        </div>
      </div>
    </div>
  )
}

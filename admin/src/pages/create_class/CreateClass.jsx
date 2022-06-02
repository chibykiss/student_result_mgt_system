import CreateClassForm from "../../components/CreateClassForm/CreateClassForm";
export default function CreateClass() {
  return (
    <div className="mainPageWrapper">
      <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Create Student Class</h5>
        </div>
        <div className="contentWrapper">
            <CreateClassForm btntext="submit" />
        </div>
      </div>
    </div>
  )
}


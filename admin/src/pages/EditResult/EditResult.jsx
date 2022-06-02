import ResultForm from "../../components/AddResultForm/AddResultForm"
import { useParams } from "react-router-dom"
export default function EditResult() {
  const {resultid} = useParams();
  return (
    <div className='mainPageWrapper'>
        <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Edit Result</h5>
        </div>
        <div className="contentWrapper">
            <ResultForm btntext="Update Result" isactive={true}  resultid={resultid} />
        </div>
      </div>
    </div>
  )
}

import ResultTable from "../../components/ResultTabe/ResultTable"

export default function ResultList() {
  return (
    <div className='mainPageWrapper'>
        <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Manage Result</h5>
        </div>
        <div className="contentWrapper">
            <ResultTable />
        </div>
      </div>
    </div>
  )
}

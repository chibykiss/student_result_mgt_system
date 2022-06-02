import Featured from "../../components/featuredcontent/Featured";

export default function Home() {
  return (
    <div className="mainPageWrapper">
      <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Dashboard</h5>
        </div>
        <div className="contentWrapper">
          <Featured />
        </div>
        
      </div>
        
    </div>
  )
}

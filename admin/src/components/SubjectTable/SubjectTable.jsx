
import { DataGrid} from '@mui/x-data-grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ToastContainer, toast } from "react-toastify";
export default function ClassTable() {
    const [Data,setData] = useState([])
    const [delstate,setdelstate] = useState(false)
    const secureAxios = useAxiosPrivate()
    useEffect(() => {
      let isMounted = true
      const controller = new AbortController()
  
      const getSubList = async() => {
          try {
              const response = await secureAxios.get('/subject', {
                  signal: controller.signal
              })
              console.log(response.data)
              isMounted && setData(response.data)
          } catch (error) {
              console.error(error)
              //navigate('/login', {state: {from: location}, replace: true})
          }
      }
      getSubList()
  
      return () => {
          isMounted = false
          controller.abort()
      }
  },[delstate])
    const handleDelete = async (id) => {
      if(window.confirm("are u sure u want to delete?") === true){
        setdelstate(true)
        try {
          const res = await secureAxios.delete(`/subject/${id}`);
          console.log(res)
          toast("subject deleted successfully")
        } catch (error) {
          console.log(error)
        }
        setdelstate(false)
       
      }
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 150, hide:true },
        { field: 'subject_name', headerName: 'Subject Name', width: 200 },
        { field: 'subject_code', headerName: 'Subject Code', width: 150 },
        { field: 'createdAt', headerName: 'Creation Date', width: 200 },
        { field: 'col4',
         headerName: 'Action', 
         width: 200,
        renderCell: (params) => {
            return (
                <>
                <Link to={"/admin/subject/"+params.row._id}>
                <button className="classListEdit">Edit</button>
                </Link>
                <HighlightOffIcon className="classListDelete" onClick={()=>handleDelete(params?.row?._id)}/>
                </>
            )
        }
        },
      ];
  return (
    <div className="classTable">
      <ToastContainer pauseOnFocusLoss={true} />
        <div className="tableWrapper">
            <DataGrid 
            rows={Data} 
            columns={columns} 
            disableSelectionOnClick 
            pageSize={5}
            getRowId={(Data) => Data._id}
            rowsPerPageOptions={[5]} 
            checkboxSelection />
        </div>
    </div>
  )
}

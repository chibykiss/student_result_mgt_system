import "./classtable.css";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function ClassTable() {
  const secureAxios = useAxiosPrivate()
  const [Data,setData] = useState([])
  const [Del,setDel] = useState(false)
  useEffect(() => {
    let isMounted = true
    //const controller = new AbortController()

    const getClassList = async() => {
        try {
            const response = await secureAxios.get('/class', {
                //signal: controller.signal
            })
            console.log(response.data)
            isMounted && setData(response.data)
        } catch (error) {
            console.error(error)
            //navigate('/login', {state: {from: location}, replace: true})
        }
    }
    getClassList()

    return () => {
        isMounted = false
        //controller.abort()
    }
},[Del])
 
    const handleDelete = async (id) => {
        let text = "are you sure you want to delete"
        if(window.confirm(text) === true){
          setDel(true)
          try {
            const res = await secureAxios.delete(`/class/${id}`);
            console.log(res)
            toast("class deleted successfully")
          } catch (error) {
            console.log(error)
          }
          setDel(false)
         
        }
        //setData(Data.filter((item) => item.id !== id)) 
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 150, hide: true },
        { field: 'class_name', headerName: 'Class name', width: 200 },
        { field: 'section', headerName: 'Section', width: 150 },
        { field: 'createdAt', headerName: 'Creation Date', width: 200 },
        { field: 'col4',
         headerName: 'Action', 
         width: 200,
        renderCell: (params) => {
            return (
                <>
                <Link to={"/admin/class/"+params.row._id}>
                <button className="classListEdit">Edit</button>
                </Link>
                <DeleteOutlineIcon className="classListDelete" onClick={()=>handleDelete(params.row._id)}/>
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

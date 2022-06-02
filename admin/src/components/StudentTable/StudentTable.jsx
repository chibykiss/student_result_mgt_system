import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ClassTable() {
    const [Data,setData] = useState([])
    const [Del,setDel] = useState(false)
    const secureAxios = useAxiosPrivate()
    useEffect(() => {
      let isMounted = true
      const controller = new AbortController()
  
      const getStudentList = async() => {
          try {
              const response = await secureAxios.get('/students', {
                  signal: controller.signal
              })
              console.log(response.data)
              isMounted && setData(response.data)
          } catch (error) {
              console.error(error)
          }
      }
      getStudentList()
  
      return () => {
          isMounted = false
          controller.abort()
      }
    },[Del])
    const handleDelete = async (id) => {
      if(window.confirm("are u sure you want to delete") === true){
        setDel(true)
        try {
          const res = await secureAxios.delete(`/students/${id}`);
          console.log(res)
          toast("student record deleted successfully")
        } catch (error) {
          console.log(error)
        }
        setDel(false)
       
      }
    }
    const columns = [
        { field: '_id', headerName: 'S/N', width: 150 },
        { field: 'student_name', headerName: 'Studnet name', width: 200 },
        { field: 'registration_no', headerName: 'Registration No', width: 150 },
        { field: 'class', 
        headerName: 'Class', 
        width: 200,
        renderCell: (params) => {
          //console.log(params.row.class_id.class_name)
          return <div className="rowitem">{params?.row?.class_id?.class_name}</div>;

        }
        },
        { field: 'createdAt', headerName: 'Registration Date', width: 200 },
        { field: 'col5',
         headerName: 'Action', 
         width: 200,
        renderCell: (params) => {
            return (
                <>
                <Link to={"/admin/students/"+params.row._id}>
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

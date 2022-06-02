import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { DataGrid } from '@mui/x-data-grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from "react-toastify";
import { useState,useEffect } from "react";

export default function ClassTable() {
    const [Data,setData] = useState([])
    const [Active, setActive] = useState(false)
    const [Del, setDel] = useState(false)
    const secureAxios = useAxiosPrivate()
    useEffect(()=>{
      let isMounted = true
      const controller = new AbortController()
  
      const getStdSub = async() => {
          try {
              const response = await secureAxios.get('/subcombo', {
                  signal: controller.signal
              })
              //console.log(response.data)
              isMounted && setData(response.data)
          } catch (error) {
              console.error(error)
          }
      }
      getStdSub()
  
      return () => {
          isMounted = false
          controller.abort()
      }
    },[Active,Del])
    const handleDelete = async (id,stid,subid) => {
      if(window.confirm("are u sure you want to delete") === true){
        //console.log(id,stid,subid)
        setDel(true)
        try {
          const res = await secureAxios.delete(`/subcombo/${id}/${stid}/${subid}`);
          //console.log(res)
          toast("student record deleted successfully")
        } catch (error) {
          console.log(error)
        }
        setDel(false)
      }
      
    }
    const toggleActive = async (id) => {
      setActive(true)
      try {
        const res = await secureAxios.get(`/subcombo/${id}`);
        //console.log(res)
      } catch (error) {
        console.log(error)
      }
      setActive(false)
    }
    const columns = [
        { field: '_id', headerName: 'ID', hide:true, width: 150 },
        { field: 'subject', headerName: 'Subject name & Code', width: 200,
        renderCell: (params) => {
          //console.log(params.row.class_id.class_name)
          return <div className="rowitem">{params?.row?.subject_id?.subject_name}  {params?.row?.subject_id?.subject_code}</div>;

        }
        },
        { field: 'subject code', headerName: 'Student Name', width: 150,
        renderCell: (params) => {
          //console.log(params.row.class_id.class_name)
          return <div className="rowitem">{params?.row?.student_id?.student_name}</div>;

        }
        },
        { field: 'student name', headerName: 'Student Class', width: 200,
        renderCell: (params) => {
          //console.log(params?.row?.student_id?.class_id?.class_name)
          return <div className="rowitem">{params?.row?.student_id?.class_id?.class_name}</div>;

        }
        },
        { field: 'stat', headerName: 'Status', width: 100,
        renderCell: (params) => {
            //console.log(params?.row?.status);
            return (
                params?.row?.status 
                ? <CheckCircleOutlineIcon style={{color: "green", cursor: "pointer"}}  onClick={()=>toggleActive(params.row._id)}/>
                : <HighlightOffIcon className="classListDelete" onClick={()=>toggleActive(params.row._id)}/>
                 
            )
        }
        },
        { field: 'col4', headerName: 'Action', width: 100,
       renderCell: (params) => {
           return (
               <>
               <DeleteForeverIcon className="classListDelete" onClick={()=>handleDelete(params.row._id,params.row.student_id?._id,params.row.subject_id?._id)}/>
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

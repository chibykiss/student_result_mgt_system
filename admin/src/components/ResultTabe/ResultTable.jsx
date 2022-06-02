import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ToastContainer, toast } from "react-toastify";
  // const row = [
  //   { id: 1, col1: 'Paul Walker',  col2: 'First Grade',col3:'Physics | phy112', col4: 90},
  //   { id: 2, col1: 'Sandra Bullock', col2: 'Second Grade', col3: 'Mathematics | mth312', col4: 40 },
  //   { id: 3, col1: 'san Mighty',col2: 'First Grade', col3: 'Biology | Bio102', col4: 76 },

  // ];
export default function ClassTable() {
    const [Data,setData] = useState([])
    const [Del,setDel] = useState(false)
    const secureAxios = useAxiosPrivate()
    useEffect(() => {
      let isMounted = true
      const controller = new AbortController()
  
      const getResultList = async() => {
          try {
              const response = await secureAxios.get('/result', {
                  signal: controller.signal
              })
              console.log(response.data)
              isMounted && setData(response.data)
          } catch (error) {
              console.error(error)
          }
      }
      getResultList()
  
      return () => {
          isMounted = false
          controller.abort()
      }
    },[Del])
    const handleDelete = async (rid,sid,sbid) => {
      if(window.confirm("are u sure you want to delete") === true){
        setDel(true)
        try {
          const res = await secureAxios.delete(`/result/${rid}/${sid}/${sbid}`);
          console.log(res)
          toast("result has been deleted")
        } catch (error) {
          console.log(error)
        }
        setDel(false)
      }
    }
    const columns = [
        { field: '_id', headerName: 'S/N', width: 150, hide:true },
        { field: 'StdName', headerName: 'Studnet name', width: 200,
          renderCell: (params) => {
            return <div className="rowitem">{params?.row?.student_id?.student_name}</div>;
          }
        },
        { field: 'KlasName', headerName: 'Class', width: 150,
          renderCell: (params) => {
            return <div className="rowitem">{params?.row?.class_id?.class_name}</div>;
          }
        },
        { field: 'Subject', headerName: 'Subject | Subject code', width: 200,
          renderCell: (params) => {
            return <div className="rowitem">{params?.row?.subject_id?.subject_name} {params?.row?.subject_id?.subject_code}</div>;
          }
        },
        { field: 'mark', headerName: 'Mark', width: 200 },
        { field: 'col5',
         headerName: 'Action', 
         width: 200,
        renderCell: (params) => {
            return (
                <>
                <Link to={"/admin/result/"+params.row._id}>
                <button className="classListEdit">Edit</button>
                </Link>
                <DeleteOutlineIcon className="classListDelete" onClick={()=>handleDelete(params.row._id,params.row.student_id._id,params.row.subject_id._id)}/>
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

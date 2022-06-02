import "./StudentForm.css";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useAxios } from "../../hooks/useReusablefunc";
export default function StudentForm(props) {
    const secureAxios = useAxiosPrivate()
    const submitForm = useAxios()
    const [studentName, setStudentName] = useState("")
    const [studentRegno, setStudentRegno] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const [studentGender, setStudentGender] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [studentDob, setStudentDob] = useState("")
    const [studentId,setStudentId] = useState("")
    const [allKlas, setAllKlas] = useState([])
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const getAllClass = async () => {
            try {
                const response = await secureAxios.get('/class',{
                    signal: controller.signal
                })
                //console.log(response.data)
                isMounted && setAllKlas(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllClass()

        return () => {
            isMounted = false
            controller.abort()
        }

    },[])
    useEffect(() => {
        if(props.btntext === 'update'){
            let isMounted = true
            const controller = new AbortController()
        
            const getEdit = async() => {
                try {
                    const response = await secureAxios.get(`/students/${props.studentid}`, {
                        signal: controller.signal
                    })
                    console.log(response.data)
                    if(isMounted){
                      setStudentName(response?.data?.student_name)
                      setStudentRegno(response?.data?.registration_no)
                      setStudentEmail(response?.data?.student_email)
                      setStudentGender(response?.data?.gender)
                      setStudentClass(response?.data?.class_id)
                      setStudentDob(response?.data?.dob)
                      setStudentId(response?.data?._id)

                    }
                } catch (error) {
                    console.error(error)
                }
            }
            getEdit()
            return () => {
                isMounted = false
                controller.abort()
              }
        }
    },[])
    const createStudent = async(e) => {
        e.preventDefault()
        if (studentName === "" || studentRegno === "" || studentEmail === "" || studentGender === "" || studentClass === "" || studentDob === "") return toast("fill in the missing feild/s");
        const reqdata = {student_name:studentName,reg_no:studentRegno, email:studentEmail,gender:studentGender, dob:studentDob, class_id:studentClass}
        if(props.btntext === 'create'){
            submitForm('/students',reqdata,secureAxios.post,"Student created successfully")
        }else{
            submitForm(`/students/${studentId}`,reqdata,secureAxios.patch,"student updated successfully")
        }
    }
  return (
    <div className="newClass">
    <ToastContainer pauseOnFocusLoss={true} />
    <form onSubmit={createStudent} className="newClassForm">
        <div className="newClassItems">
            <label >Student FullName</label>
            <input type="text"
            value={studentName}
            onChange={(e) => {setStudentName(e.target.value)}}
            placeholder="Input full name" />

        </div>
        <div className="newClassItems">
            <label >Registration Number</label>
            <input type="text"
            value={studentRegno}
            onChange={(e) => {setStudentRegno(e.target.value)}}
            placeholder="Input Reg No" />
        </div>
        <div className="newClassItems">
            <label >Email Address</label>
            <input type="text" 
            value={studentEmail}    
            onChange={(e) => {setStudentEmail(e.target.value)}}
            placeholder="Input Student Email Address" />
        </div>
        <div className="RadioClass">
                <label >Gender</label>
                <div className="RadioClassItem">
                <label>Male</label><input 
                name="gender"  
                value="Male"
                onChange={(e) => {setStudentGender(e.target.value)}}
                type="radio" />
                <label>FeMale</label><input 
                name="gender" 
                value="Female"
                onChange={(e) => {setStudentGender(e.target.value)}}
                type="radio" />
                <label>Others</label><input 
                name="gender" 
                value="Other"
                onChange={(e) => {setStudentGender(e.target.value)}}
                type="radio" />
            </div>
        </div>
        <div className="newClassItems">
            <label>Select Student class</label>
            <select 
            value={studentClass} 
            onChange={(e) => setStudentClass(e.target.value)}
            className="subComboSelect">
                <option value="">Pls Select Class</option>
                {allKlas.map((Klas) => 
                   <option key={Klas._id} value={Klas._id}>{Klas.class_name}</option>
                )}
                
                {/* <option value="">Second Grade</option>
                <option value="">Thirs Grade</option>
                <option value="">Fifth Grade</option> */}
            </select>
        </div>
        <div className="newClassItems">
            <label >Date of Birth</label>
            <input type="Date"
            value={studentDob}
            onChange={(e) => {setStudentDob(e.target.value)}}
            placeholder="Input Student DOB" />
        </div>
        <div className="newClassBtn">
            <button>{props.btntext}</button>
        </div>
    </form>
</div>
  )
}

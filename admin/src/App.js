import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Home from "./pages/home/Home";
import CreateClass from "./pages/create_class/CreateClass";
import ClassList from "./pages/classList/ClassList";
import EditClass from "./pages/editClass/EditClass";
import CreateSubject from "./pages/create_subject/CreateSubject";
import SubjectList from "./pages/SubjectList/SubjectList";
import EditSubject from "./pages/EditSubject/EditSubject";
import ClassStudentSub from "./pages/ClassStudentSub/ClassStudentSub";
import SubComboList from "./pages/SubComboList/SubComboList";
import CreateStudent from "./pages/Ceate_Student/CreateStudent";
import StudentList from "./pages/StudentList/StudentList";
import EditStudent from "./pages/EditStudent/EditStudent";
import AddResult from "./pages/AddResult/AddResult";
import ResultList from "./pages/ResultList/ResultList";
import EditResult from "./pages/EditResult/EditResult";
import Login from "./pages/Login/Login";
import HeaderSidebar from "./layout/HeaderSidebar";
import Register from "./pages/Register/Register";
// import PersistLogin from "./components/persistLogin/PersistLogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* public routes should be here */}
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          {/* the protected routes are */}
          
            <Route element={<RequireAuth />}>
              <Route path="admin" element={<HeaderSidebar />}>
                <Route path="/admin" element={<Home />}></Route>
                <Route path="create_class" element={<CreateClass />}></Route>
                <Route path="class" element={<ClassList />}></Route>
                <Route path="class/:classid" element={<EditClass />}></Route>
                <Route path="create_subject" element={<CreateSubject />}></Route>
                <Route path="subject"element={<SubjectList />}></Route>
                <Route path="subject/:subjectid" element={<EditSubject />}></Route>
                <Route path="comboadd" element={<ClassStudentSub />}></Route>
                <Route path="combo" element={<SubComboList />}></Route>
                <Route path="studentadd" element={<CreateStudent />}></Route>
                <Route path="students" element={<StudentList />}></Route>
                <Route path="students/:studentid" element={<EditStudent />}></Route>
                <Route path="resultadd" element={<AddResult />}></Route>
                <Route path="result" element={<ResultList />}></Route>
                <Route path="result/:resultid" element={<EditResult />}></Route>
              </Route>
            </Route>
         
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404 NOT FOUND!</p>
              </main>
            }
          />
      </Routes>
    </Router>
  );
}

export default App;

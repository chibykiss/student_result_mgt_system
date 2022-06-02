import React from 'react'
import StudentForm from '../../components/StudentForm/StudentForm'

export default function CreateStudent() {
  return (
    <div className='mainPageWrapper'>
        <div className="pageWrapper">
        <div className="pageTitle">
          <h5>Create Student</h5>
        </div>
        <div className="contentWrapper">
            <StudentForm btntext="create" />
        </div>
      </div>
    </div>
  )
}

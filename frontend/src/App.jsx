import React, { useEffect } from 'react'
import Navbar from './component/Navbar'
import Home from './page/Home'
import SignIn from './page/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { baseUrl, userInfoUrl } from './global'
import ClassUser from './page/ClassUser'
import Classes from './component/Classes'
import DetailClass from './component/DetailClass'
import MemberClass from './component/MemberClass'
import StudentSession from './component/StudentSession'
import AddMember from './component/AddMember'
import ShareStudentSesion from './component/ShareStudentSession'
import CreateClass from './component/CreateClass'


function App() {

  async function checkAuthenticate() {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return 
    const url = baseUrl + userInfoUrl
    const jsonRp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    })
    const response = await jsonRp.json()
    if (!jsonRp.ok) {
      localStorage.setItem('isAuthenticated', false) 
      localStorage.removeItem('accessToken')
      return 
    }
    localStorage.setItem('isAuthenticated', true) 
    localStorage.setItem('email', response.data.email) 
  }


  useEffect(() => {
    checkAuthenticate()
  })


  return (
    <Router>
      <div>
        <Navbar /> {/* Thành phần nav top */}
        <Routes>
      
          <Route exact path="/" element={<Home />} />

          <Route path="/classes" element={<ClassUser />} >
              <Route path='' element={<Classes/>} />
              <Route path='create' element={<CreateClass/>} />
              <Route path=':id' element={<DetailClass/>} >
                <Route path='members' element={<MemberClass/>}/>
                <Route path='student-session' element={<StudentSession/>}/>
                <Route path='add-member' element={<AddMember/>}/>
                <Route path='share-student-session' element={<ShareStudentSesion/>}/>
              </Route>
          </Route>

          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  )

}

export default App
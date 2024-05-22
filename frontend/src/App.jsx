import React, { useEffect } from 'react'
import Navbar from './component/Navbar'
import Home from './page/Home'
import Decks from './component/Decks'
import PrepareStudy from './component/PrepareStudy'
import SignIn from './page/SignIn'
import CreateDeck from './component/CreateDeck'
import EditDeck from './component/EditDeck'
import Deck from './page/Deck'
import FlipCard from './page/FlipCard'
import CreateCard from './component/CreateCard'
import EditCard from './component/EditCard'
import Card from './page/Card'
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

  async function checkAuthenticate(token) {

    const url = baseUrl + userInfoUrl
    const jsonRp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
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


  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken')
  //   if (token) {
  //     checkAuthenticate(token)
  //   }
  // })


  return (
    <Router>
      <div>
        <Navbar /> {/* Thành phần nav top */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/decks" element={<Deck />} >
            <Route path='' element={<Decks />} />
            <Route path='create' element={<CreateDeck />} />
            <Route path='edit/:id' element={<EditDeck />} />
            <Route path=':id' element={<PrepareStudy />} />
            <Route path=':id/create-cards' element={<CreateCard />} />
            <Route path=':id/learn-cards' element={<FlipCard />} />

          </Route>

          <Route path="/cards" element={<Card />} >
              <Route path='edit/:id' element={<EditCard />} />
          </Route>

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
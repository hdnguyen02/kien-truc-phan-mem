import React, { useState, useRef } from 'react'
import { baseUrl, authSignInUrl } from '../global'
import Fail from '../component/Fail'
import '../input.css'

function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const failRef = useRef()

  const emailRef = useRef()
  const passwordRef = useRef()


  async function postSignIn(email, password) {
    const url = baseUrl + authSignInUrl
    try {
      const jsonRp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const response = await jsonRp.json()
      if (!jsonRp.ok) {
        throw new Error(response.message)
      } 
      const data = response.data
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('email', data.user.email)
      
      window.location.reload('/')
    }
    catch (error) {
      failRef.current.show(error.message, 2000)
    }
  }
  function handleSignIn(event) {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log(emailRef.current.value)
    // postSignIn("hdnguyen7702@gmail.com", "123456")
  }


  // return (
  //   <form onSubmit={handleSignIn} className='px-24 flex flex-col gap-y-3'>
  //     <input onChange={event => setEmail(event.target.value)} type="email" />
  //     <input onChange={event => setPassword(event.target.value)} type="password" minLength={6} />
  //     <button type='submit' className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  //       Đăng nhập
  //     </button>
  //     <Fail ref={failRef}/>
  //   </form>)

  return (<div className="flex justify-center items-center overflow-hidden" style={{height: 'calc(100vh - 80px)'}}>
  {/* Left: Image */}
  <div className="w-1/2 hidden lg:block" style={{height: 'calc(100vh - 80px)'}}>
    <img
      src="/touann-gatouillat-vergos-dSBJv66Yjlk-unsplash.jpg"
      alt="login image"
      className="object-cover w-full h-full"
    />
  </div>
  {/* Right: Login Form */}
  <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <form onSubmit={handleSignIn}>
      {/* Username Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Username
        </label>
        <input
          ref={emailRef}
          type="text"
          id="email"
          name="email"
          className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3"
          required
        />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3"

        />
      </div>
      {/* Remember Me Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="text-blue-500"
          required
        />
        <label htmlFor="remember" className="text-gray-600 ml-2">
          Nhớ tài khoản
        </label>
      </div>
      {/* Forgot Password Link */}
      <div className="mb-6 text-blue-500">
        <a href="#" className="hover:underline">
          Quên mật kh
        </a>
      </div>
      {/* Login Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Đăng nhập
      </button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-center">
      <a href="#" className="hover:underline">
        Đăng ký
      </a>
    </div>
  </div>
</div>)

}
export default SignIn

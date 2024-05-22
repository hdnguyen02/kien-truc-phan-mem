import { Link } from 'react-router-dom'
import { baseUrl, authSignOutUrl } from '../global'


function Navbar() {
  const email = localStorage.getItem('email')
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'))


  async function handleSignOut() {
    try { 
    const url = baseUrl + authSignOutUrl
    const token = localStorage.getItem('accessToken')
    await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    localStorage.removeItem('accessToken')
    localStorage.setItem('isAuthenticated', false)
    localStorage.setItem('email', null)
    window.location.reload('/')
  }
  catch(error) {
    console.log(error)
  }
}

  return <nav className="bg-[#F0F6F6] mb-12 h-20 px-24 flex justify-between items-center">
    <div className=''>
      <Link to={"/"} className='text-blue-700 text-3xl font-bold'>
        Flashcard
      </Link>

    </div>
    <div>
      <ul className='flex gap-x-8'>
        <Link to={"/"} className='hover:cursor-pointer font-medium'>Trang chủ</Link>
        {isAuthenticated && <Link to={"/decks"} className='hover:cursor-pointer font-medium'>Bộ thẻ</Link>}
        {isAuthenticated && <Link to={"/cards"} className='hover:cursor-pointer font-medium'>Thẻ</Link>}
        {isAuthenticated && <Link to={"/classes"} className='hover:cursor-pointer font-medium'>Lớp</Link>}
        <li className='hover:cursor-pointer font-medium'>Liên hệ</li>
      </ul>
    </div>
    {/* ẩn hiện tùy theo authenticate*/}
    {!isAuthenticated && (
      <div className='flex gap-x-3'>
        <Link to="sign-in" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Đăng nhập
        </Link>
        <Link to="sign-up" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Đăng ký
        </Link>
      </div>
    )}
    {isAuthenticated && (
      <div className='flex gap-x-2 items-center'>
        <div className='dropdown'>
          <div className='h-2'></div>
          <div className='dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer'>
            <img src="../../public/avatar.avif" className='w-full h-full' alt="" />
          </div>
          <div className='h-2'></div>
          <div className="dropdown-content-left">
            <span className='text-sm font-bold'>{email}</span>
            <a className=''>Cài đặt</a>
            <a onClick={handleSignOut}>Đăng xuất</a>
          </div>
        </div>
        <img src='../../public/down-arrow.png' className='w-4 h-4'></img>
      </div>
    )}
  </nav>
}

export default Navbar
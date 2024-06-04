
import { useRef, useState, useEffect, version } from 'react'
import { fetchData } from '../global'
import { Link, Outlet, useLocation } from 'react-router-dom'
import DeleteDeck from './DeleteDeck'
import Success from './Success'
import Fail from './Fail'
import ModelCreateDeck from './ModelCreateDeck'
import ModelEditDeck from './ModelEditDeck'
import Modal from 'react-modal'

const Classes = () => {

  const [nameClassCreate, setNameClassCreate] = useState('')
  const [decsClassCreate, setDecsClassCreate] = useState('')


  function handleChangeNameClassCreate(event) { 
    setNameClassCreate(event.target.value)
  }
  
  function handleChangeDecsClassCreate(event) {
    setDecsClassCreate(event.target.value)
  }

  const appElement = document.getElementById("root");
  Modal.setAppElement(appElement);
  const [isOpenCreateClass, setIsOpenCreateClass] = useState(false)


  const location = useLocation()
  const [decks, setDecks] = useState()
  const refSuccess = useRef()
  const refFail = useRef()
  const refModelCreateDeck = useRef()
  const refModelEditDeck = useRef()
  const [idDeckDelete, setIdDeckDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')



  const stylesModalCreateClass = {
    content: {
      width: "800px",
      height: "400px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "while",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      overflow: "auto",
    },
  };


  async function handleDeleteDeck() {
    const subUrl = `/decks/${idDeckDelete}`
    try {
      await fetchData(subUrl, 'DELETE')
      await getDecks()
      refSuccess.current.show('Xóa bộ thẻ thành công', 2000)
    }
    catch (error) {
      failRef.current.show('Đã có lỗi xảy ra!', 2000)
    }
    handleCancel()
    setIdDeckDelete(null)
  }

  function handleCancel() {
    document.getElementById('popup-delete-deck').style.display = 'none'
    setIdDeckDelete(null)
  }

  function showPopupDeleteDeck(event, id) {
    event.stopPropagation()
    document.getElementById('popup-delete-deck').style.display = 'flex'
    setIdDeckDelete(id)
  }


  async function getDecks(searchDecks) {
    let subUrl
    if (searchDecks && searchDecks != '') subUrl = `/decks?searchTerm=${searchDecks}`
    else subUrl = `/decks`
    try {
      const response = await fetchData(subUrl, 'GET')
      setDecks(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  function handleEditDeck(id) {
    refModelEditDeck.current.show(id)
  }

  async function handleCreateClass(event) {
    event.preventDefault()
    
    const subUrl = '/groups'
    const body = { 
      name: nameClassCreate, 
      description: decsClassCreate
    }

    try {  
      await fetchData(subUrl, 'POST', body)
    }
    catch(error) {
      console.log(error.message)
    }

  }


  useEffect(() => {
    getDecks(searchTerm)
  }, [searchTerm])

  // viết ra modal lớp. 






  return <div>
    <ModelCreateDeck ref={refModelCreateDeck} getDecks={getDecks} />
    <ModelEditDeck ref={refModelEditDeck} getDecks={getDecks} />
    <div className='profile flex gap-x-3 items-center justify-end font-medium pb-2'>
      <div className='flex gap-x-8 items-center'>
        <button className=''>
          <img onClick={() => setIsOpenCreateClass(true)} src="/plus.png" className='w-9' alt="" />
        </button>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(event) => {
              setSearchTerm(event.target.value)
            }} type="search" id="decks-search" className="block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Tên, mô tả..." />
          </div>
        </div>
      </div>
    </div>

    <hr className='my-4'></hr>

    {decks &&
      <div className=''>
        <div className="relative overflow-x-auto sm:rounded-lg">

          <div>

            <div className=''>
              <ul className='flex gap-x-24'>
                <li className='font-medium flex gap-x-2'>
                  <Link className={location.pathname.includes('classes/owner') ? 'link-active' : ''} to={"/classes/owner"} >
                    Lớp học của bạn
                  </Link>
                </li>

                <li className='font-medium flex gap-x-2'>
                  <Link className={location.pathname.includes('classes/attendance') ? 'link-active' : ''} to={"/classes/attendance"} >
                    Lớp học đã tham gia
                  </Link>
                </li>

              </ul>
  
              <div className='py-12'>
                <Outlet />
              </div>

            </div>

          </div>

        
        </div>

        {/* ))} */}
      </div>
    }
    <DeleteDeck idDeckDelete={idDeckDelete} handleCancle={handleCancel} handleDeleteDeck={handleDeleteDeck} />
    <Success ref={refSuccess} />
    <Fail ref={refFail} />


    <Modal
        isOpen={isOpenCreateClass}
        onRequestClose={() => setIsOpenCreateClass(false)}
        contentLabel="Custom Modal"
        style={stylesModalCreateClass}
      >
       <div className="bg-white rounded shadow-lg z-50">
            <div className="flex justify-end">
                <button onClick={close} className="pr-2">
                    <i className="fa-solid fa-xmark text-4xl text-gray-500"></i>
                </button>
            </div>
            {/* form */}    
            <div className="relative w-[500px]">
                <form onSubmit={handleCreateClass} className="relative rounded-md">

                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Tên bộ thẻ <span className='text-ctred'>*</span></label>
                            <input onChange={handleChangeNameClassCreate}  type="text" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Mô tả bộ thẻ</label>
                            <input onChange={handleChangeDecsClassCreate} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Tạo</button>
                    </div>
                </form>
            </div>
        </div>
      </Modal>

  </div>

}
export default Classes
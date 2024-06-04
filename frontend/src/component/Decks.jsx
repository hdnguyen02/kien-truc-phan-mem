
import { useRef, useState, useEffect } from 'react'
import { fetchData } from '../global'
import { Link, useNavigate } from 'react-router-dom'
import DeleteDeck from './DeleteDeck'
import Success from './Success'
import Fail from './Fail'
import ModelCreateDeck from './ModelCreateDeck'
import ModelEditDeck from './ModelEditDeck'
import Modal from "react-modal"



function Decks() {

    const appElement = document.getElementById("root");
    Modal.setAppElement(appElement)
    
    const navigate = useNavigate()

    const [decks, setDecks] = useState()
    const refSuccess = useRef()
    const refFail = useRef()
    const refModelCreateDeck = useRef()
    const refModelEditDeck = useRef()
    const [idDeckDelete, setIdDeckDelete] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    
    // * state modal
    const [isShowModalStudy, setIsShowModalStudy] = useState(false)


    const showModalStudystyles = {
        content: {
          width: "400px",
          height: "100px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: 'while',
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
     
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          outline: "none",
          overflow: "auto",
          display: "flex", 
          justifyContent: 'center',
          alignItems: 'center'

          
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

    function handleLearnCard(numberCards, idDeck) { 
        if (numberCards == 0) {
            setIsShowModalStudy(true)
        }
        else { 
            const url = `/decks/${idDeck}/learn-cards`
            navigate(url)
        }
    }


    useEffect(() => {
        getDecks(searchTerm)
    }, [searchTerm])




    return <div>
        <ModelCreateDeck ref={refModelCreateDeck} getDecks={getDecks} />
        <ModelEditDeck ref={refModelEditDeck} getDecks={getDecks} />
        <div className='profile flex gap-x-3 items-center justify-end font-medium pb-2'>
            <div className='flex gap-x-8 items-center'>
                <button onClick={() => { refModelCreateDeck.current.show() }} className=''>
                    <img src="plus.png" className='w-9' alt="" />
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

                    {decks.length != 0 ?
                        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Tên
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số thẻ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ngày tạo
                                    </th>
                                    <th className='text-center'>Học thẻ</th>
                                    <th className='text-center'>Chia sẻ</th>
                                    <th className='text-center'>Hiệu chỉnh</th>
                                    <th className='text-center'>Xóa</th>

                                </tr>
                            </thead>
                            <tbody>
                                {decks.map(deck => (
                                    <tr key={deck.id} className="odd:bg-white even:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {deck.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {deck.numberCards}
                                        </td>
                                        <td className="px-6 py-4">
                                            {deck.createAt}
                                        </td>
                                        <td className='px-6 py-4 text-center'>
                                            <button onClick={() => handleLearnCard(deck.numberCards, deck.id)}>
                                                {/* to={`/decks/${deck.id}/learn-cards`} */}
                                                <i className="fa-solid fa-graduation-cap text-xl"></i>
                                            </button>

                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <i className="fa-solid fa-share text-xl"></i>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => handleEditDeck(deck.id)} ><i className="fa-regular fa-pen-to-square text-xl"></i>
                                            </button>
                                        </td>
                                        <td onClick={(event) => showPopupDeleteDeck(event, deck.id)} className="px-6 py-4 text-center">
                                            <i className="fa-regular fa-trash-can text-xl"></i>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>) : (<div>
                            <span className='text-sm'>Không có dữ liệu</span>
                        </div>)
                    }
                    <hr className='my-4' />
                </div>

                {/* ))} */}
            </div>
        }
        <DeleteDeck idDeckDelete={idDeckDelete} handleCancle={handleCancel} handleDeleteDeck={handleDeleteDeck} />
        <Success ref={refSuccess} />
        <Fail ref={refFail} />

        <Modal
        isOpen={isShowModalStudy}
        onRequestClose={() => setIsShowModalStudy(false)}
        contentLabel="Custom Modal"
        style={showModalStudystyles}
      >
        <p className='text-center'>Bạn chưa có thẻ nào trong bộ thẻ, <Link to={'/cards'} className='text-blue-700 underline'>Tạo bộ thẻ</Link>
        </p>
      
        {/* <div className="flex justify-end mt-3">
          <button
            onClick={() => {console.log('hihi')}}
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Gửi</span>
          </button>
        </div> */}
      </Modal>
    </div>
}

export default Decks
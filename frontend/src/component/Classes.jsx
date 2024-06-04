
import { useRef, useState, useEffect } from 'react'
import { fetchData } from '../global'
import { Link, Outlet, useLocation } from 'react-router-dom'
import DeleteDeck from './DeleteDeck'
import Success from './Success'
import Fail from './Fail'
import ModelCreateDeck from './ModelCreateDeck'
import ModelEditDeck from './ModelEditDeck'

const Classes = () => {


  const location = useLocation()
  const [decks, setDecks] = useState()
  const refSuccess = useRef()
  const refFail = useRef()
  const refModelCreateDeck = useRef()
  const refModelEditDeck = useRef()
  const [idDeckDelete, setIdDeckDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')


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

          {/* {decks.length != 0 ?
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
                                      <Link to={`/decks/${deck.id}/learn-cards`}>
                                          <i className="fa-solid fa-graduation-cap text-xl"></i>
                                      </Link>

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
                  
              } */}
          {/* <hr className='my-4' /> */}
        </div>

        {/* ))} */}
      </div>
    }
    <DeleteDeck idDeckDelete={idDeckDelete} handleCancle={handleCancel} handleDeleteDeck={handleDeleteDeck} />
    <Success ref={refSuccess} />
    <Fail ref={refFail} />
  </div>

  //   let [state, setState] = useState({
  //       classList: []
  //   });
  //   let [stateGroup, setStateGroup] = useState({
  //     classList: []
  //   });

  //   let [stateClassAttendance, setStateClassAttendance] = useState({
  //     classList: []
  //   });

  //   const [open, setOpen] = useState(false)
  //   const navigate = useNavigate();

  //   const getDataClass = async () => {
  //       try {
  //           let token = localStorage.getItem("accessToken");
  //           let emailUser = localStorage.getItem("email");

  //           const url = baseUrl + '/api/v1/group/user/' + emailUser;

  //           let jsonRp = await fetch(url, {
  //               method: 'GET',
  //               headers: {
  //                   'Authorization': `Bearer ${token}`
  //               },
  //           });

  //           const response = await jsonRp.json()
  //           if (!jsonRp.ok) {
  //               console.log("vào lỗi")
  //               throw new Error(response.message)
  //           }
  //           console.log(response.data)
  //           setState({
  //               ...state,
  //               classList: response.data
  //           })

  //       } catch (error) {
  //           console.log(error.message);
  //       }
  //   }

  //   const getDataClassAttendance = async () => {
  //     try {
  //         let token = localStorage.getItem("accessToken");
  //         let emailUser = localStorage.getItem("email");

  //         const url = baseUrl + '/api/v1/group/attendance/' + emailUser;

  //         let jsonRp = await fetch(url, {
  //             method: 'GET',
  //             headers: {
  //                 'Authorization': `Bearer ${token}`
  //             },
  //         });

  //         const response = await jsonRp.json()
  //         if (!jsonRp.ok) {
  //             console.log("vào lỗi")
  //             throw new Error(response.message)
  //         }
  //         console.log("getDataClassAttendance")
  //         console.log(response.data)
  //         setStateClassAttendance({
  //             ...stateClassAttendance,
  //             classList: response.data
  //         })

  //     } catch (error) {
  //         console.log(error.message);
  //     }
  // }

  //   const handleDeleteClass = async (group)=> {
  //     try {
  //       let token = localStorage.getItem("accessToken");

  //       const url = baseUrl + "/api/v1/group/" + group.id;

  //       let jsonRp = await fetch(url, {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const response = await jsonRp.json();
  //       if (!jsonRp.ok) {
  //         console.log("vào lỗi");
  //         throw new Error(response.message);
  //       }
  //       getDataClass();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //     // getDataClass();
  //     setOpen(false);
  //   }

  //   // useEffect(()=>{
  //   //     getDataClass(),
  //   //     renderClassAttendance()
  //   //     return ()=> {

  //   //     };
  //   // }, [])

  //   useEffect(() => {
  //     getDataClassAttendance();
  //     getDataClass();
  //     return () => {
  //         // Cleanup code if necessary
  //     };
  // }, []);


  //     const renderClass = () => {
  //        return state.classList.map((item, index) => {
  //             return <div className='cursor-pointer deck flex justify-between bg-[#EDEFFF] rounded-md py-4 px-8 mb-4' key={index}
  //             >
  //                 <div className='deck-left flex gap-x-6'>
  //                     <span className='text-xl flex items-center font-medium min-w-40'>{item.name}</span>
  //                     <span className='flex items-center min-w-12'>{item.quantity} thành viên</span>
  //                 </div>
  //                 <div className='deck-right flex gap-x-12 items-center'>
  //                     <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
  //                     onClick={()=>{ setStateGroup(item); setOpen(true)}}>
  //                         Xóa lớp
  //                     </button>
  //                     <button className='bg-ctred hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-600 rounded'
  //                       onClick={()=>{navigate(`/classes/edit/${item.id}`)}}
  //                     >
  //                         Chỉnh sửa
  //                     </button>       
  //                     <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
  //                       onClick={()=>{navigate(`/classes/${item.id}`)}}
  //                     >
  //                         Xem
  //                     </button>
  //                 </div>
  //             </div>

  //        })
  //     }

  //     const renderClassAttendance = () => {
  //       return stateClassAttendance.classList.map((item, index) => {
  //            return <div className='cursor-pointer deck flex justify-between bg-[#EDEFFF] rounded-md py-4 px-8 mb-4' key={index}
  //            >
  //                <div className='deck-left flex gap-x-6'>
  //                    <span className='text-xl flex items-center font-medium min-w-40'>{item.name}</span>
  //                    <span className='flex items-center min-w-12'>{item.quantity} thành viên</span>
  //                </div>
  //                <div className='deck-right flex gap-x-12 items-center'>
  //                     <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
  //                       onClick={()=>{navigate(`/classes/${item.id}`)}}
  //                     >
  //                         Xem
  //                     </button>
  //                 </div>
  //            </div>

  //       });
  //    }

  //     return (
  //       <div>
  //         <div className="profile flex gap-x-3 items-center justify-between font-medium">
  //           <div className="flex gap-x-3 items-center">
  //             <div className="rounded-full overflow-hidden h-9 w-9">
  //               <img
  //                 className="object-cover w-full h-full"
  //                 src="../../public/avatar.avif"
  //                 alt="Avatar"
  //               />
  //             </div>
  //             <h1 className='text-sm'>{localStorage.getItem('email')}</h1>
  //           </div>
  //           <div className="flex gap-x-8 items-center">
  //             <Link to={"/classes/create"} className="">
  //               <img src="plus.png" className="w-9" alt="" />
  //             </Link>
  //             <div className="max-w-md mx-auto">
  //               <div className="relative">
  //                 <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
  //                   <svg
  //                     className="w-4 h-4 text-gray-500"
  //                     aria-hidden="true"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     fill="none"
  //                     viewBox="0 0 20 20"
  //                   >
  //                     <path
  //                       stroke="currentColor"
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
  //                     />
  //                   </svg>
  //                 </div>
  //                 <input
  //                   type="search"
  //                   id="decks-search"
  //                   className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
  //                   placeholder="Tên, mô tả..."
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <hr className="my-8" />
  //         <div>
  //           <h3 className="font-medium text-xl text-blue-600">Lớp đã tạo</h3>
  //           {/* render lớp */}
  //           <div className="mt-8">
  //             {renderClass()}
  //           </div>
  //           <div></div>
  //         </div>

  //         <div>
  //           <h3 className="font-medium text-xl text-blue-600">Lớp đã tham gia</h3>
  //           {/* render lớp */}
  //           <div className="mt-8">
  //             {renderClassAttendance()}
  //           </div>
  //           <div></div>
  //         </div>
  //         {/* Dialog */}
  //         <Transition show={open}>
  //           <Dialog className="relative z-10" onClose={setOpen}>
  //             <TransitionChild
  //               enter="ease-out duration-300"
  //               enterFrom="opacity-0"
  //               enterTo="opacity-100"
  //               leave="ease-in duration-200"
  //               leaveFrom="opacity-100"
  //               leaveTo="opacity-0"
  //             >
  //               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  //             </TransitionChild>

  //             <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  //               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  //                 <TransitionChild
  //                   enter="ease-out duration-300"
  //                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //                   enterTo="opacity-100 translate-y-0 sm:scale-100"
  //                   leave="ease-in duration-200"
  //                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
  //                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //                 >
  //                   <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
  //                     <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
  //                       <div className="sm:flex sm:items-start">
  //                         <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
  //                           <ExclamationTriangleIcon
  //                             className="h-6 w-6 text-red-600"
  //                             aria-hidden="true"
  //                           />
  //                         </div>
  //                         <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
  //                           <DialogTitle
  //                             as="h3"
  //                             className="text-base font-semibold leading-6 text-gray-900"
  //                           >
  //                             Bạn có muốn lớp ?
  //                           </DialogTitle>
  //                           <div className="mt-2">
  //                             <p className="text-sm text-gray-500">
  //                               Khi bạn nhấn xóa sẽ tiến hành xóa !
  //                             </p>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                     <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
  //                       <button
  //                         type="button"
  //                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
  //                         onClick={() => {handleDeleteClass(stateGroup)}}
  //                       >
  //                         Xóa
  //                       </button>
  //                       <button
  //                         type="button"
  //                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
  //                         onClick={() => setOpen(false)}
  //                         data-autofocus
  //                       >
  //                         Đóng
  //                       </button>
  //                     </div>
  //                   </DialogPanel>
  //                 </TransitionChild>
  //               </div>
  //             </div>
  //           </Dialog>
  //         </Transition>
  //         {/* End Dialog */}
  //         {/* Toast */}
  //       </div>
  //     );
  // }

}
export default Classes
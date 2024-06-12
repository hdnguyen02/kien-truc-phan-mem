import { useEffect, useState } from "react"
import { fetchData, showToastMessage } from "../global"
import { Link } from "react-router-dom"
import Modal from 'react-modal'


export default function OwnerClasses() {

    const [ownerClasses, setOwnerClasses] = useState()

    const roles = JSON.parse(localStorage.getItem("roles"))

    // const [nameClass, setNameClass] = useState()
    // const [descriptionClass, setDescriptionClass] = useState()
    
    // const [isOpenEditClass, setIsOpenEditClass] = useState(false)



    async function getOwnerClass() {
        const subUrl = `/groups/owner`
        try {
            const response = await fetchData(subUrl, 'GET')
            console.log(response.data)
            setOwnerClasses(response.data)
        }
        catch (error) {
            console.log(error.code + ' ' + error.message)
        }
    }

    async function handleDeleteClass(id) { 
    
        const subUrl = `/groups/${id}`
        await fetchData(subUrl, 'DELETE')
        getOwnerClass()
    }

    useEffect(() => {
        if (roles.includes('TEACHER')) {
            getOwnerClass()
        }
    }, [])



    // const stylesModalEditClass = {
    //     content: {
    //       width: '500px',
    //       height: '310px',
    //       top: '50%',
    //       left: '50%',
    //       transform: 'translate(-50%, -50%)',
    //       padding: '20px',
    //       border: '0.5px solid #ccc',
    //       borderRadius: '8px',
    //       backgroundColor: 'while',
    //       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    //       outline: 'none',
    //       overflow: 'auto',
    //     },
    //   }

    function renderUnlockedUser() { 
        return <div className="flex items-center justify-center flex-col gap-y-3">
             <h1 className="text-3xl font-bold text-center">Online learning - Dành cho giáo viên</h1>

            <div className="flex justify-center">
            <button className='gap-x-2 flex items-center h-10 px-8 text-sm text-center rounded-md font-bold bg-yellow-400 sm:w-fit hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-200'>
                    
                    <span className='text-sm'>Mua</span>
                    <i className="fa-solid fa-unlock"></i>
                </button>
                </div>
  
        </div>
    }



    return ownerClasses ? (<div>

{/* <Modal
          isOpen={isOpenEditClass}
          onRequestClose={() => setIsOpenEditClass(false)}
          contentLabel='Custom Modal'
          style={stylesModalEditClass}
        >
          <form onSubmit={handleEditClass} className=''>
            <div className='flex justify-end'>
              <button onClick={() => setIsOpenEditClass(false)} type='button'>
                <img src='/close.png' className='w-5 h-5' alt='' />
              </button>
            </div>
            <h3 className='text-xl text-gray-800'>Hiệu chỉnh lớp</h3>

            <div className='mt-6'>
              <div className='flex flex-col gap-y-2 w-full'>
                <label className='text-sm text-gray-600' htmlFor=''>
                  Tên
                </label>
                <input
                  onChange={(e) => setNameClass(e.target.value)}
                  type='text'
                  className='h-9 px-4'
                  required
                />
              </div>

              <div className='flex flex-col gap-y-2 w-full'>
                <label className='text-sm text-gray-600' htmlFor=''>
                  Mô tả
                </label>
                <input
                  onChange={(e) => setDescriptionClass(e.target.value)}
                  type='text'
                  className='h-9 px-4'
                  required
                />
              </div>
            </div>

          
            <div className='flex justify-end mt-4'>
              <button
                type='submit'
                className='h-10 flex items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
              >
                Tạo
              </button>
              </div>
          </form>
        </Modal> */}
        {ownerClasses.length != 0 ?
            (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tên
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Số thành viên
                        </th>
                        <th scope="col" className="px-6 py-3">
                          
                        </th>
                        <th className='text-center'></th>/
                        {/* <th className='text-center'></th> */}
                    </tr>
                </thead>
                <tbody>
                    {ownerClasses.map((ownerClass, index) => (
                        <tr key={index} className="mt-4 bg-[#EDEFFF]">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                                {ownerClass.name}
                            </td>
                            <td className="px-6 py-4">
                                {ownerClass.quantity} thành viên
                            </td>
                            <td className="px-6 py-4">
                                <Link to={'/classes/detail-owner/' + ownerClass.id + '/members'} className="underline text-blue-500">Chi tiết</Link>
                            </td>
                            {/* <td className="px-6 py-4">
                                <button onClick={(event) => handleEditClass(event, ownerClass.id)} className="underline text-blue-500">Hiệu chỉnh</button>
                            </td> */}
                            <td className='px-6 py-4 text-center rounded-tr-lg rounded-br-lg'>
                                <button onClick={() => handleDeleteClass(ownerClass.id)} className="underline text-red-500"><i className="fa-regular fa-trash-can text-xl"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>) : (<div>
                <span className='text-sm'>Bạn chưa tạo lớp nào</span>
            </div>)
        }
       
    </div>) : (renderUnlockedUser())
}
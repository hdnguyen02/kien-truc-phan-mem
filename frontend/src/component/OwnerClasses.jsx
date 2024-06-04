import { useEffect, useState } from "react"
import { fetchData, showToastMessage } from "../global"
import { Link } from "react-router-dom"


export default function OwnerClasses() {  

    const [ownerClasses,  setOwnerClasses] = useState() 


    
    async function getOwnerClass() { 
        const subUrl = `/groups/owner`
        try { 
            const response = await fetchData(subUrl, 'GET')
            console.log(response.data)
            setOwnerClasses(response.data)
        }
        catch(error){ 
            console.log(error.code + ' ' + error.message)
        }
    }


    useEffect(() => {
        getOwnerClass()
        console.log("run")
    }, [])



    
    return (ownerClasses && <div>
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
                                    Chi tiết
                                </th>
                                <th className='text-center'>Xóa</th>

                               
                            </tr>
                        </thead>
            <tbody>
                {ownerClasses.map(ownerClass => (
                    <tr key={ownerClass.id} className= "mt-4 bg-[#EDEFFF]">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                            {ownerClass.name}
                        </td>
                        <td className="px-6 py-4">
                            {ownerClass.quantity} thành viên
                        </td>
                        <td className="px-6 py-4">
                            <Link to={'/classes/detail-owner/' + ownerClass.id + '/members'} className="underline text-blue-500">Chi tiết</Link>
                        </td>   
                        
    
                        <td className='px-6 py-4 text-center rounded-tr-lg rounded-br-lg'>
                         <Link className="underline text-red-500"><i className="fa-regular fa-trash-can text-xl"></i></Link>

                        </td>
                        {/* <td className="px-6 py-4 text-center">
                            <i className="fa-solid fa-share text-xl"></i>
                        </td>

                        <td className="px-6 py-4 text-center">
                            <button onClick={() => handleEditDeck(deck.id)} ><i className="fa-regular fa-pen-to-square text-xl"></i>
                            </button>
                        </td>
                        <td onClick={(event) => showPopupDeleteDeck(event, deck.id)} className="px-6 py-4 text-center">
                            <i className="fa-regular fa-trash-can text-xl"></i>
                        </td> */}


                    </tr>
                ))}

            </tbody>
        </table>) : (<div>
            <span className='text-sm'>Không có dữ liệu</span>
        </div>)
        
    }

    </div>)
    
    
}
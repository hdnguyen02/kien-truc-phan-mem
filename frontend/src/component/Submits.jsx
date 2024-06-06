import { useEffect, useState } from "react"
import { fetchData } from "../global"
import { useParams } from "react-router-dom"

export default function Submits() { 
    const params = useParams()
    
    const [assignment, setAssignment] = useState()
    
    async function getAssignment(){ 
        const subUrl = `/teacher/assignments/${params.idAssignment}`
        try {
            const response = await fetchData(subUrl, 'GET')
            setAssignment(response.data)
        }
        catch(error) { 
            console.log(error.message)
        }
    }   

    useEffect(() => {
        getAssignment()
    }, [])

    return assignment && <div className="flex w-full gap-x-12">
        <div className="w-1/3">
        {/* lấy ra bài nộp */}
        {
            assignment.submits.map((submit, index) => (
                <div key={index} className=" flex-col cursor-pointer mb-8 shadow-md px-8 py-3 bg-gray-100 flex   justify-between">
               <span className="opacity-90">
                     {submit.user.email}
                   </span>
     
                 <span className="text-xs text-[#6D6E6E]">
                   Đã đăng vào {submit.time}
                 </span>
               </div>)
            )
        }
            
        </div>
        <div className="w-full">
        <iframe className="w-full h-screen" src="https://firebasestorage.googleapis.com/v0/b/learn-engl.appspot.com/o/assignment%2F1717510452882-CV%20H%E1%BB%93%20%C4%90%E1%BB%A9c%20Nguy%C3%AAn.pdf?alt=media" title="Iframe Example"></iframe>
        </div>
    </div>
}
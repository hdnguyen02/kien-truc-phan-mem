import { useEffect, useState } from "react";
import { baseUrl,version, fetchData, showToastMessage } from "../global";
import { Link, useParams } from "react-router-dom";

export default function OwnerAssignments() {
  // cho người dùng submit lên. tạo dao
  const params = useParams();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState() 

  const [assignment, setAssignments] = useState()

  const accessToken = localStorage.getItem('accessToken')

    async function getAssignments () { 
      const subUrl =  `/assignments?id-group=${params.id}`
      const responsse = await fetchData(subUrl, 'GET')
      console.log(responsse)
      setAssignments(responsse.data)
    }
    async function handleCreate(e) {
      e.preventDefault();

      const url = `${baseUrl + version}/assignments`

      const elFiles = document.getElementById('file')
      const file = elFiles.files[0]
    
      // truyền thông qua body. 
      const deadline = date + ' ' + time  


      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', desc)
      formData.append('idGroup', params.id)
      formData.append('deadline', deadline)
      formData.append('file', file)
      
      try {
        const jsonRp = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })
        const response = await jsonRp.json()
        if (!jsonRp.ok) {
            throw new Error(response.message)
        }
    }
    catch (error) {
        console.log(error.message)
    }

    
    

      
    }

  useEffect(() => {
    getAssignments()
  }, []);

  return (
    <div>
      <div>
        tạo bài tập
        <form onSubmit={handleCreate}>
          <input onChange={(e) => setName(e.target.value)} type="text" />
          <input onChange={(e) => setDesc(e.target.value)} type="text" />

          <input type="file" name="file" id="file" />
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name=""
            id=""
          />
          <input onChange={(e) => setTime(e.target.value)} type="time" />
          <button type="submit" className="p-6">
            Gửi
          </button>
        </form>
      </div>
      <div>Danh sách bài tập, xíu sẽ đi vào xem chi tiết bài tập.</div>
      <div></div>
    </div>
  );
}

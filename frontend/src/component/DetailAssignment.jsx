import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {fetchData} from '../global'

export default function DetailAssignment() {
  const params = useParams();
  const [assignment, setAssignment] = useState();

  async function getTeacherDetailAssignment() {
    console.log(params.idAssignment)
    const subUrl = `/student/assignments/${params.idAssignment}`;

    try {
      const response = await fetchData(subUrl, "GET");
      console.log(response)
      setAssignment(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTeacherDetailAssignment();
  }, []);

  return (
    assignment && (
      <div className="flex flex-col gap-y-6">
        <div className="flex justify-between items-center">
        <h3 className="font-medium text-xl text-gray-600">{assignment.name}</h3>
        <p className="text-sm">{assignment.deadline} (thời hạn)</p>
        
        </div>
        <p className="text-gray-600 text-sm">{assignment.description}</p>
        <div className="flex justify-center">

        <iframe className="w-[900px] h-screen" src="https://firebasestorage.googleapis.com/v0/b/learn-engl.appspot.com/o/assignment%2F1717510452882-CV%20H%E1%BB%93%20%C4%90%E1%BB%A9c%20Nguy%C3%AAn.pdf?alt=media" title="Iframe Example"></iframe>
        </div>

      </div>
    )
  );
}

import Modal from "react-modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../global";
import { useEffect } from "react";

export default function CommentClass() {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const appElement = document.getElementById("root");
  Modal.setAppElement(appElement);

  const params = useParams();

  const [contentComment, setContentComment] = useState("");
  const [contentCommentReply, setContentCommentReply] = useState("")
  const [comments, setComments] = useState([])
  
  const [idCommentReply, setIdCommentReply] = useState()

  function handleChangeComment(event) {
    setContentComment(event.target.value);
  }

  function handleChangeContentCommentReply(event) { 
    setContentCommentReply(event.target.value)
  }

  async function handleCreateComment() {
    const subUrl = "/comments";
    const body = {
      groupId: params.id,
      parentId: null, // bình luận cấp 1
      content: contentComment,
    };

    try {
      const response = await fetchData(subUrl, "POST", body)
      getComments()
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleCreateCommentReply() {
    const subUrl = "/comments";
    const body = {
      groupId: params.id,
      parentId: idCommentReply,
      content: contentCommentReply,
    };

    try {
      const response = await fetchData(subUrl, "POST", body)
      getComments()
    } catch (error) {
      console.log(error.message)
    }
    setIsOpenReply(false)
  }

  async function getComments() {
    const subUrl = `/comments/groups/${params.id}`
    try {
      const response = await fetchData(subUrl, "GET")
      setComments(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  function showReplyComment(id) { 
    setIdCommentReply(id)
    setIsOpenReply(true)
  }

  useEffect(() => {
    getComments();
  }, []);

  const customStyles = {
    content: {
      width: "400px",
      height: "150px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      overflow: "auto",
    },
  };

  return (
    <div>
      <div>
        <textarea
          onChange={handleChangeComment}
          className="w-full p-4"
          name=""
          id=""
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleCreateComment}
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Gửi</span>
          </button>
        </div>
      </div>

      {/* show comments */}

      {comments &&
        comments.map((comment) => (
          <div key={comments.id} className="flex gap-x-3 mt-4">
            <div className="dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer">
              <img src="/avatar.avif" className="w-full h-full" alt="" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span>{comment.user.email}</span>
                  <span className="ml-2 text-sm rounded-lg bg-[#35B69F] text-white px-2 py-[2px]">
                    Giáo viên
                  </span>
                </div>
                <span className="text-gray-500 text-sm">12h ago</span>
              </div>
              <div className="mt-1 text-gray-500">{comment.content}</div>
              <button
                onClick={() => showReplyComment(comment.id)}
                className="flex gap-x-2 items-center"
              >
                <span className="pb-1">Reply</span>
                <i className="fa-regular fa-message"></i>
              </button>
              {/* comment child */}
              {
        comment.commentsChild.map((commentChild) => (
              <div key={comments.id} className="flex gap-x-3 mt-4">
            <div className="dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer">
              <img src="/avatar.avif" className="w-full h-full" alt="" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span>{commentChild.user.email}</span>
                  <span className="ml-2 text-sm rounded-lg bg-[#35B69F] text-white px-2 py-[2px]">
                    Giáo viên
                  </span>
                </div>
                <span className="text-gray-500 text-sm">12h ago</span>
              </div>
              <div className="mt-1 text-gray-500">{commentChild.content}</div>

            </div>
          </div>
          ))}

            </div>
          </div>
          // comments Child
        ))}
      <Modal
        isOpen={isOpenReply}
        onRequestClose={() => setIsOpenReply(false)}
        contentLabel="Custom Modal"
        style={customStyles}
      >
        
        <input onChange={handleChangeContentCommentReply} type="text" className="w-full h-9" />
        <div className="flex justify-end mt-3">
        <button
            onClick={handleCreateCommentReply}
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Gửi</span>
          </button>
        </div>
        
      </Modal>
    </div>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { GET_COMMENT_OF_GROUP } from "../redux/constants/CommentClassesConstant";
// import { baseUrl, version } from "../global";
// const CommentClass = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { commentList } = useSelector((state) => state.CommentReducer);

//   let [stateComment, setStateComment] = useState({
//     values: {
//       content: "",
//       parentComment: null,
//     },
//     errors: {
//       content: "",
//     }
//   });

//   const getComment = async () => {
//     try {
//       let token = localStorage.getItem("accessToken");
//       let emailUser = localStorage.getItem("email");

//       const url = baseUrl + "/api/v1/comment/group/" + id;

//       let jsonRp = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const response = await jsonRp.json();
//       if (!jsonRp.ok) {
//         console.log("vào lỗi");
//         throw new Error(response.message);
//       }
//       console.log(response.data);
//       console.log(456);
//       dispatch({
//         type: GET_COMMENT_OF_GROUP,
//         payload: response.data,
//       });
//       // setStateGroup(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleChangeInputGroup = (e) => {
//     let { value, name } = e.target;
//     console.log(name + ": " + value);

//     let newValue = {
//       ...stateComment.values,
//       [name]: value,
//     };

//     let newError = { ...stateComment.errors };
//     switch (name) {
//       case "content":
//         if (value.trim() === "") {
//           newError = {
//             ...stateComment.errors,
//             [name]: "Tên nội dung không được để trống",
//           };
//         } else {
//           newError = {
//             ...stateComment.errors,
//             [name]: "",
//           };
//         }
//         break;
//     }
//     setStateComment({
//       ...stateComment,
//       values: newValue,
//       errors: newError,
//     });
//   };

//   const handleCreateComment = async () => {
//     // e.preventDefault();
//     console.log('add comment')
//     let isValid = true;
//     let { values, errors } = stateComment;

//     for (let key in errors) {
//       if (errors[key] !== "") {
//         isValid = false;
//         break;
//       }
//     }
//     console.log(isValid);
//     if (isValid) {
//       let token = localStorage.getItem("accessToken");
//       let emailUser = localStorage.getItem("email");
//       let data = {
//         email: emailUser,
//         groupId: id,
//         parentId: values.parentId,
//         content: values.content
//       };
//       // console.log(values.)
//       console.log(JSON.stringify(data));

//       const url = baseUrl + "/api/v1/comment";
//       let jsonRp = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       const response = await jsonRp.json();
//       if (!jsonRp.ok) {
//         console.log("vào lỗi");
//           throw new Error(response.message);

//       } else {
//         getComment();
//       }
//     }
//   };

//   useEffect(() => {
//     getComment();
//     return () => {};
//   }, []);

//   const renderComment = () => {
//     return commentList.map((item, index) => {
//       return (
//         <div>
//           <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
//             <footer className="flex justify-between items-center mb-2">
//               <div className="flex items-center">
//                 <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
//                   <img
//                     className="mr-2 w-6 h-6 rounded-full"
//                     src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
//                     alt="Michael Gough"
//                   />
//                   {item.user.email}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   <time
//                     pubdate
//                     dateTime="2022-02-08"
//                     title="February 8th, 2022"
//                   >
//                     {item.created}
//                   </time>
//                 </p>
//               </div>
//               <button
//                 id="dropdownComment1Button"
//                 data-dropdown-toggle="dropdownComment1"
//                 className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                 type="button"

//               >
//                 <svg
//                   className="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 16 3"
//                 >
//                   <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//                 </svg>
//                 <span className="sr-only">Comment settings</span>
//               </button>
//               {/* Dropdown menu */}
//               <div
//                 id="dropdownComment1"
//                 className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
//               >
//                 <ul
//                   className="py-1 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="dropdownMenuIconHorizontalButton"
//                 >
//                   <li>
//                     <a
//                       href="#"
//                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Edit
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Remove
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Report
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </footer>
//             <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
//             <div className="flex items-center mt-4 space-x-4">
//               <button
//                 type="button"
//                 className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
//                 onClick={()=> {
//                   let valuesNew = {
//                     ...stateComment.values,
//                     parentId: item.id
//                   }
//                   setStateComment({
//                     ...stateComment,
//                     values: valuesNew,
//                     errors: stateComment.errors}
//                   )}
//                 }
//               >
//                 <svg
//                   className="mr-1.5 w-3.5 h-3.5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 18"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
//                   />
//                 </svg>
//                 Reply
//               </button>
//             </div>
//           </article>

//           {item.commentChild.map((itemChild, index) => {
//             return (
//               <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
//                 <footer className="flex justify-between items-center mb-2">
//                   <div className="flex items-center">
//                     <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
//                       <img
//                         className="mr-2 w-6 h-6 rounded-full"
//                         src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
//                         alt="Jese Leos"
//                       />
//                       {itemChild.user.email}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       <time
//                         pubdate
//                         dateTime="2022-02-12"
//                         title="February 12th, 2022"
//                       >
//                         {itemChild.created}
//                       </time>
//                     </p>
//                   </div>
//                   <button
//                     id="dropdownComment2Button"
//                     data-dropdown-toggle="dropdownComment2"
//                     className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                     type="button"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 16 3"
//                     >
//                       <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//                     </svg>
//                     <span className="sr-only">Comment settings</span>
//                   </button>
//                   {/* Dropdown menu */}
//                   <div
//                     id="dropdownComment2"
//                     className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
//                   >
//                     <ul
//                       className="py-1 text-sm text-gray-700 dark:text-gray-200"
//                       aria-labelledby="dropdownMenuIconHorizontalButton"
//                     >
//                       <li>
//                         <a
//                           href="#"
//                           className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Edit
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Remove
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Report
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </footer>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   {itemChild.content}
//                 </p>

//               </article>
//             );
//           })}
//         </div>
//       );
//     });
//   };

//   return (
//     <div>
//       <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
//         <div className="max-w-2xl mx-auto px-4">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
//               Discussion
//             </h2>
//           </div>
//           <form className="mb-6" onSubmit={handleCreateComment}>
//             <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//               <label htmlFor="comment" className="sr-only">
//                 Your comment
//               </label>
//               <textarea
//                 id="comment"
//                 name="content"
//                 value={stateComment.content}
//                 onChange={handleChangeInputGroup}
//                 rows={6}
//                 className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
//                 placeholder="Write a comment..."
//                 required
//                 defaultValue={""}
//               />
//             </div>
//             <button
//             onClick={()=>{handleCreateComment()}}
//               type="button"
//               className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//             >
//               Post comment
//             </button>
//           </form>
//           {renderComment()}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CommentClass;

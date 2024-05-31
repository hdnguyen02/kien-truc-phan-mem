import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { baseUrl, version } from "../global";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_INFO_GROUP_ID } from "../redux/constants/InfoGroupContant";

const MemberClass = (props) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // let { stateGroup, setStateGroup } = location.state || {};

  const navigate = useNavigate();
  let [stateUserGroupSelected, setStateUserGroupSelected] = useState({});

  const dispatch = useDispatch();
  const { infoGroup } = useSelector((state) => state.InfoGroupReducer);
  console.log(infoGroup);

  const getInfoGroupById = async () => {
    console.log(123);
    try {
      let token = localStorage.getItem("accessToken");
      let emailUser = localStorage.getItem("email");

      const url = baseUrl + "/api/v1/group/detail/" + id;

      let jsonRp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await jsonRp.json();
      if (!jsonRp.ok) {
        console.log("vào lỗi");
        throw new Error(response.message);
      }
      console.log(response.data);
      console.log(456);
      dispatch({
        type: GET_INFO_GROUP_ID,
        payload: response.data,
      });
      console.log(456);
      // setStateGroup(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  getInfoGroupById();

  // let callBackGetInfoGroup = useCallback(getInfoGroupById, [])
  useEffect(() => {
    getInfoGroupById();
    return () => {};
  }, []);
  const handleDeleteMember = async () => {
    try {
      let token = localStorage.getItem("accessToken");

      const url = baseUrl + "/api/v1/group/delUser";
      let data = {
        email: stateUserGroupSelected.email,
        groupId: id,
      };
      console.log(data);
      let jsonRp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const response = await jsonRp.json();
      if (!jsonRp.ok) {
        console.log("vào lỗi");
        throw new Error(response.message);
      }
      // getDataClass();
    } catch (error) {
      console.log(error.message);
    }
    // getDataClass();
    getInfoGroupById();
    setOpen(false);
  };

  const renderMember = () => {
    return infoGroup.userGroups.map((item, index) => {
      return (
        <div
          className="bg-[#EDEFFF] mt-4 rounded-lg px-8 py-6 flex items-center justify-between"
          key={index}
        >
          <span className="font-medium text-xl">{item.email}</span>
          <span>Học sinh</span>
          <img
            style={{ cursor: "pointer" }}
            className="w-6 h-6"
            src="/delete.png"
            alt=""
            onClick={() => {
              setStateUserGroupSelected(item);
              setOpen(true);
            }}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <div className="bg-[#F0F6F6] mt-4 rounded-lg px-8 py-6 flex items-center justify-between">
          <span className="font-medium text-xl">{infoGroup.owner.email}</span>
          <span>Giáo viên</span>
          <img className="w-6 h-6" src="/key.png" alt="" />
        </div>
        {renderMember()}
        {/* <div className='bg-[#EDEFFF] mt-4 rounded-lg px-8 py-6 flex items-center justify-between'>
                <span className='font-medium text-xl'>
                    Đức Nguyên
                </span>
                <span>Học sinh</span>
                <img className='w-6 h-6' src="/delete.png" alt="" />
            </div> */}
      </div>

      {/* Dialog */}
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Xác nhận xóa
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Khi bạn nhấn xóa sẽ tiến hành xóa !
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleDeleteMember()}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      data-autofocus
                    >
                      Đóng
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MemberClass;

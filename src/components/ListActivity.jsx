import React, { useContext, useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Moment from "react-moment";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";
import Delete from "./Modal/DeleteItem";

function ListActivity() {
  const { navigate } = useContext(AppContext);

  const [idDelete, setIdDelete] = useState(null);
  const [itemDelete, setItemDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let { data: activity, refetch: listRefetch } = useQuery(
    "activitiesCaches",
    async () => {
      const response = await API.get("/activity-groups");

      return response.data.data;
    }
  );

  const handleDelete = (id, title) => {
    setIdDelete(id);
    setItemDelete(title);
    handleShow();
  };
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/activity-groups/${id}`);

      listRefetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div>
      <div className=" lg:grid md:grid lg:grid-cols-4 md:grid-cols-2 lg:gap-8 md:gap-6 md:ml-16 sm:ml-10 lg:ml-4">
        {
          activity?.map((list, index) => (
            <div key={index} class="flex drop-shadow-md mt-10">
              <div class="relative block p-6 rounded-lg shadow-lg bg-white lg:w-64 sm:w-60 md:w-72 lg:h-64 sm:h-52 md:h-64 ">
                <h5
                  class="text-gray-700 pb-40 cursor-pointer pb-38 lg:text-[18px] sm:text-[18px] md:text-[20px] leading-tight font-poppins mb-2"
                  onClick={() => {
                    navigate(`/list-item/${list.id}`);
                  }}
                >
                  {list.title}
                </h5>
                <div className="flex text-slate-400 fixed bottom-4 justify-between ">
                  <Moment
                    format="DD-MM-YYYY"
                    className=" sm:mr-20 font-poppins sm:text-[12px] md:text-[16px] lg:text-[16px] text-slate-500"
                  ></Moment>
                  <button>
                    <HiOutlineTrash
                      className=" mr-4 text-[24px] text-slate-500 active:text-slate-600 cursor-pointer"
                      onClick={() => {
                        handleDelete(activity.id, activity.title);
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
       }
      </div>
      <Delete
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
        data={itemDelete}
      />
    </div>
  )
};

export default ListActivity;

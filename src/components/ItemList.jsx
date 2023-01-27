import { useParams } from 'react-router-dom';
import { API } from '../config/api';
import { HiOutlineTrash } from "react-icons/hi";
import Delete from "./Modal/DeleteItem";
import { useQuery, useMutation } from 'react-query';
import { Card, CardBody } from "@chakra-ui/react";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";

import { TbPencil } from "react-icons/tb"
import { AppContext } from '../context/AppContext';

function ItemList() {
    const { id } = useParams()
    const [idDelete, setIdDelete] = useState(null);
    const [itemDelete, setItemDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const {
        isChecked,
        handleUpdateIsDone,
        navigate,
      } = useContext(AppContext);

        let { data: listItems, refetch: itemRefetch } = useQuery("itemsCaches", async () => {
        const response = await API.get(`/todo-items/${id}`);
        return response.data;
      });

      const handleDelete = (id, title) => {
        setIdDelete(id);
        setItemDelete(title);
        handleShow();
      };
    
      const deleteById = useMutation(async (id) => {
        try {
          await API.delete(`/todo-items/${id}`);
          itemRefetch();
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
    <>
        <div>
        {listItems?.map((items, index) => (
          <Card
            colorScheme="white"
            mt={7}
            className="py-3 relative drop-shadow-lg"
          >
            <CardBody className="flex justify-between font-avanir" key={index}>
              <input
                type="checkbox"
                checked={items.is_active === 1 ? isChecked : !isChecked}
                onChange={() => handleUpdateIsDone(items.id, items.is_active)}
                className="text-aqua w-6 h-6 border-slate-200 cursor-pointer focus:border-aqua focus:border"
              />
              <span class="absolute ml-12 flex items-center font-avanir text-md font-medium text-gray-900 dark:text-white">
                <span class="flex w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></span>
                <p
                  className={
                    items.is_active === 1
                      ? "none font-bold"
                      : "line-through text-slate-400"
                  }
                >
                  {items.title}
                </p>
                <TbPencil className=" text-slate-500 text-xl ml-3 cursor-pointer" />
              </span>
              <button>
                <HiOutlineTrash
                  className=" mr-4 text-[24px] text-slate-500 active:text-slate-600"
                  onClick={() => {
                    handleDelete(items.id, items.title);
                  }}
                />
              </button>
            </CardBody>
          </Card>
        ))}
      </div>
      <Delete
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
        data={itemDelete}
      />
    </>
  )
}

export default ItemList
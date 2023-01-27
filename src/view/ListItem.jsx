import { Card, CardBody } from "@chakra-ui/react";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import { TbPencil } from "react-icons/tb";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import AddItem from "../components/Modal/AddItem";
import Delete from "../components/Modal/DeleteItem";
import EditItem from "../components/Modal/EditItem";
import { API } from "../config/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ListItem() {
  const [editShow, setEditShow] = useState(false);
  const handleCloseEdit = () => setEditShow(false);
  const handleShowEdit = () => setEditShow(true);

  const { id } = useParams();

  const [isChecked, setIsChecked] = useState(false);

  let { data: listItems, refetch: listRefetch } = useQuery(
    "itemsCaches",
    async () => {
      const response = await API.get("/todo-items");
      return response.data.data;
    }
  );

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShow = () => setShow(true);
  const [idDelete, setIdDelete] = useState(null);

  const [itemDelete, setItemDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (id, title) => {
    setIdDelete(id);
    setItemDelete(title);
    handleShow();
  };
  async function handleUpdateIsDone(id_items, current_status) {
    try {
      await API.patch(
        `/todo-items/${id_items}`,
        { is_active: current_status == 1 ? 0 : 1 },
        { validateStatus: () => true }
      );
      listRefetch();
    } catch (err) {
      console.log(err);
    }
  }

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/todo-items/${id}`);
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

  // Edit Judul

  const [editTitle, setEditTotal] = useState();
  const [isEdit, setIsEdit] = useState(false);

  // Mengambil data Activity Groups
  let { data: listActivity, refetch} = useQuery(
    "activityCaches",
    async () => {
      const response = await API.get(`/activity-groups/${id}`);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const handleChange = (e) => {
    setEditData({...editData, [e.target.name]:  e.target.value});

 };

  const [editData, setEditData] = useState({
    title: "",
  });

  useEffect(() => {
    setEditData({ title: listActivity?.title });
  }, [listActivity]);

  
  const handleSubmit = useMutation(async (e) => {
    try {
       e.preventDefault();
 
       const formData = new FormData();
       formData.set("title", editData.title);

       await API.patch(`/activity-groups/${id}`, formData);

       refetch()

       setIsEdit(false)
    } catch (error) {
       console.log(error);
    }
 });


  

  return (
    <>
      {/* <PopupSuccess show={show} setShow={setShow} title={title}/> */}
      <div className=" m-auto lg:px-36 py-10 ">
        <div className="relative flex justify-between mb-10">
          <div className="flex lg:text-[36px] sm:ml-3 md:ml-20 lg:ml-0 sm:text-[12px] font-poppins font-heavy">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="lg:mr-3 sm:mr-1 lg:text-[32px] sm:text-[14px] "
              />
            </button>
            {!isEdit ? (
              <div onClick={() => setIsEdit(true)}>
                <span>{listActivity?.title}</span>
                <button >
                  <TbPencil className=" text-slate-500 text-3xl ml-5" />
                </button>
              </div>
            ) : (
              <>
                <form>
                  <input
                    type="text"
                    className="border-b focus:outline-none focus:border-slate-400 focus:border-b-2 transition-colors w-80 text-[32px]"
                    value={editData.title}
                    name="title"
                    onChange={handleChange}
                />
                </form>
                <button  onClick={(e) => handleSubmit.mutate(e)}>
                  <AiOutlineSave className="text-[24px]  ml-7" />
                </button>
              </>
          
            )}
          </div>

          <div className="flex">
            <Menu>
              <div>
                <Menu.Button className="mr-8">
                  <BiSortAlt2 className="border border-slate-400 text-slate-400 rounded-full w-10 h-10 p-2 mt-1" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-14 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div>
                    <Menu.Item className="flex py-3 px-3 hover:bg-slate-100">
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <RiSortDesc className="text-[22px] text-aqua" />
                          <span className="ml-3 text-[16px] font-avanir">
                            {" "}
                            Terbaru
                          </span>
                        </a>
                      )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item className="flex py-3 px-3 hover:bg-slate-100">
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <RiSortAsc className="text-[22px] text-aqua" />
                          <span className="ml-3 text-[16px] font-avanir">
                            {" "}
                            Terlama
                          </span>
                        </a>
                      )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item className="flex py-3 px-3 hover:bg-slate-100">
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <BsSortAlphaDown className="text-[22px] text-aqua" />
                          <span className="ml-3 text-[16px] font-avanir">
                            {" "}
                            A-Z
                          </span>
                        </a>
                      )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item className="flex py-3 px-3 hover:bg-slate-100">
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <BsSortAlphaDownAlt className="text-[22px] text-aqua" />
                          <span className="ml-3 text-[16px] font-avanir">
                            {" "}
                            Z-A
                          </span>
                        </a>
                      )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item className="flex py-3 px-3 hover:bg-slate-100">
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <BiSortAlt2 className="text-[22px] text-aqua" />
                          <span className="ml-3 text-[16px] font-avanir">
                            {" "}
                            Belum Selesai{" "}
                          </span>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              class="bg-aqua hover:bg-sky-600 sm:mr-5 md:mr-20 lg:mr-0 text-white lg:px-10 sm:px-3 sm:py-1 lg:text-[16px] sm:text-[10px]  font-poppins font-bold rounded-[50px] right"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="lg:mr-4 sm:mr:1" />
              Tambah
            </button>
          </div>
        </div>
        <AddItem show={showModal} handleClose={handleCloseModal} />

        {/* --------------------- Item List ----------------------- */}
        <div>
          {listItems?.map((items, index) => (
            <Card
              colorScheme="white"
              mt={7}
              className="py-3 relative shadow-xl "
            >
              <CardBody
                className="flex justify-between font-avanir"
                key={index}
              >
                <input
                  type="checkbox"
                  checked={items.is_active === 1 ? isChecked : !isChecked}
                  onChange={() => handleUpdateIsDone(items.id, items.is_active)}
                  className="text-aqua w-6 h-6 border-slate-200 cursor-pointer focus:border-aqua focus:border"
                />
                <span class="absolute ml-12 flex items-center font-avanir text-md font-medium text-gray-900 dark:text-white">
                  {items.priority === "very-high" ? (
                    <span class="flex w-3 h-3 bg-pink rounded-full mr-4 flex-shrink-0"></span>
                  ) : items.priority === "high" ? (
                    <span class="flex w-3 h-3 bg-yellow rounded-full mr-4 flex-shrink-0"></span>
                  ) : items.priority === "normal" ? (
                    <span class="flex w-3 h-3 bg-green rounded-full mr-4 flex-shrink-0"></span>
                  ) : items.priority === "low" ? (
                    <span class="flex w-3 h-3 bg-blue rounded-full mr-4 flex-shrink-0"></span>
                  ) : (
                    <span class="flex w-3 h-3 bg-purple rounded-full mr-4 flex-shrink-0"></span>
                  )}
                  <p
                    className={
                      items.is_active === 1
                        ? "none font-bold"
                        : "line-through text-slate-400"
                    }
                  >
                    {items.title}
                  </p>
                  <TbPencil
                    className=" text-slate-500 text-xl ml-3 cursor-pointer"
                    onClick={handleShowEdit}
                  />
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
        <EditItem
          show={editShow}
          onHide={handleCloseEdit}
          setEditShow={setEditShow}
        />
      </div>
    </>
  );
}

export default ListItem;

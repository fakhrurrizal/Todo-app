import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { FormControl, FormLabel, Input, CloseButton } from "@chakra-ui/react";
import { useMutation } from "react-query";
import PopupSuccess from "./PopupSuccess";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";

export default function AddItem({ show, handleClose }) {
  const { id } = useParams()
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    activity_group_id: id,
    is_active: 0,
    priority: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("priority", form.priority);

      const response = await API.post("/todo-items", formData);
      // if(response.status === 200){

      // }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[800px] transform overflow-hidden rounded-2xl bg-white p-10 text-left align-center shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[22px] flex justify-between font-avanir font-bold leading-6 mb-10 text-gray-900"
                  >
                    Tambah List Item
                    <button
                      ref={cancelButtonRef}
                      onClick={() => handleClose(false)}
                    >
                      <CloseButton />
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                      <FormControl className="mb-10 font-avanir">
                        <FormLabel className="text-[34px] font-bold">
                          Nama List Item
                        </FormLabel>
                        <Input
                          type="text"
                          className="font-avanir text-xl  border-8 py-6"
                          placeholder="Tambahkan nama activity"
                          onChange={handleChange}
                          name="title"
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <select
                          className="font-avanir w-44 py-3 rounded-lg px-3 rounded-lg border border-slate-200"
                          placeholder="Pilih Priority"
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                      </FormControl>
                      <button
                        type="submit"
                        className=" mt-10 ml- rounded-full border border-transparent bg-aqua py-3 text-sm font-bold font-poppins px-7 text-white hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Simpan
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

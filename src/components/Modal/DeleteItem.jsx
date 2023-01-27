import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FiAlertTriangle } from "react-icons/fi";

export default function Delete({ data, show,handleClose, setConfirmDelete}) {
  const handleDelete = () => {
    setConfirmDelete(true)
  }
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 ">
                      <Dialog.Title as="h2" className="text-[60px] ml-48 mb-14">
                        <FiAlertTriangle className='text-ping '/>
                      </Dialog.Title>
                      <div className="mt-2 ml-10 mb-5">
                        <span className="text-[18px] font-avanir  text-black">
                            <p>Apakah anda yakin menghapus List Item</p> 
                            <span className='font-bold text-black'>"{data}"?</span> 
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 mb-5 px-4 py-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full mx-4 justify-center rounded-full border border-transparent bg-red-600 px-12 py-3 text-base font-bold font-avanir text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full mx-4 justify-center rounded-full border border-gray-300 bg-white px-12 py-3 text-base font-bold font-avanir  text-muted-700 shadow-sm hover:bg-gray-200 focus:outline-none  focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleClose(false)}
                    ref={cancelButtonRef}
                  >
                    No
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

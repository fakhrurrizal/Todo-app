import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddHeader() {
  const [data, setData] = useState([]);
  const addData = () => {
    setData([...data, "new data"]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set("title", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-between mb-5">
      <span className="lg:text-[36px] sm:ml-10 md:ml-20 lg:ml-0 sm:text-[22px] font-poppins font-heavy">
        Activity
      </span>
      <button
        class="bg-aqua hover:bg-sky-400 sm:mr-10 md:mr-20 lg:mr-0 text-white lg:px-10 sm:px-4 sm:py-1 lg:text-[16px] sm:text-[12px]  font-poppins font-bold rounded-[50px] right"
        onClick={(()=> handleSubmit())}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-4" />
        Tambah
      </button>
    </div>
  );
}

export default AddHeader;

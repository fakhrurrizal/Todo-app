import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencil,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";


function ListHeader() {

  return (
    <div className="flex justify-between mb-5">
      <span className="lg:text-[36px] sm:ml-3 md:ml-20 lg:ml-0 sm:text-[12px] font-poppins font-heavy">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="lg:mr-3 sm:mr-1 lg:text-[32px] sm:text-[14px]"
          
        />{" "}
        Daftar Belanja Bulanan{" "}
        <FontAwesomeIcon
          icon={faPencil}
          className="lg:text-[25px] sm:text-[14px] lg:ml-5 sm:ml-2 text-slate-500"
        />
      </span>
      <button class="bg-aqua hover:bg-sky-600 sm:mr-5 md:mr-20 lg:mr-0 text-white lg:px-10 sm:px-3 sm:py-1 lg:text-[16px] sm:text-[10px]  font-poppins font-bold rounded-[50px] right">
        <FontAwesomeIcon icon={faPlus} className="lg:mr-4 sm:mr:1" />
        Tambah
      </button>
    </div>
  );
}

export default ListHeader;

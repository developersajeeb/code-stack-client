import { useState } from "react";
import { CiCircleChevLeft, CiCircleChevRight, CiUser } from "react-icons/ci";
import { BsClipboard } from "react-icons/bs";
import { MdOutlineContentCopy, MdKeyboardArrowDown } from "react-icons/md";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`relative py-4 h-[100vh] bg-gray-400 transition-all duration-300 ease-in ${
        isOpen ? "w-10 px-0" : "w-80 px-4"
      }`}
    >
      <button className="absolute top-3 right-2" onClick={toggleDrawer}>
        {isOpen ? (
          <CiCircleChevRight className="text-xl" />
        ) : (
          <CiCircleChevLeft className="text-xl" />
        )}
      </button>
      <h2 className={`font-medium ${isOpen && "hidden"}`}>Project</h2>
      {isOpen ? (
        <div className="flex flex-col mt-6 gap-4">
          <details className="dropdown">
            <summary className="w-full flex items-center justify-center gap-2"><BsClipboard /></summary>
            <ul className="p-2 rounded-box shadow dropdown-content z-[1] bg-gray-400 w-52 left-10">
              <li>
                <a href='#'>Sub Menu-1</a>
              </li>
              <li>
                <a>Sub Menu-3</a>
              </li>
            </ul>
          </details>
          <a href="#" className="flex items-center justify-center">
            <CiUser />
          </a>
          <a href="#" className="flex items-center justify-center">
            <MdOutlineContentCopy />
          </a>
        </div>
      ) : (
        <div className="flex flex-col mt-6 gap-4">
          <details className="dropdown">
            <summary className="w-full flex items-center gap-2"><BsClipboard /> Item-1 <MdKeyboardArrowDown /></summary>
            <ul className="p-2 rounded-box inline-block">
              <li>
                <a href='#'>Sub Menu-1</a>
              </li>
              <li>
                <a>Sub Menu-3</a>
              </li>
            </ul>
          </details>
          <a href="#" className="flex items-center gap-2">
            <CiUser /> Item-2
          </a>
          <a href="#" className="flex items-center gap-2">
            Item-3
          </a>
        </div>
      )}
    </div>
  );
};

export default SideDrawer;
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="md:flex md:flex-col md:w-64 md:h-screen overflow-y-auto transition-all duration-300 ease-in-out transform translate-x-0 md:translate-x-0 lg:translate-x-0 xl:translate-x-0 shadow-lg bg-blue-500 text-white">
      {!isMobile && (
        <h1 className="md:text-xl md:font-bold md:p-4">Dr. Daniel Martinez</h1>
      )}
      <div className="flex gap-2 items-center md:hidden">
        <button
          onClick={toggleSidebar}
          className={`focus:outline-none rounded-lg p-2 ml-4 mt-2 ${isOpen ? "bg-white" : ""}`}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
          <h1 className="text-xl font-bold flex">Dr. Daniel Martinez</h1>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:block md:relative md:translate-x-0 lg:block lg:relative lg:translate-x-0 xl:block xl:relative xl:translate-x-0 flex-grow`}
      >
        <div className="py-4">
          <NavLink
            exact
            to="/dashboard"
            activeClassName="bg-white text-blue-500"
            className="block py-2 px-4 font-semibold hover:bg-white hover:text-blue-500"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/agenda"
            activeClassName="bg-white text-blue-500"
            className="block py-2 px-4 font-semibold hover:bg-white hover:text-blue-500"
          >
            Agenda
          </NavLink>
          <NavLink
            to="/pacientes"
            activeClassName="bg-white text-blue-500"
            className="block py-2 px-4 font-semibold hover:bg-white hover:text-blue-500"
          >
            Pacientes
          </NavLink>
          <NavLink
            to="/configuracoes"
            activeClassName="bg-white text-blue-500"
            className="block py-2 px-4 font-semibold hover:bg-white hover:text-blue-500"
          >
            Configurações
          </NavLink>
        </div>
      </div>
      {isMobile && isOpen && (
        <div className="py-4 text-center">
          <p className="text-sm">&copy; 2024 Pedro Daniel Brunetto</p>
        </div>
      )}
      {!isMobile && (
        <div className="py-4 text-center">
          <p className="text-sm">&copy; 2024 Pedro Daniel Brunetto</p>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;

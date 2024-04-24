import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:w-64">
      <button
        className="lg:hidden bg-gray-800 text-white p-4 w-full flex justify-end"
        onClick={toggleMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM112,72H216a8,8,0,0,0,0-16H112a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM34.34,141.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32l-40-40A8,8,0,0,0,34.34,61.66L68.69,96,34.34,130.34A8,8,0,0,0,34.34,141.66Z"></path></svg>
      </button>
      
      <nav className={`bg-gray-800 h-full fixed left-0 top-0 flex flex-col justify-between p-4 lg:flex ${isOpen ? 'block' : 'hidden'}`} style={{ zIndex: 999 }}>
        <div>
          <div className="text-white text-xl font-bold">Dr. Daniel Martinez</div>
          <ul className="pt-10 flex flex-col gap-3">
            <li className="mb-2">
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out font-semibold"
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/pacientes"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out font-semibold"
              >
                Pacientes
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/agenda"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out font-semibold"
              >
                Agenda
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/configuracoes"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out font-semibold"
              >
                Configurações
              </Link>
            </li>
          </ul>
        </div>
        <a href='https://www.linkedin.com/in/PedroDanielBrunetto/' className="text-blue-500 text-sm mt-4">© 2024 Pedro Daniel Brunetto</a>
      </nav>
    </div>
  );
};

export default Sidebar;

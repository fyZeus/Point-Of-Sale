import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div className="">
      <header>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="https://flowbite.com/"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Link
                to="/"
                class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              >
                DevPos
              </Link>
            </a>
          </div>
        </nav>
      </header>
      <main>
        {children}
        <ToastContainer />
      </main>
    </div>
  );
}

export default MainLayout;

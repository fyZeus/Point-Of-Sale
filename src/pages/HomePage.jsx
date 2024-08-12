import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col text-center pt-5 items-center justify-center gap-2">
        <h1 className="text-2xl">
          Welcome to the simple POS for small business
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ipsum
          corporis quidem repellendus minima adipisci soluta ducimus.
        </p>
        <p>If you have an issue call 911</p>
        <Link
          to="/pos"
          className="bg-blue-600 w-48 p-3 mt-3 text-white rounded-md text-sm"
        >
          Click here to sell product
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;

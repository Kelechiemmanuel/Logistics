import React from "react";
import { useNavigate } from "react-router-dom";


const DashboardHeader = () => {
   const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const name = user?.name || user?.email || "User";

//   const initial = name.charAt(0).toUpperCase();

  return (
    <div className=" md:flex justify-center items-center gap-5 hidden">
      <div className="">
        {name}
    </div>
     {/* <button className="cursor-pointer" onClick={logout}>Logout</button> */}
    </div>
    
  );
};

export default DashboardHeader;
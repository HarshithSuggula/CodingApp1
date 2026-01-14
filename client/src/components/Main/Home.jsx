import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Topbar/Navbar";
import "./Home.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TableData from "./TableData";
import ProblemDetails from "../../problem";
function Home() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchProbelems() {
      try {
        const response = await axios.get(
          // "https://sheetcoder-backend.vercel.app/problemsTable"
          "http://localhost:6001/problemsTable"
        );
        // setProblems(response.data.data);
        setProblems(ProblemDetails);
        toast.success("Logged in successfully");
      } catch (error) {
        console.log(error);
      }
    }
    fetchProbelems();
  }, []);

  return (
    <>
      <Navbar />
      <TableData problems={problems} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Home;

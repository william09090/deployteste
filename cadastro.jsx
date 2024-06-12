import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(inputs);

    axios
      .post(
        "http://localhost:5000/api/user/register",
        { ...inputs },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        if (!res.data.created) {
          if (res.data.error_type === 0) {
            toast.error(res.data.error[0].msg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res.data.error_type === 1) {
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }

        if (res.data.created) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        alert(`Request error: ${err}`);
      });
    //we will use axios to connect to the backend
  };
  return (
    <div className="bg-slate-900 min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-[2rem] text-white">
        Cadastro de usuário
      </h1>
      <div className="w-96 mt-4 bg-stone-400 px-4 py-5 rounded-lg">
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="email">Nome</label>
            <input type="text" placeholder="Digite seu Nome"
              className="rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="email">Email</label>
            <input type="text" placeholder="Digite seu Email"
              className="rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="email">Senha</label>
            <input type="password" placeholder="Digite sua Senha"
              className="rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400"></input>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="email">Confirme a Senha</label>
            <input type="password" placeholder="Confirme sua Senha"
              className="rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-stone-400"></input>
          </div>

          <button type="submit" className="bg-slate-600 hover:bg-slate-500 font-medium text-sm py-2 rounded-lg text-white">Cadastrar</button>
        </form>

      </div>
      <p className="text-slate-100 text-xs w-96 mt-2 text-center">Ao se inscrever, voce passara a receber as informação.</p>
    </div>


  );
};
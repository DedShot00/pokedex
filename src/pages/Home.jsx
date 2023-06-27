import React from "react";
import FooterHome from "../components/Home/FooterHome";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSubmit = (e) => { 
    e.preventDefault()
    const trainerName = e.target.trainerName.value

    dispatch(setTrainerName(trainerName))
    navigate('/pokedex')
    
  }

  return (
    <main className=" min-h-screen grid grid-rows-[1fr_auto] text-center">
      <section className="flex flex-col justify-center p-2 ">
        <div className=" mx-auto">
          <img src="/images/pokedex.png" alt="pokedex logo" />
        </div>
        <h2 className="text-3xl text-red-600 font-bold mb-2 mt-6 sm:text-5xl sm:mt-12">Welcome Trainer!</h2>
        <p className="sm:text-2xl text-gray-600">To start, please enter your name</p>

        <form className=" mt-8  w-full " onSubmit={handleSubmit} action="">
          <div className='flex justify-center'>
          <input className=" pl-3 w-[230px] outline-none sm:pl-4 py-2 shadow-md sm:w-[350px]  sm:text-2xl " placeholder="Your name..." required id="trainerName" type="text" />
          <button className="bg-red-500 text-gray-100 px-4 py-2 shadow-md sm:text-2xl sm:px-8">Start!</button>
          </div>
        </form>
      </section>

      <section>
        <FooterHome />
      </section>
    </main>
  );
};

export default Home;

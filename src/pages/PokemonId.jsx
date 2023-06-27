import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const pokeBg = {
  normal:'bg-amber-700',
  fighting:'bg-orange-700',
  flying:'bg-sky-600',
  poison:'bg-violet-700',
  ground:'bg-amber-800',
  rock:'bg-gray-500',
  bug:'bg-green-500',
  ghost:'bg-indigo-700',
  steel:'bg-zinc-500',
  fire:'bg-orange-600',
  water:'bg-blue-500',
  grass:'bg-green-300',
  electric:'bg-indigo-600',
  psychic:'bg-amber-600',
  dragon:'bg-rose-700',
  dark:'bg-zinc-800',
  fairy:'bg-pink-700',
};
const pokeGradients = {
  normal:'from-amber-800 to-amber-600',
  fighting: 'from-[#96402A]  to-[#E95B36]', 
  flying:'from-sky-700  to-sky-500',
  poison:'from-violet-800 to-violet-600',
  ground:'from-amber-900 to-amber-700',
  rock:'from-gray-600 to-gray-400',
  bug:'from-green-600 to-green-400',
  ghost:'from-indigo-800 to-indigo-600',
  steel:'from-zinc-600 to-zinc-400',
  fire:'from-orange-700 to-orange-500',
  water:'from-blue-700 to-blue-500',
  grass:'from-teal-400 to-green-300',
  electric:'from-blue-800 to-indigo-600',
  psychic:'from-orange-700 to-amber-600',
  ice:'from-sky-500 to-blue-300',
  dragon:'from-red-800 to-rose-700',
  dark:'from-zinc-950 to-zinc-700',
  fairy:'from-pink-800 to-pink-600',
};


const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);

  const { pokeName } = useParams();

  const percenProgress = (baseStat) => { 
    const STAT_MAX =  255
    return `${(baseStat *100) / 255}%`
  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    axios
      .get(url)
      .then(({ data }) => {
        setPokemon(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <Header />

      <div className=" mx-5 py-10 pt-40">
        
        <section className={`  bg-gradient-to-b ${pokeGradients[pokemon?.types[0].type.name]} max-w-5xl mx-auto relative h-32 rounded-t-md `}>
          <div className=" max-w-[300px]  absolute  left-1/2 -translate-x-1/2 bottom-0 ">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt={pokemon?.name}
            />
          </div>
        </section>

        <section className="p-4 bg-white mx-auto max-w-5xl md:p-16">
          <div>
            <img src="" alt="" />
          </div>

          <section className="flex flex-col items-center">
            <span className="text-center text-3xl border px-4 py-2">#{pokemon?.id}</span>
            <h3 className="capitalize text-4xl text-center py-4 font-semibold sm:text-5xl ">{pokemon?.name}</h3>
          </section>

          <div className="flex justify-center gap-4 text-center pb-8">
            <div><span>Weight</span> <h5 className="text-2xl">{pokemon?.weight}</h5></div>
            <div><span>Height</span> <h5 className="text-2xl">{pokemon?.height}</h5></div>
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:gap-8 pb-8">
            <div>
              <h4 className="text-center text-2xl pb-4 font-semibold">Type</h4>
              <div className="flex justify-around gap-2">
                {
                  pokemon?.types.map(type => <h5 key={pokeBg[type.type.name]} className={`${pokeBg[type.type.name]} text-lg text-white font-semibold border text-center w-[46%] py-2 capitalize`}>{type.type.name}</h5>)
                }
              </div>
            </div>
            <div>
              <h4 className="text-center text-2xl pb-4 font-semibold">Abilities</h4>
              <div className="flex justify-around gap-2 flex-wrap">
                {
                  pokemon?.abilities.map(ability => <h5 key={ability.ability.name} className="border text-center w-[46%] py-2 text-lg capitalize">{ability.ability.name}</h5>)
                }
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-semibold pb-4">Stats</h3>

          <section>
            {
              pokemon?.stats.map(stat => (
                <article className="pb-5" key={stat.stat.url}>
                  <section>
                    <div className=" flex  justify-between pb-2">
                      <h5 className="capitalize">{stat.stat.name}:</h5>
                      <span>{stat.base_stat}/255</span>
                    </div>

                    <div className=' bg-gray-300 h-8 rounded-md overflow-hidden'>
                      <div style={{width:percenProgress(stat.base_stat)}} className="h-full bg-yellow-500"></div>
                    </div>
                  </section>
                </article>
              ))
            }
          </section>
        </section>
      </div>

      <div className=" mx-5 py-10">
        <section className="p-4 bg-white mx-auto max-w-5xl md:p-12">
          <h3 className="text-3xl pb-4 font-semibold">Movements</h3>
          <div className="flex flex-wrap justify-around gap-3">
            {
              pokemon?.moves.map(move => <span key={move.move.name} className="px-6 py-2 bg-zinc-300 rounded-full min-w-max">{move.move.name}</span>)
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default PokemonId;

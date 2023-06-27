import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const pokeBorder = {
  normal:'border-amber-700',
  fighting:'border-orange-700',
  flying:'border-sky-600',
  poison:'border-violet-700',
  ground:'border-amber-800',
  rock:'border-gray-500',
  bug:'border-green-500',
  ghost:'border-indigo-700',
  steel:'border-zinc-500',
  fire:'border-orange-600',
  water:'border-blue-500',
  grass:'border-green-300',
  electric:'border-indigo-600',
  psychic:'border-amber-600',
  dragon:'border-rose-700',
  dark:'border-zinc-800',
  fairy:'border-pink-700',
};

const pokeText = {
  normal:'text-amber-700',
  fighting:'text-orange-700',
  flying:'text-sky-600',
  poison:'text-violet-700',
  ground:'text-amber-800',
  rock:'text-gray-500',
  bug:'text-green-500',
  ghost:'text-indigo-700',
  steel:'text-zinc-500',
  fire:'text-orange-600',
  water:'text-blue-500',
  grass:'text-green-300',
  electric:'text-indigo-600',
  psychic:'text-amber-600',
  dragon:'text-rose-700',
  dark:'text-zinc-800',
  fairy:'text-pink-700',
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



const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  
  const typesFormat = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const typesTitle = nameTypes.join(" / ");
    return typesTitle;
  };
  
  // const pokemonTypes = typesFormat(pokemon?.types)

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => {
        setPokemon(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Link className={` min-w-[280px] mx-auto rounded-lg overflow-hidden border-8 ${pokeBorder[pokemon?.types[0].type.name]} ${pokeBg[pokemon?.types[0].type.name]} `} to={`/pokedex/${pokemon?.name}`}>
      <section className={` max-w-xs bg-gradient-to-b ${pokeGradients[pokemon?.types[0].type.name]}  relative h-32 rounded-t-md `}>
        <div className="  absolute  left-1/2 -translate-x-1/2 w-[70%] -bottom-14">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      <section className="text-center bg-slate-100 rounded-b-md pt-10  ">
        <h3 className={` capitalize text-xl pt-2 font-bold ${pokeText[pokemon?.types[0].type.name]} `}>{pokemon?.name}</h3>
        <h5 className=" text-xs text-gray-400 mb-2 capitalize">{typesFormat(pokemon?.types)}</h5>
        <p className=" text-gray-400 border-b mx-1 pb-1 mb-2 ">tipo</p>

        <section className=" grid grid-cols-2 px-4 pt-4 pb-6 ">
          {/* lista de stats */}

          {pokemon?.stats.slice(0, 4).map((stat) => (
            <div  key={stat.stat.url}>
              <h6 className="text-xs text-gray-400 uppercase font-light">{stat.stat.name}</h6>
              <span className={` font-bold ${pokeText[pokemon?.types[0].type.name]}`}>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonList from "../components/Pokedex/PokemonList";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [pokeTypes, setPokeTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokeSearch.toLocaleLowerCase().trim())
  );

  const handleSelectType = (e) => {
    setCurrentType(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPokeSearch(e.target.pokeSearch.value);
  };

  const getAllPokemons = () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1281";

    axios
      .get(url)
      .then(({ data }) => {
        setPokemons(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paginationLogic = () => {
    const pokemonsPerPage = 20;

    const startSlice = pokemonsPerPage * (currentPage - 1);
    const endSlice = startSlice + pokemonsPerPage;

    const pokemonsInPage = pokemonsByName.slice(startSlice, endSlice);

    const lastPage = Math.ceil(pokemonsByName.length / pokemonsPerPage) || 1;

    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    const pagesInBlock = [];

    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }

    return {
      pokemonsInPage,
      lastPage,
      pagesInBlock,
    };
  };

  const {pokemonsInPage, lastPage, pagesInBlock} = paginationLogic()

  const handleClickPrevious = () => { 
    if (currentPage > 1) {
      setCurrentPage(currentPage-1) 
    }
  }

  const handleClickNext = () => { 
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type/";

    axios.get(url).then(({ data }) => {
      setPokeTypes(data.results);
    });
  }, []);

  useEffect(() => {
    if (currentType) {
      const url = `https://pokeapi.co/api/v2/type/${currentType}`;

      axios
        .get(url)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllPokemons();
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1)
  }, [pokeSearch, currentType])
  

  return (
    <div className="">
      <Header />
      <div className="p-4 max-w-[1440px] mx-auto">

        <p className="mt-8 mb-8">
          <span className=" text-red-500 font-bold capitalize ">
            Welcome {trainerName}!{" "}
          </span>{" "}
          Here you can find your favorite Pokemon
        </p>

        <form className="w-m sm:flex justify-start gap-2 mb-8 " onSubmit={handleSearch}>
          <div className="flex ">
            <input className=" sm:w-[380px] pl-2 py-2 outline-none w-[70%]" id="pokeSearch" type="text" placeholder="Search a Pokemon" />
            <button className="bg-red-500 px-4">Search</button>
          </div>
          <select className=" outline-none py-3 mt-4 sm:mt-0 w-[150px] " onChange={handleSelectType}>
            <option value="">All</option>
            {pokeTypes.map((type) => (
              <option className="capitalize" key={type.url} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </form>

        <PokemonList pokemons={pokemonsInPage} />
        
        <section className="pt-10 pb-6">
          <ul className="flex justify-center gap-2 sm:gap-6">
          {
            currentPage > 1 && <li className="cursor-pointer bg-red-600 px-2 sm:p-4 py-3 rounded-md" onClick={handleClickPrevious}>{'<<'}</li>
          }
          {
            pagesInBlock.map(page => <li className={`${page===currentPage?'bg-red-500':'bg-red-600'} cursor-pointer  px-2 sm:p-4 py-3 rounded-md`} onClick={() => setCurrentPage(page)} key={page}>{page}</li> )
          }
          {
            currentPage < lastPage && <li className="cursor-pointer bg-red-600 px-2 sm:p-4 py-3 rounded-md" onClick={handleClickNext}>{'>>'}</li>
          }
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Pokedex;

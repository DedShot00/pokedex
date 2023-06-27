import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1440px]">
      {pokemons.map((pokemon) => (
        <PokemonCard pokemonUrl={pokemon.url} key={pokemon.url} />
      ))}
    </div>
  );
};

export default PokemonList;

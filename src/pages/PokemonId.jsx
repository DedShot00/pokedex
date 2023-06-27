import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);

  const { pokeName } = useParams();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    axios
      .get(url)
      .then(({ data }) => {
        setPokemon(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <Header />

      <section>
        <div>
          <img src="" alt="" />
        </div>

        <section>
          <h3>numero</h3>
          <h3>nombre</h3>
        </section>

        <div>
          <div><span>peso</span> <h5>peso</h5></div>
          <div><span>altura</span> <h5>altura</h5></div>
        </div>

        <div>
          <div>
            <h4>tipo</h4>
            <span>tipos</span>
          </div>
          <div>
            <h4>habilidades</h4>
            <span>habilidades</span>
          </div>
        </div>

        <h3>stats</h3>

        <div>
          stats
        </div>

      </section>
      <section>
        movements
      </section>
    </main>
  );
};

export default PokemonId;

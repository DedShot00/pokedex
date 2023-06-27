import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokemonId from "./pages/PokemonId";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

function App() {
  return (
    <main className=" min-h-screen font-['Inter'] bg-slate-100">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokeName" element={<PokemonId />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {
  const API_URL = "https://hp-api.onrender.com/api/characters";

  const [characters, setCharacters] = useState([]);

  const [selectedHouse, setSelectedHouse] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error("Errore nella chiamata API:", error);
      });
  }, []);

  const filterCharactersByHouse = (house) => {
    setSelectedHouse(house);
  };

  const filteredCharacters = selectedHouse
    ? characters.filter((character) => character.house === selectedHouse)
    : characters;

  return (
    <div className="w-full flex flex-col items-center bg-black">
        <h1 className="text-3xl font-bold p-4 text-white">Harry Potter Characters</h1>

        <div className="mb-4">
          <button
            className=" bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => filterCharactersByHouse("Gryffindor")}
          >
            Gryffindor
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => filterCharactersByHouse("Hufflepuff")}
          >
            Hufflepuff
          </button>
          <button
            className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => filterCharactersByHouse("Ravenclaw")}
          >
            Ravenclaw
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => filterCharactersByHouse("Slytherin")}
          >
            Slytherin
          </button>
        </div>

        <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCharacters
            .filter((character) => character.image)
            .map((character) => (
              <div className="bg-gray-100 p-4 rounded shadow-md" key={character.id}>
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-auto object-cover mb-2"
                />
                <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                <p className="text-gray-600">House: {character.house}</p>
                <p className="text-gray-600">
                  Year Of Birth: {character.yearOfBirth}
                </p>
              </div>
            ))}
        </div>
        </div>
      </div>

  );
}

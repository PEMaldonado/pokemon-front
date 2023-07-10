const pokemons = {
  id: "191ea959-7a42-4a7a-828c-48eb451acbf8",
  name: "Mancho",
  image:
    "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
  life: 82,
  attack: 33,
  defense: 58,
  speed: 69,
  height: 368,
  weight: 879,
  created: true,
  createdAt: "2023-05-05T21:02:54.660Z",
  updatedAt: "2023-05-05T21:02:54.660Z",
  types: [
    {
      id: 6,
      name: "rock",
      createdAt: "2023-05-05T20:42:43.853Z",
      updatedAt: "2023-05-05T20:42:43.853Z",
    },
  ],
};

console.log(
  pokemons.type
    ? pokemons.type
    : pokemons.types.length === 1
    ? pokemons.types[0].name
    : `${pokemons.types[0].name}, ${pokemons.types[1].name}`
);

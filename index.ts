interface Player {
  name: string;
}

interface Village {
  id: number;
  name: string;
  x: number;
  y: number;
  coord: string;
}

interface GameData {
  player: Player;
  village: Village;
}

declare let Dialog: any;
declare let tailwind: any;
declare let game_data: GameData;

const BASE_IMG_URI =
  "https://dspl.innogamescdn.com/asset/86f7f6ca/graphic/unit/";

const UNITS = [
  { name: "Pikinier", time: 18, image: "spear" },
  { name: "Miecznik", time: 22, image: "sword" },
  { name: "Topornik", time: 18, image: "axe" },
  { name: "Łucznik", time: 18, image: "archer" },
  { name: "Zwiadowca", time: 9, image: "spy" },
  { name: "LK", time: 10, image: "light" },
  { name: "ŁNK", time: 10, image: "marcher" },
  { name: "CK", time: 11, image: "heavy" },
  { name: "Taran", time: 30, image: "ram" },
  { name: "Katapulta", time: 30, image: "catapult" },
  { name: "Rycerz", time: 10, image: "knight" },
  { name: "Szlachcic", time: 35, image: "snob" },
];

const tailwindInit = () => {
  const script = document.createElement("script");

  script.src = "https://cdn.tailwindcss.com";

  script.onload = () => {
    tailwind.config = {
      corePlugins: {
        preflight: false,
      },
      theme: {
        extend: {
          colors: {
            primary: "#603000",
          },
        },
      },
    };
  };

  document.head.appendChild(script);
};

const field = (name: string, label: string, placeholder: string) => {
  return `
    <div>
      <label class="block mb-1 text-sm font-medium text-gray-900" for="${name}">${label}</label>
      <input name="${name}" class="bg-gray-50 w-fit border border-gray-300 text-gray-900 outline-none shadow-none focus:border-primary text-sm rounded-lg block w-fit p-2.5" placeholder="${placeholder}" type="text"/>
    </div>
    `;
};

const fieldUnits = () => {
  return `
    <div>
      <label class="block mb-1 text-sm font-medium text-gray-900" for="units">Jednostki</label>
      <select>
        ${UNITS.map((unit) => `<option>${unit.name}</option>`).join("")}
      </select>
    </div>
    `;
};

const setCurrentVillageCoords = (field: string) => {
  setCoords(field, game_data.village.coord);
};

const setCoords = (field: string, coords: string) => {
  const input: HTMLInputElement | null = document.querySelector(
    `input[name='${field}']`
  );

  if (!input) return;

  input.value = coords;
};

const template = `
<h2 class="text-2xl">Pomocnik kontry</h2>
<p>Ponizej wpisz koordynaty wiosek atakujacych i broniacych</p>
<div class="flex flex-col gap-4">
  <div>
    ${field("coord_1", "Koordynaty wioski 1", "123|456")}
    <button onclick="setCurrentVillageCoords('coord_1')" class="bg-transparent border-none outline-none text-primary font-bold cursor-pointer">Skopiuj z obecnej</button>
  </div>
  <div>
    ${field("coord_2", "Koordynaty wioski 2", "123|456")}
    <button onclick="setCurrentVillageCoords('coord_2')" class="bg-transparent border-none outline-none text-primary font-bold cursor-pointer">Skopiuj z obecnej</button>
  </div>
  <div>
  ${fieldUnits()}
  </div>
  <div>
  ${field("time", "Czas wejscia ataku", "12:00:00")}
  </div>
<div>
</div>
</div>

<button onclick="calculate" type="submit" class="text-white bg-primary cursor-pointer mt-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Oblicz</button>
`;

const init = () => {
  tailwindInit();
  Dialog.show("okienko_komunikatu", template);
};

init();

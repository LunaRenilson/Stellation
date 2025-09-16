<script>
  let searchLocation = "";
  let searchCheck = "";
  let showFilters = false;
  let valuePrice = 100;
  const minPrice = 100;
  const maxPrice = 5000;

  let valueArea = 50;
  const minArea = 20;
  const maxArea = 2000;
</script>

<div class="py-8 flex justify-evenly flex-wrap">
  <i
    class="fa-solid fa-house cursor-pointer circle-icon text-[25px] py-3
     hover:bg-gray-300 hover:text-gray-500 transition-colors duration-300"
  >
  </i>

  <i
    class="fa-solid fa-filter cursor-pointer circle-icon text-[25px] py-3
     hover:bg-gray-300 hover:text-gray-500 transition-colors duration-300"
    on:click={() => (showFilters = !showFilters)}
  ></i>

  <a href="/addProperty">
    <i
      class="fa-solid fa-square-plus cursor-pointer circle-icon text-[25px] py-3
         hover:bg-gray-300 hover:text-gray-500 transition-colors duration-300"
    ></i>
  </a>

  <button
    class="cursor-pointer text-[20px] font-semibold bg-white rounded-[20px] px-4 py-2 hover:text-gray-500 transition-colors duration-300"
  >
    Log Out
  </button>
</div>

{#if showFilters}
  <div
    class="w-75 max-w-full bg-white p-4 rounded shadow-md mb-5 transition-all duration-300 overflow-hidden"
  >
    <h2 class="font-semibold text-center">Search Filters</h2>

    <h3 class="font-semibold text-gray-900 mb-2">Properties</h3>
    <div class="flex flex-wrap">
      <label class="w-full"
        ><input class="text-gray-800 mb-2" type="checkbox" /> Houses</label
      >
      <label
        ><input class="text-gray-800 mb-2" type="checkbox" /> Apartments</label
      >
      <label class="w-full"
        ><input class="text-gray-800 mb-2" type="checkbox" /> Condominiums</label
      >
      <label class="w-full"
        ><input class="text-gray-800 mb-2" type="checkbox" /> Duplex</label
      >

      <!-- Slider de Preço -->
      <div class="py-4 w-full">
        <p class="font-semibold text-gray-900">Prices</p>
        <div class="w-full mt-4 max-w-60">
          <div class="flex justify-between text-sm font-semibold mb-2">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="1"
            bind:value={valuePrice}
            class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div class="text-center mt-2 font-bold text-blue-600">
            ${valuePrice}$
          </div>
        </div>
      </div>

      <!-- Slider de Área -->
      <div class="py-4 w-full">
        <p class="font-semibold text-gray-900">Area (m²)</p>
        <div class="w-full mt-4 max-w-60">
          <div class="flex justify-between text-sm font-semibold mb-2">
            <span>{minArea}</span>
            <span>{maxArea}</span>
          </div>

          <input
            type="range"
            min={minArea}
            max={maxArea}
            step="1"
            bind:value={valueArea}
            class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600"
          />

          <div class="text-center mt-2 font-bold text-green-600">
            {valueArea} m²
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap">
      <p class="font-semibold text-gray-900 mb-2">Amenities</p>
      <label class="w-full"
        ><input class="text-gray-800 mb-2" type="checkbox" /> Gym</label
      >
      <label><input class="text-gray-800 mb-2" type="checkbox" /> Parking</label
      >
      <label class="w-full"
        ><input class="text-gray-800 mb-2" type="checkbox" /> Laundry Facilities</label
      >
    </div>

    <button
      class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-[20px] hover:bg-blue-600 transition-colors duration-300 mt-4"
    >
      Aplicar Filtros
    </button>
  </div>
{/if}

<div class="relative w-75 max-w-full ml-5">
  <input
    id="searchLocation"
    type="text"
    bind:value={searchLocation}
    placeholder="Location"
    class="cursor-pointer w-full p-2 pr-10 rounded-[30px] focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f4f9fc]"
  />
  <i
    class="cursor-pointer fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2"
  ></i>
</div>

<div class="py-5 relative w-75 max-w-full ml-5">
  <input
    id="searchCheck"
    type="text"
    bind:value={searchCheck}
    placeholder="Check in | Check out"
    class="cursor-pointer w-full p-2 pr-10 rounded-[30px] focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f4f9fc]"
  />
  <i
    class="cursor-pointer fa-solid fa-calendar-days absolute right-3 top-1/2 -translate-y-1/2"
  ></i>
</div>

<div
  class="w-75 max-w-full h-69 mx-auto bg-white rounded shadow overflow-hidden"
>
  <img
    src="/Captura de tela 2025-09-16 062714.png"
    alt="[Propertie] - Address"
    class="cursor-pointer w-full h-auto object-cover"
  />
  <div class="cursor-pointer p-2 text-center text-[14px] text-gray-700">
    123 Main Street, Anytown, City 10001, Country
  </div>
</div>

<div
  class="w-75 max-w-full h-69 mx-auto bg-white rounded shadow overflow-hidden"
>
  <img
    src="/Captura de tela 2025-09-16 080102.png"
    alt="[Propertie] - Address"
    class="cursor-pointer w-full h-auto object-cover"
  />
  <div class="cursor-pointer p-2 text-center text-[14px] text-gray-700">
    456 Main Street, Anytown, City 10001, Country
  </div>
</div>

<style>
  body {
    overflow-x: hidden;
  }
</style>

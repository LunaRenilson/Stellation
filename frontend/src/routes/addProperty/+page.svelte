<script>
  let formData = {
    description: '',
    type: '',
    zipCode: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    images: [],
    price: 0,
    area: 0,
    bedrooms: 0,
    bathrooms: 0
  };

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: Send formData to backend API
    console.log('Form submitted:', formData);
  }

  function handleImageChange(event) {
    // For simplicity, store file names or URLs
    const files = Array.from(event.target.files);
    formData.images = files.map(file => file.name);
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Adicionar Novo Imóvel</h1>

  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="description" class="block text-sm font-medium">Descrição</label>
      <textarea
        id="description"
        bind:value={formData.description}
        class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
        required
      ></textarea>
    </div>

    <div>
      <label for="type" class="block text-sm font-medium">Tipo</label>
      <select
        id="type"
        bind:value={formData.type}
        class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
        required
      >
        <option value="">Selecione o tipo</option>
        <option value="casa">Casa</option>
        <option value="apartamento">Apartamento</option>
        <option value="comercial">Comercial</option>
        <option value="terreno">Terreno</option>
      </select>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <label for="zipCode" class="block text-sm font-medium">CEP</label>
        <input
          type="text"
          id="zipCode"
          bind:value={formData.zipCode}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium">Endereço</label>
        <input
          type="text"
          id="address"
          bind:value={formData.address}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <label for="number" class="block text-sm font-medium">Número</label>
        <input
          type="text"
          id="number"
          bind:value={formData.number}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label for="neighborhood" class="block text-sm font-medium">Bairro</label>
        <input
          type="text"
          id="neighborhood"
          bind:value={formData.neighborhood}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label for="city" class="block text-sm font-medium">Cidade</label>
        <input
          type="text"
          id="city"
          bind:value={formData.city}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
    </div>

    <div>
      <label for="state" class="block text-sm font-medium">Estado</label>
      <input
        type="text"
        id="state"
        bind:value={formData.state}
        class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
        required
      />
    </div>

    <div>
      <label for="images" class="block text-sm font-medium">Imagens</label>
      <input
        type="file"
        id="images"
        multiple
        on:change={handleImageChange}
        class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
        accept="image/*"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <label for="price" class="block text-sm font-medium">Preço</label>
        <input
          type="number"
          id="price"
          bind:value={formData.price}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label for="area" class="block text-sm font-medium">Área (m²)</label>
        <input
          type="number"
          id="area"
          bind:value={formData.area}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label for="bedrooms" class="block text-sm font-medium">Quartos</label>
        <input
          type="number"
          id="bedrooms"
          bind:value={formData.bedrooms}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label for="bathrooms" class="block text-sm font-medium">Banheiros</label>
        <input
          type="number"
          id="bathrooms"
          bind:value={formData.bathrooms}
          class="mt-1 block w-full py-3 bg-blue-100 focus:bg-blue-50 outline-0 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      class="cursor-pointer bg-black text-white font-semibold rounded-sm px-4 py-2  transition-colors duration-300"
    >
      Adicionar Imóvel
    </button>
  </form>
</div>

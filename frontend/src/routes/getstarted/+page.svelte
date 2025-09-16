<script>
  let fullName = '';
  let email = '';
  let cpf = '';
  let rg = '';
  let password = '';
  let document = '';
  let assignature = '';

  function handleDocumentChange(event) {
    const file = event.target.files[0];
    if (file) {
      document = file.name;
    }
  }

  function handleAssignatureChange(event) {
    const file = event.target.files[0];
    if (file) {
      assignature = file.name;
    }
  }
</script>

<h1 class="font-roboto tracking-tight italic font-bold text-center py-10 pb-4 text-[30px] leading-none">
  Fill In Your Details <br> To Get Started!
</h1>

<div class="ml-5 py-5 text-[14px]">
  <label class="block font-semibold pb-2" for="fullName">Complete Name</label>
  <input id="fullName" type="text" bind:value={fullName}
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f4f9fc]" />

  <label class="block font-semibold py-3" for="email">E-mail</label>
  <input id="email" type="text" bind:value={email}
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f5f9fc]" />

  <label class="block font-semibold py-3" for="cpf">CPF</label>
  <input id="cpf" type="text" bind:value={cpf}
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f4fbff]" />

  <label class="block font-semibold py-3" for="rg">RG</label>
  <input id="rg" type="text" bind:value={rg}
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f0f9ff]" />

  <label class="block font-semibold py-3" for="password">Password</label>
  <input id="password" type="text" bind:value={password}
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ecf8ff]" />

  <label class="block font-semibold py-3" for="document">Send Document</label>
  <input
    id="document"
    type="text"
    bind:value={document}
    placeholder="Choose a file..."
    class="w-61 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ceedff]"
    readonly
  />

  <label
    for="file-upload-document"
    class="cursor-pointer px-2 py-3 text-[10px] border border-gray-400 bg-[#ccecff] font-semibold rounded hover:bg-[#addeff] transition"
  >
    UPLOAD
  </label>

  <input
    id="file-upload-document"
    type="file"
    class="hidden"
    on:change={handleDocumentChange}
  />
  <div class="pb-30">
    <label class="block font-semibold py-3" for="assignature">Send Assignature</label>
    <input
      id="assignature"
      type="text"
      bind:value={assignature}
      placeholder="Choose a file..."
      class="w-61 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ccecff]"
      readonly
    />

    <label
      for="file-upload-assignature"
      class="cursor-pointer px-2 py-3 text-[10px] border border-gray-400 bg-[#ccecff] font-semibold rounded hover:bg-[#addeff] transition"
    >
      UPLOAD
    </label>

    <input
      id="file-upload-assignature"
      type="file"
      class="hidden"
      on:change={handleAssignatureChange}
    />
    </div>
</div>

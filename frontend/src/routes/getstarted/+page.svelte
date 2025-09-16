<script>
  let fullName = '';
  let email = '';
  let cpf = '';
  let rg = '';
  let password = '';
  let confirmPassword = '';
  let showPassword = false;
  let document = '';
  let assignature = '';

  function togglePassword() {
    showPassword = !showPassword;
  }

  function handleFileChange(event, field) {
    const file = event.target.files[0];
    if (file) {
      if (field === 'document') document = file.name;
      if (field === 'assignature') assignature = file.name;
    }
  }

  $: passwordStrength = password.length >= 8
    ? 'Strong'
    : password.length > 0
      ? 'Weak'
      : '';
</script>

<h1 class="font-roboto tracking-tight italic font-bold text-center py-10 pb-4 text-[30px] leading-none">
  Fill In Your Details <br> To Get Started!
</h1>

<div class="ml-5 py-5 text-[14px] space-y-4">

  <label class="block font-semibold pb-2" for="fullName">Complete Name</label>
  <input
    id="fullName"
    type="text"
    bind:value={fullName}
    placeholder="Iara Amagot Santos"
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f4f9fc]"
  />

  <label class="block font-semibold py-3" for="email">E-mail</label>
  <input
    id="email"
    type="email"
    bind:value={email}
    placeholder="iara1234@yourdomain.com"
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f5f9fc]"
  />

  <label class="block font-semibold py-3" for="cpf">CPF</label>
  <input
    id="cpf"
    type="text"
    bind:value={cpf}
    placeholder="XXX.XXX.XXX-YY"
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f4fbff]"
  />

  <label class="block font-semibold py-3" for="rg">RG</label>
  <input
    id="rg"
    type="text"
    bind:value={rg}
    placeholder="ZZ.ZZZ.ZZZ-WW"
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f0f9ff]"
  />

  <label class="block font-semibold py-3" for="password">Password</label>
  <div class="flex flex-col space-y-1">
    <div class="flex items-center space-x-1">
      <input
        id="password"
        type={showPassword ? 'text' : 'password'}
        bind:value={password}
        placeholder="*****************"
        class="w-60 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ecf8ff]"
      />
      <button
        type="button"
        on:click={togglePassword}
        class="inline-block text-center w-14 cursor-pointer border border-gray-400 px-3 py-3 bg-[#ccecff] rounded hover:bg-[#addeff] transition font-semibold text-[10px]"
      >
        {showPassword ? 'HIDE' : 'SHOW'}
      </button>
    </div>

    {#if passwordStrength}
      <p class="text-[12px] mt-1">
        {passwordStrength === 'Strong' ? '✅ Strong password' : '⚠️ Weak password (min 8 chars)'}
      </p>
    {/if}
  </div>

  <label class="block font-semibold py-3" for="confirmPassword">Confirm Password</label>
  <input
    id="confirmPassword"
    type={showPassword ? 'text' : 'password'}
    bind:value={confirmPassword}
    placeholder="*****************"
    class="w-60 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ecf8ff]"
  />

  <button
        type="button"
        on:click={togglePassword}
        class="inline-block text-center w-14 cursor-pointer px-3 py-3 border border-gray-400 bg-[#ccecff] rounded hover:bg-[#addeff] transition font-semibold text-[10px]"
      >
        {showPassword ? 'HIDE' : 'SHOW'}
  </button>
    
  {#if confirmPassword && confirmPassword !== password}
    <p class="text-[12px] mt-1 text-red-600">⚠️ Passwords do not match</p>
  {/if}

  <label class="block font-semibold py-3" for="document">Send Document</label>
  <input
    id="document"
    type="text"
    bind:value={document}
    placeholder="Choose a file..."
    class="w-60 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ceedff]"
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
    on:change={(e) => handleFileChange(e, 'document')}
  />
    
    <label class="block font-semibold py-3" for="assignature">Send Assignature</label>
    <input
      id="assignature"
      type="text"
      bind:value={assignature}
      placeholder="Choose a file..."
      class="w-60 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ccecff]"
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
      on:change={(e) => handleFileChange(e, 'assignature')}
    />
</div>    
<div class="flex justify-center pb-30 pt-5">
    
  <a href="/redirect" class="font-roboto cursor-pointer text-center focus:outline-none focus:ring-1 focus:ring-[#564588dd] bg-black text-white text-[13px] py-1 px-6 font-semibold rounded  hover:bg-[#251372dd] transition" type="submit">Submit</a>
  <a href="/login" class="ml-4 font-roboto cursor pointer text-center text-white rounded bg-black text-[13px] py-1 px-6 font-semibold hover:bg-[#251372dd] focus:ring-1 focus:ring-[#564588dd]">Already Have An Account?</a>

</div>


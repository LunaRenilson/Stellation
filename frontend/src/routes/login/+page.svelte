<script>
  let email = '';
  let password = '';
</script>

<h1 class="font-roboto tracking-tight italic font-bold text-center py-10 pb-4 text-[30px] leading-none">LOGIN</h1>

<div class="ml-5 py-5 text-[14px]">

    <label class="block font-semibold py-3" for="email">E-mail</label>
    <input id="email" type="text" bind:value={email} placeholder="Iara Amagot Santos"
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f5f9fc]" />

    <label class="block font-semibold py-3" for="password">Password</label>
    <input id="password" type="password" bind:value={password} placeholder="***************"
        class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ecf8ff]" />
    <a class= "text-[10px] text-gray-600 hover:text-black font-semibold" href="/forget">Forgot Your Password?</a>
</div>


<div class="flex justify-end-safe mr-6">
  <a 
    class="flex items-center gap-1 rounded font-roboto text-white bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-1 focus:ring-[#948dfadd] py-1 px-4 text-[15px]"
    href="/search"
  >
    Sign In
    <i class="fa-solid fa-circle-check text-white"></i>
  </a>
</div>

    
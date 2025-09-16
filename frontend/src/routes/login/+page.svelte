<script>
  let email = '';
  let password = '';
</script>

<h1 class="font-roboto tracking-tight italic font-bold text-center py-10 pb-4 text-[30px] leading-none">LOGIN</h1>

<div class="ml-5 py-5 text-[14px]">

    <label class="block font-semibold py-3" for="email">E-mail</label>
    <input id="email" type="text" bind:value={email}
    class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#f5f9fc]" />

    <label class="block font-semibold py-3" for="password">Password</label>
    <input id="password" type="text" bind:value={password}
        class="w-75 p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#948dfadd] bg-[#ecf8ff]" />
    </div>
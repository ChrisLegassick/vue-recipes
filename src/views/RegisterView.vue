<template>
  <header class="p-5">
    <BackBtn />
  </header>
  <main class="px-5">
    <form @submit.prevent>
      <input type="email" name="email" id="email" placeholder="Email address" v-model="userAccount.email"
        class="bg-slate-700 my-3 p-3 rounded-md w-full text-white">
      <input type="text" name="username" id="username" placeholder="Enter a username..." v-model="userAccount.username"
        class="bg-slate-700 my-3 p-3 rounded-md w-full text-white">
      <input type="password" name="password" id="password" placeholder="Enter a password" v-model="userAccount.password"
        class="bg-slate-700 my-3 p-3 rounded-md w-full text-white">
      <button @click="registerAccount" type="submit"
        class="bg-green-600 hover:bg-green-700 rounded-lg text-white px-3 py-1">
        Register
      </button>
    </form>
  </main>
</template>

<script setup>
import BackBtn from '../components/backBtn.vue';
import { ref } from 'vue';
import { api } from '../components/api.js';

const { ID, account } = api();

const userAccount = ref({
  email: "",
  username: "",
  password: ""
});

const registerAccount = async () => {
  try {
    if (userAccount.value.email === "" || userAccount.value.username === "" || userAccount.value.password === "") {
      console.log("Empty fields");
      return;
    }
    const data = await account.create(ID.unique(), userAccount.value.email, userAccount.value.password, userAccount.value.username);
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <header class="p-5">
    <BackBtn />
  </header>
  <main class="px-5">
    <form @submit.prevent>
      <input type="email" name="email" id="email" placeholder="Email address" v-model="userAccount.email"
        class="bg-slate-700 my-3 p-3 rounded-md w-full text-white">
      <input type="password" name="password" id="password" placeholder="Enter a password" v-model="userAccount.password"
        class="bg-slate-700 my-3 p-3 rounded-md w-full text-white">
      <button @click="loginAccount" type="submit" class="bg-green-600 hover:bg-green-700 rounded-lg text-white px-3 py-1">
        Log in
      </button>
    </form>
    <p class="text-white">Not got an account?</p>
    <button @click="registerAccount" type="submit"
      class="bg-green-600 hover:bg-green-700 rounded-lg text-white px-3 py-1">
      Register
    </button>
  </main>
</template>

<script setup>
import BackBtn from '../components/backBtn.vue';
import { ref } from 'vue';
import { useDB } from '../components/dbConnection.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const { account } = useDB();

const userAccount = ref({
  email: "",
  password: ""
});

const loginAccount = async () => {
  try {
    if (userAccount.value.email === "" || userAccount.value.password === "") {
      console.log("Empty fields");
      return;
    }
    const data = await account.createEmailSession(userAccount.value.email, userAccount.value.password);
    const session = await account.getSession('current');
    router.push({
      name: 'home',
      query: {
        loggedIn: session.current
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const registerAccount = async () => {
  try {
    router.push({
      name: 'registerView'
    })
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <main>
    <h1>登入</h1>
    <form action="/signup" method="POST" @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          required
          v-model="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input 
          type="password"
          id="password"
          name="password"
          required
          v-model="password">
      </div>
      <button type="submit">登入</button>
    </form>
  </main>
</template>

<script setup>
import axios from 'axios';

defineProps({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const login = () => {
  const loginData = {
    email: email.value,
    password: password.value
  };
  console.log('login', login);
  const uri = 'http://localhost:4000/login';
  axios.post(uri, loginData)
    .then((res) => {
      alert('登入成功!')
    })
    .catch((err) => {
      alert('登入失敗......')
    });
}

</script>
<template>
  <main>
    <h1>註冊頁</h1>
    <form action="/signup" method="POST" @submit.prevent="signupAccount">
      <div>
        <label for="displayName">Display Name</label>
        <input 
          type="text" 
          id="displayName" 
          name="displayName" 
          required 
          v-model="displayName">
      </div>
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
      <button type="submit">註冊</button>
    </form>
  </main>
</template>

<script setup>
import axios from 'axios';

defineProps({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const signupAccount = () => {
  const signupData = {
    displayName: displayName.value,
    email: email.value,
    password: password.value
  };
  console.log('signupData', signupData);
  const uri = 'http://localhost:4000/signup';
  axios.post(uri, signupData)
    .then((res) => {
      console.log('1231231', res)
      alert('註冊成功 :)')
    })
    .catch((err) => {
      alert('註冊失敗!')
    });
}

</script>
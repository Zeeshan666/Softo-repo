<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card mt-5">
          <div class="card-body">
            <h1 class="card-title text-center">Login</h1>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="username" type="text" id="username" class="form-control" placeholder="Username"
                  required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" id="password" class="form-control" placeholder="Password"
                  required />
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')


    const login = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/people/auth/login`, {
          username: username.value,
          password: password.value,
        })
        const token = response.data?.accessToken
        if (token) {
          localStorage.setItem('token', token)
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Login error', error)
      }
    }

    return {
      username,
      password,
      login
    }
  }
})
</script>

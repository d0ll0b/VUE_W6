<template>
    <div class="d-flex row justify-content-center align-items-center">
        <h1 class="h3 mt-5 mb-3 font-weight-normal">
        後台登入
        </h1>
        <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
                placeholder="name@example.com" required autofocus v-model="user.username">
            <label for="username">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="password"
                placeholder="Password" required v-model="user.password">
            <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
            </button>
        </form>
        </div>
    </div>
</template>

<script>
const apiUrl = import.meta.env.VITE_APP_API_URL
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = `${apiUrl}/admin/signin`

      this.axios.post(api, this.user).then((res) => {
        const { token, expired } = res.data
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
        this.$router.push('/admin')
      }).catch((err) => {
        console.error(err.response.data.message)
      })
    }
  }
}
</script>

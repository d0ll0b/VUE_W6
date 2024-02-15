<template>
    <h1>後台導覽列</h1>
    <nav>
        <RouterLink to="/">返回前台</RouterLink> |
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/orders">訂單列表</RouterLink> |
        <a href="#" @click.prevent="signout">登出</a>
    </nav>
    <RouterView v-if="isLogin"/>
</template>

<script>
const apiUrl = import.meta.env.VITE_APP_API_URL
export default {
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    checkAdmin () {
      const api = `${apiUrl}/api/user/check`
      this.axios.post(api).then((res) => {
        this.isLogin = true
      }).catch((err) => {
        console.dir(err)
        this.$router.push('/login')
      })
    },
    signout () {
      document.cookie = 'hexToken=;expires='
      alert('已成功登出~~')
      this.$router.push('/login')
    }
  },
  mounted () {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = token

    this.checkAdmin()
  }
}
</script>

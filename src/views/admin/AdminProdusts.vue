<template>
    <h3>產品列表</h3>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="row py-3">
            <table class="table table-hover mt-4">
            <thead>
                <tr>
                    <th width="120">
                        分類
                    </th>
                    <th width="150">產品名稱</th>
                    <th width="120">
                        原價
                    </th>
                    <th width="120">
                        售價
                    </th>
                    <th width="150">
                        是否啟用
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                <td width="120">
                    {{ item.category }}
                </td>
                <td width="150"><span class="h5 font-weight-bold text-warning">{{ item.title }}</span></td>
                <td width="120">
                    {{ item.origin_price }}
                </td>
                <td width="120">
                    {{ item.price }}
                </td>
                <td width="150">
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span v-else>未啟用</span>
                </td>
                </tr>
            </tbody>
            </table>
            <p>目前有 <span>{{ products.length }}</span> 項產品</p>
        </div>

        <!-- Pagination -->
        <pagination-btn :pagination="pagination"></pagination-btn>
        <!-- Pagination -->
    </div>
</template>

<script>
import PaginationBtn from '@/components/PaginationBtn.vue'

const apiUrl = import.meta.env.VITE_APP_API_URL
const apiPath = import.meta.env.VITE_APP_API_NAME

export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    PaginationBtn
  },
  methods: {
    getData (page = 1) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`
      this.axios.get(api).then((res) => {
        const { products, pagination } = res.data
        this.products = products
        this.pagination = pagination
      }).catch((err) => {
        alert(err.response.data.message)
      }).finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted () {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common.Authorization = token

    this.getData()
  }
}
</script>

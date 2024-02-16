<template>
    <h3>產品列表</h3>
    <VueLoading :active="isLoading" />
    <div class="container">
        <div class="mt-4">
            <!-- 產品Modal -->
            <user-product-modal ref="userProductModal" :product="product" @add_cart="add_cart"></user-product-modal>
            <!-- 產品Modal -->

            <!-- 吐司訊息 -->
            <message-toast ref="messageToast"></message-toast>
            <!-- 吐司訊息 -->

            <table class="table align-middle">
                <thead>
                    <tr>
                    <th>圖片</th>
                    <th>商品名稱</th>
                    <th>價格</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                    <td style="width: 200px">
                        <img :src="item.imageUrl" style="height: 100px; background-size: cover; background-position: center"/>
                    </td>
                    <td>
                        {{ item.title }}
                    </td>
                    <td>
                        <div class="h5" v-if="item.origin_price === item.price">{{ item.price }} 元</div>
                        <div v-else>
                            <del class="h6">原價 {{ item.origin_price }} 元</del>
                            <div class="h5">現在只要 {{ item.price }} 元</div>
                        </div>
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm">
                        <!-- <button type="button" class="btn btn-outline-secondary"> -->
                            <RouterLink  class="btn btn-outline-secondary" :to="`/product/${item.id}`">
                                <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                                查看更多
                            </RouterLink>
                        <!-- </button> -->
                        <button type="button" class="btn btn-outline-danger" @click="add_cart(item.id,1,'new')">
                            <i class="fas fa-spinner fa-pulse" v-if="isLoading"></i>
                            加到購物車
                        </button>
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <pagination-btn :pagination="pagination"></pagination-btn>
            <!-- Pagination -->
        </div>
    </div>
</template>

<script>
import userProductModal from '@/components/userProductModal.vue'
import MessageToast from '@/components/MessageToast.vue'
import PaginationBtn from '@/components/PaginationBtn.vue'

const apiUrl = import.meta.env.VITE_APP_API_URL
const apiPath = import.meta.env.VITE_APP_API_NAME

export default {
  data () {
    return {
      products: [],
      product: {},
      pagination: {},
      isLoading: false
    }
  },
  components: {
    userProductModal,
    MessageToast,
    PaginationBtn
  },
  methods: {
    // 取得所有商品
    get_products (page = 1) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/products?page=${page}`
      this.axios.get(api).then((res) => {
        const { products, pagination } = res.data
        this.products = products
        this.pagination = pagination
      }).catch((err) => {
        alert(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
    // 取得單一商品
    get_product (id) {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/product/${id}`
      this.axios.get(api).then((res) => {
        const { product } = res.data
        this.product = product
        this.$refs.userProductModal.show_Model()
      }).catch((err) => {
        alert(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
    add_cart (id, qty = 1, flg) {
      let api = ''
      let http = ''
      const message = `加入購物車成功，新增${qty}筆商品~~`
      this.isLoading = true

      if (flg === 'new') {
        api = `${apiUrl}/api/${apiPath}/cart`
        http = 'post'
      } else {
        api = `${apiUrl}/api/${apiPath}/cart/${flg}`
        http = 'put'
      }

      const cart = {
        product_id: id,
        qty
      }

      this.axios[http](api, { data: cart }).then((res) => {
        this.toastMsg(message)
      }).catch((err) => {
        alert(err)
      }).finally(() => {
        this.isLoading = false
        this.$refs.userProductModal.hide_Model()
      })
    },
    toastMsg (message) {
      this.$refs.messageToast.show_toast(message)
    }
  },
  mounted () {
    this.get_products()
  }
}
</script>

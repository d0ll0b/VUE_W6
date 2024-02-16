<template>
    <h3>產品列表</h3>
    <VueLoading :active="isLoading" />
    <div class="container">
      <!-- 吐司訊息 -->
      <message-toast ref="messageToast"></message-toast>
      <!-- 吐司訊息 -->

      <div class="bg-primary text-white rounded-pill py-1 mb-1">
          <div class="h5 mb-0">
              <span>{{ product.title }}</span>
          </div>
      </div>
      <div>
          <div class="row">
              <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="">
          </div>
          <div class="col-sm-6 text-start">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
                  <div>
                      <div class="input-group">
                      <input type="number" class="form-control"
                              min="1" v-model.number="qty">
                      <button type="button" class="btn btn-primary" @click="add_cart(product.id, qty, 'new')">加入購物車</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import MessageToast from '@/components/MessageToast.vue'

let id = ''

const apiUrl = import.meta.env.VITE_APP_API_URL
const apiPath = import.meta.env.VITE_APP_API_NAME

export default {
  data () {
    return {
      product: {},
      qty: 1,
      isLoading: false
    }
  },
  methods: {
    // 取得單一商品
    get_product () {
      this.isLoading = true
      const api = `${apiUrl}/api/${apiPath}/product/${id}`
      this.axios.get(api).then((res) => {
        const { product } = res.data
        this.product = product
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
      })
    },
    toastMsg (message) {
      this.$refs.messageToast.show_toast(message)
    }
  },
  mounted () {
    id = this.$route.params.id

    this.get_product()
  },
  components: {
    MessageToast
  }
}
</script>

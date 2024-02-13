<template>
    <h1>產品列表</h1>
    <div class="mt-4">
        <!-- 產品Modal -->
        <!-- <user-product-modal ref="userProductModal" :product="product" @add_cart="add_cart"></user-product-modal> -->
        <!-- 產品Modal -->

        <!-- <div ref="toast" class="toast ms-auto fixed-top bg-primary text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">message</strong>
                <small class="text-muted">11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Message
            </div>
        </div> -->
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
                    <!-- <div class="h5">{{  }} 元</div> -->
                    <del class="h6">原價 {{ item.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ item.price }} 元</div>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-secondary" @click="get_product(item.id)">
                        <i class="fas fa-spinner fa-pulse" v-if="isloading"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger" @click="add_cart(item.id,1,'new')">
                        <i class="fas fa-spinner fa-pulse" v-if="isloading"></i>
                        加到購物車
                    </button>
                    </div>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const apiUrl = import.meta.env.VITE_API
const apiPath = import.meta.env.VITE_PATH

export default {
  data () {
    return {
      products: [],
      product: {},
      carts: {},
      total: '',
      finalTotal: '',
      isloading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
  // 取得所有商品
    get_products () {
      const api = `${apiUrl}/api/${apiPath}/products`
      this.axios.get(api).then((res) => {
        const { products } = res.data
        this.products = products
      }).catch((err) => {
        alert(err.data.message)
      })
    },
    // 取得單一商品
    get_product (id) {
      this.islaoding = true
      const api = `${apiUrl}/api/${apiPath}/product/${id}`
      this.axios.get(api).then((res) => {
        const { product } = res.data
        this.product = product
        this.$refs.userProductModal.show_Model()
      }).catch((err) => {
        alert(err.data.message)
      }).finally(() => {
        this.isloading = false
      })
    },
    add_cart (id, qty = 1, flg) {
      let api = ''
      let http = ''
      const message = `加入購物車成功，新增${qty}筆商品~~`
      this.islaoding = true

      if (flg === 'new') {
        api = `${apiUrl}/api/${apiPath}/cart`
        http = 'post'
      } else if (flg === 'update') {
        api = `${apiUrl}/api/${apiPath}/cart/${id}`
        http = 'put'
      }

      const cart = {
        product_id: id,
        qty
      }

      this.axios[http](api, { data: cart }).then((res) => {
        this.get_cart()
        alert(message)
      }).catch((err) => {
        alert(err.data.message)
      }).finally(() => {
        this.isloading = false
        this.$refs.userProductModal.hide_Model()
      })
    },
    get_cart () {
      this.islaoding = true
      const api = `${apiUrl}/api/${apiPath}/cart`

      this.axios.get(api).then((res) => {
        console.dir(res)
        // const { carts, total } = res.data.data
        // this.carts = carts
        // this.total = total
        // this.finalTotal = finalTotal
      }).catch((err) => {
        alert(err)
      }).finally(() => {
        this.isloading = false
      })
    },
    delete_cart (id = null) {
      let api = ''
      let message = ''
      let result = ''
      this.islaoding = true

      if (id === null) {
        result = confirm('是否清空購物車？')
        api = `${apiUrl}/api/${apiPath}/carts`
        message = '購物車已清空 ಥ_ಥ'
      } else {
        result = confirm('是否刪除品項？')
        api = `${apiUrl}/api/${apiPath}/cart/${id}`
        message = '已從購物車刪除 ಥ_ಥ'
      }
      if (result) {
        this.axios.delete(api).then((res) => {
          this.get_cart()
          alert(message)
        }).catch((err) => {
          alert(err.data.message)
        }).finally(() => {
          this.isloading = false
        })
      }
    },
    onSubmit () {
      const api = `${apiUrl}/api/${apiPath}/order`
      this.isloading = true

      this.axios.post(api, { data: this.form }).then((res) => {
        this.get_cart()
        this.$refs.form.resetForm()
        this.form.message = ''
        alert('訂單已成交，謝謝~~')
      }).catch((err) => {
        alert(err.data.message)
      }).finally(() => {
        this.isloading = false
      })
    }
  },
  mounted () {
    this.get_products()
    this.get_cart()

    // var toast = new bootstrap.Toast(this.$refs.toast)
    // toast.show()
  }
}
</script>

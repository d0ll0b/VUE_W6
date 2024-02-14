<template>
    <h1>購物車</h1>
    <div class="mt-4">
        <div ref="toast" class="toast ms-auto fixed-top bg-info text-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">購物車通知</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-weight-blod">
            <h5>{{ toast_message }}</h5>
        </div>
        </div>
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
        <!-- 購物車列表 -->
        <div class="text-end">
        <button class="btn btn-outline-danger" type="button" v-if="carts.length" @click="delete_cart()">清空購物車</button>
        </div>
        <table class="table align-middle">
        <thead>
            <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="carts">
            <tr v-for="item in carts" :key="item.id">
                <td>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="delete_cart(item.id)">
                    <i class="fas fa-spinner fa-pulse" v-if="isloading"></i>
                    x
                </button>
                </td>
                <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                </div>
                </td>
                <td>
                <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                    <input min="1" type="number" class="form-control" v-model.number="item.qty" :disabled="isloading" @blur="add_cart(item.id,item.qty,'update')">
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                </div>
                </td>
                <td class="text-end">
                <small class="text-success" v-if="item.coupon">折扣價：</small>
                {{ item.product.price }}
                </td>
            </tr>
            </template>
        </tbody>
        <tfoot>
            <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ total }}</td>
            </tr>
            <tr v-if="carts.total !== carts.finalTotal">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ finalTotal }}</td>
            </tr>
        </tfoot>
        </table>
    </div>
    <div class="my-5 row justify-content-center">
        <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit" >
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required"
            v-model="form.user.email"
            ></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field
            id="name"
            name="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['name'] }"
            placeholder="請輸入姓名" rules="required"
            v-model="form.user.name"
            ></v-field>
            <error-message name="name" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field
            id="tel"
            name="tel"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['tel'] }"
            placeholder="請輸入電話" rules="required|minMaxLength:8,10"
            v-model="form.user.tel"
            ></v-field>
            <error-message name="tel" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field
            id="address"
            name="address"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['address'] }"
            placeholder="請輸入地址" rules="required"
            v-model="form.user.address"
            ></v-field>
            <error-message name="address" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
            <button type="submit" class="btn btn-danger"
                    >送出訂單</button>
        </div>
        </v-form>
    </div>
</template>

<script>
const apiUrl = import.meta.env.VITE_APP_API_URL
const apiPath = import.meta.env.VITE_APP_API_NAME

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
      },
      toast: '',
      toast_message: ''
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
        alert(err)
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
        this.toastMsg(message)
      }).catch((err) => {
        alert(err)
      }).finally(() => {
        this.isloading = false
        this.$refs.userProductModal.hide_Model()
      })
    },
    get_cart () {
      this.islaoding = true
      const api = `${apiUrl}/api/${apiPath}/cart`

      this.axios.get(api).then((res) => {
        const { carts, total, finalTotal } = res.data.data
        this.carts = carts
        this.total = total
        this.finalTotal = finalTotal
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
          this.toastMsg(message)
        }).catch((err) => {
          alert(err)
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
        this.toastMsg('訂單已成交，謝謝~~')
      }).catch((err) => {
        alert(err)
      }).finally(() => {
        this.isloading = false
      })
    },
    toastMsg (message) {
      this.toast_message = message
      this.toast.show()
    }
  },
  mounted () {
    this.get_products()
    this.get_cart()

    // this.toast = new bootstrap.Toast(this.$refs.toast)
  }
}
</script>

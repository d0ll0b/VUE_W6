import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 定義 VeeValidate規則(全部載入)
Object.keys(AllRules).forEach(rule => {
  if (rule !== 'default') {
    defineRule(rule, AllRules[rule])
  }
})

defineRule('minMaxLength', (value, [min, max]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true
  }
  const length = value.length
  if (length < min) {
    return `This field must be at least ${min} characters`
  }
  if (length > max) {
    return `This field must be less than ${max} characters`
  }
  return true
})

// Activate the locale
configure({
  generateMessage: localize(zhTW),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})

// 讀取外部的資源
setLocale('zhTW')

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('VueLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

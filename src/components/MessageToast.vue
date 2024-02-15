<template>
    <div ref="toast" class="toast ms-auto fixed-top bg-info text-white" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">提示訊息</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body text-weight-blod">
        <h5>{{ toast_message }}</h5>
      </div>
    </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast'
export default {
  data () {
    return {
      toast: '',
      toast_message: ''
    }
  },
  methods: {
    show_toast (Msg) {
      this.toast_message = Msg
      this.toast.show()
    }
  },
  mounted () {
    this.toast = new Toast(this.$refs.toast)
  }
}
</script>

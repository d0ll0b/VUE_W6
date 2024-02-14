<template>
  <div class="home">
    <UserNavbar />
    <!-- <AdminDashboard /> -->
  </div>
</template>

<script>
import UserNavbar from '@/components/UserNavbar.vue'
// import AdminDashboard from '@/views/admin/AdminDashboard.vue'

export default {
  components: {
    UserNavbar
    // AdminDashboard
  }
}
</script>

<style scoped>
</style>

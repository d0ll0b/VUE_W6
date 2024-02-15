<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" :class="{ 'disabled' : pagination.current_page === 1 }">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="(item, key) in pagination.total_pages" :key="key" :class="{ 'active' : pagination.current_page === item }">
                <a class="page-link" href="#" @click.prevent="changePage(item)">{{ item }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled' : pagination.total_pages === pagination.current_page }">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: ['pagination']
}
</script>

<template>
    <h1>前台導覽列</h1>
    <nav>
        <RouterLink to="/">首頁</RouterLink> |
        <RouterLink to="/products">產品列表</RouterLink> |
        <RouterLink to="/cart">購物車</RouterLink>
    </nav>
    <RouterView />
</template>

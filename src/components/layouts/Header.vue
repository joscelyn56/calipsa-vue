<template>
  <header>
    <div class="logo">
      <router-link to="/">Calipsa</router-link>
    </div>
    <div class="links">
      <p class="profile">Welcome, {{ name | capitalizeAll }}</p>
      <p
        @click="logout"
        class="logout">Log Out</p>
    </div>
  </header>
</template>
<script>
export default {
  computed: {
    name() {
        return this.$store.getters['auth/name']
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>
<style>
header {
  display: flex;
  padding: 30px 100px;
  background: #e8f1f9;
  justify-content: space-between;
}

.logo {
  text-transform: uppercase;
  font-weight: 700;
}

.logo > a {
  text-decoration: none;
  color: #000;
}

.logo > a:hover {
  text-decoration: underline;
}

.profile {
  font-weight: 600;
}

.logout {
  margin-left: 30px;
  cursor: pointer;
}

.logout:hover {
  text-decoration: underline;
}
</style>

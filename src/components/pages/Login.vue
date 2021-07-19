<template>
  <div class="authentication">
    <div class="auth">
      <div class="form">
        <p>Sign in with credentials</p>
        <div class="fields">
          <input
            v-model="email"
            type="text"
            placeholder="Email">
        </div>
        <div class="fields">
          <input
            v-model="password"
            type="password"
            placeholder="Password">
        </div>
        <div
          class="submit-form">
          <button @click="login">Sign In</button>
        </div>
      </div>
    </div>
    <div class="auth-links">
      <p>
        <router-link to="/register">
          Create new account
        </router-link>
      </p>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    login() {
      if (this.email === '' || this.password === '') {
        this.$toastr.e("Error", 'Please fill in complete login details')
        return false
      }
      let user = {
        email: this.email,
        password: this.password
      }
      this.$http.post(this.$BASE_URL + 'auth/signin', user)
          .then(response => {
                if (response.data.error) {
                  this.$toastr.e("Error", response.data.message)
                } else {
                  this.email = ''
                  this.password = ''

                  this.$store.dispatch('auth/login', response.data).then(() => {
                    this.$http.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
                    this.$toastr.s("Success", response.data.message)
                    this.$router.push({path: '/'})
                  })
                }
              }
          )
          .catch(err => {
            console.error(err)
          })
    }
  }
}
</script>

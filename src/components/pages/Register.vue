<template>
  <div class="authentication">
    <div class="auth">
      <div class="form">
        <p class="title">Sign up with credentials</p>
        <div class="fields">
          <input
            v-model="name"
            type="text"
            placeholder="Name">
        </div>
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
        <div class="submit-form">
          <button @click="register">Sign Up</button>
        </div>
      </div>
    </div>
    <div class="auth-links">
      <p>
        <router-link to="/login">
          I have an account
        </router-link>
      </p>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    register() {
      if (this.name === '' || this.email === '' || this.password === '') {
        this.$toastr.e("Error", 'Please fill in complete login details')
        return false
      }
      let user = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$http.post(this.$BASE_URL + 'auth/signup', user)
          .then(response => {
                if (response.data.error) {
                  this.$toastr.e("Error", response.data.message)
                } else {
                  this.name = ''
                  this.email = ''
                  this.password = ''

                  this.$toastr.s("Success", response.data.message)
                  this.$router.push({path: '/login'})
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

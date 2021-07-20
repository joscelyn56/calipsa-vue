<template>
  <div class="welcome">
    <router-view/>
  </div>
</template>
<script>
export default {}
</script>
<style>
.welcome {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #eee;
}

.authentication {
  background-color: white;
  padding: 35px;
  position: sticky;
  margin: auto;
  left: 0;
  right: 0;
  box-shadow: 0px 1px 12px 1px #f0f0f0;
  border-radius: 5px;
}

.auth {
  width: 275px;
}

.auth .title {
  margin-bottom: 20px;
}

.fields {
  display: flex;
}

.fields > input {
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.submit-form > button {
  padding: 10px;
  text-transform: uppercase;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
}

.auth-links {
  text-align: center;
  margin-top: 20px;
}

.auth-links a {
  text-decoration: none;
  color: #000;
}

.auth-links a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="links">
    <router-link to="/events">
      <p>
        Events
      </p>
    </router-link>
    <router-link to="/locations">
      <p>
        Locations
      </p>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style>
.links {
  display: flex;
  justify-content: center;
  align-content: center;
}

.links > a {
  display: flex;
  padding: 50px;
  width: 200px;
  height: 200px;
  background: #ececec;
  text-decoration: none;
  color: #000;
  margin: 20px;
  justify-content: center;
  align-content: center;
  text-transform: uppercase;
  font-size: 30px;
}

.links > a:hover {
  background: #dfdfdf;
}

.links > a > p {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>

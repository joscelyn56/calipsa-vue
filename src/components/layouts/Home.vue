<template>
  <div class="home">
    <site-header/>
    <router-view/>
    <site-footer/>
  </div>
</template>
<script>
import SiteHeader from './Header.vue'
import SiteFooter from './Footer.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>
<style>
.home {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.table {
  padding: 50px 100px;
  overflow-y: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.search {
  width: 70%;
  margin-bottom: 20px;
  display: flex;
}

.search input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid;
}

.search-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.date-range {
  display: flex;
  margin-left: 20px;
}

.date-range > div {
  display: flex;
  flex-direction: column;
}

.date-range > div:first-child {
  margin-right: 10px;
}

.date-range > div:last-child {
  margin-left: 10px;
}

.date-range > div > input {
  width: 135px;
}

.outcome {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.outcome > select {
  padding: 9px 3px;
  font-size: 12px;
}

.submit-search {
  display: flex;
  align-items: center;
  padding: 20px;
}

.submit-search button {
  padding: 10px 18px;
  background: #000;
  border: none;
  color: #fff;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.data-table {
  width: 70%;
  text-align: center;
}

.data-table thead {
  background: #b0b0b0;
}

.data-table thead > th,
.data-table tbody > tr > td {
  padding: 10px;
}

.data-table tbody > tr:nth-child(odd) {
  background-color: #f0f0f0;
}

.more-data {
  display: flex;
  width: 70%;
  padding: 20px;
  margin-top: 25px;
  align-items: center;
}

.more-data p {
  margin: 0 20px;
}

.more-data button {
  padding: 10px 20px;
  background: black;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
}

.more-data button:disabled {
  background: #bfbfbf;
}
</style>

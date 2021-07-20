<template>
  <div class="table">
    <div class="search">
      <div class="search-text">
        <label>Search Events</label>
        <input
          v-model="search"
          type="text">
      </div>
      <div class="submit-search">
        <button @click="searchEvents">Search</button>
      </div>
    </div>
    <table class="data-table">
      <thead>
        <th>Id</th>
        <th>Name</th>
      </thead>
      <tbody>
        <template v-if="locationData.length > 0">
          <tr
            v-for="(data, index) in locationData"
            :key="index">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              colspan="2"
              style="text-align: center">No data available
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="more-data">
      <button
        :disabled="pagination.prev_page >= pagination.current_page"
        @click="prev_page">Prev
      </button>
      <p>{{ pagination.current_page }} of {{ pagination.total_pages }}</p>
      <button
        :disabled="pagination.next_page <= pagination.current_page"
        @click="next_page">Next
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: "",
    locationData: [],
    pagination: {}
  }),
  watch: {
    $route: "fetchLocation",
  },
  created() {
    this.fetchLocation();
  },
  methods: {
    searchEvents() {
      let query = {
        search: undefined
      }

      let update = false;

      if (this.search !== "") {
        query.search = this.search
        update = true
      }

      if (update > 0) {
        this.$router.push({
          path: this.$router.currentRoute.path, query: query
        })
      }
    },
    prev_page() {
      this.$router.push({
        path: this.$router.currentRoute.fullPath, query: {
          page: this.pagination.prev_page
        }
      })
    },
    next_page() {
      this.$router.push({
        path: this.$router.currentRoute.fullPath, query: {
          page: this.pagination.next_page
        }
      })
    },
    fetchLocation() {
      let url = this.$BASE_URL + "locations";
      let page = this.$route.query.page;
      if (page) url = url + "?page=" + page;

      let search = this.$route.query.search
      if (search) url = url + "?search=" + search

      this.$http
          .get(url)
          .then(response => {
            if (Object.keys(response.data).length >= 0) {
              this.locationData = response.data.payload
              this.pagination = response.data.pagination
            } else this.events = [];
          })
          .catch(err => {
            console.error(err);
          });
    },
  }
};
</script>

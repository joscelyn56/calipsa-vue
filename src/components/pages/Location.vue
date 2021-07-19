<template>
  <div class="table">
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
    prev_page() {
      this.$router.push({path: '/locations?page=' + this.pagination.prev_page})
    },
    next_page() {
      this.$router.push({path: '/locations?page=' + this.pagination.next_page})
    },
    fetchLocation() {
      let url = this.$BASE_URL + "locations";
      let page = this.$route.query.page;
      if (page) url = url + "?page=" + page;

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

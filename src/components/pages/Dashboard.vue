<template>
  <div class="table">
    <table class="data-table">
      <thead>
        <th>Location</th>
        <th>Date</th>
        <th>Outcome</th>
      </thead>
      <tbody>
        <template v-if="eventsData.length > 0">
          <tr
            v-for="(data, index) in eventsData"
            :key="index">
            <td>{{ data.location }}</td>
            <td>{{ new Date(data.timestamp).toLocaleString("en-US", {timeZone: "GMT"}) }}</td>
            <td>{{ data.outcome }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              colspan="3"
              style="text-align: center">No data available
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div
      v-if="pagination.next_page > pagination.current_page"
      class="more-data">
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
    eventsData: [],
    pagination: {}
  }),
  watch: {
    $route: "fetchEvent",
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    prev_page() {
      this.$router.push({path: '/?page=' + this.pagination.prev_page})
    },
    next_page() {
      this.$router.push({path: '/?page=' + this.pagination.next_page})
    },
    fetchEvent() {
      let url = this.$BASE_URL + "events";
      let page = this.$route.query.page;
      if (page) url = url + "?page=" + page;
      
      this.$http
          .get(url)
          .then(response => {
            if (Object.keys(response.data).length >= 0) {
              this.eventsData = response.data.payload
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

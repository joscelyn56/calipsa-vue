<template>
  <div class="table">
    <div class="search">
      <div class="search-text">
        <label>Search Events</label>
        <input
          v-model="search"
          type="text">
      </div>
      <div class="date-range">
        <div>
          <label>Start Time</label>
          <input
            v-model="start_time"
            type="datetime-local">
        </div>
        <div>
          <label>End Time</label>
          <input
            v-model="end_time"
            type="datetime-local">
        </div>
      </div>
      <div class="outcome">
        <label>End Time</label>
        <select v-model="outcome">
          <option value="">Select Outcome</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div class="submit-search">
        <button @click="searchEvents">Search</button>
      </div>
    </div>
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
    start_time: "",
    end_time: "",
    outcome: "",
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
    searchEvents() {
      let query = {
        search: undefined,
        start_time: undefined,
        end_time: undefined,
        outcome: undefined,
      }

      let update = false;

      if (this.search !== "") {
        query.search = this.search
        update = true
      }
      if (this.start_time !== "") {
        query.start_time = this.start_time
        update = true
      }
      if (this.end_time !== "") {
        query.end_time = this.end_time
        update = true
      }
      if (this.outcome !== "") {
        query.outcome = this.outcome
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
    fetchEvent() {
      let url = this.$BASE_URL + "events"
      let page = this.$route.query.page
      if (page) url = url + "?page=" + page

      let search = this.$route.query.search
      if (search) url = url + "?location=" + search

      let start_time = this.$route.query.start_time
      if (start_time) url = url + "?start_time=" + start_time

      let end_time = this.$route.query.end_time
      if (end_time) url = url + "?end_time=" + end_time

      let outcome = this.$route.query.outcome
      if (outcome) url = url + "?outcome=" + outcome

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

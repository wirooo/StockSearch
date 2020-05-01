<template>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Search for a Stock" v-model="symbol" />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="searchStock(symbol)">Search</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      symbol: ""
    };
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions(["searchStock"])
  }
};
</script>

<style>
</style>

<script>
import Vue from "vue";
import Vuex from "vuex";
import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { store } from "../store/store.js";
import { mapState } from "vuex";

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

export default {
  components: {},
  computed: {
    hasFocusStock: function() {
      if (this.focusStock === "") {
        return false;
      }
      return this.focusStock.length > 0;
    },
    ...mapState(["focusStock"])
  },
  data() {
    return {
      chartConfigs: {
        type: "line",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: `Stock Price of ${store.state.focusStock}`,
            xAxisName: "Date",
            yAxisName: "Price (USD)",
            theme: "fusion",
            showAlternateHGridColor: "1",
            drawAnchors: "0"
          },
          data: store.getters.getFocusStockHistory
        }
      }
    };
  },
  created() {},
  methods: {},
  watch: {
    focusStock(newValue, oldValue) {
      this.chartConfigs.dataSource.data = store.getters.getFocusStockHistory;
      this.chartConfigs.dataSource.chart.caption = `Stock Price of ${store.state.focusStock}`;
    }
  }
};
</script>

<style></style>

<template>
  <div id="summaryGraph" class="border border-secondary w-100" style="min-height: 50vh">
    <fusioncharts
      v-if="hasFocusStock"
      :type="chartConfigs.type"
      :width="chartConfigs.width"
      :height="chartConfigs.height"
      :dataformat="chartConfigs.dataFormat"
      :dataSource="chartConfigs.dataSource"
    ></fusioncharts>
    <div v-else>
      <p>Please Search for a Stock to Display Data</p>
    </div>
  </div>
</template>

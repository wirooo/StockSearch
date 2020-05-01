<script>
import summaryGraph from "./summaryGraph.vue";
import stockInfo from "./stockInfo.vue";
import tickerList from "./tickerList.vue";
import fullGraph from "./fullGraph.vue";
import historicalStockData from "./historicalStockData.vue";

export default {
  components: {
    summaryGraph,
    stockInfo,
    tickerList,
    fullGraph,
    historicalStockData
  },
  data() {
    return {
      currentTab: "summary"
    };
  }
};
</script>

<style scoped>
</style>

<template>
  <div id="focusConsole container-fluid">
    <!--Tab Navigator-->
    <div class="row mx-2 my-0">
      <ul class="nav nav-tabs w-100">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{active: currentTab === 'summary'}"
            @click="currentTab='summary'"
          >Summary</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{active: currentTab === 'graph'}"
            @click="currentTab='graph'"
          >Graph</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{active: currentTab === 'history'}"
            @click="currentTab='history'"
          >Historical Data</a>
        </li>
      </ul>
    </div>

    <div id="summaryTab" v-if="currentTab === 'summary'" class="row">
      <div class="col-9 my-2 ml-2 mr-0 pr-2">
        <summaryGraph></summaryGraph>
        <stockInfo></stockInfo>
      </div>
      <div class="col my-2 mr-2 ml-0 pl-2">
        <tickerList></tickerList>
      </div>
    </div>

    <div id="chartTab" v-if="currentTab === 'graph'">
      <div class="m-2">
        <fullGraph></fullGraph>
      </div>
    </div>

    <div id="historyTab" v-if="currentTab === 'history'">
      <div class="m-2">
        <historicalStockData></historicalStockData>
      </div>
    </div>
  </div>
</template>
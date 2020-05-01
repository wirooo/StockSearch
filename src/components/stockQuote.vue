<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getFocusStockQuote"])
  }
};
</script>
<template>
  <div class="row p-0 m-0 mb-3 align-items-end">
    <div class="col-auto">
      <h1
        class="m-0 p-0 display-4 font-weight-bold"
      >{{parseFloat(getFocusStockQuote.regularMarketPrice).toFixed(2)}}</h1>
    </div>
    <div class="col-auto m-0 p-0 pb-2 mr-2 d-flex align-items-end">
      <h4
        class="m-0 font-weight-bold"
        :style="{'color': (getFocusStockQuote.regularMarketChange > 0 ? '#7BCC70' : '#FF4040')}"
      >{{parseFloat(getFocusStockQuote.regularMarketChange).toFixed(2)}} ({{parseFloat(getFocusStockQuote.regularMarketChangePercent).toFixed(2)}})</h4>
    </div>
    <div class="col pb-1">
      <h4 class="m-0 p-0">{{getFocusStockQuote.longName}} ({{getFocusStockQuote.symbol}})</h4>
      <p
        class="m-0"
      >{{getFocusStockQuote.fullExchangeName}}, {{getFocusStockQuote.financialCurrency}}</p>
    </div>
  </div>
</template>
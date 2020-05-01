<template>
  <div id="tickerList">
    <h4>Recently Searched</h4>
    <div class="border-bottom border-secondary container-fluid pb-1">
      <div class="row">
        <div class="col pr-1 pl-0">
          <p style="font-size: 12px;" class="my-0">Symbol</p>
        </div>
        <div class="col text-right px-1">
          <p style="font-size: 12px;" class="my-0">Last Price</p>
        </div>
        <div class="col text-right px-1">
          <p style="font-size: 12px;" class="my-0">Change</p>
        </div>
        <div class="col text-right px-1">
          <p style="font-size: 12px;" class="my-0">% Change</p>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in focusQuotes" :key="index" class="border-bottom border-secondary">
      <singleTicker :data="item"></singleTicker>
    </div>
  </div>
</template>

<script>
import singleTicker from "./singleTicker.vue";
export default {
  components: { singleTicker: singleTicker },
  computed: {
    focusQuotes() {
      var retval = [];
      var c = 0;
      const { cachedStocks: stocks } = this.$store.state;
      for (var symbol in stocks) {
        if (c >= 4) {
          break;
        }
        const { quote_data: quote } = stocks[symbol];
        retval.push({
          symbol: symbol,
          price: quote.regularMarketPrice,
          change: quote.regularMarketChange,
          changePercent: quote.regularMarketChangePercent,
          name: quote.longName
        });
        c++;
      }
      return retval;
    }
  }
};
</script>

<style>
</style>

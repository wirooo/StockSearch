<script>
import { mapGetters } from "vuex";
import stockQuote from "./stockQuote.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    stockQuote
  },
  computed: {
    keyStats() {
      if (!this.$store.state.focusStock) {
        return {};
      }
      const { getFocusStockQuote: stock } = this;
      return {
        "Avg Daily Volume (3 month)": stock.averageDailyVolume3Month,
        "Earnings Date": stock.earningsTimestamp
          ? stock.earningsTimestamp.date.split(" ")[0]
          : "N/A",
        "EPS (Trailing 12 Months)": stock.epsTrailingTwelveMonths
          ? parseFloat(stock.epsTrailingTwelveMonths).toFixed(2)
          : "N/A",
        "52 Week Range":
          stock.fiftyTwoWeekLow && stock.fiftyTwoWeekHigh
            ? parseFloat(stock.fiftyTwoWeekLow).toFixed(2) +
              " - " +
              parseFloat(stock.fiftyTwoWeekHigh).toFixed(2)
            : "N/A",
        "Day Range":
          stock.regularMarketDayLow && stock.regularMarketDayHigh
            ? parseFloat(stock.regularMarketDayLow).toFixed(2) +
              " - " +
              parseFloat(stock.regularMarketDayHigh).toFixed(2)
            : "N/A",
        "PE Ratio": stock.trailingPE
          ? parseFloat(stock.trailingPE).toFixed(2)
          : "N/A",
        "Ex-Dividend Date": stock.dividendDate
          ? stock.dividendDate.date.split(" ")[0]
          : "N/A",
        "Market Cap": stock.marketCap ? stock.marketCap : "N/A"
      };
    },
    ...mapGetters(["getFocusStockQuote"])
  }
};
</script>

<template>
  <div id="stockInfo" class="container p-2" v-if="this.$store.state.focusStock">
    <stockQuote></stockQuote>
    <div class="row">
      <div class="col">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-4" v-for="(item, key, index) in keyStats" :key="index">
              <p class="border-bottom border-secondary pb-2 mb-2">
                {{key}}:
                <span class="font-weight-bold">{{item}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

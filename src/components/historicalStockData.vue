<script>
import stockQuote from "./stockQuote.vue";
export default {
  data() {
    return {};
  },
  components: {
    stockQuote
  },
  computed: {
    hist() {
      if (!this.$store.state.focusStock) {
        return {};
      }
      const { history } = this.$store.state.cachedStocks[
        this.$store.state.focusStock
      ];
      var retval = Object.keys(history).map(key => {
        return {
          Date: key,
          Open: history[key].open,
          High: history[key].high,
          Low: history[key].low,
          Close: history[key].close,
          "Adj Close": history[key].adjclose
        };
      });
      console.log(retval);
      retval.sort((a, b) => {
        var asplit = a.Date.toString().split("-");
        var bsplit = b.Date.toString().split("-");
        if (asplit[2] < bsplit[2]) {
          return 1;
        } else if (asplit[2] > bsplit[2]) {
          return -1;
        } else {
          if (asplit[1] < bsplit[1]) {
            return 1;
          } else if (asplit[1] > bsplit[1]) {
            return -1;
          } else {
            if (asplit[0] < bsplit[0]) {
              return 1;
            } else if (asplit[0] > bsplit[0]) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      });
      return retval;
    }
  }
};
</script>

<template>
  <div id="historicalStockData" class="container-fluid">
    <stockQuote></stockQuote>
    <div class="row" v-for="(entry, index) in hist" :key="index">
      <div class="col" v-for="(value, key, i) in entry" :key="i">
        <p v-if="index === 0">{{key}}</p>
        <p>{{(key === 'Date' ? value : parseFloat(value).toFixed(2))}}</p>
      </div>
    </div>
  </div>
</template>
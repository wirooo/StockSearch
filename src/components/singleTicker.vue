<template>
  <div class="singleTicker card border-white">
    <div class="card-body px-0 py-1">
      <div class="container-fluid">
        <div class="row">
          <div class="col pr-1 pl-0">
            <h5 class="card-title mb-0">{{data.symbol}}</h5>
          </div>
          <div class="col text-right px-1">
            <p class="card-text">{{parseFloat(data.price).toFixed(2)}}</p>
          </div>
          <div class="col text-right px-1">
            <p
              class="card-text"
              :style="{'color': (data.changePercent > 0 ? '#7BCC70' : '#FF4040')}"
            >{{data.change >=0 ? '+' : ''}}{{parseFloat(data.change).toFixed(2)}}</p>
          </div>
          <div class="col text-right pl-1 pr-0">
            <p
              class="card-text"
              :style="{'color': (data.changePercent > 0 ? '#7BCC70' : '#FF4040')}"
            >{{data.changePercent >= 0 ? '+' : '' }}{{parseFloat(data.changePercent).toFixed(2)}}%</p>
          </div>
        </div>
        <div class="row">
          <div class="col px-0">
            <p class="card-subtitle text-muted">{{data.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  components: {}
};
</script>

<style>
</style>

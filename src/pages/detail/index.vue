<template>
  <div>
    <div class="topBar">
      <h1 class="left">豆瓣</h1>
      <button type="primary" size="mini">打开豆瓣App</button>
    </div>
    <div class="head">
      {{detail.summary}}
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      detail:{}
    };
  },
  methods: {
    
  },
  onLoad (options) {
      request(`http://api.douban.com/v2/movie/subject/${options.id}`).then(res => {
        this.detail=res.data
      });
  }
};
</script>

<style lang="less">
.topBar {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 5px #efefef;
  .left {
    color: #1aad19;
    font-size: 22px;
    font-weight: bold;
  }
  button {
    margin: 0;
  }
}
.head{
  padding: 14px;
  height: 350px;
  // background-color: #49341b;
  // color: #fff;
}
</style>
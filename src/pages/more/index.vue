<template>
  <div>
    <div class="topBar">
      <h1 class="left">豆瓣</h1>
      <button type="primary" size="mini">打开豆瓣App</button>
    </div>
    <div class="hot">
      <div class="title">
        <span class="left">{{list.name}}</span>
      </div>
      <div class="scroll-view_H">
        <div class="scroll-view-item_H" v-for="item in list.list" :key="item.id" @click="toDetail(item.id)">
          <img :src="item.images.small" />
          <p class="bk_title">{{item.title}}</p>
          <div class="rating">
            <template v-if="item.rating.average>0">
              <img v-for="(p, o) in item.scoreNum" :key="o" src="../../../static/images/star.svg" />
              <img
                v-for="(p, o) in (5-item.scoreNum)"
                :key="o"
                src="../../../static/images/unstar.svg"
              />
            </template>
            <span>{{item.rating.average>0?item.rating.average:'暂无评分'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      categoryList: [
        {
          name: "影院热映",
          url:
            "https://api.douban.com/v2/movie/in_theaters",
          list: []
        },
        {
          name: "top250",
          url:
            "https://api.douban.com/v2/movie/top250",
          list: []
        }
      ],
      list:{}
    };
  },
  onLoad (options) {
    console.log(options)
    const arr=this.categoryList.filter(item=>{
      return item.name===options.type
    })
    this.getList(arr[0])
    //可能有问题
    this.title = options.type
    setTimeout(() => {
      this.list=arr[0]
    }, 0);
  },
  methods: {
    getList(category) {
      request(category.url).then(res => {
        category.list = res.data.subjects;
        category.list.forEach(v => {
          v.scoreNum = Math.ceil(v.rating.average / 2);
        });
      });
    },
    toDetail(id){
      wx.navigateTo({ url: '/pages/detail/main?id='+id });
    }
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
.hot {
  padding: 10px 18px;
  .title {
    line-height: 30px;
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
    float: left;
    .left {
      color: #111;
    }
  }
  .scroll-view_H {
    width: 100%;
    flex-wrap:wrap;
    display: flex;
    justify-content: flex-start;
    .scroll-view-item_H {
      display: inline-block;
      width: calc((100% - 30px) / 3);
    margin-right: 10px;
      image {
        width: 100%;
        height: 143px;
      }
      .bk_title {
        color: #333;
        font-size: 16px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .rating {
        display: flex;
        margin-top: 4rpx;
        align-items: center;
        justify-content: center;
        img {
          width: 20rpx;
          height: 20rpx;
        }
        span {
          color: #aaa;
          margin-left: 10rpx;
        }
      }
    }
  }
}
</style>
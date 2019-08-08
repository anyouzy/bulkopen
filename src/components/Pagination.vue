<template>
  <section class="pagination" v-if="allDomainList.length > 0">
    <a @click="currentPage-=1" href="javascript:void(0)" v-show="currentPage>1">上一页</a>
    <a href="javascript:void(0);" v-show="!showPages.includes(1)" @click="currentPage=1">首页</a>
    <a
      href="javascript:void(0);"
      :class="{'current-page':page===currentPage}"
      @click="currentPage=page"
      v-for="(page,index) in showPages"
      :key="index"
    >{{page}}</a>
    <a
      href="javascript:void(0);"
      v-show="!showPages.includes(totalPage)"
      @click="currentPage=totalPage"
    >尾页</a>
    <a @click="currentPage+=1" href="javascript:void(0)" v-show="currentPage < totalPage">下一页</a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 20, //默认情况下每页展示20条，可以自己修改
      minDisplayPages: 11
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.allDomainList.length / this.perPage);
    },
    showPages() {
      let tmpArr = [];
      let startPage = 1;

      if (this.totalPage <= this.minDisplayPages) {
        for (let i = startPage; i <= this.totalPage; i++) {
          tmpArr.push(i);
        }
        return tmpArr;
      }
      let eachSidePages = Math.floor(this.minDisplayPages / 2);
      if (this.currentPage >= this.minDisplayPages) {
        if (this.currentPage + eachSidePages >= this.totalPage) {
          startPage = this.totalPage - this.minDisplayPages + 1;
        } else {
          startPage = this.currentPage - eachSidePages;
        }
      }
      for (let i = 0; i < this.minDisplayPages; i++) {
        tmpArr.push(i + startPage);
      }
      return tmpArr;
    }
  }
};
</script>

<style lang="stylus" scoped>
.pagination {
  display: flex;
  justify-content: center;
}

.pagination > a {
  margin-right: 10px;
  padding: 4px 10px;
  text-decoration: none;
  background-color: #fff;
  color: #008cff;
}

.pagination > a.current-page {
  background-color: #008cff;
  color: #fff;
}
</style>


<!--
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-11 20:42:03
 * @Description: 
 -->
<template>
  <section
    class="pagination"
    v-if="allDomainList.length > 0"
    @click="changePage($event)"
  >
    <a :data-page="prevPage" href="javascript:void(0)" v-show="currentPage > 1"
      >上一页</a
    >
    <a href="javascript:void(0);" v-show="!showPages.includes(1)" data-page="1"
      >首页</a
    >
    <a
      href="javascript:void(0);"
      :class="{ 'current-page': page === currentPage }"
      v-for="page in showPages"
      :data-page="page"
      :key="page"
      >{{ page }}</a
    >
    <a
      href="javascript:void(0);"
      v-show="!showPages.includes(totalPage)"
      :data-page="totalPage"
      >尾页</a
    >
    <a
      :data-page="nextPage"
      href="javascript:void(0)"
      v-show="currentPage < totalPage"
      >下一页</a
    >
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 3, //默认情况下每页展示20条，可以自己修改
      minDisplayPages: 5
    };
  },

  methods: {
    updateNextPageFirstDomain() {
      this.$store.commit("updateNextPageFirstDomain", this.nextPageFirstDomain);
    },
    updateCurrentPageDomains() {
      let currentPageLeftSpaces =
        this.perPage - this.currentPageDomainList.length;
      this.$store.commit(
        "updateCurrentPageDomains",
        this.currentPageDomainList
      );
      this.$store.commit("updatecurrentPageLeftSpaces", currentPageLeftSpaces);
    },
    changePage(e) {
      if (e.target.tagName.toLowerCase() !== "a") return;
      this.currentPage = e.target.dataset.page * 1;
      this.updateCurrentPageDomains();
      this.updateNextPageFirstDomain();
      this.$store.commit("updateHasChangedPage", true);
    }
  },
  mounted() {
    this.updateCurrentPageDomains();
    this.updateNextPageFirstDomain();
  },
  beforeUpdate() {
    this.updateCurrentPageDomains();
    this.updateNextPageFirstDomain();
  },
  /*  watch: {
    currentPageDomainList(currentList) {
      if (currentList.length !== 0) return;
      this.currentPage = this.currentPage - 1;
      this.updateCurrentPageDomains();
      this.updateNextPageFirstDomain();
    }
  }, */
  computed: {
    ...mapState(["allDomainList", "currentPageDomainList"]),
    currentPageDomainList() {
      if (this.allDomainList.length === 0) return [];
      let startIndex = (this.currentPage - 1) * this.perPage;
      let tmpArr = [];

      if (this.currentPage !== 1 && this.currentPage === this.totalPage) {
        tmpArr = this.allDomainList.slice(startIndex);
      } else {
        tmpArr = this.allDomainList.slice(
          startIndex,
          this.currentPage * this.perPage
        );
      }
      return tmpArr;
    },
    nextPageFirstDomain() {
      return this.currentPage === this.totalPage
        ? ""
        : this.allDomainList[this.currentPage * this.perPage];
    },
    prevPage() {
      let prevPage = this.currentPage * 1 - 1;
      return prevPage === 0 ? this.totalPage : prevPage;
    },
    nextPage() {
      let nextPage = this.currentPage * 1 + 1;
      return nextPage === this.totalPage + 1 ? 1 : nextPage;
    },
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

<style scoped>
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

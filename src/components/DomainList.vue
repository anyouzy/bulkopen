<!--
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-08 22:58:30
 * @Description: 
 -->
<template>
  <section class="domain-list" v-if="currentPageDomainList.length > 0">
    <div class="select-control">
      <button class="btn btn-select">全选</button>
      <button class="btn btn-open">批量打开</button>
      <button class="btn btn-remove">全部删除</button>
    </div>
    <ul class="domain-list-ul">
      <li class="domain-list-li" v-for="(domain,index) in currentPageDomainList" :key="domain">
        <span class="flex-2">
          <input type="checkbox" v-model="opList[index]" />
          {{ domain }}
        </span>
        <input class="flex-3" type="text" v-model="opList[index]" />
        <a
          href="javascript:void(0)"
          class="flex-1 remove-domain"
          @click="removeDomain(domain)"
        >移除该域名</a>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    removeDomain(domain) {
      let confirmRemove = confirm(`确定删除${domain}吗?`);
      if (!confirmRemove) return;
    }
  },

  mounted() {},
  computed: {
    ...mapState(["currentPageDomainList"]),
    opList() {
      return this.currentPageDomainList.map(domain => `site:${domain}`);
    }
  }
};
</script>

<style scoped>
.domain-list {
  padding: 20px 0;
}

.btn-select {
  background-color: #fff;
  border: 1px solid #008cff;
  color: #008cff;
}

.btn-select:hover {
  background-color: #008cff;
  color: #fff;
}

.btn-open {
  background-color: #008cff;
  margin-left: 20px;
}

.btn-remove {
  background-color: #f44336;
  margin-left: 20px;
}

.domain-list-ul {
  padding-top: 20px;
}

.domain-list-li {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.remove-domain {
  text-align: right;
  color: #f44336;
}
</style>

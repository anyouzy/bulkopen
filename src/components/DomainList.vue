<!--
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-11 18:17:15
 * @Description: 
 -->
<template>
  <section class="domain-list" v-if="currentPageDomainList.length > 0">
    <div class="select-control">
      <button
        class="btn btn-select"
        @click="selectAll"
        :class="{ 'btn-disabled': hasSelectedAll }"
      >
        全选
      </button>
      <button class="btn btn-open" @click="bulkOpen">批量打开</button>
      <button class="btn btn-remove" @click="removeAll">全部删除</button>
    </div>
    <ul class="domain-list-ul">
      <li
        class="domain-list-li"
        v-for="(domain, index) in currentPageDomainList"
        :key="domain"
      >
        <span class="flex-2">
          <input
            type="checkbox"
            v-model="selectedStats[index]"
            @change="updateHasChangedPage"
          />
          {{ domain }}
        </span>
        <input class="flex-3" type="text" v-model="opList[index]" />
        <a
          href="javascript:void(0)"
          class="flex-1 remove-domain"
          @click="removeDomain(domain)"
          >移除该域名</a
        >
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedStats: [],
      isProcessingRemoveAll: false
    };
  },
  beforeUpdate() {
    if (this.hasChangedPage) {
      this.selectedStats = this.currentPageDomainList.map(() => true);
    }
  },
  methods: {
    removeDomain(domain) {
      let confirmRemove = confirm(`确定删除${domain}吗?`);
      if (!confirmRemove) return;
      let remainDomains = this.currentPageDomainList.filter(v => v !== domain);
      let tmpArr =
        this.nextPageFirstDomain === ""
          ? remainDomains
          : [...remainDomains, this.nextPageFirstDomain];
      this.$store.commit("removeDomain", domain);
      this.$store.commit("updateCurrentPageDomains", tmpArr);

      let index = this.allDomainList.indexOf(this.nextPageFirstDomain) + 1;
      let tmpStr =
        this.nextPageFirstDomain === "" ? "" : this.allDomainList[index];
      this.$store.commit("updateNextPageFirstDomain", tmpStr);

      this.$store.commit(
        "updatecurrentPageLeftSpaces",
        this.nextPageFirstDomain === "" ? this.currentPageLeftSpaces + 1 : 0
      );
    },
    updateHasChangedPage() {
      this.$store.commit("updateHasChangedPage", false);
    },
    selectAll() {
      if (this.hasSelectedAll) return;
      this.selectedStats = this.currentPageDomainList.map(() => true);
    },
    bulkOpen() {
      if (this.selectedStats.indexOf(true) === -1) return;

      let needOpenUrl = this.opList
        .filter((op, index) => this.selectedStats[index] !== false)
        .map(op => `https://www.google.com/search?q=${encodeURIComponent(op)}`);

      needOpenUrl.forEach(url => {
        window.open(url);
      });
    },
    removeAll() {
      if (this.isProcessingRemoveAll) return;
      this.isProcessingRemoveAll = true;
      let confirmRemoveAll = confirm(
        "此操作会删除所有域名记录，确定要全部删除吗？"
      );

      if (!confirmRemoveAll) {
        this.isProcessingRemoveAll = false;
        return;
      }

      this.$store.commit("removeAllDomain");

      this.isProcessingRemoveAll = false;
    }
  },

  computed: {
    ...mapState([
      "currentPageDomainList",
      "nextPageFirstDomain",
      "allDomainList",
      "currentPageLeftSpaces",
      "hasChangedPage"
    ]),
    opList() {
      return this.currentPageDomainList.map(domain => `site:${domain}`);
    },
    hasSelectedAll() {
      return this.selectedStats.indexOf(false) === -1;
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

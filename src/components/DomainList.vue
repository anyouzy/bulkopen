<template>
  <section class="domain-list" v-if="allDomainList.length > 0">
    <div class="select-control">
      <button
        class="btn btn-select"
        @click="selectAll"
        :class="{'btn-disabled':selectedIndexes.length === showDomainIndexes.length}"
      >全选</button>
      <button @click="bulkOpen" class="btn btn-open">批量打开</button>
      <button @click="removeAll" class="btn btn-remove">全部删除</button>
    </div>
    <ul class="domain-list-ul">
      <li class="domain-list-li" v-for="domainIndex in showDomainIndexes" :key="domainIndex">
        <span class="flex-2">
          <input type="checkbox" v-model="selectedIndexes" :value="domainIndex" />
          {{ allDomainList[domainIndex] }}
        </span>
        <input
          class="flex-3"
          type="text"
          v-model="opList[domainIndex]"
          :value="opList[domainIndex]"
        />
        <a
          href="javascript:void(0)"
          @click="removeDomain(domainIndex)"
          class="flex-1 remove-domain"
        >移除该域名</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
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

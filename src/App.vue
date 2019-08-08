<template>
  <div id="app">
    <h1>批量打开Google 高级搜索指令页面</h1>
    <AddDomain />
    <DomainList />
    <Pagination allDomainList="allDomainList" />
  </div>
</template>

<script>
import AddDomain from "./components/AddDomain.vue";
import DomainList from "./components/DomainList.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "app",
  components: {
    AddDomain,
    DomainList,
    Pagination
  },
  data() {
    return {
      allDomainList: []
    };
  }
};
</script>
<style lang="stylus">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul, li {
  list-style-type: none;
}

body {
  font-family: 'Microsoft Yahei', sans-serif;
  font-size: 14px;
  background-color: #f2f2f5;
}

input[type=text] {
  outline: none;
}

input[type=checkbox] {
  transform: translateY(2px);
}

.btn, textarea {
  outline: none;
}

.flex-1 {
  flex: 1;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.btn-disabled {
  opacity: 0.3;
}

#app {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
}

h1 {
  color: #008cff;
  font-size: 20px;
  padding-bottom: 20px;
  font-weight: 600;
  text-align: center;
}
</style>


<!--
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-08 21:07:19
 * @Description: 
 -->
<template>
  <div id="app">
    <h1>批量打开Google 高级搜索指令页面</h1>
    <AddDomain />
    <DomainList />
    <Pagination />
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
  }
};
</script>
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style-type: none;
}

body {
  font-family: "Microsoft Yahei", sans-serif;
  font-size: 14px;
  background-color: #f2f2f5;
}

input[type="text"] {
  outline: none;
}

input[type="checkbox"] {
  transform: translateY(2px);
}

.btn,
textarea {
  outline: none;
}

.btn {
  cursor: pointer;
  border: none;
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  padding: 6px 16px;
  text-align: center;
  margin-right: 10px;
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

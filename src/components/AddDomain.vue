<!--
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-11 18:10:47
 * @Description: 
 -->
<template>
  <section class="add-domain-box">
    <textarea
      v-model="inputDomain"
      cols="60"
      rows="6"
      @focusout="changeTextAreaStyle"
      :class="{
        'inactive-textarea-border': !shouldActiveBorder,
        'active-textarea-border': shouldActiveBorder
      }"
      @focus="
        shouldBtnDisabled = false;
        shouldActiveBorder = true;
      "
    ></textarea>
    <div class="input-hint-box">
      <span>请输入要新增的域名，一行一个，输入完成后点击添加按钮</span>
      <button
        @click="addDomain"
        class="btn btn-add-domain"
        :class="{ 'btn-disabled': shouldBtnDisabled }"
      >添加</button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      shouldBtnDisabled: true,
      shouldActiveBorder: false,
      inputDomain: "",
      isAdding: false,
      addDomainList: [],
      fillDomains: []
    };
  },
  computed: {
    ...mapState([
      "allDomainList",
      "currentPageDomainList",
      "currentPageLeftSpaces",
      "nextPageFirstDomain"
    ])
  },
  methods: {
    changeTextAreaStyle() {
      if (this.inputDomain.trim() === "") {
        this.shouldActiveBorder = false;
        this.shouldBtnDisabled = true;
        return;
      }
      this.shouldActiveBorder = true;
      this.shouldBtnDisabled = false;
    },
    updateNextPageFirstDomain() {
      if ("" !== this.nextPageFirstDomain) return;
      if (this.addDomainList.length <= this.currentPageLeftSpaces) return;

      let nextPageFirstDomain = this.currentPageLeftSpaces
        ? this.addDomainList[this.fillDomains.length]
        : this.addDomainList[0];
      this.$store.commit("updateNextPageFirstDomain", nextPageFirstDomain);
    },
    updateLeftSpaces() {
      if (0 === this.currentPageLeftSpaces) return;
      let leftSpaces = this.currentPageLeftSpaces - this.fillDomains.length;
      this.$store.commit("updatecurrentPageLeftSpaces", leftSpaces);
    },
    fillCurrentPageDomainList() {
      if (!this.currentPageLeftSpaces) return;
      this.fillDomains =
        this.addDomainList.length > this.currentPageLeftSpaces
          ? this.addDomainList.slice(0, this.currentPageLeftSpaces)
          : this.addDomainList;

      this.$store.commit("updateCurrentPageDomains", [
        ...this.currentPageDomainList,
        ...this.fillDomains
      ]);
    },
    addDomain() {
      if (this.isAdding) return;
      let tmpInput = this.inputDomain.trim().toLowerCase();
      if (!tmpInput) return;
      this.isAdding = true;
      let inputDomainList = tmpInput.split(/[(?:\r\n)\r\n]+/);
      let domainReg = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gi;
      let validateResult = inputDomainList.find(
        inputDomain => inputDomain.match(domainReg) === null
      );
      if (validateResult !== undefined) {
        alert(validateResult + "不是合法的域名，请检查核对后重新添加");
        this.isAdding = false;
        return;
      }
      this.addDomainList = inputDomainList.filter(
        domain => !this.allDomainList.includes(domain)
      );
      this.$store.commit("addDomain", this.addDomainList);
      this.fillCurrentPageDomainList();
      this.updateNextPageFirstDomain();
      this.updateLeftSpaces();
      this.isAdding = false;
    }
  }
};
</script>

<style scoped>
.input-hint-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;
  color: #4fa8f7;
}

textarea {
  width: 100%;
  padding: 10px;
  outline: none;
  resize: none;
  border-radius: 2px;
  color: #000;
  font-size: 16px;
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
}

.inactive-textarea-border {
  border: 1px solid #ccc;
}

.active-textarea-border {
  border: 1px solid #008cff;
}

.btn-add-domain {
  background-color: #008cff;
  margin-right: 0;
}

.btn-add-domain:hover {
  background-color: #027de2;
}
</style>

<template>
  <section class="add-domain-box">
    <textarea
      v-model="inputDomain"
      cols="60"
      rows="6"
      @focusout="changeTextAreaStyle"
      :class="{'inactive-textarea-border':!shouldActiveBorder,'active-textarea-border':shouldActiveBorder}"
      @focus="shouldBtnDisabled=false; shouldActiveBorder=true;"
    ></textarea>
    <div class="input-hint-box">
      <span>请输入要新增的域名，一行一个，输入完成后点击添加按钮</span>
      <button
        @click="addDomain"
        class="btn btn-add-domain"
        :class="{'btn-disabled':shouldBtnDisabled}"
      >添加</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      shouldBtnDisabled: true,
      shouldActiveBorder: false,
      inputDomain: "",
      isAdding: false
    };
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
      let addDomainList = inputDomainList.filter(
        domain => !this.allDomainList.includes(domain)
      );
      this.allDomainList = [...this.allDomainList, ...addDomainList];
      localStorage.setItem("domainList", JSON.stringify(this.allDomainList));
      this.isAdding = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
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

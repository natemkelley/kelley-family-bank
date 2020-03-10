<template>
  <div class="detail-comp">
    <h1>What would you like this account to be named?</h1>
    <div class="input-cont">
      <input
        type="text"
        v-model="data"
        placeholder="Summer Camp"
        @keyup="inputChanged"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["activePlan"],
  mounted() {
    this.data = this.activePlan.accountName;
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    inputChanged() {
      let setting = "accountName";
      let data = this.data;
      let template = {
        setting,
        data
      };
      this.$emit("incomingData", template);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-comp {
  h1 {
    margin-top: 3px;
    font-size: 24px;
    font-weight: bold;
  }
  label {
    font-size: 24px;
    margin-right: 15px;
    font-weight: bold;
  }
  input {
    border: none;
    border-bottom: 2px solid #707070;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    width: 100%;
  }
  .input-cont {
    margin-top: 30px;
    padding: 15px;
  }
}
</style>

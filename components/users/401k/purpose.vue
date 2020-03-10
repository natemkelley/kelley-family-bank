<template>
  <div class="detail-comp">
    <h1>What is the purpose of this account?</h1>
    <div class="input-cont">
      <textarea
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
    this.data = this.activePlan.purpose;
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    inputChanged() {
      let setting = "purpose";
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
  textarea {
    border: 2px solid #707070;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    padding: 7.5px;
    width: 100%;
    min-height: 170px;
  }
  .input-cont {
    margin-top: 30px;
    padding: 15px;
  }
}
</style>

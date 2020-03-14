<template>
  <div class="d-flex justify-content-center">
    <div class="calc-btn shadow3 bigger-sm" @click="adjustNumber(false)">
      <img src="@/assets/images/minus.png" />
    </div>
    <input type="text" v-model="number" />
    <div class="calc-btn shadow3 bigger-sm" @click="adjustNumber(true)">
      <img src="@/assets/images/plus.png" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 4
    };
  },
  methods: {
    adjustNumber(inc) {
      var num = this.number;
      if (inc) {
        num = Number(this.number) + 0.1;
      } else {
        num = Number(this.number) - 0.1;
      }
      this.number = Math.round(num * 10) / 10
    }
  },
  watch:{
      number(){
        this.$emit("percent", this.number);
      }
  }
};
</script>

<style lang="scss" scoped>
input {
  border: none;
  border-bottom: 3.3px solid black;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0px 0px;
  width: 50%;
  margin: 0px 5px;
}

.calc-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 3px solid black;
  background-color: white;
  img {
    width: 50%;
    margin-top: 25%;
    margin-left: 25%;
  }
}
</style>

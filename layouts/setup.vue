<template>
  <div class="setup" :style="{ backgroundColor: backgroundColor }">
    <div class="progressBar" :style="{ width: setupProgress + '%' }"></div>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColors: [
        "#0079FE",
        "#57B8FE",
        "#4DE4C4",
        "#43ED93",
        "#FFD115",
        "#F29F06",
        "#FF8396",
        "#FF576F",
        "#B761FF",
        "#0079FE"
      ],
      setupOrder: [
        "intro",
        "names",
        "familyName",
        "familyUsername",
        "familyPassword",
        "numberOfKids",
        "kidsSetup",
        "acc401K",
        "accSavings",
        "complete"
      ]
    };
  },
  computed: {
    setupProgress() {
      let length = this.setupOrder.length;
      let routeArr = this.$route.path.split("/");
      let pageName = routeArr[routeArr.length - 1];
      let array = this.setupOrder;
      let progress = 0.05;
      for (let index = 0; index < array.length; index++) {
        if (pageName == array[index]) {
          progress = (1 + index) / length;
        }
      }
      return progress * 100;
    },
    backgroundColor() {
      let routeArr = this.$route.path.split("/");
      let pageName = routeArr[routeArr.length - 1];
      let backgroundColor = this.backgroundColors[0];
      this.setupOrder.forEach((name, index) => {
        if (pageName == name) {
          backgroundColor = this.backgroundColors[index];
        }
      });
      return backgroundColor;
    }
  }
};
</script>

<style scoped lang="scss">
.setup {
  /*background: url("~assets/backgrounds/transparent_background2.svg");*/
  min-height: 100vh;
  transition: all 1s;
}
.progressBar {
  transition: all 1s ease-in;
  height: 15px;
  background: #ffd115;
  box-shadow: 1px 3px #0000001f;
      position: absolute;
    top: 0;
}
</style>

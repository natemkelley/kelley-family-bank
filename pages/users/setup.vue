<template>
  <div class="setup d-flex align-items-center justify-content-center">
    <div class="container push-top">
      <NuxtChild :test="'RESOLVE_PLZ'" />
      <div class="progress-btns d-flex justify-content-between">
        <div><span
              ><img class="left shadow3" src="@/assets/images/previous.svg"
            /></span><p>previous</p></div>
        <div>
          <p>
            continue<span
              ><img class="right shadow3" src="@/assets/images/continue.svg"
            /></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setup",
  transition: "slide3d",
  layout: "setup",
  data() {
    return {
      setupOrder: [
        "intro",
        "names",
        "familyName",
        "familyUsername",
        "familyPassword",
        "numberOfKids",
        "kidsSetup",
        "acc401K",
        "accSavings"
      ]
    };
  },
  created() {
    let array = this.setupOrder;
    let setupTutorial = this.$store.state.account.setupTutorial;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (!setupTutorial[element]) {
        this.$router.push({
          path: "/users/setup/" + element
        });
        return;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.push-top {
  margin-top: -20vh;
}
.progress-btns {
  padding: 0px 60px;
  margin-top: 25px;
  p {
    color: white;
    font-size: 24px;
  }
  img {
    height: 42px;
    position: absolute;
  }
  img.right {
    margin-top: -12.5px;
    margin-left: 7.5px;
  }
  img.left{
        margin-top: 15px;
    margin-left: -51px;
  }
}
</style>

<template>
  <div class="">
    <NavBar />
    <div class="section section1">
      <div class="container push-top">
        <h1 class="text-center">family banking</h1>
        <p class="container w80 big">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </p>
        <div class="house-cont">
          <div class="house-int">
            <img class="house shadow12" src="@/assets/images/house_hand.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="section section2">
      <div class="container push-top">
        <h1 class="text-center">family banking</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "~/components/home/navbar.vue";

export default {
  layout: "home",
  components: {
    NavBar
  },
  mounted() {
    console.log("mounted");
    this.$fireAuth
      .getRedirectResult()
      .then(results => {
        if (results.user) {
          this.$router.push({ path: "/app" });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
</script>

<style scoped lang="scss">
.section {
  display: flex;
}
.section1 {
  background-color: $deep-blue;
  background: url("~assets/backgrounds/blue_background_1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 600px;
  color: white;
}
.push-top {
  margin-top: 110px;
}
.house-cont {
  margin-right: auto;
  margin-left: auto;
  position: relative;
  height: 22.5em;
}
.house-int {
  position: absolute;
  width: 100%;
  top: 0;
  margin-left: -8.5em;
}
.house {
  position: absolute;
  height: 35em;
  max-width: 460px;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.section2 {
  background-color: $deep-blue;
  background: url("~assets/backgrounds/yellow_background_2.svg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 90vh;
  color: white;
}
.section2 .push-top {
  margin-top: 250px;
}
h1 {
  font-size: 60px;
}
</style>

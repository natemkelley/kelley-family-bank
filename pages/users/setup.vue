<template>
  <div class="setup d-flex align-items-center justify-content-center">
    <div class="container push-top">
      <NuxtChild :test="'RESOLVE_PLZ'" />
      <div class="progress-btns">
        <NuxtLink
          v-if="previousBtn"
          :to="previousBtn"
          class="previous-btn bigger-sm"
        >
          <img
            class="rock-on left shadow3"
            src="@/assets/images/previous.svg"
          />
          <p class="rock-on">previous</p>
        </NuxtLink>
        <NuxtLink
          :to="continueBtn"
          v-on:click.native="updateProgress()"
          class="continue-btn rock-on bigger-sm"
        >
          <p class="rock-on">
            continue<img
              class=" rock-on right shadow3"
              src="@/assets/images/continue.svg"
            />
          </p>
        </NuxtLink>
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
        "accSavings",
        "complete",
        ""
      ]
    };
  },
  methods: {

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
  computed: {
    continueBtn() {
      let routeArr = this.$route.path.split("/");
      let pageName = routeArr[routeArr.length - 1];
      for (let index = 0; index < this.setupOrder.length; index++) {
        const element = this.setupOrder[index];
        if (element == pageName && element != "") {
          return "/users/setup/" + this.setupOrder[index + 1];
        }
      }

      return "/users/signin";
    },
    previousBtn() {
      let routeArr = this.$route.path.split("/");
      let pageName = routeArr[routeArr.length - 1];
      for (let index = 0; index < this.setupOrder.length; index++) {
        const element = this.setupOrder[index];
        if (pageName == this.setupOrder[0]) {
          return false;
        }
        if (element == pageName) {
          return "/users/setup/" + this.setupOrder[index - 1];
        }
      }

      return "/";
    }
  },
  watch: {
    $route(to, from) {
      let routeArr = from.path.split("/");
      let pageName = routeArr[routeArr.length - 1];
      let uid = this.$store.state.account.uid;
      const k = `setupTutorial.${pageName}`;


      
      this.$fireStore
        .collection("users")
        .doc(uid)
        .update({
          [k]: true
        })
        .then(result => {
          console.log(pageName, true);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.push-top {
  margin-top: -20vh;
}
.progress-btns {
  padding: 0px 60px;
  margin-top: 25px;
  .continue-btn {
    float: right;
  }
  .previous-btn {
    float: left;
  }

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
  img.left {
    margin-top: 15px;
    margin-left: -51px;
  }
}
</style>

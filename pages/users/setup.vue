<template>
  <div
    class="container setup-cont d-flex align-items-stretch justify-content-center"
  >
    <div class="container ">
      <NuxtChild v-on:hideContinue="toggleContinue" />
      <div class="progress-btns">
        <NuxtLink
          v-if="previousBtn"
          :to="previousBtn"
          class="previous-btn bigger-sm"
        >
          <img
            class="clickable left shadow3"
            src="@/assets/images/previous.svg"
          />
          <p class="clickable">previous</p>
        </NuxtLink>
        <NuxtLink
          v-if="!hideContinue"
          :to="continueBtn"
          class="clickable continue-btn bigger-sm"
        >
          <p class="clickable">
            continue<img
              class=" clickable right shadow3"
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
        "complete"
      ],
      setupData: null,
      hideContinue: false
    };
  },
  methods: {
    toggleContinue(data, component) {
      this.hideContinue = data;
    }
  },
  created() {
    let array = this.setupOrder;
    let setupTutorial = this.$store.state.account.setupTutorial;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (!setupTutorial[element]) {
        /*this.$router.push({
          path: "/users/setup/" + element
        });*/
        return;
      }
    }
    /*this.$router.push({
      path: "/users/setup/" + "intro"
    });*/
  },
  computed: {
    continueBtn() {
      let routeArr = this.$route.path.split("/");
      let pageName = routeArr[routeArr.length - 1];
      for (let index = 0; index < this.setupOrder.length; index++) {
        const element = this.setupOrder[index];
        if (element == pageName && element != "complete") {
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
      let k = `setupTutorial.${pageName}`;

      if (!to || pageName == "setup") {
        k = "setupTutorial.started";
      }
      this.$fireStore
        .collection("users")
        .doc(uid)
        .update({
          [k]: true
        })
        .then(result => {
          console.log(pageName, "saved to", true);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 875px;
}
.setup-cont {
  max-width: 850px;
  height: 100%;
  min-height: 100vh;
  padding: 60px;
  .container {
    padding: 0px;
  }
}

.push-top {
  margin-top: -7.5vh;
}

@media only screen and (max-width: 600px) {
  .setup-cont {
    padding: 30px;
  }
  .push-top {
    margin-top: 0;
  }
}

.progress-btns {
  padding: 0px 60px;
  margin-top: 35px;
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

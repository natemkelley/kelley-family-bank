<template>
  <div>
    <div class="section section1">
      <div class="hiddenb"><div class="slime-header"></div></div>

      <div class="container bordered-container push-top">
        <h3 class="black text-center">welcome in with</h3>
        <div class="btn-con mt-2">
          <a @click="loginGoogle" class="pill initial pointer black"
            ><img class="icon" src="@/assets/images/google-logo.png" />sign with
            Google</a
          >
        </div>
        <div class="btn-con">
          <a
            v-show="logoutActive"
            href="#"
            class="pill pointer lowercase red"
            @click="logout"
          >
            <span>Log Out</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
  layout: "home",
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    async loginGoogle() {
      let obj = this.$fireAuthObj;
      let provider = new obj.GoogleAuthProvider();
      await this.$fireAuth.signInWithRedirect(provider);
    },
    async logout() {
      await this.$store.dispatch("logoutUser");
    }
  },
  beforeMount() {
    this.$fireAuth
      .getRedirectResult()
      .then(results => {
        //console.log('redirect',results);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  computed: {
    logoutActive() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
.push-top {
  margin-top: 37.5vh;
}

.section1 {
  background-color: #1579fa;
  background: url(/_nuxt/assets/backgrounds/blue_background_1.svg);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  color: white;
  overflow: hidden;
  .container {
    width: 60%;
    min-width: 300px;
    max-width: 350px;
    height: 100%;
    background: white;
    padding: 35px;
  }
  h3 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}

.hiddenb {
  overflow: hidden;
}

.slime-header {
  min-height: 270px;
  height: 33.3vh;
  width: 105%;
  position: absolute;
  top: 0;
  background: url(~assets/images/slime-large.svg);
  background-size: cover;
  background-size: 100%;
  background-position: bottom;
}
@media (max-width: 700px) {
  .slime-header {
    min-height: 0%;
    background-size: 700px; /* Force the image to its minimum width */
  }
}
</style>

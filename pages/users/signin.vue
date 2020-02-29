<template>
  <div>
    <div class="section section1">
      <div class="swagger">
              <h1 class="title text-center">{{ title }}</h1>
        <LoadingComp class="push-top" v-show="!finishedLoading" />
        <SignInComp
          class="push-top"
          v-if="!this.$store.getters.isLoggedIn && finishedLoading"
        />
        <ProfilesComp
          class="push-top"
          v-if="this.$store.getters.isLoggedIn && finishedLoading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SignInComp from "@/components/users/signinComp";
import ProfilesComp from "@/components/users/profiles";
import LoadingComp from "@/components/users/loading";
export default {
  name: "signin",
  layout: "home",
  components: { SignInComp, ProfilesComp, LoadingComp },
  data() {
    return {
      redirectConfirmed: false
    };
  },
  beforeMount() {
    this.$fireAuth
      .getRedirectResult()
      .then(results => {
        this.redirectConfirmed = true;
        console.log("redirect", results);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  computed: {
    finishedLoading() {
      console.log(this.$store.getters.isLoggedIn, this.redirectConfirmed);
      return this.$store.getters.isLoggedIn || this.redirectConfirmed;
    },
    title() {
      let title = "loading...";
      if (this.finishedLoading) {
        title = "family bank";
      }
      if (this.$store.state.account) {
        if (this.$store.state.account.displayName) {
          let nameArr = this.$store.state.account.displayName.split(" ");
          title = nameArr[nameArr.length - 1].toLowerCase() + " family";
        }
      }

      return title;
    }
  }
};
</script>

<style scoped>

.title {
    position: absolute;
    top: -100px;
    width: 100%;
    text-align: center;
}

.section1 {
  background-color: #1579fa;
  background: url("~assets/backgrounds/blue_background_1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  color: white;
  overflow: hidden;
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
  display: none;
}

.swagger{
      position: absolute;
    top:  23.5vh;;
    width: 100%;
}
@media (max-width: 700px) {
  .slime-header {
    min-height: 0%;
    background-size: 700px; /* Force the image to its minimum width */
  }
}
</style>

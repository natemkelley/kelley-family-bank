<template>
  <div>
    <div class="d-flex align-items-center justify-content-center  section1">
      <div class="container section-pull">
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
  mounted() {
    this.$fireAuth.getRedirectResult().then(result => {
      //console.log("mount exists", this.testProp);

      if (this.$store.state.account || result.user) {
        let uid = null;
        if (result.user) {
          uid = result.user.uid;
        }
        if (this.$store.state.account) {
          uid = this.$store.state.account.uid;
        }

        if (!uid) {
          return;
        }

        this.$fireStore
          .collection("users")
          .doc(uid)
          .get()
          .then(doc => {
            console.log("redirect", !this.$store.getters.finishedTutorial);
            if (doc.exists == false || !this.$store.getters.finishedTutorial) {
              this.$router.push("/users/setup");
            } else {
              this.redirectConfirmed = true;
            }
          });
      } else {
        this.redirectConfirmed = true;
      }
    });
  },
  computed: {
    finishedLoading() {
      //console.log(this.$store.getters.isLoggedIn, this.redirectConfirmed);
      return this.redirectConfirmed;
    },
    title() {
      let title = "loading...";
      if (this.finishedLoading) {
        title = "family bank";
      }
      if (this.$store.state.account) {
        if (this.$store.state.account.creator) {
          let nameArr = this.$store.state.account.creator.split(" ");
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
  padding: 0em 2em 3em 2em;
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

.section-pull {
  padding: 0;
}

</style>

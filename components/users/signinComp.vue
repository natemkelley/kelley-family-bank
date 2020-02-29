<template>
  <div class="signin container bordered-container">
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
</template>

<script>
export default {
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
  computed: {
    logoutActive() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style scoped>
  .container {
    width: 60%;
    min-width: 300px;
    max-width: 350px;
    height: 100%;
    background: white;
    padding: 30px;
  }
  h3 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
</style>
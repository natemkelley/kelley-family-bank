<template>
  <div>
    <div class="closediv" v-show="showLogin" @click="closeLogin"></div>
    <a
      class="button bigger rock-on"
      ref="button"
      v-bind:class="{ clicked: showLogin, userinfo: loggedIn }"
    >
      <div class="clickme" @click="openLogin">
        <LoadingBtns v-show="!loginReady" color="#2D2D2D" />
        <span v-show="loginReady">{{ buttonText }}</span>
      </div>

      <client-only>
        <div class="login" v-show="!loggedIn">
          <div class="image" @click="closeLogin">
            <img class="slime" src="@/assets/images/slime.svg" />
            <img class="man shadow5" src="@/assets/images/finance_manstackinggold.svg" />
          </div>
          <div class="buttons">
            <h3 class="lowercase my-1">welcome</h3>
            <div class="btn-con mt-2">
              <NuxtLink to="users/signin" href="#" class="pill initial pointer">
                <img class="icon" src="@/assets/images/google-logo.png" />
                Sign In
              </NuxtLink>
            </div>
            <h4 class="lowercase my-n1">or</h4>
            <div class="btn-con">
              <NuxtLink to="users/create" class="pointer pill initial blue">create account</NuxtLink>
            </div>
          </div>
        </div>
        <div class="userinfo" v-show="loggedIn">
          <div class="image" @click="closeLogin">
            <img class="slime" src="@/assets/images/slime.svg" />
            <img class="man shadow5" src="@/assets/images/finance_manstackinggold.svg" />
          </div>
          <div class="btn-con">
            <NuxtLink to="/app" class="pill pointer lowercase">
              <span>Go to App</span>
            </NuxtLink>
          </div>
          <div class="btn-con">
            <a href="#" class="pill pointer lowercase red" @click="logout">
              <span>Log Out</span>
            </a>
          </div>
        </div>
      </client-only>
    </a>
  </div>
</template>

<script>
import LoadingBtns from "../loading-three-dots";

export default {
  name: "login-btn",
  components: {
    LoadingBtns
  },
  data() {
    return {
      btnMounted: false,
      showLogin: false
    };
  },
  methods: {
    openLogin() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    },
    async logout() {
      await this.$store.dispatch("logoutUser");
    }
  },
  computed: {
    buttonText() {
      let text = this.$store.state.account
        ? this.$store.state.account.displayName || this.$store.state.account.creator
        : "Get Started";
      return text;
    },
    loggedIn() {
      let status = this.$store.state.account ? true : false;
      return status;
    },
    loginReady() {
      return this.$store.state.account || this.btnMounted;
    }
  },
  mounted() {
    this.btnMounted = true;
  }
};
</script>

<style scoped>
.button {
  height: 50px;
  width: 175px;
  display: block;
}

.clickme {
  transition: 250ms all;
  margin-bottom: 11px;
}

.bigger.clicked:hover {
  margin-right: 16px;
  transform: scale(1.1);
}

.clicked {
  height: 430px;
  width: 250px;
  padding: 5px 15px;
}

.clicked.userinfo {
  height: 360px;
}

.clicked .clickme {
  margin-top: -50px;
}

.image {
  position: relative;
}

.clicked .image {
  margin-top: -25px;
}

.slime {
  width: 250px;
  margin-left: -1em;
}

.clicked .slime {
  margin-top: -1em;
}

.image .man {
  position: absolute;
  top: 2.5em;
  left: -1em;
  width: 15em;
}

.btn-con {
  margin: 5px 0px;
}

.closediv {
  top: 0;
  left: 0;
  background: black;
  opacity: 0.01;
  height: 100vh;
  width: 100vw;
  z-index: 0;
  position: absolute;
}
</style>

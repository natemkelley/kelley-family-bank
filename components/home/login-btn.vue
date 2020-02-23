<template>
  <div>
    <a
      class="button bigger rock-on"
      ref="button"
      v-bind:class="{ clicked: showLogin }"
    >
      <div class="clickme" @click="openLogin">Get Started</div>
      <div class="login">
        <div class="image">
          <img class="slime" src="@/assets/images/slime.svg" />
          <img
            class="man shadow5"
            src="@/assets/images/finance_manstackinggold.svg"
          />
        </div>
        <div class="buttons">
          <h3 class="lowercase my-1">welcome in with</h3>
          <div class="btn-con mt-6">
            <input
              class="pill lowercase pointer"
              type="text"
              placeholder="username"
              v-model="username"
              @blur="checkUsername"
            />
          </div>
          <div class="btn-con">
            <a
              href="#"
              class="pill blue pointer lowercase"
              :class="{ red: continueError }"
              @click="loginWithUsername"
              ><span v-show="!continueLoading">{{ continueMsg }}</span>
              <LoadingBtns v-show="continueLoading" />
            </a>
          </div>
          <h4 class="lowercase my-1">or</h4>
          <div class="btn-con">
            <a @click="loginWithGoogle" href="#" class="pill initial pointer"
              ><img class="icon" src="@/assets/images/google-logo.png" />sign
              with Google</a
            >
          </div>
        </div>
      </div>
      <div class="signin"></div
    ></a>
  </div>
</template>

<script>
import LoadingBtns from "../loading-three-dots";
import { checkIfUsernameIsReal } from "@/plugins/fireauth";

export default {
  name: "login-btn",
  components: { LoadingBtns },
  data() {
    return {
      username: "",
      showLogin: false,
      continueLoading: false,
      continueError: false,
      continueMsg: "continue"
    };
  },
  methods: {
    openLogin() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    },
    loginWithUsername() {
      if (!this.continueLoading && this.username) {
        this.continueLoading = !this.continueLoading;
      }
    },
    loginWithGoogle() {
      this.closeLogin();
    },
    async checkUsername() {
      this.continueLoading = true;
      let status = await checkIfUsernameIsReal(this.username);
      console.log(status);
      this.continueLoading = false;
      this.continueError = !status;
      this.continueMsg = status ?  "continue":"wrong username";
    }
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
  height: 522px;
  width: 250px;
  padding: 5px 15px;
}

.clicked .clickme {
  margin-top: -50px;
}
.image {
  position: relative;
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
</style>

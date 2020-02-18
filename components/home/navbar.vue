<template>
  <div>
    <div
      class="navbar navbar-default row align-items-center justify-content-between"
    >
      <div class="container">
        <div class="float-left">
          <Logo />
        </div>
        <div class="float-right">
          <LoginBtn />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginBtn from "./login-btn";
import Logo from "./logo";

export default {
  name: "navbar",
  components: { LoginBtn, Logo }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  margin-top: 32px;
  margin-left: 1em;
  margin-right: 1em;
}
</style>

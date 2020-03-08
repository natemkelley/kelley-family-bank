<template>
  <div class="avatar clickable" @click="changeAvatar">
    <img class="picture" :src="resolve_img_url" />
    <div class="bottom d-flex align-items-center justify-content-center">
      <img class="icon" src="@/assets/images/pencil.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: ["name", "src", "loading"],
  methods: {
    changeAvatar() {
      alert("change");
    }
  },
  computed: {
    resolve_img_url() {
      if (this.src) {
        return require("@/assets/avatars/" + this.src);
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  text-align: center;
  margin: 5px;
  overflow: hidden;
  border: 0.3em solid black;
  border-radius: 50%;
      max-width: 200px;
          width: 100%;
  .picture {
    background: #ebe8db;
    background: rgb(208, 242, 255);
    height: 100%;
    width: 100%;
    filter: drop-shadow(0px 3px 0px rgba(0, 0, 0, 0.45));
  }
  .bottom {
    position: absolute;
    bottom: 0;
    height: 25%;
    background: black;
    background: rgba(0, 0, 0, 0.459);
    width: 100%;
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;
  }
  .bottom:hover {
    height: 100%;
  }
  .bottom:active {
    background: rgba(0, 0, 0, 0.659);
  }
  .icon {
    width: 30px;
  }
}
</style>

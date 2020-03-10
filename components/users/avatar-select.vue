<template>
  <div>
    <div class="avatar clickable" :class="{ selected: selected }">
      <img class="picture" :src="resolve_img_url" />
      <div class="bottom d-flex align-items-center justify-content-center">
        <img
          v-show="selected"
          class="icon"
          src="@/assets/images/checkmark.png"
        />
      </div>
    </div>
    <h3>{{name}}</h3>
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: ["name", "src", "selected"],
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
  border: 0.23em solid black;
  border-radius: 50%;
  max-width: 80px;
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
    background: black;
    background: rgba(63, 253, 88, 0.459);
    width: 100%;
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;
  }
  .icon {
    width: 30px;
  }
}
h3 {
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}

.selected .bottom {
  height: 100%;
}
</style>

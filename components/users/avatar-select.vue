<template>
  <div class="avatar-select">
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
  background: #d0f2ff;
  max-height: 100px;
  .picture {
    background: #ebe8db;
    background: rgb(208, 242, 255);
    height: 100%;
    width: 100%;
        margin-bottom: -4px;
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
  width: 100%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 5px;
}

.selected .bottom {
  height: 100%;
}

.avatar-select{
    max-width: 100px;
    min-width: 90px;
    width: 100%;
}
</style>

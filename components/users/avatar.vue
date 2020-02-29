<template>
  <div class="avatar clickable bigger-sm">
    <img class="border-3" :src="resolve_img_url" />
    <h3 class="black">{{ name }}</h3>
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: ["name", "src"],
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
  text-align: center;
  img {
    background: #ebe8db;
    background: rgb(208, 242, 255);

    border-radius: 50%;
    height: 90px;
    width: 90px;
    filter: drop-shadow(0px 3px 0px rgba(0, 0, 0, 0.45));
  }
  h3{
    margin-top: 6px;
  }
}
</style>

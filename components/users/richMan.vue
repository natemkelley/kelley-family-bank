<template>
  <div v-images-loaded:on.progress="imageProgress">
    <img class="body" src="@/assets/avatars/richman_body.svg" />
    <img
      class="mustache"
      ref="stache"
      src="@/assets/avatars/richman_mustache.svg"
    />
    <img class="eyes" src="@/assets/avatars/richman_eyes.svg" />
    <img class="nose" src="@/assets/avatars/richman_nose.svg" />
  </div>
</template>

<script>
import imagesLoaded from "vue-images-loaded";
import anime from "animejs";

export default {
  directives: {
    imagesLoaded
  },
  methods: {
    imageProgress(instance, image) {
      const result = image.isLoaded ? "loaded" : "broken";
      this.animatedMan();
    },
    animatedMan() {
      anime({
        targets: this.$refs.stache,
        rotate: ["0", "0.025turn", "-0.025turn", "0"],
        loop: true,
        delay: 1500,
        easing: "easeInOutQuad",
        direction: "alternate"
      });
    }
  }
};
</script>

<style scoped>
.body {
  width: 100%;
}
.nose,
.mustache,
.eyes {
  position: absolute;
}

.eyes {
  width: 4.35em;
  margin-left: 153px;
  margin-top: -55px;
}

.mustache {
  width: 6.75em;
  margin-left: 133px;
  margin-top: -33px;
}

.nose {
  width: 2.25em;
  margin-left: 171px;
  margin-top: -47px;
}
</style>

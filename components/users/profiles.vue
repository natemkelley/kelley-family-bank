<template>
  <div class="signin container bordered-container">
    <div class="">
      <transition-group
        name="staggered-fade"
        tag="div"
        class="row"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <div v-for="n in computedList" :key="n" class="col-md-4 col-sm-12">
          <Avatar name="Nate" :src="`avatars_${n}.svg`" :data-index="n" />
        </div>
      </transition-group>
    </div>

    <div class="btn-con">
      <a
        v-show="logoutActive"
        href="#"
        class="pill pointer lowercase black"
        @click="addComp"
      >
        <span>Add Comp</span>
      </a>
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
import Avatar from "./avatar";
import Velocity from "velocity-animate";

export default {
  components: { Avatar },
  data() {
    return {
      number: 1,
      inc: true
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logoutUser");
    },
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 1, height: "100%" }, { complete: done });
      }, delay);
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    },
    addComp() {
      if (this.number >= 6) {
        this.inc = false;
      } else {
        this.inc = true;
      }
      console.log(this.number, this.inc);
      if (this.inc) {
        this.number++;
      }
      if (!this.inc) {
        this.number--;
      }
    }
  },
  computed: {
    logoutActive() {
      return this.$store.getters.isLoggedIn;
    },
    computedList() {
      return this.number;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 70%;
  min-width: 300px;
  max-width: 575px;
  height: 100%;
  background: white;
  padding: 30px;
}
h3 {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>

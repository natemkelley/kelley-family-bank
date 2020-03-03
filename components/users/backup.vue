<template>
  <div class="signin container bordered-container">
    <div class="">
      {{ computedList }}
      <transition-group
        name="staggered-fade"
        tag="div"
        class="row avatars-list"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <div
          v-for="avatar in computedList"
          :key="avatar + 'avatars'"
          class="col"
        >
          <div @click="selectAvatar(avatar)">
            <Avatar
              name="Nate"
              :src="`avatars_${avatar}.svg`"
              :data-index="avatar"
            />
          </div>

          <div class="back-btn bigger" @click="goBack" v-if="selectedAvatar">
            <BackBtns />
          </div>
        </div>
      </transition-group>
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
import BackBtns from "@/components/back-btn";
export default {
  components: { Avatar, BackBtns },
  data() {
    return {
      profiles: [1, 2, 3],
      selectedAvatar: null
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
      let length = this.profiles.length;
      this.profiles.push(length + 1);
    },
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
    },
    goBack() {
      this.selectedAvatar = false;
    }
  },
  computed: {
    logoutActive() {
      return this.$store.getters.isLoggedIn;
    },
    computedList() {
      console.log(this.selectedAvatar);
      if (this.selectedAvatar) {
        return [this.selectedAvatar];
      }
      return this.profiles;
    }
  }
};
</script>

<style scoped lang="scss">
.col{
    transition: all 1000ms ease;

}

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
.avatars-list {
  margin-bottom: 15px;
}
.back-btn {
  position: relative;
  top: -125px;
  left: 47.5%;
  margin-left: -80px;
  height: 30px;
  width: 30px;
}
</style>

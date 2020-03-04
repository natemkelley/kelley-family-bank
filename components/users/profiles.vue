<template>
  <div class="signin container bordered-container">
    <div class="loader justify-content-center" v-show="loading">
      <LoadingCircle />
    </div>

    <div class="row avatars-list" v-show="!loading">
      <div v-for="avatar in computedList" :key="avatar + 'avatars'" class="col">
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
        <div class="loading-btn" v-show="checking">
          <LoadingCircle />
        </div>
      </div>
    </div>

    <div class="pins" v-if="selectedAvatar">
      <PinEnter @checking="checkingToggle" />
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
import BackBtns from "@/components/back-btn";
import PinEnter from "./pin";
import LoadingCircle from "../loading-circle";

export default {
  components: { Avatar, BackBtns, PinEnter, LoadingCircle },
  data() {
    return {
      profiles: [2, 4, 6],
      selectedAvatar: null,
      checking: false,
      loading: true
    };
  },
  mounted() {
    let db = this.$fireStore
      .collection("users")
      .doc(this.$store.state.account.uid)
      .collection("profiles")
      .get()
      .then(docs => {
        docs.forEach(doc => {
          //console.log(doc.data());
        });
        this.loading = false;
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logoutUser");
    },
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
    },
    goBack() {
      this.selectedAvatar = false;
    },
    checkingToggle(payload) {
      this.checking = payload.status;
      if (payload.success) {
        console.log("success!");
      } else {
        this.error = true;
      }
    }
  },
  computed: {
    logoutActive() {
      return this.$store.getters.isLoggedIn;
    },
    computedList() {
      if (this.selectedAvatar) {
        return [this.selectedAvatar];
      }
      return this.profiles;
    }
  }
};
</script>

<style scoped lang="scss">
.col {
  transition: all 1000ms ease;
  flex-shrink: 1;
}

.container {
  width: 70%;
  min-width: 300px;
  max-width: 445px;
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

.loading-btn {
  position: absolute;
  top: 5px;
  left: 47.5%;
  margin-left: 27.5px;
  height: 0px;
  width: 30px;
}
.pins {
  margin-top: -45px;
}
.loader {
  display: flex;
  margin: 2.35em;
  transform: scale(1.5);
}

@media only screen and (max-width: 600px) {
  .container {
    width: 90%;
  }
}
</style>

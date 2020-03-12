<template>
  <div>
    <div class="avatar-setup clickable" @click="changeAvatar">
      <img class="picture" :src="resolve_img_url" />
      <div class="bottom d-flex align-items-center justify-content-center">
        <img class="icon" src="@/assets/images/pencil.png" />
      </div>
    </div>
    <div class="change-modal modal">
      <div class="modal-content border-4">
        <span class="close" @click="closeModal">&times;</span>
        <div class="row">
          <div v-for="n in 11" :key="n" @click="selectAvatar(n)" class="col">
            <Avatars :src="`avatars_${n}.svg`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatars from "@/components/users/avatar";

export default {
  name: "avatar",
  components: { Avatars },
  props: ["src"],
  mounted() {
    this.$emit("avatarNum", "avatars_" + 1 + ".svg");
  },
  methods: {
    changeAvatar() {
      let modal = this.$el.querySelector(".modal");
      modal.classList.add("selected");
    },
    closeModal() {
      let modal = this.$el.querySelector(".modal");
      modal.classList.remove("selected");
    },
    selectAvatar(avatarN) {
      this.avatarNum = "avatars_" + avatarN + ".svg";
      this.$emit("avatarNum", this.avatarNum);
      this.closeModal();
      this.avatarNum = null;
    }
  },
  data() {
    return {
      avatarNum: null
    };
  },
  computed: {
    resolve_img_url() {
      if (this.avatarNum) {
        return require("@/assets/avatars/" + this.avatarNum);
      }

      if (this.src) {
        return require("@/assets/avatars/" + this.src);
      }
      return require("@/assets/avatars/avatars_1.svg");
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-setup {
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

.modal {
  position: fixed; /* Stay in place */
  z-index: -1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.65); /* Black w/ opacity */
  opacity: 0;
  transition: 0.25s all ease;
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  width: 80%;
  max-width: 600px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
}

.selected {
  z-index: 1; /* Sit on top */
  opacity: 1;
}
</style>

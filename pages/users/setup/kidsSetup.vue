<template>
  <div class="bordered-container names-container">
    <h1>Setup your kid’s accounts</h1>
    <div class="children-ordinal">
      <a
        v-for="(child, n) in childProfiles"
        :key="n"
        :class="{ active: activeChild == n + 1 }"
        @click="scrollTo(n + 1)"
        >{{ (n + 1) | ordinal }} Child</a
      >
    </div>
    <div class="bordered setup-cont">
      <div class="row">
        <div class="col-5">
          <div class=" d-flex align-items-center justify-content-center">
            <AvatarSetup src="avatars_2.svg" />
          </div>
        </div>
        <div class="col-7">
          <div class="input-cont d-flex justify-content-left input-cont">
            <input type="text" placeholder="first name" />
          </div>
          <div class="input-cont d-flex justify-content-left input-cont">
            <input type="number" placeholder="first name" />
          </div>
          <div class="input-cont d-flex justify-content-left input-cont">
            <select>
              <option v-for="n in 11" :key="n" value="volvo"
                >Volvo</option
              ></select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ordianl from "ordinal";
import animateScrollTo from "animated-scroll-to";
import AvatarSetup from "@/components/users/avatar-setup";

const scrollTo = require("scroll-to");

export default {
  transition: "slide3d",
  components: { AvatarSetup },
  data() {
    return {
      childProfiles: [],
      activeChild: 1
    };
  },
  mounted() {
    this.$emit("hideContinue", true);
    let uid = this.$store.state.account.uid;
    this.$fireStore
      .collection("users")
      .doc(uid)
      .collection("profiles")
      .where("type", "==", "child")
      .get()
      .then(docs => {
        docs.forEach(element => {
          this.childProfiles.push(element.data());
        });
        console.log(this.childProfiles);
      });
  },
  methods: {
    scrollTo(n) {
      this.activeChild = n;
      setTimeout(() => {
        var active = this.$el.querySelector(".active");
        var cont = this.$el.querySelector(".children-ordinal");
        animateScrollTo(active, {
          elementToScroll: cont,
          minDuration: 600
        });
      }, 250);
    }
  },
  filters: {
    ordinal: function(value) {
      if (!value) return "";
      return ordianl(Number(value));
    }
  },
  beforeDestroy() {
    this.$emit("hideContinue", false);
  }
};
</script>

<style lang="scss" scoped>
.names-container {
  padding: 0px;
  .children-ordinal {
    overflow: auto;
    white-space: nowrap;
    font-weight: bold;
    margin: 0px 10px;
    a {
      font-size: 32px;
      display: inline-block;
      color: gray;
      text-align: center;
      padding: 0px 0px 15px 15px;
      text-decoration: none;
    }
    a:last-child {
      padding-right: 80%;
    }
    .active {
      color: black;
    }
  }
  h1 {
    text-align: center;
    margin: 0px 0px;
    padding: 45px 45px 30px 40px;
  }
  input {
    border: none;
    border-bottom: 2px solid #707070;
    text-align: left;
    font-size: 24px;
    width: 50vw;
    font-weight: bold;
  }
  .setup-cont {
    min-height: 145px;
    background-color: white;
    border: 4px solid black;
    border-radius: 25px;
    margin: -4px;
    padding: 25px;
  }
  .input-cont{
    padding-bottom: 15px;
  }
}

</style>

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
    <div class="bordered d-flex justify-content-center setup-cont">
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import ordianl from "ordinal";
import animateScrollTo from "animated-scroll-to";

const scrollTo = require("scroll-to");

export default {
  transition: "slide3d",
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
    text-align: center;
    font-size: 40px;
    width: 75px;
    font-weight: bold;
    margin: 0px 0px;
  }
  .setup-cont {
    min-height: 145px;
    background-color: white;
    border: 4px solid black;
    border-radius: 25px;
    margin: -4px;
    .bordered {
    }
  }
  .calc-cont {
    padding: 15px;
  }
  .calc-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid black;
    background-color: white;
    img {
      width: 50%;
      margin-top: 25%;
      margin-left: 25%;
    }
  }
}
</style>

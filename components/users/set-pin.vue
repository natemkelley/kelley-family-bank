<template>
  <div class="row">
    <div class="keys black" :class="{ offsetLarge: !large }">
      <div class="d-flex justify-content-center">
        <h4 v-if="!large">enter passcode</h4>
        <div v-for="n in 4" :key="n + 'passcode'" class="input-pins shadow5">
          <input :value="passcodeArray[n - 1]" type="text" class="" />
        </div>
      </div>
      <div class="hidden-cont">
        <input
          type="number"
          class="hidden clickable"
          v-model="passcode"
          @keyup="numberPunched"
          @click="clearInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["incomingPasscode", "large"],
  data() {
    return {
      checking: false,
      error: false,
      passcode: null
    };
  },
  methods: {
    numberPunched() {
      this.$emit("passcode", null);

      if (this.passcode) {
        if (this.passcode.length > 4) {
          var str = String(this.passcode);
          this.passcode = str.substring(0, 4);
        }
        if (this.passcode.length == 4) {
          this.$emit("passcode", this.passcode);
        }
        this.updateSelectedInput();
      }
    },
    updateSelectedInput() {
      var inputCont = this.$el.querySelectorAll(".input-pins");
      var inputs = this.$el.querySelectorAll("input");

      inputCont.forEach((element, n) => {
        element.classList.remove("selected");
      });

      if (this.passcode) {
        var digits = this.passcode.toString().split("");
        var realDigits = digits.map(Number);

        realDigits.forEach((element, n) => {
          inputCont[n].classList.add("selected");
        });
      }
      //console.log(realDigits);
    },
    clearInput() {
      this.passcode = null;
      var inputCont = this.$el.querySelectorAll(".input-pins");
      var inputs = this.$el.querySelectorAll("input");

      inputCont.forEach((element, n) => {
        element.classList.remove("selected");
      });
      inputCont[0].classList.add("selected");

      console.log(inputCont,inputs)
    }
  },
  computed: {
    passcodeArray() {
      var arr = [];
      if (this.passcode) {
        var s = this.passcode;
        for (var i = 0; i < s.length; i++) {
          arr.push(s.charAt(i));
        }
      }
              return arr;
    }
  },
  watch: {
    incomingPasscode(val) {
      this.passcode = val;
      this.numberPunched();
      this.updateSelectedInput();
    }
  }
};
</script>

<style lang="scss" scoped>
.hidden-cont {
  width: 100%;
  height: 0;
  .hidden {
    position: relative;
    width: 100%;
    background: red;
    left: 0;
    top: -67px;
    height: 70px;
    opacity: 0;
  }
}

.input-pins {
  display: inline-block;
  margin: 0px 2.5px;
  background: white;
  border: 3px solid black;
  border-radius: 25%;
}

input {
  background: transparent;
  border: none;
  width: 1.4em;
  height: 1.4em;
  color: black;
  font-size: 2.5rem;
  line-height: 1.25em;
  margin-right: 0.5rem;
  text-align: center;
}
input:last-child {
  margin: 0;
}
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
}
h4 {
  float: right;
  margin-top: 10px;
  margin-bottom: -5px;
  color: gray;
  transition: color 0.5s ease;
}
.selected {
  background: rgb(216, 250, 243);
}
.keys {
  position: relative;
  h4 {
    position: absolute;
    top: -45px;
    margin-left: -45px;
  }
}
.offsetLarge {
  margin-top: 41px;
}
.row {
  margin-right: 0;
  margin-left: 0;
}

@media only screen and (max-width: 600px) {
}
</style>

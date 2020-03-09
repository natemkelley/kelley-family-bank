<template>
  <div>
    <div class="row" v-if="!large">
      <h4>enter passcode</h4>
    </div>
    <div class="keys black" :class="{ row: !large }">
      <div class="input-cont">
        <input
          v-for="n in 4"
          :key="n + 'passcode'"
          :value="passcodeArray[n - 1]"
          type="number"
          class="input shadow5"
        />
        
      </div>
      <div class="hidden-cont">
        <input
          type="number"
          class="hidden"
          v-model="passcode"
          @keyup="numberPunched"
          @focus="updateSelectedInput"
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
      var inputs = this.$el.querySelectorAll(".input");
      inputs.forEach(input => {
        if (input.value && this.passcode) {
          input.classList.add("selected");
        } else {
          input.classList.remove("selected");
        }
      });
      inputs[0].classList.add("selected");
    }
  },
  computed: {
    passcodeArray() {
      var arr = [];
      if (this.passcode || this.incomingPasscode) {
        var s = this.passcode || this.incomingPasscode;
        for (var i = 0; i < s.length; i++) {
          arr.push(s.charAt(i));
        }
        return arr;
      } else {
        return arr;
      }
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

.input {
  display: inline-block;
  float: left;
  background: white;
  border: 3px solid black;
  border-radius: 25%;
  width: 1.4em;
  height: 1.4em;
  color: black;
  font-size: 2.5rem;
  line-height: 1.25em;
  margin-right: 0.5rem;
  text-align: center;
}
.input:last-child {
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
  color: gray;
  transition: color 0.5s ease;
}
.selected {
  background: rgb(216, 250, 243);
}
.keys {
  margin-top: -25px;
}
.row {
  margin-right: 0;
  margin-left: 0;
}

@media only screen and (max-width: 600px) {
}
</style>

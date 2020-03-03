<template>
  <div>
    <div class="center black">
      <div class="keys">
        <div class="input-cont">
          <input
            v-for="n in 4"
            :key="n + 'passcode'"
            :value="passcodeArray[n - 1]"
            type="password"
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
        <h4 :class="{'error-text':error}">{{ pinText }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  data() {
    return {
      passcode: null,
      checking: false,
      error: false
    };
  },
  methods: {
    numberPunched() {
      if (this.passcode) {
        if (this.passcode.length > 4) {
          var str = String(this.passcode);
          this.passcode = str.substring(0, 4);
        }
        if (this.passcode.length == 4 && this.checking == false) {
          this.checkPasscode();
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
    },
    checkPasscode() {
      this.checking = true;
      this.$emit("checking", { status: true });
      setTimeout(() => {
        this.checking = false;
        this.passcode = null;
        this.error = true;

        this.$emit("checking", { status: false, success: false });
        this.shakePins();
        this.updateSelectedInput();
      }, 500);
    },
    shakePins() {
      const xMax = 16;
      anime({
        targets: this.$el.querySelector(".input-cont"),
        easing: "easeInOutSine",
        duration: 550,
        translateX: [
          {
            value: xMax * -1
          },
          {
            value: xMax
          },
          {
            value: xMax / -2
          },
          {
            value: xMax / 2
          },
          {
            value: 0
          }
        ]
      });
      console.log(this.$el.querySelectorAll(".input"));
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
        return arr;
      } else {
        return arr;
      }
    },
    pinText() {
      return this.error ? "wrong pin" : "enter pin";
    }
  },
  mounted() {
    const input = this.$el.querySelector(".hidden");
    console.log(input, "pin mounted");
    input.focus();
    input.select();
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
  width: 70px;
  height: auto;
  color: black;
  font-size: 2.5rem;
  line-height: 1.25em;
  margin-right: 0.5rem;
  text-align: center;
  padding: 0.5rem 0.75rem;
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
  background: rgb(196, 253, 241);
}

@media only screen and (max-width: 600px) {
  .keys {
    margin: 0px -15px;
  }
  .input {
    margin-right: 0.25rem;
  }
}
</style>

<template>
  <div class="bordered-container names-container">
    <h1>Setup your kid’s accounts</h1>
    <div class="children-ordinal" v-show="!completed">
      <a
        v-for="(child, n) in childProfiles"
        :key="n"
        :class="{ active: activeChild == n }"
        @click="nextChild(n)"
        >{{ (n + 1) | ordinal }} Child</a
      >
    </div>
    <div class="bordered setup-cont" v-show="!completed">
      <div class="row">
        <div class="col-md-5 col-sm-12 avatar-cont">
          <div class=" d-flex align-items-center justify-content-center">
            <AvatarSetup :name="name" :src="src" v-on:avatarNum="setAvatar" />
          </div>
        </div>
        <div class="col-md-7 col-sm-12 parameters-cont">
          <div
            class="input-cont d-flex justify-content-sm-center justify-content-left  input-cont"
          >
            <input type="text" placeholder="first name" v-model="name" />
          </div>
          <div
            class="input-cont d-flex justify-content-sm-center justify-content-left input-cont"
          >
            <input
              v-model="age"
              type="number"
              placeholder="age"
              min="0"
              max="18"
              v-on:keyup="controlAge"
            />
          </div>
          <div
            class="input-cont d-flex justify-content-sm-center justify-content-left input-cont"
          >
            <select @change="monthChange($event)">
              <option v-for="month in months" :key="month" :value="month"
                >{{ month }}
              </option>
            </select>
          </div>
          <div class="input-cont d-flex justify-content-sm-center">
            <SetPin
              v-on:passcode="setPasscode"
              :incomingPasscode="passcode"
              class="pins"
            />
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-end">
        <div
          class="continue-btn"
          :class="{ 'hide-btn': !nextChildActive }"
          @click="nextChild(activeChild + 1)"
        >
          <p class="rock-on">
            continue<img
              class=" rock-on right shadow3"
              src="@/assets/images/continue.svg"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="completed setup-cont" v-if="completed">
      <h1>completed!</h1>
    </div>
  </div>
</template>

<script>
import ordianl from "ordinal";
import animateScrollTo from "animated-scroll-to";
import AvatarSetup from "@/components/users/avatar-setup";
import SetPin from "@/components/users/set-pin";

export default {
  transition: "slide3d",
  components: { AvatarSetup, SetPin },
  data() {
    return {
      childProfiles: [],
      activeChild: 0,
      months: [
        "Birth Month",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      age: null,
      passcode: null,
      nextKidCont: false,
      birthMonth: "Birth Month",
      name: null,
      src: null,
      completed:false
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
        this.setActiveChild(this.activeChild);
      });
  },
  methods: {
    setActiveChild(n) {
      console.log(this.childProfiles, n);
      let profile = this.childProfiles[n];
      this.name = profile.firstName;
      this.birthMonth = profile.birthMonth;
      this.$el.querySelector("select").selectedIndex = this.months.indexOf(
        profile.birthMonth || "Birth Month"
      );
      this.src = profile.profilePic;
      this.age = profile.age;
      this.activeChild = n;

      let uid = this.$store.state.account.uid;
      let uuid = profile.uuid;
      this.$fireStore
        .collection("passcodes")
        .doc(uid)
        .collection("passcodes")
        .doc(uuid)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.passcode = doc.data().passcode || null;
          }
        });

      this.scrollTo(n);
    },
    scrollTo(n) {
      setTimeout(() => {
        var active = this.$el.querySelector(".active");
        var cont = this.$el.querySelector(".children-ordinal");
        animateScrollTo(active, {
          elementToScroll: cont,
          minDuration: 600
        });
      }, 250);
    },
    controlAge() {
      if (this.age > 18) {
        this.age = 18;
      }
      if (this.age < 0) {
        this.age = 0;
      }
    },
    setPasscode(passcode) {
      this.passcode = passcode;
      this.nextKidCont = true;
    },
    monthChange(event) {
      this.birthMonth = event.target.value;
    },
    setAvatar(avatar) {
      this.src = avatar;
    },
    resetChild() {
      this.name = null;
      this.passcode = null;
      this.$el.querySelector("select").selectedIndex = 0;
      this.birthMonth = "Birth Month";
      this.src = null;
      this.age = null;
    },
    async nextChild(n) {
      let uid = this.$store.state.account.uid;
      let uuid = this.childProfiles[this.activeChild].uuid;

      this.childProfiles[this.activeChild].profilePic = this.src;
      this.childProfiles[this.activeChild].firstName = this.name;
      this.childProfiles[this.activeChild].age = this.age;
      this.childProfiles[this.activeChild].birthMonth = this.birthMonth;

      await this.$fireStore
        .collection("passcodes")
        .doc(uid)
        .collection("passcodes")
        .doc(uuid)
        .set({
          uuid: uuid,
          passcode: this.passcode || "0000"
        })
        .then(() => {
          console.log("password saved swag");
        });

      if (n >= this.childProfiles.length) {
        if (this.activeChild + 1 >= this.childProfiles.length) {
          this.completed = true;
          this.$emit("hideContinue", false);
          return;
        }
      }

      this.resetChild();
      this.setActiveChild(n);
    }
  },
  filters: {
    ordinal: function(value) {
      if (!value) return "";
      return ordianl(Number(value));
    }
  },
  async beforeDestroy() {
    this.$emit("hideContinue", false);

    let uid = this.$store.state.account.uid;
    let db = this.$fireStore;
    let batch = db.batch();

    this.childProfiles.forEach(element => {
      let ref = db
        .collection("users")
        .doc(uid)
        .collection("profiles")
        .doc(element.uuid);
      batch.set(ref, element);
    });
    await batch.commit().then(() => {
      console.log("saved some kiddohs", this.childProfiles);
    });
  },
  computed: {
    nextChildActive: {
      get: function() {
        if (!this.age) {
          return false;
        }
        if (!this.name) {
          return false;
        }
        if (!this.passcode) {
          return false;
        }
        if (this.birthMonth === "Birth Month" || !this.birthMonth) {
          return false;
        }
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.names-container {
  padding: 0px;
.completed{
 background:#43ED93!important;
 color:black;
 h1{
   padding-bottom: 45px!important;
 }
}

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
  input,
  select {
    border: none;
    border-bottom: 2px solid #707070;
    text-align: left;
    font-size: 24px;
    width: 50vw;
    font-weight: bold;
    max-width: 275px;
  }
  select {
    background: white;
  }
  .setup-cont {
    min-height: 145px;
    background-color: white;
    border: 4px solid black;
    border-radius: 25px;
    margin: -4px;
    padding: 2em 3.3em 1em 3.3em;
  }
  .input-cont {
    padding-bottom: 15px;
  }
  .pins {
    margin-top: -10px;
  }
}

.hide-btn {
  opacity: 0 !important;
}

.continue-btn {
  margin-right: 42px;
  opacity: 1;
  transition: 0.25s all ease;
  p {
    color: black;
    font-size: 24px;
  }
  img {
    height: 42px;
    position: absolute;
  }
  img.right {
    margin-top: -12.5px;
    margin-left: 7.5px;
  }
}



@media only screen and (max-width: 600px) {
  .names-container .setup-cont {
    padding: 1.5em 1.8em;
  }
  .avatar-cont {
    margin-bottom: 15px;
  }
  .names-container {
    input,
    select {
      text-align: center;
      width: 100%;
    }
  }
}
</style>

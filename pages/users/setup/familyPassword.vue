<template>
  <div class="bordered-container names-container">
    <h1>What's would you like your passcode to be?</h1>
    <div class="d-flex justify-content-center input-cont">
      <SetPin
        v-on:passcode="setPasscode"
        :incomingPasscode="incomingPasscode"
        large="true"
      />
    </div>
    <p class="text-center">You will use this to sign into your account.</p>
  </div>
</template>

<script>
import SetPin from "@/components/users/set-pin";

export default {
  transition: "slide3d",
  components: { SetPin },
  data() {
    return {
      passcode: "",
      uuid: null,
      incomingPasscode:null
    };
  },
  async mounted() {
    let uid = this.$store.state.account.uid;

    await this.$fireStore
      .collection("users")
      .doc(uid)
      .collection("profiles")
      .where("type", "==", "parent")
      .get()
      .then(docs => {
        docs.forEach(element => {
          this.uuid = element.data().uuid;
        });
      });

    let uuid = this.uuid;

    this.$fireStore
      .collection("passcodes")
      .doc(uid)
      .collection("passcodes")
      .doc(uuid)
      .get()
      .then(doc => {
        this.incomingPasscode = doc.data().passcode;
        //console.log('incoming',this.incomingPasscode);
      });

    //this.passcode = this.$store.state.account.familyPassword || "";
  },
  async beforeDestroy() {
    let uid = this.$store.state.account.uid;
    let uuid = null;
    await this.$fireStore
      .collection("users")
      .doc(uid)
      .collection("profiles")
      .where("type", "==", "parent")
      .get()
      .then(docs => {
        //console.log(docs, uid);
        docs.forEach(element => {
          uuid = element.data().uuid;
        });
      });

    await this.$fireStore
      .collection("passcodes")
      .doc(uid)
      .collection("passcodes")
      .doc(uuid)
      .set({
        uuid: uuid,
        passcode: this.passcode || '0000'
      })
      .then(() => {
        console.log("password saved");
      });
  },
  methods: {
    setPasscode(val) {
      this.passcode = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.names-container {
  padding: 45px;
  h1 {
    text-align: center;
    margin-top: 0px;
    margin-bottom: 10px;
  }

  .input-cont {
    padding: 15px;
  }
}
</style>

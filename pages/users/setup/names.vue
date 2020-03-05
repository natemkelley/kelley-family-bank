<template>
  <div class="bordered-container names-container">
    <h1>What's your name?</h1>
    <div class="d-flex justify-content-center input-cont">
      <label for="first">First</label>
      <input type="text" id="first" v-model="first" placeholder="First Name" />
    </div>
    <div class="d-flex justify-content-center input-cont">
      <label for="last">Last</label>
      <input type="text" id="last" v-model="last" placeholder="Last Name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "names",
  transition: "slide3d",
  data() {
    return {
      first: null,
      last: null
    };
  },
  async mounted() {
    let displayName = this.$store.state.account.creator;
    let accountuid = this.$store.state.account.uid;
    await this.$fireStore
      .collection("users")
      .doc(accountuid)
      .collection("profiles")
      .get()
      .then(docs => {
        docs.forEach(doc => {
          displayName = doc.data().displayName;
        });
      });

    let name = displayName || "Mr Monopoly";
    let nameArr = name.split(" ");
    this.first = nameArr[0];
    this.last = nameArr[nameArr.length - 1];
  },
  async beforeDestroy() {
    let accountuid = this.$store.state.account.uid;
    let profileuuid = null;
    let db = this.$fireStore
      .collection("users")
      .doc(accountuid)
      .collection("profiles");

    await db.get().then(docs => {
      docs.forEach(doc => {
        profileuuid = doc.data().uuid;
      });
    });

    let displayName = `${this.first} ${this.last}`;
    await db
      .doc(profileuuid)
      .update({
        displayName: displayName
      })
      .then(result => {
        console.log("saved displayName", displayName);
      });
  }
};
</script>

<style lang="scss" scoped>
.names-container {
  padding: 45px;
  h1 {
    text-align: center;
    margin-top: 0px;
  }
  label {
    font-size: 24px;
    margin-right: 15px;
    font-weight: bold;
  }
  input {
    border: none;
    border-bottom: 2px solid #707070;
    text-align: center;
    font-size: 24px;
    width: 50vw;
    font-weight: bold;
  }
  .input-cont {
    padding: 15px;
  }
}
</style>

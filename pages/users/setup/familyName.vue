<template>
  <div class="bordered-container names-container">
    <h1>What should we call your family?</h1>
    <div class="d-flex justify-content-center input-cont">
      <label for="first">The</label>
      <input type="text" v-model="familyName" id="first" placeholder="Wong" />
      <label for="first">Family</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      familyName: null
    };
  },
  async mounted() {
    let displayName = this.$store.state.account.familyName || this.$store.state.account.creator;
    this.familyName = displayName.split(' ')[displayName.split(' ').length-1]
    let accountuid = this.$store.state.account.uid;
  },
  async beforeDestroy() {
    let accountuid = this.$store.state.account.uid;
    let db = this.$fireStore
      .collection("users")
      .doc(accountuid)

    await db
      .update({
        familyName: this.familyName
      })
      .then(result => {
        console.log("saved familyName", this.familyName);
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
    width: 30vw;
    min-width: 150px;
    font-weight: bold;
  }
  .input-cont {
    padding: 15px;
  }
}
</style>

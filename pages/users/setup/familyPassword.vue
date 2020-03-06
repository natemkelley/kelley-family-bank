<template>
  <div class="bordered-container names-container">
    <h1>What's your family password?</h1>
    <div class="d-flex justify-content-center input-cont">
      <label for="first">Password</label>
      <input type="password" id="first" v-model="password" />
    </div>
  </div>
</template>

<script>
export default {
  transition: "slide3d",
  data() {
    return {
      password: "",
    };
  },
  mounted() {
    this.password = this.$store.state.account.familyPassword || ""
  },
  async beforeDestroy() {
    let accountuid = this.$store.state.account.uid;
    await this.$fireStore
      .collection("users")
      .doc(accountuid)
      .update({
        familyPassword: this.password
      })
      .then(() => {
        console.log("password saved");
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
    max-width: 140px;
    font-weight: bold;
  }
  .input-cont {
    padding: 15px;
  }
}
</style>

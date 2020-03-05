<template>
  <div class="bordered-container names-container">
    <h1>Kelley Family</h1>
    <div class="d-flex justify-content-center input-cont">
      <label for="first">First</label>
      <input
        type="text"
        id="first"
        v-model="first"
        v-on:blur="checkUsernames"
        placeholder="First Name"
      />
    </div>
    <div class="d-flex justify-content-center input-cont">
      <label for="last">Last</label>
      <input type="text" id="last" v-model="last" placeholder="Last Name" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first: null,
      last: null,
      nonPossibilies: []
    };
  },
  mounted() {
    let familyName = this.$store.state.account.familyName.substring(0, 4);
    this.first = familyName;
    this.checkUsernames(familyName);
  },
  methods: {
    checkUsernames(name) {
      this.$fireStore
        .collection("usernames")
        .where("username", ">=", name.toLowerCase())
        .limit(10)
        .orderBy("username", "asc")
        .get()
        .then(docs => {
          docs.forEach(doc => {
            const el = doc.data();
            this.nonPossibilies.push(el);
          });
        });
    }
  },
  computed:{
      suggestions(){
          return this.nonPossibilies
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

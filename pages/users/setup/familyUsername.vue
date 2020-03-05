<template>
  <div class="bordered-container names-container">
    <div class="row">
      <div class="col-md-6 col-sm-12 expl">
        <h1>Family Username</h1>
        <p>
          Your family username is mainly used for account information. You won't
          use this to login. Usernames are NOT case sensitive.
        </p>
      </div>
      <div class="col-md-6 col-sm-12">
        <input type="text" v-model="familyName" placeholder="thekelleys" />
        <p class="subtext">also available</p>
        <p
          class="usernames clickable"
          v-for="(suggestion, n) in suggestions"
          :key="suggestion + n"
          @click="chooseUsername(suggestion)"
        >
          {{ suggestion }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: "slide3d",
  data() {
    return {
      familyName: "Smith",
      nonPossibilies: []
    };
  },
  mounted() {
    let familyName =
      this.$store.state.account.familyUsername ||
      this.$store.state.account.familyName;
    this.familyName = familyName.toLowerCase();
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
    },
    chooseUsername(name) {
      this.familyName = name;
      this.nonPossibilies.push(name);
    }
  },
  computed: {
    suggestions() {
      let starter = this.familyName.toLowerCase();

      let returnArr = [
        starter,
        starter + "family",
        starter + "family",
        starter + "rules",
        starter + "forever"
      ];

      for (let index = 0; index < 7; index++) {
        let randomNum = Math.floor(Math.random() * 200) + 1;
        returnArr.push(starter + randomNum);
        returnArr.push(starter);
      }
      this.nonPossibilies.forEach(element => {
        const index = returnArr.indexOf(element.username);
        if (index >= 0) {
          returnArr.splice(index, 1);
        }
      });

      return returnArr.slice(0, 6);
    }
  },
  async beforeDestroy() {
    let accountuid = this.$store.state.account.uid;
    this.$fireStore
      .collection("users")
      .doc(accountuid)
      .update({
        familyUsername: this.familyName
      })
      .then(() => {
        console.log("familyUsername", this.familyName);
      });
  }
};
</script>

<style lang="scss" scoped>
.names-container {
  padding: 35px;
  overflow: hidden;
  .expl {
    p {
      margin-top: 3px;
    }
  }
  h1 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 40px;
  }
  p {
    font-size: 24px;
    line-height: 29px;
    overflow: hidden;
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
    width: 100%;
    font-weight: bold;
  }
  .subtext {
    font-size: 16px;
    color: gray;
    margin-bottom: -2px;
  }
  .usernames {
    font-size: 30px;
    margin: 0px;
    margin-bottom: 3px;
    font-weight: bold;
  }
  .usernames:hover {
    color: rgb(71, 71, 250);
  }
}
</style>

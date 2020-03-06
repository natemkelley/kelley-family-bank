<template>
  <div class="bordered-container names-container">
    <h1>How many kids do you have?</h1>
    <div class="d-flex justify-content-center kids-cont">
      <div class="row">
        <div v-for="(src, n) in kids" :key="n + src" class="col lilspace">
          <AvatarsComp :src="src" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center calc-cont">
      <div class="calc-btn shadow3 bigger-sm" @click="number--">
        <img src="@/assets/images/minus.png" />
      </div>
      <input type="text" v-model="number" />
      <div class="calc-btn shadow3 bigger-sm" @click="number++">
        <img src="@/assets/images/plus.png" />
      </div>
    </div>
  </div>
</template>

<script>
import AvatarsComp from "@/components/users/avatar";
import { v4 as uuidv4 } from "uuid";

export default {
  transition: "slide3d",
  data() {
    return {
      number: 1
    };
  },
  mounted(){
    let uid = this.$store.state.account.uid;
    this.$fireStore
      .collection("users")
      .doc(uid)
      .collection("profiles")
      .where("type", "==", "child")
      .get()
      .then(docs => {
        this.number = docs.size
      });
  },
  methods: {
    getImgUrl(src) {
      if (src) {
        return require(`@/assets/avatars/${src}.svg`);
      }
    },
    async deleteOldKids(uid, db) {
      return new Promise((resolve, reject) => {
        let ref = db
          .collection("users")
          .doc(uid)
          .collection("profiles")
          .where("type", "==", "child")
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size != this.number) {
              querySnapshot.forEach(doc => {
                doc.ref.delete();
              });
            }
            resolve(querySnapshot.size != this.number);
          });
      });
    }
  },
  watch: {
    number() {
      if (this.number <= 0) {
        this.number = 1;
      }
      if (this.number >= 11) {
        this.number = 11;
      }
    }
  },
  computed: {
    kids() {
      let returnArr = [];
      for (let index = 0; index < this.number; index++) {
        //const num = Math.floor(Math.random() * 10) + 1;
        const num = index + 1;
        const x = "avatars_" + num;
        returnArr.push(x + ".svg");
      }

      return returnArr;
    }
  },
  components: { AvatarsComp },
  async beforeDestroy() {
    let accountuid = this.$store.state.account.uid;
    let db = this.$fireStore;
    let cont = await this.deleteOldKids(accountuid, db);

    if (cont) {
      let batch = db.batch();
      for (let index = 0; index < this.number; index++) {
        let template = {
          type: "child",
          firstName: null,
          age: null,
          birthMonth: null,
          uuid: null,
          profilePic: null,
          nickname: null,
          email: null
        };
        let uuid = uuidv4();
        template.uuid = uuid;
        let ref = db
          .collection("users")
          .doc(accountuid)
          .collection("profiles")
          .doc(uuid);
        batch.set(ref, template);
      }

      await batch.commit().then(() => {
        console.log("saved some kiddohs", this.number);
      });
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
  input {
    border: none;
    text-align: center;
    font-size: 40px;
    width: 75px;
    font-weight: bold;
    margin: 0px 0px;
  }
  .kids-cont {
    min-height: 145px;
    img {
      max-width: 60px;
    }
    .col {
      padding: 0 5px;
    }
  }
  .calc-cont {
    padding: 15px;
  }
  .calc-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid black;
    background-color: white;
    img {
      width: 50%;
      margin-top: 25%;
      margin-left: 25%;
    }
  }
}
</style>

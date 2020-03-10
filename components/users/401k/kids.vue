<template>
  <div class="detail-comp">
    <h1>What kids will have this account?</h1>
    <div class="row avatars-list" v-show="!loading">
      <div class="kids-cont">
        <div class="row">
          <div
            v-for="(avatar, n) in kidsList"
            :key="n + 'avatars'"
            class="col"
            @click="inputChanged(avatar.uuid)"
          >
            <Avatars
              :name="avatar.firstName"
              :src="avatar.profilePic"
              :selected="isSelected(avatar.uuid)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatars from "@/components/users/avatar-select";

export default {
  props: ["activePlan"],
  components: { Avatars },
  mounted() {
    this.$fireStore
      .collection("users")
      .doc(this.$store.state.account.uid)
      .collection("profiles")
      .where("type", "==", "child")
      .get()
      .then(docs => {
        docs.forEach(doc => {
          this.kidsList.push(doc.data());
        });
        this.loading = false;
        this.returnData = this.activePlan.kids || [];
      });
  },
  data() {
    return {
      returnData: [],
      kidsList: [],
      loading: false
    };
  },
  methods: {
    inputChanged(uuid) {
      if (this.returnData.indexOf(uuid) >= 0) {
        this.returnData.splice(this.returnData.indexOf(uuid), 1);
      } else {
        this.returnData.push(uuid);
      }

      let setting = "kids";
      let data = this.returnData;
      let template = {
        setting,
        data
      };
      this.$emit("incomingData", template);
    },
    isSelected(uuid) {
      if (uuid) {
        if (this.returnData.indexOf(uuid) >= 0) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-comp {
  h1 {
    margin-top: 3px;
    font-size: 24px;
    font-weight: bold;
  }
}
.kids-cont {
  .row {
    margin: 5px;
  }
  .col {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

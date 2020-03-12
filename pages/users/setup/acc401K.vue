<template>
  <div class="bordered-container names-container">
    <h1>Do you want to setup 401ks for your kids?</h1>

    <div class="read-more container">
      <div class="row">
        <div class="col-md-1 col-sm-3" @click="showMoreText">
          <div class="more-btn">
            <img class="more-btn-img" src="@/assets/images/continue.svg" />
          </div>
        </div>
        <p class="col-md-11 col-sm-9 the-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel
          erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
          congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
          aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
          ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec
          vitae dui eget tellus gravida venenatis. Integer fringilla congue eros
          non fermentum. Sed dapibus pulvinar nibh tempor porta.
        </p>
      </div>
    </div>

    <div class="add-401k-cont row">
      <div
        class="add401k clickable shadow5"
        :class="{ selected: plan.uuid == activePlan.uuid }"
        v-for="(plan, n) in plans"
        :key="n"
        @click="changeActivePlan(plan.uuid)"
      >
        <div class="overflow-hidden">
          <p class="title">
            <strong>{{ plan.accountName || "No Name" }}</strong>
          </p>
          <p class="apr" v-show="plan.apr > 0">{{ plan.apr + "% APR" }}</p>
          <p class="year" v-show="plan.withdrawDate">
            {{ plan.withdrawDate | formatDate }}
          </p>
        </div>
        <div class="delete clickable bigger-sm" @click="removePlan(plan)">
          <img src="@/assets/images/minus.png" />
        </div>
      </div>

      <div class="add401k shadow5 bigger-sm" @click="startAddPlan">
        <img src="@/assets/images/plus.png" />
      </div>
    </div>

    <div class="details-cont" v-if="activePlan">
      <div class="d-flex row">
        <div class="col settings-list">
          <div
            class="row set clickable"
            v-for="set in settingsList"
            :key="set"
            @click="setActiveSetting(set)"
            :class="{ active: set === activeSetting }"
          >
            {{ set }}
          </div>
        </div>

        <div class="col settings">
          <transition name="bounce" mode="out-in">
            <component
              v-bind:is="componentFile"
              v-on:incomingData="setData"
              v-bind:activePlan="activePlan"
            ></component>
          </transition>

          <div class="continue-btn" @click="setActiveSetting(null)">
            <p class="clickable">
              continue<img
                class=" clickable right shadow3"
                src="@/assets/images/continue.svg"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default {
  data() {
    return {
      plans: [],
      activePlan: null,
      settingsList: [
        "name of account",
        "purpose",
        "kids",
        "withdraw date",
        "match",
        "max growth",
        "APR"
      ],
      activeSetting: null,
      complete: false
    };
  },
  mounted() {
    this.setActiveSetting(this.settingsList[0]);
  },
  filters: {
    formatDate(date) {
      return moment(date).format("MMM YYYY");
    }
  },
  methods: {
    setData(incoming) {
      this.activePlan[incoming.setting] = incoming.data;
      this.plans.forEach((element, n) => {
        if (element.uuid == this.activePlan.uuid) {
          this.plans[n] = this.activePlan;
        }
      });
    },
    showMoreText() {
      let el = this.$el.querySelector(".more-btn-img");
      let txt = this.$el.querySelector(".the-text");
      if (!el.classList.contains("flipped")) {
        el.classList.add("flipped");
        txt.classList.add("unhid");
      } else {
        el.classList.remove("flipped");
        txt.classList.remove("unhid");
      }
    },
    startAddPlan() {
      let uuid = uuidv4();
      var template = {
        accountName: null,
        children: [],
        purpose: null,
        withdrawDate: null,
        matchStatus: false,
        matchPeriod: null,
        matchPerPeriod: null,
        maxGrowth: null,
        maxGrowthStatus: false,
        apr: 0,
        uuid: uuid
      };
      this.plans.push(template);
      this.activePlan = template;
    },
    removePlan(ctx) {
      console.log(ctx);
      this.plans.forEach((element, n) => {
        if (element.uuid == ctx.uuid) {
          this.plans.splice(n, 1);
        }
      });
      if (this.plans.length == 0) {
        this.activePlan = null;
      }
    },
    setActiveSetting(name) {
      let index = this.settingsList.indexOf(this.activeSetting);

      if (index + 1 >= this.settingsList.length) {
        this.complete = true;
        this.activeSetting = "complete";
        return;
      }

      if (!name) {
        name = this.settingsList[index + 1];
      }

      this.activeSetting = name;
    },
    importComponent(path) {
      return () => import(`@/components/users/401k/${this.componentName}.vue`);
    },
    changeActivePlan(uuid) {
      alert(uuid);
      this.plans.forEach(element => {
        if(element.uuid === uuid){
          this.activePlan = element
        }
      });
    }
  },
  computed: {
    componentFile() {
      return this.importComponent(this.componentName);
    },
    componentName() {
      let name = "nameofaccount";
      if (this.activeSetting) {
        name = this.activeSetting.replace(/\s/g, "").toLowerCase();
      }
      return name;
    }
  }
};
</script>

<style scoped lang="scss">
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

.read-more {
  p {
    margin-top: 0px;
  }
  .more-btn {
    width: 35px;
    float: left;
    padding: 7.5px;
    img {
      transform: rotate(-90deg);
      transition: 0.25s all ease;
    }
    .flipped {
      transform: rotate(90deg);
    }
  }
  .the-text {
    overflow: hidden;
    height: 47.5px;
    transition: 0.4s all ease;
  }
  .unhid {
    height: 185px;
    max-height: 100%;
  }
}

.add-401k-cont {
  margin-top: 25px;
  .add401k {
    padding: 18.5px;
    width: 125px;
    height: 125px;
    border-radius: 25%;
    margin: 5px;
    border: 4px solid black;
    background-color: white;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    p:first-child {
      font-weight: bold;
    }
    p {
      display: inline-block;
      margin-top: 0px;
      margin-top: 0px;
      margin-bottom: 2px;
    }
    img {
      width: 50%;
      margin-top: 25%;
      margin-left: 25%;
    }
  }
  .delete {
    position: absolute;
    top: -10px;
    right: -8px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 4px solid black;
    background-color: white;
    z-index: 99;
    img {
      width: 50%;
      margin-top: 25%;
      margin-left: 25%;
    }
  }
}

.details-cont {
  margin-top: 25px;
  min-height: 400px;
  background-color: white;
  border: 4px solid black;
  border-radius: 25px;
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.411);
  padding: 16.5px 12.5px 12.5px 12.5px;

  .row {
    margin-right: 0px;
    margin-left: 0px;
  }
  .settings-list {
    max-width: 196px;
    border-right: 4px solid black;
    min-height: 345px;
    .active {
      color: black !important;
    }
    .set {
      margin-top: 9px;
      font-size: 24px;
      color: gray;
      font-weight: bold;
    }
    .set:first-child {
      margin-top: 3px;
    }
  }
}

.settings {
  padding: 1px 0px 5px 20px;
  padding-bottom: 25px;
  position: relative;
}

.continue-btn {
  opacity: 1;
  right: 7.5px;
  text-align: right;
  margin-right: 42px;
  opacity: 1;
  transition: 0.25s all ease;
  position: absolute;
  bottom: 0;
  margin-bottom: -21.5px;
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
.selected {
  background: rgb(147, 255, 161) !important;
}

@media only screen and (max-width: 600px) {
  .names-container {
    padding: 1.5em 1.8em;
    .container {
      padding-right: 0px;
      padding-left: 0px;
    }
    .unhid {
      height: 100%;
    }
  }
  .settings-list {
    display: none;
  }
}
</style>

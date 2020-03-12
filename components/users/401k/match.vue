<template>
  <div class="" ref="matchContainer">
    <div class="chart-container">
      <vue-c3 :handler="handler"></vue-c3>
    </div>
    <div class="match-container">
      <div class="row">
        <div class="col-8">
          <p>
            I want to match money that is placed in this account
          </p>
        </div>
        <div class="col-4 d-flex align-items-center">
          <div
            @click="toggleData"
            class="clickable yesno-btn yes"
            :class="{ yes: matchStatus, no: !matchStatus }"
          >
            {{ matchStatus | parser }}
          </div>
        </div>
      </div>
      <div class="row" v-show="matchStatus">
        <div class="col-12">
          <p>
            The max amount I will match is
            <span
              >$<input
                v-model="matchPerPeriod"
                placeholder="10"
                class="matchNum"
                type="number"
              />
            </span>
            a
            <select v-model="selectedPeriod" class="clickable">
              <option v-for="value in periods" :key="value" :value="value">{{
                value
              }}</option> </select
            >.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="info" v-show="matchStatus">
            If your child contributes up to the match
            <strong>${{ matchPerPeriod }}</strong> every
            <strong>{{ selectedPeriod }}</strong> they will save
            <strong>${{ upToTheMatch }}</strong> over
            <strong
              >{{ numberOfPeriods }} {{ selectedPeriod }}s ({{
                niceLookingDate
              }})</strong
            >.
          </p>
          <p class="info" v-show="!matchStatus">
            If your child contributes
            <strong>${{ matchPerPeriod }}</strong> every
            <strong>{{ selectedPeriod }}</strong> they will save
            <strong>${{ upToTheMatch }}</strong> over
            <strong
              >{{ numberOfPeriods }} {{ selectedPeriod }}s ({{
                niceLookingDate
              }})</strong
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueC3 from "vue-c3";
import "@/assets/css/c3.min.css";
import moment, { max } from "moment";

export default {
  components: {
    VueC3
  },
  props: ["activePlan"],
  data() {
    return {
      handler: new Vue(),
      matchStatus: false,
      matchPerPeriod: 10,
      selectedPeriod: "week",
      periods: ["day", "week", "month", "year", "quarter"]
    };
  },
  filters: {
    parser(boo) {
      if (boo) {
        return "Yes";
      } else {
        return "No";
      }
    }
  },
  mounted() {
    console.log(this.activePlan);

    this.computeChart(true);
    this.$el.querySelector("select").selectedIndex = this.periods.indexOf(
      this.activePlan.matchPeriod || this.selectedPeriod
    );

    this.matchStatus = this.activePlan.matchStatus || this.matchStatus;
    this.selectedPeriod = this.activePlan.matchPeriod || this.selectedPeriod;
    this.matchPerPeriod = this.activePlan.matchPerPeriod || this.matchPerPeriod;
  },
  methods: {
    toggleData() {
      this.matchStatus = !this.matchStatus;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    async computeChart(mounting) {
      let containerWidth = this.$refs.matchContainer.offsetWidth;
      let nPeriods = Math.round(
        Math.min(15, Math.max(this.numberOfPeriods, 1))
      );
      let now = moment();
      let selectedPeriod = this.selectedPeriod + "s";
      let withdrawDate = this.calculatedDate;
      let period = (withdrawDate.diff(now, selectedPeriod) + 1) / nPeriods;

      //console.log('nPeriods',nPeriods,period)

      let xTickArr = [];
      let contributions = ["contributions"];
      let match = ["match"];
      for (let index = 0; index < nPeriods; index++) {
        //X axis
        let addPeriod = period * (index + 1);
        let test = moment().add(addPeriod, selectedPeriod);
        let format = "ll";
        xTickArr.push(test.format(format));


        let divider = this.matchStatus?2:1
        let num = Number(this.upToTheMatch) * Number((index+1)/nPeriods);
        //match
        if (this.matchStatus) {
          match.push(num/divider);
        }

        //contributions
        contributions.push(num/divider);
      }

      const initialOptions = {
        data: {
          columns: [contributions, match],
          type: "bar",
          groups: [["contributions", "match"]]
        },
        size: {
          height: 155,
          width: containerWidth * 0.95
        },
        grid: {
          y: {
            show: true
          }
        },
        axis: {
          y: {
            tick: {
              format: function(d) {
                return "$" + Math.round(d);
              },
              count: 6
            }
          },
          x: {
            show: nPeriods > 6 ? false : true,
            type: "category",
            categories: xTickArr,
            height: 48,
            tick: {
              multiline: true,
              multilineMax: 2,
              fit: true
            }
          }
        }
      };

      if (mounting) {
        this.handler.$emit("init", initialOptions);
        return;
      }

      this.handler.$emit("dispatch", chart => {
        chart.load(initialOptions.data);
      });
    },
    inputChanged(key, data) {
      if (key) {
        let setting = key;
        let template = {
          setting,
          data
        };
        this.$emit("incomingData", template);
      }
    }
  },
  computed: {
    upToTheMatch() {
      let multiplier = this.matchStatus ? 2 : 1;
      return (
        (
          this.matchPerPeriod *
          Math.max(1, this.numberOfPeriods) *
          multiplier
        ).toFixed(0)
      );
    },
    numberOfPeriods() {
      let period = this.selectedPeriod + "s";
      let withdrawDate = this.calculatedDate;
      let today = moment();
      let diff = withdrawDate.diff(today, period, true);

      return diff.toFixed(2);
    },
    calculatedDate() {
      let period = this.selectedPeriod + "s";
      let isWithdrawDate = this.activePlan.withdrawDate ? true : false;
      let withdrawDate = isWithdrawDate
        ? moment(this.activePlan.withdrawDate)
        : moment(new Date()).add(10, period);
      return withdrawDate;
    },
    niceLookingDate() {
      return this.calculatedDate.format("ll");
    }
  },
  watch: {
    matchPerPeriod() {
      this.computeChart();
      this.inputChanged("matchPerPeriod", this.matchPerPeriod);
    },
    selectedPeriod() {
      this.computeChart(true);
      this.inputChanged("matchPeriod", this.selectedPeriod);
    },
    matchStatus() {
      this.computeChart(true);
      this.inputChanged("matchStatus", this.matchStatus);
      this.inputChanged("matchPeriod", this.selectedPeriod);
      this.inputChanged("matchPerPeriod", this.matchPerPeriod);
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  border: 3.3px solid black;
  border-radius: 12.5px;
  padding: 10px 5px 0px 0px;
}

.match-container {
  padding: 10px;
  width: 100%;
  position: relative;
  .yesno-btn {
    border: 3.3px solid black;
    border-radius: 22.5px;
    text-align: center;
    padding: 5px;
    width: 100%;
    margin-top: -15px;
  }
  .yes {
    background: rgba(63, 253, 88, 0.459);
  }
  .no {
    background: rgba(253, 91, 63, 0.459);
  }
  p {
    margin-bottom: 8px;
    margin-top: 8px;
  }
  input {
    font-size: 16px;
    width: 40px;
    border: none;
    text-align: center;
    border-bottom: 1.5px solid black;
  }
  select {
    font-size: 16px;
    width: 80px;
    background: white;
    border: none;
    text-align: center;
    border-bottom: 1.5px solid black;
    text-align-last: center;
  }
}
</style>

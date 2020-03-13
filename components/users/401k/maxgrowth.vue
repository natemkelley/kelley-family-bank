<template>
  <div class="" ref="matchContainer">
    <div class="chart-container">
      <vue-c3 :handler="handler"></vue-c3>
    </div>
    <div class="match-container">
      <div class="row">
        <div class="col-8">
          <p>
            I want to place a cap on how much this account can earn
          </p>
        </div>
        <div class="col-4 d-flex align-items-center">
          <div
            @click="toggleData"
            class="clickable yesno-btn yes"
            :class="{ yes: maxGrowthStatus, no: !maxGrowthStatus }"
          >
            {{ maxGrowthStatus | parser }}
          </div>
        </div>
      </div>
      <div class="row number-cont d-flex justify-content-center">
        <div class="input-cont" v-show="maxGrowthStatus">
          <input type="number" v-model="maxGrowth" placeholder="500" />
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
  props: ["activePlan"],
  components: {
    VueC3
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
  data() {
    return {
      handler: new Vue(),
      maxGrowthStatus: false,
      matchStatus: false,
      matchPerPeriod: 10,
      maxGrowth: 500,
      selectedPeriod: "week",
      periods: ["day", "week", "month", "year", "quarter"]
    };
  },

  mounted() {
    console.log(this.activePlan);
    this.matchStatus = this.activePlan.matchStatus || this.matchStatus;
    this.selectedPeriod = this.activePlan.matchPeriod || this.selectedPeriod;
    this.matchPerPeriod = this.activePlan.matchPerPeriod || this.matchPerPeriod;
    this.maxGrowthStatus =
      this.activePlan.maxGrowthStatus || this.maxGrowthStatus;
    this.maxGrowth = this.activePlan.maxGrowth || this.maxGrowth;

    this.computeChart(true);
  },
  methods: {
    async computeChart(mounting) {
      //set width
      let containerWidth = this.$refs.matchContainer.offsetWidth;

      //compute periods
      let nPeriods = Math.round(
        Math.min(15, Math.max(this.numberOfPeriods, 1))
      );
      let now = moment();
      let selectedPeriod = this.selectedPeriod + "s";
      let withdrawDate = this.calculatedDate;
      let period = (withdrawDate.diff(now, selectedPeriod) + 1) / nPeriods;

      //declare arrays
      let xTickArr = [];
      let contributions = ["contributions"];
      let match = ["match"];

      for (let index = 0; index < nPeriods; index++) {
        //X axis
        let addPeriod = period * (index + 1);
        let test = moment().add(addPeriod, selectedPeriod);
        let format = "ll";
        xTickArr.push(test.format(format));

        let divider = this.matchStatus ? 2 : 1;
        let num = Number(this.upToTheMatch) * Number((index + 1) / nPeriods);
        let matchTotal = (num / divider) * Number(Boolean(this.matchStatus));
        let contTotal = num / divider;
        let total = matchTotal + contTotal;

        if (total >= this.maxGrowth && this.maxGrowthStatus) {
          if (this.matchStatus) {
            match.push(this.maxGrowth / divider);
          }
          contributions.push(this.maxGrowth / divider);
        } else {
          if (this.matchStatus) {
            match.push(num / divider);
          }
          contributions.push(num / divider);
        }
      }

      //console.log(contributions, match);

      const initialOptions = {
        data: {
          columns: [contributions, match],
          type: "bar",
          groups: [["contributions", "match"]]
        },
        size: {
          height: 165,
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
            show: nPeriods > 7 ? false : true,
            type: "category",
            categories: xTickArr,
            height: 50,
            tick: {
              multiline: true,
              multilineMax: 3,
              fit: false
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
    toggleData() {
      this.maxGrowthStatus = !this.maxGrowthStatus;
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
    upToTheMatch() {
      let multiplier = this.matchStatus ? 2 : 1;
      return (
        this.matchPerPeriod *
        Math.max(1, this.numberOfPeriods) *
        multiplier
      ).toFixed(2);
    }
  },
  watch: {
    maxGrowthStatus() {
      this.computeChart();
      this.inputChanged("maxGrowthStatus", this.maxGrowthStatus);
      this.inputChanged("maxGrowth", this.maxGrowth);
    },
    maxGrowth() {
      this.computeChart();
      this.inputChanged("maxGrowth", this.maxGrowth);
    },
    activePlan() {
      this.matchStatus = this.activePlan.matchStatus || false;
      this.selectedPeriod = this.activePlan.matchPeriod || 'week';
      this.matchPerPeriod =
        this.activePlan.matchPerPeriod || 10;
      this.maxGrowthStatus =
        this.activePlan.maxGrowthStatus || false;
      this.maxGrowth = this.activePlan.maxGrowth || this.maxGrowth;

      this.computeChart(true);
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
    margin-top: -7.5px;
  }
  .yes {
    background: rgba(63, 253, 88, 0.459);
  }
  .no {
    background: rgba(253, 91, 63, 0.459);
  }

  input {
    border: none;
    border-bottom: 2px solid #707070;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    width: 100%;
    max-width: 230px;
  }

  .number-cont {
    margin-top: -4px;
  }
}
</style>

<template>
  <div class="" ref="matchContainer">
    <div class="chart-container">
      <vue-c3 :handler="handler"></vue-c3>
    </div>
    <div class="match-container">
      <h1 class="text-center">What will the APR be?</h1>

      <div class="row number-cont d-flex justify-content-center">
        <div class="input-cont">
          <input type="number" v-model="apr" placeholder="0%" step="0.1" />
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
import tmv from "tvm-calculator";

export default {
  props: ["activePlan"],
  components: {
    VueC3
  },
  data() {
    return {
      handler: new Vue(),
      maxGrowthStatus: false,
      matchStatus: false,
      matchPerPeriod: 10,
      maxGrowth: 500,
      apr: 4,
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
    this.apr = this.activePlan.apr || this.apr;

    this.computeChart(true);
    this.computeInterest();
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
      let interest = ["interest"];

      for (let index = 0; index < nPeriods; index++) {
        //X axis
        let addPeriod = period * (index + 1);
        let addTimeFrame = moment().add(addPeriod, selectedPeriod);
        let format = this.activePlan.matchPeriod == "year" ? "YYYY" : "ll";
        xTickArr.push(addTimeFrame.format(format));

        //compute match totals
        let matchTotal =
          this.matchPerPeriod * (index + 1) * Boolean(this.matchStatus);

        //compute contribution totals
        let contributionsTotal = this.matchPerPeriod * (index + 1);

        //compute interest totals
        let timeDifferenceInMonths = addTimeFrame.diff(now, "months", true);
        let presentValue = 0;
        let payment =
          Number(this.matchPerPeriod) +
          Number(this.matchPerPeriod * Boolean(this.matchStatus));
        let paymentPerMonth = payment / 12;
        let paymentFrequency = this.paymentFrequencyCalculated;
        let nper = timeDifferenceInMonths;
        let rate = this.apr;
        let interestTotal = this.computeInterest(
          presentValue,
          payment,
          nper,
          rate,
          paymentFrequency
        );

        //total
        let total = matchTotal + contributionsTotal + interest;

        //if total greater than max divide both by two
        let divider = this.matchStatus ? 2 : 1;

        //match
        if (this.matchStatus) {
          match.push(matchTotal);
        }
        //contributions
        contributions.push(contributionsTotal);
        interest.push(interestTotal);
      }

      console.log(interest, contributions);

      const initialOptions = {
        data: {
          columns: [contributions, match, interest],
          type: "bar",
          groups: [["contributions", "match", "interest"]]
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
    inputChanged(key, data) {
      if (key) {
        let setting = key;
        let template = {
          setting,
          data
        };
        this.$emit("incomingData", template);
      }
    },
    computeInterest(presentValue, pmt, nper, rate, paymentFrequency) {
      let params = {
        pv: -presentValue,
        pmt: -pmt,
        nper: nper,
        rate: rate,
        pf: paymentFrequency
      };

      const fv = tmv.calcFV(params);
      let totalPayments = Number(pmt) * Number(nper);
      let totalInterest = (fv - presentValue - totalPayments).toFixed(2);

      console.log(params);
      console.log("nper", nper, "total int", totalInterest);
      return Number(totalInterest);
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
    paymentFrequencyCalculated() {
      switch (this.selectedPeriod) {
        case "day":
          return 365;
        case "week":
          return 52;
        case "month":
          return 12;
        case "year":
          return 1;
        case "quarter":
          return 4;
        default:
          return 12;
      }
    }
  },
  watch: {
    apr() {
      this.computeChart();
      this.inputChanged("apr", this.apr);
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
  h1 {
    font-size: 24px;
  }
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

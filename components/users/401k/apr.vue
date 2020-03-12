<template>
  <div class="" ref="matchContainer">
    <div class="chart-container">
      <vue-c3 :handler="handler"></vue-c3>
    </div>
    <div class="match-container">
      <h1 class="text-center">What will the APR be?</h1>
      <div class="row number-cont d-flex justify-content-center">
        <div class="input-cont">
          <input type="number" v-model="apr" placeholder="4%" step="0.1" />
        </div>
      </div>
      <div class="row info">
        <p>{{ matchStatusText }}</p>
        <p>
          This will earn ${{ totalInterestComputed }} in interest and ${{
            totalMatchComputed
          }}
          of matched contributions
        </p>
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
      datNum: 4,
      maxedOutMatch:0,
      selectedPeriod: "week",
      periods: ["day", "week", "month", "year", "quarter"]
    };
  },
  mounted() {
    this.matchStatus = this.activePlan.matchStatus || this.matchStatus;
    this.selectedPeriod = this.activePlan.matchPeriod || this.selectedPeriod;
    this.matchPerPeriod = this.activePlan.matchPerPeriod || this.matchPerPeriod;
    this.maxGrowthStatus =
      this.activePlan.maxGrowthStatus || this.maxGrowthStatus;
    this.maxGrowth = this.activePlan.maxGrowth || this.maxGrowth;
    this.apr = this.activePlan.apr;

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
        let format = "ll";
        xTickArr.push(addTimeFrame.format(format));

        let divider = this.matchStatus ? 2 : 1;
        let amountAtPeriod =
          Number(this.upToTheMatch) * Number((index + 1) / nPeriods);
        let matchTotal =
          (amountAtPeriod / divider) * Number(Boolean(this.matchStatus));
        let contTotal = amountAtPeriod / divider;

        //compute interest
        let timeDifferenceInMonths = addTimeFrame.diff(
          now,
          this.selectedPeriod,
          true
        );
        let payment =
          Number(this.matchPerPeriod) +
          Number(this.matchPerPeriod * Boolean(this.matchStatus));
        let interestTotal = this.computeInterest(
          0,
          payment,
          timeDifferenceInMonths
        );

        let total = matchTotal + contTotal + interestTotal;

        if (total >= Number(this.maxGrowth) && this.maxGrowthStatus) {
          let datint = interest[interest.length - 1];
          let leftover = Number(this.maxGrowth) - datint;
          interest.push(datint);
          if (this.matchStatus) {
            match.push(leftover / divider);
            this.maxedOutMatch = (leftover / divider);
          }
          contributions.push(leftover / divider);
        } else {
          if (this.matchStatus) {
            match.push(amountAtPeriod / divider);
          }
          contributions.push(amountAtPeriod / divider);
          interest.push(interestTotal);
        }
      }

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
    computeInterest(presentValue, pmt, nper, apr, paymentFrequency) {
      if (this.apr == 0) {
        return 0;
      }

      let params = {
        pv: -presentValue,
        pmt: -pmt,
        nper: nper,
        rate: this.apr || apr,
        pf: paymentFrequency || this.paymentFrequencyCalculated,
        cf: 12
      };

      const fv = tmv.calcFV(params);
      let totalPayments = Number(pmt) * Number(nper);
      let totalInterest = Number(
        (fv - presentValue - totalPayments).toFixed(2)
      );

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
    },
    upToTheMatch() {
      let multiplier = this.matchStatus ? 2 : 1;
      return (
        this.matchPerPeriod *
        Math.max(1, this.numberOfPeriods) *
        multiplier
      ).toFixed(2);
    },
    matchStatusText() {
      var text = "This assumes ";

      if (this.matchStatus) {
        text =
          text +
          "a matched contribution of $" +
          this.matchPerPeriod +
          " every " +
          this.selectedPeriod;
      } else {
        text =
          text +
          "a contribution of $" +
          this.matchPerPeriod +
          " every " +
          this.selectedPeriod;
      }

      text = text + ", an interest rate of " + this.apr + "%";

      if (this.maxGrowthStatus) {
        text = text + ", a max growth of $" + this.maxGrowth;
      }

      if (this.withdrawDate) {
        text =
          text +
          ", and a withdrawal date of " +
          moment(this.withdrawDate).format("LL") +
          ".";
      } else {
        text =
          text +
          ", and goes until " +
          moment(new Date())
            .add(10, this.selectedPeriod)
            .format("LL") +
          ".";
      }

      return text;
    },
    totalInterestComputed() {
      let timeDifferenceInMonths = this.calculatedDate.diff(
        moment(),
        this.selectedPeriod,
        true
      );

      let payment =
        Number(this.matchPerPeriod) +
        Number(this.matchPerPeriod * Boolean(this.matchStatus));

      let interestTotal = this.computeInterest(
        0,
        payment,
        timeDifferenceInMonths
      );

      return interestTotal;
    },
    totalMatchComputed() {
      let multiplier = this.matchStatus ? 2 : 1;
      let money = (
        this.matchPerPeriod *
        Math.max(1, this.numberOfPeriods) *
        multiplier
      ).toFixed(2);
      if(money>this.maxGrowth){
        return this.maxedOutMatch
      }

      return money / 2;
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
    margin-top: 5px;
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

.info {
  p {
    margin-top: 5px;
  }
}
</style>

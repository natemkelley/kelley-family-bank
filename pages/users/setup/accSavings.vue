<template>
  <div class="bordered-container names-container">
    <h1>Setup your kids savings accounts</h1>

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

    <div class="row settings-cont">
      <div class="col-8" ref="chartContainer">
        <div class="chart-container">
          <vue-c3 :handler="handler"></vue-c3>
        </div>
      </div>
      <div class="settings col-4">
        <div class="input-cont">
          <h4>rate of return</h4>
          <PercentTicker
            :rateOfReturn="rateOfReturn"
            v-on:percent="updateRateOfReturn"
          />
          <p>
            per
            <select v-model="rateOfReturnPer" class="clickable">
              <option v-for="value in periods" :key="value" :value="value">{{
                value
              }}</option>
            </select>
          </p>
        </div>
        <div class="input-cont">
          <h4>starting balance</h4>
          <input v-model="startingBalance" type="number" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import tmv from "tvm-calculator";
import Vue from "vue";
import VueC3 from "vue-c3";
import "@/assets/css/c3.min.css";
import PercentTicker from "@/components/users/percent-ticker";

export default {
  data() {
    return {
      handler: new Vue(),
      rateOfReturn: 4,
      startingBalance: 500,
      maxReturnPer: "year",
      maxInAccount: null,
      rateOfReturnPer: "year",
      periods: ["day", "week", "month", "year", "quarter"]
    };
  },
  components: {
    VueC3,
    PercentTicker
  },
  mounted() {
    this.computeChart(true);
  },
  methods: {
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
    async computeChart(mounting) {
      //set width
      let containerWidth = this.$refs.chartContainer.offsetWidth;

      //compute periods
      let nPeriods = 7;
      let selectedPeriod = this.rateOfReturnPer;

      //declare arrays
      let xTickArr = [];
      let contributions = ["contributions"];
      let interest = ["interest"];

      for (let index = 0; index < nPeriods; index++) {
        //X axis
        let addPeriod = index;
        let addTimeFrame = moment().add(addPeriod, selectedPeriod);
        let format = "YYYY";
        xTickArr.push(addTimeFrame.format(format));

        //interest
        let payment = 0;
        let timeDifferenceInMonths = addTimeFrame.diff(
          moment(),
          selectedPeriod,
          true
        );
        let interestTotal = this.computeInterest(
          payment,
          timeDifferenceInMonths,
          selectedPeriod
        );

        contributions.push(this.startingBalance);
        interest.push(interestTotal);
      }

      const initialOptions = {
        data: {
          columns: [contributions, interest],
          type: "bar",
          groups: [["contributions", "interest"]]
        },
        size: {
          height: 185,
          width: containerWidth * 0.88
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
    updateRateOfReturn(val) {
      this.rateOfReturn = val;
    },
    computeInterest(pmt, nper, paymentFrequency) {
      let params = {
        pv: -this.startingBalance,
        pmt: -pmt,
        nper: nper * this.frequencyCalculated(paymentFrequency),
        rate: this.rateOfReturn,
        pf: 12,
        cf: 12
      };
      console.log(params);

      const fv = tmv.calcFV(params);
      let totalPayments = Number(pmt) * Number(nper);
      let totalInterest = Number(
        (fv - this.startingBalance - totalPayments).toFixed(2)
      );

      return Number(totalInterest);
    },
    frequencyCalculated(period) {
      switch (period) {
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
    startingBalance() {
      this.computeChart();
    },
    maxReturnPer() {
      this.computeChart();
    },
    maxInAccount() {
      this.computeChart();
    },
    rateOfReturnPer() {
      this.computeChart();
    },
    rateOfReturn() {
      this.computeChart();
    },
    maxInAccount(){
        this.computeChart();
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
}

.settings {
  h4 {
    margin-top: 0px;
    margin-bottom: 10px;
  }
  p {
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 0;
  }
  .input-cont {
    position: relative;
    border-bottom: 2px solid #e9e9e9;
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .input-cont:first-child {
    padding-top: 0px;
  }
  select {
    font-size: 24px;
    width: 130px;
    margin-left: 5px;
    background: white;
    border: none;
    text-align: center;
    border-bottom: 1.5px solid black;
    border-radius: 0;
    -moz-text-align-last: center;
    text-align-last: center;
  }
  input {
    font-size: 24px;
    width: 100%;
    border: none;
    text-align: center;
    border-bottom: 1.5px solid black;
  }
}

.settings-cont {
  padding-top: 20px;
  .chart-container {
    border: 3.3px solid black;
    border-radius: 12.5px;
    padding: 10px 10px 0px 0px;
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
</style>

<template>
  <div class="detail-comp">
    <h1>Withdrawal Date</h1>
    <div class="row">
      <div class="col-8">
        <p>
          I want this account to stop growing when my child turns a certain age.
          If you choose no, you can set a max growth amount under account max.
        </p>
      </div>
      <div class="col-4 d-flex align-items-center">
        <div
          @click="toggleData"
          class="yesno-btn yes clickable"
          :class="{ yes: data, no: !data }"
        >
          {{ data | parser }}
        </div>
      </div>
    </div>
    <div class="row datepicker" v-if="data">
      <div class="col">
        <p>
          This account will stop growing on:
          <datepicker
            input-class="datepicker-input clickable"
            wrapper-class="datepicker-wrapper"
            placeholder="Select Date"
            v-model="date"
            :disabled-dates="state.disabledDates"
            @closed="inputChanged"
          ></datepicker>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  props: ["activePlan"],
  components: {
    Datepicker
  },
  mounted() {
    this.data = this.activePlan.withdrawDate ? true : false;
    this.date = this.activePlan.withdrawDate
      ? this.activePlan.withdrawDate
      : null;
  },
  data() {
    return {
      data: true,
      date: null
    };
  },
  computed: {
    state() {
      let dd = {
        disabledDates: {
          to: new Date()
        }
      };

      return dd;
    }
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
  methods: {
    toggleData() {
      this.data = !this.data;
      this.inputChanged();
    },
    inputChanged() {
      let setting = "withdrawDate";
      let data = this.data ? this.date : null;
      let template = {
        setting,
        data
      };
      this.$emit("incomingData", template);
    }
  },
  watch: {
    activePlan() {
      this.data = this.activePlan.withdrawDate ? true : false;
      this.date = this.activePlan.withdrawDate
        ? this.activePlan.withdrawDate
        : null;
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
    margin-bottom: 0px;
  }

  .yesno-btn {
    border: 4px solid black;
    border-radius: 25px;
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: -15px;
  }
  .yes {
    background: rgba(63, 253, 88, 0.459);
  }
  .no {
    background: rgba(253, 91, 63, 0.459);
  }

  .datepicker {
    font-size: 16px;
    text-align: center;
    input {
      font-size: 16px;
    }
  }
}

.datepicker-wrapper {
  margin-top: 5px;
  border: 3px solid black;
  border-radius: 12.5px;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
</style>

<style>
.datepicker-input {
  text-align: center;
  font-size: 16px;
  padding: 5px;
}
</style>

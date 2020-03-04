<template>
  <div
    class="d-flex flex-column flex-md-row justify-content-center align-items-center"
  >
    <RichMan class="richMan d-flex align-items-center" />
    <div class="bordered-container speech-bubble-ds">
      <h1>WELCOME</h1>
      <p>This is a quick test to make sure that it is styled correctly</p>
      <p>This is a quick test to make sure that it is styled correctly</p>
      <p>This is a quick test to make sure that it is styled correctly</p>

      <div class="speech-bubble-ds-arrow"></div>
    </div>
  </div>
</template>

<script>
import RichMan from "@/components/users/richMan";

export default {
  name: "intro",
  components: { RichMan },
  props: ["test"],
  transition: "slide3d",
  mounted() {
    console.log(this.test);
  }
};
</script>

<style lang="scss" scoped>
.richMan {
  width: 25vw;
  min-width: 320px;
  margin-right: 30px;
}

.speech-bubble-ds {
  font-size: 1.2rem;
  line-height: 1.3;
  max-width: 370px;
  padding: 25px;
  position: relative;
  h1 {
    margin-top: 0px;
    margin-bottom: 5px;
  }
  p {
    margin: 0px;
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
  }
}

.speech-bubble-ds-arrow {
  left: 0px;
  margin-left: -26px;
  border-left: 21px solid transparent;
  border-top: 20px solid rgba(0, 0, 0, 0.42);
  bottom: 66%;
  position: absolute;
  transform: rotate(90deg);
}
.speech-bubble-ds-arrow::before {
  border-left: 30px solid transparent;
  border-top: 30px solid black;
  bottom: -5px;
  content: "";
  position: absolute;
  right: 2px;
}
.speech-bubble-ds-arrow::after {
  border-left: 21px solid transparent;
  border-top: 21px solid white;
  bottom: 4.6px;
  content: "";
  position: absolute;
  right: 6px;
}

@media (max-width: 767px) {
  .speech-bubble-ds-arrow {
    display: none;
  }
}
</style>

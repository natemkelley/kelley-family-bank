<template>
  <div class="bordered-container names-container">
    <h1>Do you want to setup 401ks for your kids?</h1>

    <div class="read-more container">
      <div class="row">
        <div class="col-1 more-btn" @click="showMoreText">
          <img class="more-btn-img" src="@/assets/images/continue.svg" />
        </div>
        <p class="col-11 the-text">
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

    <div class="d-flex justify-content-center input-cont">
      <label for="first">First</label>
      <input type="text" id="first" placeholder="First Name" />
    </div>
    <div class="d-flex justify-content-center input-cont">
      <label for="last">Last</label>
      <input type="text" id="last" placeholder="Last Name" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showMoreText() {
      let el = this.$el.querySelector(".more-btn-img");
      let txt = this.$el.querySelector('.the-text')
      console.log();
      if (!el.classList.contains("flipped")) {
        el.classList.add("flipped");
        txt.classList.add('unhid')
      } else {
        el.classList.remove("flipped");
                txt.classList.remove('unhid')
      }
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
</style>

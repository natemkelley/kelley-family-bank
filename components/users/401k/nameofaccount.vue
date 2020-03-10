<template>
  <div class="detail-comp">
    <h1>What would you like this account to be named?</h1>
    <div class="input-cont">
      <input type="text"  placeholder="Summer Camp" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.detail-comp {
  h1 {
      margin-top:3px;
    font-size: 24px;
    font-weight: bold;
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
    font-weight: bold;
    padding-bottom: 10px;
    width:100%;
  }
  .input-cont {
      margin-top: 30px;
    padding: 15px;
  }
}
</style>

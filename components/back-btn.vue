<template>
    <div class="circle">
        <div class="triangle-left"></div>
        </div>
</template>

<style lang="scss" scoped>
.circle {
  width: 30px;
  height: 30px;
  padding-bottom: 5.75%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: white;
  position: relative;
  border: 2.5px solid black;
}
.circle:before {
content: '';
    display: block;
    border-top: solid 5px transparent;
    border-right: solid 5px black;
    border-bottom: solid 5px transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5.5px 0 0 -3px;
}
</style>
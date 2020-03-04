<template>
  <div>intro comp</div>
</template>

<script>
export default {
  name: "intro",
  props: ["test"],
  transition:'slide3d',
  mounted() {
    console.log(this.test);
  }
};
</script>

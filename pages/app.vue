<template>
  <div>
    <h1>App</h1>
    <NuxtLink to="/">
      root
    </NuxtLink>
    <NuxtLink to="/test">
      test
    </NuxtLink>
  </div>
</template>

<script>
export default {
    middleware: 'router-auth',
  mounted() {
    console.log("mounted app");
  },
  methods: {}
};
</script>

<style></style>

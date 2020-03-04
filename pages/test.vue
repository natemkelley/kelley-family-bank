<template>
  <div>
    <h1>Testing</h1>
    <NuxtLink to="/">
      root
    </NuxtLink>
    <NuxtLink to="/app">
      app
    </NuxtLink>
    <NuxtLink to="/test">
      test
    </NuxtLink>
    <NuxtLink to="/test/one">
      One
    </NuxtLink>
    <div class="content">
      <NuxtChild
        key="one"
        keep-alive
        :test="'RESOLVE_PLZ'"
        v-on:myEvent="test"
      />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("mounted test", this.testProp);
  },
  methods: {
    test(variable) {
      console.log("here", variable);
    }
  }
};
</script>

<style>

</style>

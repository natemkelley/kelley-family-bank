<template>
  <div class="setup">
    <NuxtLink to="/users/setup">
      setup link
    </NuxtLink>
    <NuxtLink to="/users/setup/intro">
      intro link
    </NuxtLink>
    <NuxtLink to="/users/setup/names">
      names link
    </NuxtLink>
    <NuxtLink to="/users/setup/familyName">
      names link
    </NuxtLink>

    <NuxtChild :test="'RESOLVE_PLZ'" />
  </div>
</template>

<script>
export default {
  name: "setup",
  transition: "slide3d",
  layout: "setup",
  data() {
    return {
      setupOrder: [
        "intro",
        "names",
        "familyName",
        "familyUsername",
        "familyPassword",
        "numberOfKids",
        "kidsSetup",
        "acc401K",
        "accSavings"
      ]
    };
  },
  created() {
    let array = this.setupOrder;
    let setupTutorial = this.$store.state.account.setupTutorial;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (!setupTutorial[element]) {
        /*this.$router.push({
            path: '/users/setup/'+element
        })    */    
        return
      }
    }
  },
  methods: {}
};
</script>

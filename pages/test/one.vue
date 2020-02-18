<template>
    <div>
        <h1>One</h1>
    </div>
</template>

<script>
export default {
      props: ["test"],
  mounted(){
    console.log(this.test) //RESOLVE_PLZ
    this.$emit('myEvent','it worked home boy')
  }
}
</script>
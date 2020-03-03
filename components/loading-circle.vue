<template>
    <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  border: 6px solid $blue;
  border-radius: 50%;
  border-top: 6px solid $foam-green;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 0.65s linear infinite; /* Safari */
  animation: spin 0.65s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
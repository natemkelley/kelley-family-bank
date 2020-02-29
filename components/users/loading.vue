<template>
    <div class="loading">
        <LoadingBalls class="balls" />
    </div>
</template>

<script>
import LoadingBalls from '@/components/loading-three-dots'
export default {
    components:{LoadingBalls}
}
</script>

<style scoped>
.loading{
    width: 100%;
}
.balls{
    transform: scale(2.5);
    margin-top: 35px;
}
</style>


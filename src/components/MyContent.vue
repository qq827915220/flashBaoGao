<template>
    <Content class="main-container">
        <MyCanvas></MyCanvas>
    </Content>
</template>

<script>
import MyCanvas from './canvas/MyCanvas'

export default {
    name: 'MyContent',
    props: {},
    components: {
        MyCanvas
    },
    data () {
        return {}
    },
    mounted () {

    },
    methods: {}
}
</script>

<style lang="scss">
.main-container {
    flex: 1;
}
</style>

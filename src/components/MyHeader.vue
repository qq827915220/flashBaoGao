<template>
  <Header id="header">

    <ButtonGroup class="btn-area">
      <!--<Button type="warning">全屏</Button>-->
      <Button type="success" @click="submitPage">提交设计页</Button>
      <!--<Button type="error">提交全部</Button>-->
    </ButtonGroup>
  </Header>
</template>

<script>
  export default {
    name: 'MyHeader',
    props: {},
    data() {
      return {}
    },
    methods: {
      submitPage() {
        this.$bus.$emit('submitPage')
      }
    }
  }
</script>

<style lang="scss">
  #header {
    height: 48px;
    line-height: 48px;
    padding: 0 0 0 20px;
    & > div {
      display: inline-block;
    }
    .logo-area {
      font-size: 16px;
      font-weight: bold;
    }
    .btn-area {
      float: right;
      padding: 8px;
    }
  }
</style>

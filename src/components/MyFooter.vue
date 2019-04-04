<template>
  <Footer id="footer">
    <Button type="primary" @click="changeState">
      图片列表
      <Icon type="ios-arrow-down" v-if="listState" />
      <Icon type="ios-arrow-up" v-else />
    </Button>
    <div :class="{'list-box': true, 'active': listState}">
      <div class="select-images" @click="modalState = true">
        <Icon type="md-images" size="25" color="#999" />
        <div>从款式库选图</div>
      </div>
    </div>
    <Modal
        v-model="modalState"
        width="80%"
        height="80%"
        :z-index="1027"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <Tabs type="card">
          <TabPane label="图片库">
            <div class="select-box">
              <Button type="primary">筛选条件</Button>
              <Page :total="100" show-total show-elevator style="float:right" />
              <div class="card-box">
                <Card>
                  <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                <Card>
                  <p slot="title">No border title</p>
                  <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                <Card>
                  <p slot="title">No border title</p>
                  <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                <Card>
                  <p slot="title">No border title</p>
                  <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
              </div>
            </div>
          </TabPane>
          <TabPane label="选中的图片">选中的图片</TabPane>
        </Tabs>
    </Modal>
  </Footer>
</template>

<script>
  export default {
    name: 'MyFooter',
    props: {},
    data() {
      return {
        listState: true,
        modalState: false
      }
    },
    methods: {
      changeState() {
        this.listState = !this.listState;
      }
    }
  }
</script>

<style lang="scss">
  #footer {
    padding: 0;
    &>button {
      margin-left: 10px;
    }
    .list-box {
      height: 10px;
      overflow: hidden;
      transition: height ease-in-out 0.2s;
      &.active {
        height: 240px;
      }
      .select-images {
        width: 160px;
        height: 220px;
        margin: 10px;
        color: #999;
        text-align: center;
        cursor: pointer;
        border: 1px dashed #ccc;
        i {
          margin-top: 85px;
        }
      }
    }
  }
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      max-height: 80%;
      top: 0;
      .ivu-modal-content {
        height: 100%;
      }
    }
    .select-box {
      padding: 10px 10px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
      .card-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-left: -10px;
        height: 52vh;
        overflow-y: scroll;
        .ivu-card {
          width: 205px;
          height: 260px;
          margin-left: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

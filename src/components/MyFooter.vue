<template>
  <Footer id="footer">
    <Button type="primary" @click="changeState">
      图片列表
      <Icon type="ios-arrow-down" v-if="listState" />
      <Icon type="ios-arrow-up" v-else />
    </Button>
    <div :class="{'list-box': true, 'active': listState}">
      <div class="select-images" @click="styleImgState = true">
        <Icon type="md-images" size="25" color="#999" />
        <div>从款式库选图</div>
      </div>
    </div>
    <Modal
        v-model="selectState"
        width="80%"
        :z-index="1053"
        :mask-closable="false"
        class-name="select-modal">
        <Form :model="selectForm">
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="时间">
                <DatePicker :value="selectForm.times" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择时间段"/>
              </FormItem>
              <FormItem label="行业">
                <Select v-model="selectForm.city" placeholder="请选择行业">
                  <Option v-for="item in selectData.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="性别">
                <Select v-model="selectForm.sex" placeholder="请选择性别">
                  <Option v-for="item in selectData.sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="12">2</Col>
          </Row>
          <Row style="text-align:center;">
            <Button type="primary">搜索</Button>
          </Row>
          <Row :gutter="16">
            <Col :span="12">3</Col>
            <Col :span="12">4</Col>
          </Row>
        </Form>
    </Modal>
    <Modal
        v-model="styleImgState"
        width="90%"
        :z-index="1027"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <Tabs type="card">
          <TabPane label="图片库">
            <div class="select-box">
              <Button type="primary" class="select-btn" @click="selectState = true">筛选条件</Button>
              <Page :total="100" show-total show-elevator />
            </div>
            <Row :gutter="16" class="card-box">
              <Col :xs="8" :sm="8" :md="6" :lg="6" :xl="4">
                <Card :padding="4">
                  <div class="top">
                    <img src="http://101.132.178.141/img-loading.png" alt="">
                  </div>
                  <div class="brand-name">F.R.S For Restless Sleepers</div>
                  <div class="bottom">
                    <div class="left">单品：<span title="test">testtesttesttesttesttest</span></div>
                    <div class="right">品名：<span title="test">testtesttesttesttesttest</span></div>
                  </div>
                  <Icon class="mg-icon" size="30" color="#2d8cf0" type="ios-add-circle-outline" />
                  <span class="pitch-icon">选中</span>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="选中的图片">
            <Row :gutter="16" class="card-box" style="height:100%;">
              <Col :xs="8" :sm="8" :md="6" :lg="6" :xl="4">
                <Card :padding="4">
                  <div class="top">
                    <img src="http://101.132.178.141/img-loading.png" alt="">
                  </div>
                  <div class="caption">testtesttesttesttesttesttesttesttesttesttesttest</div>
                  <span class="close-icon">
                    <Icon type="md-close" />
                  </span>
                </Card>
              </Col>
            </Row>
          </TabPane>
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
        styleImgState: false,
        selectState: false,
        selectForm: {
          times: '',
          city: 0,
          sex: 0,
        },
        selectData: {
          cityList: [
            // {
            //   value: 0,
            //   label: '请选择'
            // },
            {
              value: 1,
              label: '毛衫'
            },
            {
              value: 2,
              label: '牛仔'
            },
            {
              value: 3,
              label: '皮革/皮草'
            },
            {
              value: 4,
              label: '内衣/泳装/家居服'
            },
            {
              value: 5,
              label: '婚纱/礼服'
            },
            {
              value: 6,
              label: '运动'
            },
            {
              value: 7,
              label: '服饰品（配饰）'
            },
            {
              value: 8,
              label: '成衣'
            }
          ],
          sexList: [
            // {
            //   value: 0,
            //   label: '请选择'
            // },
            {
              value: 1,
              label: '男装'
            },
            {
              value: 2,
              label: '女装'
            },
            {
              value: 3,
              label: '男童'
            },
            {
              value: 4,
              label: '女童'
            },
            {
              value: 5,
              label: '童装'
            }
          ]
        },
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
        border: 1px dashed #dcdee2;
        i {
          margin-top: 85px;
        }
      }
    }
  }
  .select-modal {
    .ivu-form-item-content>div {
      width: 400px;
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
        .ivu-modal-body {
          padding-bottom: 0;
          .ivu-tabs-tabpane {
            height: 60vh;
          }
        }
      }
    }
    .select-box {
      padding: 10px;
      margin-bottom: 16px;
      border-radius: 5px;
      border: 1px solid #dcdee2;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      line-height: 35px;
      .select-btn {
        height: 35px;
        margin-right: 10px;
      }
    }
    .card-box {
      width: 100%;
      height: 52vh;
      margin-left: 0!important;
      margin-right: 0!important;
      overflow-y: scroll;
      .ivu-col {
        margin-bottom: 10px;
        .ivu-card {
          width: 100%;
          height: 100%;
          position: relative;
          font-size: 15px;
          overflow: hidden;
          &:hover {
            border: 1px solid #2d8cf0;
          }
          .top {
            text-align: center;
            img {
              max-width: 100%;
              height: 200px;
            }
          }
          .brand-name {
            position: absolute;
            text-align: center;
            left: 4px;
            top: 184px;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            width: calc(100% - 8px);
          }
          .caption {
            padding: 9px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .bottom {
            display: flex;
            text-align: center;
            width: 100%;
            height: 50px;
            padding: 15px 0;
            div {
              width: 50%;
              max-width: 140px;
              padding: 0 5px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .mg-icon {
            position: absolute;
            top: 10px;
            left: 10px;
            font-weight: bold;
            cursor: pointer;
            &::after {
              content: "";
              width: 10px;
              height: 0;
              border-bottom: 2px solid #2d8cf0;
              position: absolute;
              bottom: 2px;
              right: -2px;
              transform: rotate(45deg);
            }
          }
          .pitch-icon {
            display: block;
            font-size: 14px;
            color: #fff;
            height: 24px;
            width: 100px;
            position: absolute;
            top: 4px;
            right: -32px;
            text-align: center;
            line-height: 24px;
            background-color: #2d8cf0;
            transform: rotate(45deg);
          }
          .close-icon {
            display: block;
            font-size: 14px;
            color: #fff;
            height: 30px;
            width: 30px;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            padding-left: 10px;
            line-height: 25px;
            background-color: #ccc;
            border-radius: 0 0 0 36px/0 0 0 36px;
            transition: background-color ease 0.2s;
            &:hover {
              background-color: #2d8cf0;
            }
          }
        }
      }
    }
  }
</style>

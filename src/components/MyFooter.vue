<template>
  <Footer id="footer">
    <Button type="primary" @click="changeFooterState">
      图片列表
      <Icon type="ios-arrow-down" v-if="footerState" />
      <Icon type="ios-arrow-up" v-else />
    </Button>
    <div :class="{'list-box': true, 'active': footerState}">
      <div class="select-images" @click="styleImgBoxState = true">
        <Icon type="md-images" size="25" color="#999" />
        <div>从款式库选图</div>
      </div>
      <div class="item-box" ref="showStyleImgBox">
        <div v-for="(v, i) in showStyleImgList" :key="i">
          <img :src="v.url" alt="">
          <Icon class="close" type="md-close-circle" @click="delShowStyleImg(i)" />
        </div>
      </div>
    </div>
    <Modal
        v-model="selectBoxState"
        width="80%"
        :z-index="1053"
        :mask-closable="false"
        :footer-hide="true"
        class-name="vertical-center-modal select-modal">
        <div class="select-form-box">
          <Form :model="selectForm" :label-width="120">
            <Row :gutter="16">
              <Col :span="12">
                <FormItem label="时间">
                  <DatePicker @on-change="selectForm.times = $event" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择时间段" />
                </FormItem>
                <FormItem label="行业">
                  <Select v-model="selectForm.industry" placeholder="请选择行业">
                    <Option v-for="item in selectData.industryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="性别">
                  <Select v-model="selectForm.sex" placeholder="请选择性别">
                    <Option v-for="item in selectData.sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="季节">
                  <Select v-model="selectForm.season" placeholder="请选择季节">
                    <Option v-for="item in selectData.seasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="风格">
                  <Select v-model="selectForm.style" placeholder="请选择风格">
                    <Option v-for="item in selectData.styleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="地区">
                  <Select v-model="selectForm.area" placeholder="请选择地区">
                    <Option v-for="item in selectData.areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="关键词">
                  <Input type="text" v-model="selectForm.antistop" placeholder="请选择关键词" />
                </FormItem>
                <FormItem label="栏目">
                  <Row :gutter="16" class="group">
                    <Col :span="12">
                      <Select v-model="selectForm.column" placeholder="请选择栏目">
                        <Option v-for="item in selectData.columnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                    <Col :span="12">
                      <Select v-model="selectForm.columnSon" placeholder="请选择子栏目">
                        <Option v-for="item in selectData.columnSonList[selectForm.column]" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="单品">
                  <Row :gutter="16" class="group">
                    <Col :span="12">
                      <Select v-model="selectForm.category" placeholder="请选择单品">
                        <Option v-for="item in selectData.categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                    <Col :span="12">
                      <Select v-model="selectForm.categorySon" placeholder="请选择品名">
                        <Option v-for="item in selectData.categorySonList[selectForm.category]" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="图案内容">
                  <Select v-model="selectForm.patternDetail" placeholder="请选择图案内容">
                    <Option v-for="item in selectData.patternDetailList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="元素">
                  <Row :gutter="16" class="group">
                    <Col :span="12">
                      <Select v-model="selectForm.element" placeholder="请选择元素">
                        <Option v-for="item in selectData.elementList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                    <Col :span="12">
                      <Select v-model="selectForm.elementSon" placeholder="请选择子元素">
                        <Option v-for="item in selectData.elementSonList[selectForm.element]" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
            <Row style="text-align:center;margin-bottom:24px;">
              <Button type="primary" @click="searchFunc">搜索</Button>
            </Row>
            <Row :gutter="16">
              <Col :span="12">
                <FormItem label="年龄层">
                  <Select v-model="selectForm.ageGroup" placeholder="请选择">
                    <Option v-for="item in selectData.ageGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="轮廓外形状">
                  <Select v-model="selectForm.outline" placeholder="请选择">
                    <Option v-for="item in selectData.outlineList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="长短度">
                  <Select v-model="selectForm.length" placeholder="请选择">
                    <Option v-for="item in selectData.lengthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="材质">
                  <Select v-model="selectForm.texture" placeholder="请选择">
                    <Option v-for="item in selectData.textureList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="针织纱线原料">
                  <Select v-model="selectForm.yarnMaterial" placeholder="请选择">
                    <Option v-for="item in selectData.yarnMaterialList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="针织织法">
                  <Select v-model="selectForm.weave" placeholder="请选择">
                    <Option v-for="item in selectData.weaveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="皮革/皮草肌理">
                  <Select v-model="selectForm.leather" placeholder="请选择">
                    <Option v-for="item in selectData.leatherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="(牛仔/单宁)大类">
                  <Select v-model="selectForm.cowboy" placeholder="请选择">
                    <Option v-for="item in selectData.cowboyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="面料属性1">
                  <Select v-model="selectForm.fabricAttr" placeholder="请选择">
                    <Option v-for="item in selectData.fabricAttrList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="辅料大类">
                  <Select v-model="selectForm.ingredient" placeholder="请选择">
                    <Option v-for="item in selectData.ingredientList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="辅料形状">
                  <Select v-model="selectForm.ingredientShape" placeholder="请选择">
                    <Option v-for="item in selectData.ingredientShapeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="(图案)基本特征">
                  <Select v-model="selectForm.patternFeature" placeholder="请选择">
                    <Option v-for="item in selectData.patternFeatureList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="皮革/皮草基本特征1">
                  <Select v-model="selectForm.leatherFeature" placeholder="请选择">
                    <Option v-for="item in selectData.leatherFeatureList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="混色">
                  <Select v-model="selectForm.colourMixture" placeholder="请选择" placement="top-start">
                    <Option v-for="item in selectData.colourMixtureList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="穿着">
                  <Select v-model="selectForm.dressed" placeholder="请选择">
                    <Option v-for="item in selectData.dressedList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="宽松度">
                  <Select v-model="selectForm.fitness" placeholder="请选择">
                    <Option v-for="item in selectData.fitnessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="款式部位-部位">
                  <Select v-model="selectForm.stylePart" placeholder="请选择">
                    <Option v-for="item in selectData.stylePartList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="针织大类">
                  <Select v-model="selectForm.knit" placeholder="请选择">
                    <Option v-for="item in selectData.knitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="针织类型">
                  <Select v-model="selectForm.knitType" placeholder="请选择">
                    <Option v-for="item in selectData.knitTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="拼接组合">
                  <Select v-model="selectForm.jointGroup" placeholder="请选择">
                    <Option v-for="item in selectData.jointGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="(牛仔/单宁)基本特征">
                  <Select v-model="selectForm.cowboyFeature" placeholder="请选择">
                    <Option v-for="item in selectData.cowboyFeatureList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="(牛仔/单宁)原料">
                  <Select v-model="selectForm.cowboyMaterial" placeholder="请选择">
                    <Option v-for="item in selectData.cowboyMaterialList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="面料工艺">
                  <Select v-model="selectForm.pabr" placeholder="请选择">
                    <Option v-for="item in selectData.pabrList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="辅料原料">
                  <Select v-model="selectForm.ingredientMaterial" placeholder="请选择">
                    <Option v-for="item in selectData.ingredientMaterialList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="拼色">
                  <Select v-model="selectForm.colorJonit" placeholder="请选择">
                    <Option v-for="item in selectData.colorJonitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="(图案)大类">
                  <Select v-model="selectForm.pattern" placeholder="请选择">
                    <Option v-for="item in selectData.patternList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="净色">
                  <Select v-model="selectForm.solidColor" placeholder="请选择">
                    <Option v-for="item in selectData.solidColorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
    </Modal>
    <Modal
        v-model="styleImgBoxState"
        width="90%"
        :z-index="1027"
        :loading="true"
        :mask-closable="false"
        @on-ok="styleImgBoxOk"
        class-name="vertical-center-modal style-img-modal">
        <Tabs type="card">
          <TabPane label="图片库">
            <div class="select-box">
              <Button type="primary" class="select-btn" @click="selectBoxState = true">筛选条件</Button>
              <Page :total="total" :page-size-opts="pageSizeOpts" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-total show-elevator show-sizer />
            </div>
            <Row :gutter="16" class="card-box">
              <Col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" v-for="(v, i) in styleImgList" :key="i">
                <Card :padding="4">
                  <div @click="checkStyleImg(v)">
                    <div class="top">
                      <img :src="v.url" alt="">
                    </div>
                    <div class="brand-name">{{v.name}}</div>
                    <div class="bottom">
                      <div class="left">单品：<span title="test">{{v.name1}}</span></div>
                      <div class="right">品名：<span title="test">{{v.name2}}</span></div>
                    </div>
                    <Icon class="mg-icon" size="30" color="#2d8cf0" type="ios-add-circle-outline" @click="lookStyleImg($event, v.bigPic)" />
                    <span class="pitch-icon" v-if="v.checked">选中</span>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="选中的图片">
            <Row :gutter="16" class="card-box" style="height:100%;" v-if="checkStyleImgList.length">
              <Col :xs="8" :sm="8" :md="6" :lg="6" :xl="4" v-for="(v, i) in checkStyleImgList" :key="i">
                <Card :padding="4">
                  <div class="top">
                    <img :src="v.url" alt="">
                  </div>
                  <div class="caption">{{v.name}}</div>
                  <span class="close-icon" @click="deleteStyleImg(v)">
                    <Icon type="md-close" />
                  </span>
                </Card>
              </Col>
            </Row>
            <div class="no-checked" v-else>暂无数据</div>
          </TabPane>
        </Tabs>
    </Modal>
  </Footer>
</template>

<script>
  import { eventHandle } from '@/utils/tool';
  export default {
    name: 'MyFooter',
    props: {},
    data() {
      return {
        footerState: true, // 款式图列表展开收起状态
        styleImgBoxState: false, // 款式图列表弹层显示状态
        selectBoxState: false, // 筛选条件弹层显示状态
        selectForm: { // 筛选条件表单数据
          times: '',
          industry: 0,
          sex: 0,
          season: '',
          style: '',
          area: '',
          antistop: '',
          column: '',
          columnSon: '',
          category: '',
          categorySon: '',
          patternDetail: '',
          element: '',
          elementSon: '',
          ageGroup: '',
          outline: '',
          length: '',
          texture: '',
          yarnMaterial: '',
          weave: '',
          leather: '',
          cowboy: '',
          fabricAttr: '',
          ingredient: '',
          ingredientShape: '',
          patternFeature: '',
          leatherFeature: '',
          colourMixture: '',
          dressed: '',
          fitness: '',
          stylePart: '',
          knit: '',
          knitType: '',
          jointGroup: '',
          cowboyFeature: '',
          cowboyMaterial: '',
          pabr: '',
          ingredientMaterial: '',
          colorJonit: '',
          pattern: '',
          solidColor: ''
        },
        selectData: { // 筛选条件渲染数据
          industryList: [ // 行业
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
          sexList: [ // 性别
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
          ],
          seasonList: [ // 季节
            {
              value: 1,
              label: '2020春夏'
            },
            {
              value: 2,
              label: '19/20秋冬'
            },
          ],
          styleList: [ // 风格
            {
              value: 1,
              label: '先锋潮牌'
            },
            {
              value: 2,
              label: '棉麻风'
            },
          ],
          areaList: [ // 地区
            {
              value: 1,
              label: '欧美地区'
            },
            {
              value: 2,
              label: '亚太地区'
            },
          ],
          columnList: [ // 栏目
            {
              value: 1,
              label: '款式'
            },
            {
              value: 2,
              label: '素材'
            },
          ],
          columnSonList: { // 子栏目
            '1': [
              {
                value: 1,
                label: '款式'
              },
              {
                value: 2,
                label: '款式'
              },
            ],
            '2': [
              {
                value: 1,
                label: '素材'
              },
              {
                value: 2,
                label: '素材'
              },
            ],
          },
          categoryList: [ // 单品
            {
              value: 1,
              label: '婚纱'
            },
            {
              value: 2,
              label: '裤'
            },
          ],
          categorySonList: { // 品名
            '1': [
              {
                value: 1,
                label: '婚纱'
              },
              {
                value: 2,
                label: '婚纱'
              },
            ],
            '2': [
              {
                value: 1,
                label: '裤'
              },
              {
                value: 2,
                label: '裤'
              },
            ],
          },
          patternDetailList: [ // 图案内容
            {
              value: 1,
              label: '动物'
            },
            {
              value: 2,
              label: '人物'
            },
          ],
          elementList: [ // 元素
            {
              value: 1,
              label: '面料'
            },
            {
              value: 2,
              label: '图案'
            },
          ],
          elementSonList: { // 子元素
            '1': [
              {
                value: 1,
                label: '面料'
              },
              {
                value: 2,
                label: '面料'
              },
            ],
            '2': [
              {
                value: 1,
                label: '图案'
              },
              {
                value: 2,
                label: '图案'
              },
            ],
          },
          ageGroupList: [ // 年龄层
            {
              value: 1,
              label: '成熟'
            },
            {
              value: 2,
              label: '轻熟'
            },
          ],
          outlineList: [ // 轮廓外形状
            {
              value: 1,
              label: 'H'
            },
            {
              value: 2,
              label: 'X'
            },
          ],
          lengthList: [ // 长短度
            {
              value: 1,
              label: '超短'
            },
            {
              value: 2,
              label: '短'
            },
          ],
          textureList: [ // 材质
            {
              value: 1,
              label: '梭织'
            },
            {
              value: 2,
              label: '针织'
            },
          ],
          yarnMaterialList: [ // 针织纱线原料
            {
              value: 1,
              label: '基础纱线'
            },
            {
              value: 2,
              label: '花式纱线'
            },
          ],
          weaveList: [ // 针织织法
            {
              value: 1,
              label: '基础织法'
            },
            {
              value: 2,
              label: '特殊织法'
            },
          ],
          leatherList: [ // 皮革/皮草肌理
            {
              value: 1,
              label: '鳄鱼皮纹'
            },
            {
              value: 2,
              label: '磨砂皮/鹿皮'
            },
          ],
          cowboyList: [ // (牛仔/单宁)大类
            {
              value: 1,
              label: '鳄鱼皮纹'
            },
            {
              value: 2,
              label: '磨砂皮/鹿皮'
            },
          ],
          fabricAttrList: [ // 面料属性1
            {
              value: 1,
              label: '雪纺'
            },
            {
              value: 2,
              label: '欧根纱'
            },
          ],
          ingredientList: [ // 辅料大类
            {
              value: 1,
              label: '纽扣'
            },
            {
              value: 2,
              label: '拉链'
            },
          ],
          ingredientShapeList: [ // 辅料形状
            {
              value: 1,
              label: '方形'
            },
            {
              value: 2,
              label: '长方形'
            },
          ],
          patternFeatureList: [ // (图案)基本特征
            {
              value: 1,
              label: '局部'
            },
            {
              value: 2,
              label: '满身'
            },
          ],
          leatherFeatureList: [ // 皮革/皮草基本特征1
            {
              value: 1,
              label: '皮革'
            },
            {
              value: 2,
              label: '皮草'
            },
          ],
          colourMixtureList: [ // 混色
            {
              value: 1,
              label: '红'
            },
            {
              value: 2,
              label: '橙'
            },
          ],
          dressedList: [ // 穿着
            {
              value: 1,
              label: '商务通勤'
            },
            {
              value: 2,
              label: '日常休闲'
            },
          ],
          fitnessList: [ // 宽松度
            {
              value: 1,
              label: '紧身'
            },
            {
              value: 2,
              label: '合体'
            },
          ],
          stylePartList: [ // 款式部位-部位
            {
              value: 1,
              label: '肩'
            },
            {
              value: 2,
              label: '胸'
            },
          ],
          knitList: [ // 针织大类
            {
              value: 1,
              label: '手工'
            },
            {
              value: 2,
              label: '机织'
            },
          ],
          knitTypeList: [ // 针织类型
            {
              value: 1,
              label: '粗针'
            },
            {
              value: 2,
              label: '细针'
            },
          ],
          jointGroupList: [ // 拼接组合
            {
              value: 1,
              label: '皮毛拼接'
            },
            {
              value: 2,
              label: '拼梭织'
            },
          ],
          cowboyFeatureList: [ // (牛仔/单宁)基本特征
            {
              value: 1,
              label: '保色'
            },
            {
              value: 2,
              label: '轻度洗'
            },
          ],
          cowboyMaterialList: [ // (牛仔/单宁)原料
            {
              value: 1,
              label: '棉'
            },
            {
              value: 2,
              label: '天丝'
            },
          ],
          pabrList: [ // 面料工艺
            {
              value: 1,
              label: '染色'
            },
            {
              value: 2,
              label: '印刷'
            },
          ],
          ingredientMaterialList: [ // 辅料原料
            {
              value: 1,
              label: '天然原料'
            },
            {
              value: 2,
              label: '金属'
            },
          ],
          colorJonitList: [ // 拼色
            {
              value: 1,
              label: '红'
            },
            {
              value: 2,
              label: '橙'
            },
          ],
          patternList: [ // (图案)大类
            {
              value: 1,
              label: '艺术效果'
            },
            {
              value: 2,
              label: '综艺/电影'
            },
          ],
          solidColorList: [ // 净色
            {
              value: 1,
              label: '红'
            },
            {
              value: 2,
              label: '橙'
            },
          ]
        },
        styleImgList: [ // 款式图列表
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name2',
            name1: '单品',
            name2: '品名',
            checked: false
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
          {
            url: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            bigPic: 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png',
            name: 'name1',
            name1: '单品',
            name2: '品名',
            checked: true
          },
        ],
        showStyleImgList: [], // 展示已选款式图列表
        total: 100, // 款式图列表总条数
        pageSizeOpts: [10, 20, 30, 40], // 每页条数
        wheelDelta: 0, // 展示款式图滚动次数
      }
    },
    mounted() {
      let self = this;
      eventHandle(this.$refs.showStyleImgBox, "mousewheel", this.showStyleImgScroll);
      this.$refs.showStyleImgBox.onscroll = function() {
        self.wheelDelta = parseInt(this.scrollLeft / -120);
      }
    },
    computed: {
      checkStyleImgList() { // 过滤出选中款式图
        return this.styleImgList.filter(v => {
          return v.checked;
        });
      }
    },
    methods: {
      changeFooterState() { // 款式图列表展开收起
        this.footerState = !this.footerState;
      },
      checkStyleImg(item) { // 选中款式图
        item.checked = !item.checked;
      },
      deleteStyleImg(item) { // 取消选中款式图
        item.checked = false;
      },
      lookStyleImg(e, bigPic) { // 查看款式图
        e.stopPropagation();
        window.open(bigPic);
      },
      searchFunc() { // 搜索
        console.log(this.selectForm);
        this.selectBoxState = false;
      },
      pageChange(page) { // 切换页码
        console.log(page)
      },
      pageSizeChange(size) { // 切换每页条数
        console.log(size)
      },
      styleImgBoxOk() { // 款式图盒子确定
        console.log(666)
        setTimeout(() => {
          this.styleImgBoxState = false;
          this.showStyleImgList = Object.assign([], this.checkStyleImgList);
        }, 1000);
      },
      delShowStyleImg(index) { // 展示款式图列表删除
        this.showStyleImgList.splice(index, 1);
      },
      showStyleImgScroll(e) { // 展示款式图列表滚轮
        this.wheelDelta += e.delta;
        if (this.wheelDelta > 0) {
          this.wheelDelta = 0;
        } else if (this.wheelDelta * -120 > this.showStyleImgList.length * 170 - 10 - this.$refs.showStyleImgBox.offsetWidth) {
          this.wheelDelta += 1;
        }
        let del = (this.wheelDelta + e.delta) * -120;
        this.$refs.showStyleImgBox.scrollLeft = del;
      },
    }
  }
</script>

<style lang="scss">
  #footer {
    padding: 10px 0 0;
    &>button {
      margin-left: 10px;
    }
    .list-box {
      text-align: center;
      color: #999;
      height: 10px;
      overflow: hidden;
      transition: height ease-in-out 0.2s;
      position: relative;
      &>div {
        float: left;
        height: 220px;
        margin: 10px;
        &.item-box {
          position: absolute;
          left: 180px;
          right: 0;
          margin-left: 0;
          border: 1px dashed #dcdee2;
          display: flex;
          overflow-x: scroll;
          &>div {
            min-width: 160px;
            width: 160px;
            height: 100%;
            margin-right: 10px;
            border: 1px solid #dcdee2;
            overflow: hidden;
            position: relative;
            img {
              width: 100%;
            }
            .close {
              position: absolute;
              top: 0;
              right: 0;
              font-size: 20px;
              color: red;
              cursor: pointer;
            }
          }
        }
      }
      &.active {
        height: 240px;
      }
      .select-images {
        width: 160px;
        border: 1px dashed #dcdee2;
        cursor: pointer;
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
    }
    .ivu-modal-content {
      height: 100%;
    }
    .ivu-modal-body {
      padding-bottom: 0;
    }
  }
  .select-modal {
    .ivu-modal-body {
      padding-bottom: 20px;
      .select-form-box {
        margin-right: 20px;
        max-height: 60vh;
        overflow-x: hidden;
        .ivu-form-item-content>div {
          width: 90%;
          &.group {
            float: left;
            width: 92.6%;
            width: -moz-calc(90% + 16px);
            width: -webkit-calc(90% + 16px);
            width: calc(90% + 16px);
          }
          &.ivu-date-picker input {
            letter-spacing: 1px;
          }
        }
      }
    }
  }
  .style-img-modal {
    .ivu-tabs-tabpane {
      height: 60vh;
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
      height: 51.5vh;
      height: -moz-calc(60vh - 74px);
      height: -webkit-calc(60vh - 74px);
      height: calc(60vh - 74px);
      margin-left: 0!important;
      margin-right: 0!important;
      overflow-y: scroll;
      .ivu-col {
        margin-bottom: 16px;
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
            text-align: center;
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
    .no-checked {
      text-align: center;
      font-size: 16px;
    }
  }
</style>

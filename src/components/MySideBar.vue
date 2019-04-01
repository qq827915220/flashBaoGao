<template>
    <div>
        <div class="logo-area">
            <span>报告编辑 <sub>v180806.01</sub></span>
        </div>
        <Collapse v-model="expanded">
            <Panel name="1" class="tpl-select">
                选择模板
                <Row slot="content">
                    <Col span="8" v-for="(tpl, index) in templates" :key="index">
                    <img :src="tpl.thumb" alt="模板图" width="65" height="65" @click="chooseTpl(tpl)">
                    </Col>
                </Row>
            </Panel>
            <Panel name="2">
                添加文字
                <div slot="content">
                    <p>
                        <label>页面名称：</label>
                        <Input v-model="curPage.sPageTitle" type="textarea" :autosize="{minRows: 2}" placeholder="标题" />
                    </p>
                    <p style="margin-top: 10px;">
                        <label>页面描述：</label>
                        <Input v-model="curPage.sPageDesc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="描述" />
                    </p>
                </div>
            </Panel>
            <Panel name="3" class="custom">
                添加浮层
                <Card slot="content">
                    <div class="icon">
                        <Icon size="18" color="#fff" type="ios-close" />
                    </div>
                    <div class="drag">
                        <img draggable="true" @dragstart="dragstart" @dragend="dragend" style="height:100%;" src="http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png" />
                    </div>
                </Card>
                <Card slot="content">
                    <div class="addImg" @click="customFun">
                        <Icon size="50" type="md-add" />
                    </div>
                </Card>
            </Panel>
        </Collapse>
        <!-- @setcustom="setcustom" -->
        <MyCustom></MyCustom>
    </div>
</template>

<script>
import { getTemplates } from "@/api/api";
import MyCustom from "./canvas/MyCustom";
import types from "@/store/mutation-types";
export default {
    name: 'MySideBar',
    props: {},
    data () {
        return {
            expanded: [1], // 展开项
            templates: [], // 模板列表
            curPage: {
                iMainId: 15,
                iPageId: 48,
                iSort: 99,
                iStatus: 1,
                iSubId: 19,
                iType: 4,
                sContentDetail: {
                    "layers": [],
                    "tmpid": 1,
                    "description": "sgsagsagsag",
                    "grids": [
                        {
                            "height": 1333,
                            "x": 0,
                            "photo": {
                                "link": "/details/ordermeeting/?t=ordermeeting&id=14&p=1&bigviewterm=eyJjb2wiOiJvcmRlcm1lZXRpbmcifQ==",
                                "description": "",
                                "y": 666.5,
                                "big": "http://img1.b.pop-fashion.com/bags_bigimage/ordermeeting/201712150000000083/14/291/245/22/56/201712150000000345//big/b2de9c82d158ccbf28a8da9312d8bc3eb1354106_b9aa8f87e3291f47fca1f56a7eb44cce.jpg",
                                "x": 242.5,
                                "brand": "",
                                "width": 0,
                                "linkType": "",
                                "isLocal": false,
                                "id": "product_ordermeeting_14",
                                "scale": 1,
                                "rotation": 0,
                                "height": 0,
                                "rotationX": 0,
                                "small": "http://img1.b.pop-fashion.com/bags_smallimage/ordermeeting/201712150000000083/14/291/245/22/56/201712150000000345//small/b2de9c82d158ccbf28a8da9312d8bc3eb1354106.jpg",
                                "rotationY": 0
                            },
                            "rw": 0.2425,
                            "y": 0,
                            "rh": 1.18488888889,
                            "rx": 0,
                            "width": 485,
                            "ry": 0
                        },
                        {
                            "height": 1333,
                            "x": 505,
                            "photo": {
                                "link": "/details/china/?t=china&id=540005&p=1&bigviewterm=eyJjb2wiOiJjaGluYSJ9",
                                "description": "",
                                "y": 666.5,
                                "big": "http://img1.b.pop-fashion.com/bags_bigimage/china_style/20150715008/woman/2015SS/China/Honggu/bubao/ssbb/style47//big/POPCG27_abc_sh_476d6693c76c5a10448dee3cbb06b522.jpg",
                                "x": 242.5,
                                "brand": "Honggu",
                                "width": 0,
                                "linkType": "",
                                "isLocal": false,
                                "id": "product_china_style_540005",
                                "scale": 1,
                                "rotation": 0,
                                "height": 0,
                                "rotationX": 0,
                                "small": "http://img1.b.pop-fashion.com/bags_smallimage/china_style/20150715008/woman/2015SS/China/Honggu/bubao/ssbb/style47//small/POPCG27_abc_sh.jpg",
                                "rotationY": 0
                            },
                            "rw": 0.2425,
                            "y": 0,
                            "rh": 1.18488888889,
                            "rx": 0.2525,
                            "width": 485,
                            "ry": 0
                        },
                        {
                            "height": 1333,
                            "x": 1010,
                            "photo": {
                                "link": "/details/exhibition/?t=exhibition&id=7903&p=1&bigviewterm=eyJjb2wiOiJleGhpYml0aW9uIn0=",
                                "description": "",
                                "y": 666.5,
                                "big": "http://img1.b.pop-fashion.com/bags_bigimage/exhibition_tracking/1=8/woman/Hongkong_pgz/pibao/sspb/2015SS//big/POPCG312 sh_53416bb6ba0a3bc2b3c6cab3bf693ebe.jpg",
                                "x": 242.5,
                                "brand": "",
                                "width": 0,
                                "linkType": "",
                                "isLocal": false,
                                "id": "product_exhibition_tracking_7903",
                                "scale": 1,
                                "rotation": 0,
                                "height": 0,
                                "rotationX": 0,
                                "small": "http://img1.b.pop-fashion.com/bags_smallimage/exhibition_tracking/1=8/woman/Hongkong_pgz/pibao/sspb/2015SS//small/POPCG312 sh.jpg",
                                "rotationY": 0
                            },
                            "rw": 0.2425,
                            "y": 0,
                            "rh": 1.18488888889,
                            "rx": 0.505,
                            "width": 485,
                            "ry": 0
                        },
                        {
                            "height": 1333,
                            "x": 1515,
                            "photo": {
                                "link": "/details/sportstie/?t=sportstie&id=407992&p=1&bigviewterm=eyJjb2wiOiJzcG9ydHN0aWUifQ==",
                                "description": "",
                                "y": 666.5,
                                "big": "http://img1.b.pop-fashion.com/bags_bigimage/sportstie/2016011502/man/2015SS/Europe/Victorinox/lvxingxiangbao/lglx/28//big/POPCG99??sh_0bcfc3c301a06991269fac79c560190d.jpg",
                                "x": 242.5,
                                "brand": "Victorinox",
                                "width": 0,
                                "linkType": "",
                                "isLocal": false,
                                "id": "product_sportstie_407992",
                                "scale": 1,
                                "rotation": 0,
                                "height": 0,
                                "rotationX": 0,
                                "small": "http://img1.b.pop-fashion.com/bags_smallimage/sportstie/2016011502/man/2015SS/Europe/Victorinox/lvxingxiangbao/lglx/28//small/POPCG99??sh.jpg",
                                "rotationY": 0
                            },
                            "rw": 0.2425,
                            "y": 0,
                            "rh": 1.18488888889,
                            "rx": 0.7575,
                            "width": 485,
                            "ry": 0
                        }],
                    "id": 48,
                    "gridSources": [{
                        "big": "http://img1.b.pop-fashion.com/bags_bigimage/ordermeeting/201712150000000083/14/291/245/22/56/201712150000000345//big/b2de9c82d158ccbf28a8da9312d8bc3eb1354106_b9aa8f87e3291f47fca1f56a7eb44cce.jpg",
                        "id": "product_ordermeeting_14",
                        "small": "http://img1.b.pop-fashion.com/bags_smallimage/ordermeeting/201712150000000083/14/291/245/22/56/201712150000000345//small/b2de9c82d158ccbf28a8da9312d8bc3eb1354106.jpg"
                    }],
                    "photo": {
                        "url": "http://img1.fm.pop-fashion.com/upload/puzzle/local/20180713/puzzle_local_5b481719b3c65.jpg",
                        "id": "174"
                    },
                    "title": "sfsasfsdaf",
                    "layerSources": []
                },
                sPageTitle: "",
                sPageDesc: ''
            }
        }
    },
    components: {
        MyCustom
    },
    computed: {
        isdrop () {
            return this.$store.getters.isdrop;
        },
        Custom () {
            return this.$store.getters.isCustom;
        }
    },
    mounted () {
        getTemplates().then((res) => {
            if (res.code === 1) {
                this.$Message.success('获取模板列表成功');
                this.templates = res.data;
            } else {
                this.$Message.error('获取模板列表失败');
            }
        });
        this.init();
    },
    methods: {
        init () {
            /* document.getElementsByTagName('img')[0].onmousedown = function (e) {
                e.preventDefault()
            }; */
        },
        dragstart (e) {
            var clien = {
                _width: e.target.naturalWidth,
                _height: e.target.naturalHeight,
                _src: e.target.currentSrc
            }
            this.$store.commit(types.SET_ISDROP, {
                isdrop:true
            });
            console.log(this.isdrop);
            clien = JSON.stringify(clien);
            e.dataTransfer.setData("clien", clien);
        },
        dragend (event) {
            event.dataTransfer.clearData();
        },
        customFun () {
            this.$store.commit(types.SET_ISCUSTOM, {
                isCustom:true
            });
            console.log(this.Custom);
        },
        /* closeCus (val) {
            this.$store.commit(types.SET_ISCUSTOM, {
                Custom:false
            });
        }, */
        chooseTpl (tpl) {
            this.$bus.$emit('chooseTpl', tpl);
        }
    }
}
</script>

<style lang="scss">
$header-height: 48px;
.logo-area {
    font-size: 16px;
    font-weight: bold;
    height: $header-height;
    line-height: $header-height;
    text-align: center;
}
.custom {
    .ivu-collapse-content {
        background-color: #eee;
        .ivu-card-bordered {
            margin-top: 10px;
        }
        .ivu-card-bordered:first-child {
            margin-top: 0;
        }
        .icon {
            cursor: pointer;
            position: absolute;
            border-radius: 50%;
            background-color: red;
            top: 5px;
            right: 5px;
            height: 18px;
            i {
                margin-top: -4px;
            }
        }
        .drag {
            height: 120px;
            text-align: center;
        }
        .addImg {
            text-align: center;
            height: 120px;
            line-height: 120px;
        }
    }
    .ivu-card-body {
        position: relative;
        padding: 0;
    }
}

.tpl-select {
    .ivu-collapse-content {
        padding: 0 6px;
        height: 480px;
        overflow: auto;
        text-align: center;
    }
    img {
        cursor: pointer;
    }
}
</style>

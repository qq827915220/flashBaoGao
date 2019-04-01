<template>
    <div class="main-canvas">
        <div class="canvas-area" @drop="drop" @dragover.prevent v-show="canvas.loaded" :style="canvasStyle">
            <div style="width:100%;height:100%">
                <MyGrid v-for="(grid, index) in grids" :key="grid._id" :idx="index" :scale="canvas.scale" :selected="curGridIndex" @selectGrid="selectGrid" :ref="'grid_' + grid._id" :grid="grid" :grids="grids">
                </MyGrid>
                <div class="drag-layer" v-show="canvas.dragable" @mousedown="canvasMouseDown($event)"></div>
            </div>
            <div class="" v-for="(add, index) in addImg" :style="'position: absolute;width:'+add._width+'px;height:'+add._height+'px;top:'+add._top+'px;left:'+add._left+'px;'">
                <img draggable="false" style="width:100%;height:100%" :id="'img_'+add._id" :src='add._src'/>
                <!-- v-show="isMongolia" -->
                <div  class="Mongolia" @mousedown="imgMouseDown($event,add._id)"></div>
            </div>
            <div v-show="isdrop.isdrop" class="Mongolia"></div>
        </div>

        <!-- 有格子被选中时才显示 -->
        <Card class="img-ctrl" v-show="curGridIndex > -1">
            <p slot="title">图片调整</p>
            <p slot="extra">
                <Icon type="md-move"></Icon>
            </p>
            <div>
                <p style="text-align: center;">
                    <Tooltip content="旋转" placement="top">
                        <Button icon="md-refresh" size="small" @click="setImgRotate"></Button>&nbsp;
                    </Tooltip>
                    <Tooltip content="左右翻转" placement="top">
                        <Button size="small" @click="setImgRotateY">↔</Button>&nbsp;
                    </Tooltip>
                    <Tooltip content="上下翻转" placement="top">
                        <Button size="small" @click="setImgRotateX">↕</Button>&nbsp;
                    </Tooltip>
                    <Tooltip content="上传图片" placement="top">
                        <Button icon="md-images" size="small" @click="setImgUpload"></Button>&nbsp;
                    </Tooltip>
                    <Tooltip content="设置内容" placement="top">
                        <Button icon="ios-link" size="small" @click="setImgInfo"></Button>&nbsp;
                    </Tooltip>
                    <Tooltip content="删除图片" placement="top">
                        <Button icon="md-trash" size="small" type="error" ghost @click="delImg"></Button>
                    </Tooltip>
                </p>
                <p style="margin-top: 10px;">
                    <span>图片缩放: {{imgSlider}}%</span>
                    <Slider v-model="imgSlider" :min="10" :max="400"></Slider>
                </p>
            </div>
        </Card>

        <!-- 图片信息 -->
        <Modal v-model="showImgInfoModal" title="图片信息" @on-ok="setImgInfoDo">
            <Input v-model="gridPhotoInfo.brand" placeholder="请输入品牌名" /><br><br>
            <Input v-model="gridPhotoInfo.description" type="textarea" :autosize="{ minRows: 5, maxRows: 8 }" placeholder="请输入图片描述" /><br><br>
            <Input v-model="gridPhotoInfo.link" placeholder="请输入链接，如 http://xxx.xxx.xxx">
            <Select v-model="gridPhotoInfo.linkType" slot="prepend" placeholder="链接类型" style="width: 80px">
                <Option value="1">网页</Option>
                <Option value="2">文件</Option>
            </Select>
            </Input>
        </Modal>

        <Card class="canvas-info">
            <p slot="title">画布调整</p>
            <p slot="extra">
                <Icon type="md-move"></Icon>
            </p>
            <p>画布尺寸: {{canvas.width}} x {{canvas.height}}</p>
            <p>缩放比例: {{scaleSlider}} %</p>
            <p>
                <Slider v-model="scaleSlider" :min="20"></Slider>
            </p>
            <p style="text-align: center;">
                <ButtonGroup size="small">
                    <Button type="primary" @click="toggleCanvasDrag">
                        {{canvas.dragable ? '固定画布' : '拖动画布'}}
                    </Button>
                    <Button type="primary" @click="alignCenterCanvas(canvas.scaleFit)">居中画布</Button>
                </ButtonGroup>
            </p>
        </Card>
    </div>
</template>

<script>
import MyGrid from './MyGrid'
import { genEmptyGridData, genEmptyPhotoData } from "@/utils/constants";
import types from "@/store/mutation-types";

export default {
    name: 'MyCanvas',
    props: {},
    components: {
        MyGrid
    },
    data () {
        return {
            // 画布
            canvas: {
                loaded: false,
                // 画布是否可拖动
                dragable: false,
                // 画布是否正在拖动
                dragging: false,
                width: 2000,
                height: 1125,
                // 画布初始缩放比
                scale: 1.0,
                // 适应大小的画布缩放比
                scaleFit: 0.5,
                // 画布平移x
                translateX: 0,
                // 画布平移y
                translateY: 0
            },
            grids: [],
            curGridIndex: -1, // 当前选中的格子id
            curGrid: genEmptyGridData(), // 当前选中的格子信息
            showImgInfoModal: false, // 显示编辑图片信息Modal
            gridPhotoInfo: {}, // 编辑格子中图片信息
            addImg: [],    //本地图片上传信息
            addImgId: -1,   //本地图片ID
        }
    },
    computed: {
        workbench () {
            return this.$store.getters.workbenchSize;
        },
        isdrop () {
            return this.$store.getters.isdrop;
        },
        canvasStyle () {
            return {
                width: this.canvas.width + "px",
                height: this.canvas.height + "px",
                transform:
                    "translate(" +
                    this.canvas.translateX +
                    "px," +
                    this.canvas.translateY +
                    "px) scale(" +
                    this.canvas.scale +
                    ")",
                cursor: this.canvas.dragable ? "move" : "auto"
            };
        },
        // 画布缩放slider
        scaleSlider: {
            get () {
                return parseInt(this.canvas.scale * 100);
            },
            set (newVal) {
                newVal = newVal / 100;
                this.canvas.scale = newVal;
            }
        },
        // 图片缩放slider
        imgSlider: {
            get () {
                return this.curGrid ? parseInt(this.curGrid.photo.scale * 100) : 5;
            },
            set (newVal) {
                newVal = newVal / 100;
                if (this.curGrid) {
                    this.curGrid.photo.scale = newVal;
                }
            }
        }
    },
    created () {

    },
    mounted () {
        setTimeout(() => {
            this.init()
        }, 300);
    },
    methods: {
        drop (e) {
            var obj = '[' + e.dataTransfer.getData('clien') + ']';
            obj = JSON.parse(obj);
            obj[0]._height = obj[0]._height * this.canvas.scale;
            obj[0]._width = obj[0]._width * this.canvas.scale;
            obj[0]._top = e.offsetY - obj[0]._height / 2;
            obj[0]._left = e.offsetX - obj[0]._width / 2;
            this.addImgId++;
            obj[0]._id = this.addImgId;
            this.addImg = this.addImg.concat(obj);
            this.$store.commit(types.SET_ISDROP, {
                isdrop:false
            });
        },
        init () {
            // canvas 初始化完毕
            this.canvas.loaded = true;
            // 居中显示 canvas
            this.alignCenterCanvas(this.canvas.scaleFit);
            // 监听模板选择事件
            this.$bus.$on('chooseTpl', (tpl) => {
                this.onChooseTpl(tpl)
            });
            // 提交事件
            this.$bus.$on('submitPage', () => {
                this.onSubmitPage()
            });
            // 双击格子事件
            this.$bus.$on('dblClickGrid', () => {
                this.setImgUpload()
            });
            this.clearImgInfo()
        },
        onChooseTpl (tpl) {
            if (this.grids.length > 0) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>使用新模板会使当前正在编辑的数据丢失, 确认继续？</p>',
                    okText: '继续',
                    onOk: () => {
                        this.setGrids(tpl)
                    }
                });
            } else {
                this.setGrids(tpl)
            }
        },
        setGrids (tpl) {
            this.$Message.info('当前模板 id：' + tpl.id);
            if (tpl.grids && Array.isArray(tpl.grids)) {
                tpl.grids.map((grid) => {
                    grid.selected = false; // 标记格子选中状态
                    grid._id = Math.random(); // 增加一个唯一id, 防止切换模板时格子 dom 复用
                });
                this.grids = tpl.grids;
                this.releaseGrid();
            }
        },
        // 选中格子
        selectGrid (index, grid) {
            this.curGridIndex = index;
            this.curGrid = grid
        },
        // 释放格子选中状态
        releaseGrid () {
            this.curGridIndex = -1;
            this.curGrid = genEmptyGridData();
        },
        // -------------- 操作图片 start --------------
        setImgRotate () {
            let tmp = this.curGrid.photo.rotation;
            this.curGrid.photo.rotation = tmp >= 270 ? 0 : tmp + 90;
        },
        setImgRotateY () {
            let tmp = this.curGrid.photo.rotationY;
            this.curGrid.photo.rotationY = parseInt(tmp) === 180 ? 0 : 180;
        },
        setImgRotateX () {
            let tmp = this.curGrid.photo.rotationX;
            this.curGrid.photo.rotationX = parseInt(tmp) === 180 ? 0 : 180;
        },
        setImgUpload () {
            this.$store.commit(types.SET_ISCUSTOM, {
                isCustom:true
            });
            // this.$Message.success('上传本地图功能待实现');
        },
        // 打开设置图片信息面板
        setImgInfo () {
            if (!this.curGrid) {
                this.$Message.warning('请选择要编辑的格子');
                return;
            }
            this.gridPhotoInfo = {
                brand: this.curGrid.photo.brand,
                link: this.curGrid.photo.link,
                linkType: this.curGrid.photo.linkType,
                description: this.curGrid.photo.description
            };
            this.showImgInfoModal = true;
        },
        // 设置图片信息
        setImgInfoDo () {
            this.curGrid.photo.brand = this.gridPhotoInfo.brand;
            this.curGrid.photo.link = this.gridPhotoInfo.link;
            this.curGrid.photo.linkType = this.gridPhotoInfo.linkType;
            this.curGrid.photo.description = this.gridPhotoInfo.description
        },
        // 将 gridPhotoInfo 置空
        clearImgInfo () {
            this.gridPhotoInfo = {
                brand: '',
                link: '',
                linkType: '1',
                description: ''
            }
        },
        delImg () {
            if (!this.curGrid) {
                this.$Message.warning('请选择要编辑的格子');
                return;
            }
            this.$Modal.confirm({
                title: '删除确认',
                content: '<p>确定删除该图片？</p>',
                okText: '删除',
                onOk: () => {
                    this.curGrid.photo = genEmptyPhotoData();
                }
            });
        },
        // -------------- 操作图片 end ----------------
        // 居中显示画布
        alignCenterCanvas (scale) {
            if (scale) {
                this.canvas.scale = scale;
            }
            this.canvas.translateX =
                (this.workbench.width - this.canvas.width) / 2;
            this.canvas.translateY =
                (this.workbench.height - this.canvas.height) / 2;
        },
        toggleCanvasDrag () {
            this.canvas.dragable = !this.canvas.dragable;
            if (this.canvas.dragable) {
                this.releaseGrid()
            }
        },
        // 为画布添加拖动事件
        canvasMouseDown (e1) {
            if (!this.canvas.dragable) {
                return false
            }
            // 当前元素
            const ele = e1.target;
            // 暂存鼠标按下时当前元素的translateX
            let transX = this.canvas.translateX;
            // 暂存鼠标按下时当前元素的translateY
            let transY = this.canvas.translateY;
            // 鼠标按下事件
            let oEvent1 = e1 || event;
            // 鼠标按下时x
            let posX1 = oEvent1.clientX;
            // 鼠标按下时y
            let posY1 = oEvent1.clientY;
            // 标记canvas处于拖动状态
            this.canvas.dragging = true;

            ele.onmousemove = (e2) => {
                // 鼠标移动事件
                let oEvent2 = e2 || event;
                // 鼠标当前移动到的位置x
                let posX2 = oEvent2.clientX;
                // 鼠标当前移动到的位置y
                let posY2 = oEvent2.clientY;

                // 设置canvas的位置跟随鼠标
                this.canvas.translateX = transX + posX2 - posX1;
                this.canvas.translateY = transY + posY2 - posY1;
            };

            // 移除鼠标移动和鼠标抬起监听
            document.onmouseup = () => {
                ele.onmousemove = null;
                ele.onmouseup = null;
                // 标记canvas处于非拖动状态
                this.canvas.dragging = false;
            };
        },
        // 为浮层添加拖动事件
        imgMouseDown (e1,id) {
           // 当前元素
            const ele = e1.target;
            // 暂存鼠标按下时当前元素的x
            let startX = parseInt(this.addImg[id]._left) || 0;
            // 暂存鼠标按下时当前元素的y
            let startY = parseInt(this.addImg[id]._top) || 0;
            // 鼠标按下事件
            let oEvent1 = e1 || event;
            // 鼠标按下时x
            let posX1 = oEvent1.clientX;
            // 鼠标按下时y
            let posY1 = oEvent1.clientY;
            // 标记图片处于拖动状态
            /* this.isMongolia = true; */
            var _this=this;
            ele.onmousemove = (e2) => {
                // 鼠标移动事件
                let oEvent2 = e2 || event;
                // 鼠标当前移动到的位置x
                let posX2 = oEvent2.clientX;
                // 鼠标当前移动到的位置y
                let posY2 = oEvent2.clientY;
                // 设置图片的位置跟随鼠标
                _this.addImg[id]._left = startX + (posX2 - posX1) / _this.canvas.scale;
                _this.addImg[id]._top = startY + (posY2 - posY1) / _this.canvas.scale;
            };

            // 移除鼠标移动和鼠标抬起监听
            document.onmouseup = () => {
                ele.onmousemove = null;
                ele.onmouseup = null;
                // 标记图片处于非拖动状态
                /* this.isMongolia = false; */
            };
            e1.preventDefault()
        },
        onSubmitPage () {
            let gridsData = [];
            for (let i = 0; i < this.grids.length; i++) {
                gridsData.push(this.$refs['grid_' + this.grids[i]._id][0].gridData)
            }
            this.$Modal.confirm({
                title: '提交格子数据',
                content: '<div style="word-break: break-all;">' + JSON.stringify(gridsData) + '</div>',
                width: '80%',
                scrollable: true
            });
            console.log('全部格子数据：', JSON.stringify(gridsData));
        }
    }
}
</script>

<style lang="scss">
.main-canvas {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #f1f1f1;
    .canvas-area {
        background: #fff;
        position: absolute;
        font-size: 36px;
        .drag-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: move;
            background: rgba(0, 100, 255, 0.1);
        }
    }
    /* 画布控制面板 */
    .canvas-info {
        position: absolute;
        right: 0;
        top: 0;
        .ivu-card-head {
            padding: 8px 16px;
        }
        .ivu-card-extra {
            top: 6px;
        }
    }
    /* 图片控制面板 */
    .img-ctrl {
        position: fixed;
        left: 240px;
        top: 48px;
        .ivu-card-head {
            padding: 8px 16px;
        }
        .ivu-card-extra {
            top: 6px;
        }
        .ivu-card-body {
            // 图标按钮中图标大小
            .ivu-btn {
                font-size: 18px;
                width: 34px;
                height: 34px;
            }
            // 拖动条高度
            .ivu-slider-wrap {
                margin: 8px 0;
            }
        }
    }
}
.Mongolia{
width:100%;height:100%;position: absolute;top: 0;left: 0;
}
</style>

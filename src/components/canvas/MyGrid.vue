<template v-if="del_box">
    <div class="my-grid" @click="selectGrid" @mousedown="selectGrid" @dblclick="dblClick" :style="gridStyle" ref="img">
        <img class="img" :src="gridData.photo.big" :style="imgStyle" @mousedown="imgMouseDown($event)" alt="img">
        <div class="icon" @click="closeDom()" v-if="selected === idx">
            <Icon size="36" color="#fff" type="ios-close" />
        </div>
        <span class="ctrl-line line-n" @mousedown="start($event,'resizeUp')"></span>
        <span class="ctrl-line line-e" @mousedown="start($event,'resizeRight')"></span>
        <span class="ctrl-line line-s" @mousedown="start($event,'resizeDown')"></span>
        <span class="ctrl-line line-w" @mousedown="start($event,'resizeLeft')"></span>
    </div>
</template>

<script>
import { genEmptyGridData } from "@/utils/constants";
import types from "@/store/mutation-types";
export default {
    name: "MyGrid",
    props: {
        grids: Array,
        grid: Object,
        idx: Number,
        selected: Number,
        scale: Number, // canvas 缩放比
    },
    computed: {
        gridStyle: {
            get () {
                return {
                    top: (this.gridData.y || 0) + 'px',
                    left: (this.gridData.x || 0) + 'px',
                    width: (this.gridData.width || 100) + 'px',
                    height: (this.gridData.height || 100) + 'px',
                    'border-color': this.selected === this.idx ? '#f00' : '#ccc'
                }
            }
        },
        imgStyle: {
            get () {
                return {
                    top: (this.gridData.photo.y || 0) + 'px',
                    left: (this.gridData.photo.x || 0) + 'px',
                    // width: (this.gridData.photo.width || 100) + 'px',
                    // height: (this.gridData.photo.height || 100) + 'px',
                    transform: `scale(${this.gridData.photo.scale}) ` +
                        `rotate(${this.gridData.photo.rotation}deg) ` +
                        `rotateX(${this.gridData.photo.rotationX}deg) ` +
                        `rotateY(${this.gridData.photo.rotationY}deg)`,
                    cursor: this.selected === this.idx ? 'move' : ''
                }
            },
        }
    },
    data () {
        return {
            gridData: genEmptyGridData(),
            dragable: false,
            draging: false,
            origin: '',
            del_box: true
        }
    },
    components: {
    },
    mounted () {
        this.gridData.width = this.grid.width || 100;
        this.gridData.height = this.grid.height || 100;
        this.gridData.x = this.grid.x || 0;
        this.gridData.y = this.grid.y || 0;
        this.gridData.photo.big = 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png';
        this.gridData.photo.small = 'http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png';
        this.initImg();
    },
    methods: {
        closeDom () {
            //删除父组件dom数据
            this.grids.splice(this.selected, 1);
        },
        initImg () {
            var img = new Image();
            img.onload = () => {
                var wi = this.gridData.photo.width = img.width; // 图片宽
                var hi = this.gridData.photo.height = img.height; // 图片高
                // 在格子里居中图片
                var wg = this.gridData.width; // 格子宽
                var hg = this.gridData.height; // 格子高
                this.gridData.photo.x = ((wg - wi) / 2).toFixed(1);
                this.gridData.photo.y = ((hg - hi) / 2).toFixed(1);
            };
            img.src = this.gridData.photo.big;
        },
        // 选中格子
        selectGrid () {
            this.$emit('selectGrid', this.idx, this.gridData);
            this.dragable = true;
        },
        // 图片鼠标按下事件
        imgMouseDown (e1) {
            if (!this.dragable) {
                // return false
            }
            // 当前元素
            const ele = e1.target;
            // 暂存鼠标按下时当前元素的x
            let startX = parseInt(this.gridData.photo.x) || 0;
            // 暂存鼠标按下时当前元素的y
            let startY = parseInt(this.gridData.photo.y) || 0;
            // 鼠标按下事件
            let oEvent1 = e1 || event;
            // 鼠标按下时x
            let posX1 = oEvent1.clientX;
            // 鼠标按下时y
            let posY1 = oEvent1.clientY;
            // 标记图片处于拖动状态
            this.dragging = true;

            ele.onmousemove = (e2) => {
                // 鼠标移动事件
                let oEvent2 = e2 || event;
                // 鼠标当前移动到的位置x
                let posX2 = oEvent2.clientX;
                // 鼠标当前移动到的位置y
                let posY2 = oEvent2.clientY;

                // 设置图片的位置跟随鼠标
                this.gridData.photo.x = startX + (posX2 - posX1) / this.scale;
                this.gridData.photo.y = startY + (posY2 - posY1) / this.scale;
            };

            // 移除鼠标移动和鼠标抬起监听
            document.onmouseup = () => {
                ele.onmousemove = null;
                ele.onmouseup = null;
                // 标记图片处于非拖动状态
                this.dragging = false;
            };
            e1.preventDefault()
        },
        // 双击格子, 上传本地图
        dblClick () {
            this.$store.commit(types.SET_ISCUSTOM, {
                isCustom: true
            });
            // this.Custom=!this.Custom;
            // this.$bus.$emit('dblClickGrid')
        },
        // ------------- 格子大小控制 start -----------------
        // 拖动上边调整大小
        resizeUp (e) {
            let disY = e.clientY - this.eY;
            // 是否向下拖动
            let flg = disY >= 0;
            disY = parseInt(disY / this.scale);
            console.log(disY, flg);
            // 向下拖动且拖动距离大于高度-10
            if (flg && Math.abs(disY) > this.origin.height - 10) {
                return;
            }
            this.gridData.y = (this.origin.top == null ? 0 : this.origin.top) + disY;
            this.gridData.height = this.origin.height - disY;
        },
        // 拖动下边调整大小
        resizeDown (e) {
            let disY = e.clientY - this.eY;
            // 是否向上拖动
            let flg = disY <= 0;
            disY = parseInt(disY / this.scale);
            console.log(disY, flg);
            // 向上拖动且拖动距离大于高度-10
            if (flg && Math.abs(disY) > this.origin.height - 10) {
                return;
            }
            //this.posInfo.bottom = this.origin.bottom + disY;
            this.gridData.height = this.origin.height + disY;
        },
        // 拖动左边调整大小
        resizeLeft (e) {
            let disX = e.clientX - this.eX;
            // 是否向右拖动
            let flg = disX >= 0;
            disX = parseInt(disX / this.scale);
            console.log(disX, flg);
            // 向右拖动且拖动距离大于宽度-10
            if (flg && Math.abs(disX) > this.origin.width - 10) {
                return;
            }
            this.gridData.x = (this.origin.left == null ? 0 : this.origin.left) + disX;
            this.gridData.width = this.origin.width - disX;
        },
        // 拖动右边调整大小
        resizeRight (e) {
            let disX = e.clientX - this.eX;
            // 是否向左拖动
            let flg = disX <= 0;
            disX = parseInt(disX / this.scale);
            console.log(disX, flg);
            // 向左拖动且拖动距离大于宽度-10
            if (flg && Math.abs(disX) > this.origin.width - 10) {
                return;
            }
            //this.posInfo.right = this.origin.right + disX;
            this.gridData.width = this.origin.width + disX;
        },
        start (e, direction) {
            // let origin = this.$refs.img.getBoundingClientRect();
            // this.validArea.right = this.posInfo.left + this.posInfo.width;
            // this.validArea.bottom = this.posInfo.top + this.posInfo.height;
            this.eX = e.clientX;
            this.eY = e.clientY;
            this.origin = {
                top: this.$refs.img.offsetTop,
                left: this.$refs.img.offsetLeft,
                width: this.$refs.img.clientWidth,
                height: this.$refs.img.clientHeight
            };
            // this.syncOrigin();
            console.log("start", direction, this.origin);
            console.log(document);
            this.fnResize = this[direction] || function () { };
            document.addEventListener("mousemove", this.fnResize);
            document.addEventListener("mouseup", this.stop);
        },
        stop: function () {
            document.removeEventListener("mousemove", this.fnResize);
            document.removeEventListener("mouseup", this.fnStop);
            // this.syncOrigin();
            window.getSelection
                ? window.getSelection().removeAllRanges()
                : document.selection.empty();

        },
        // ------------- 格子大小控制 end -----------------
    }
}
</script>

<style scoped lang="scss">
.my-grid {
    border: 2px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    overflow: hidden;
    .icon {
        cursor: pointer;
        position: absolute;
        border-radius: 50%;
        background-color: red;
        top: 5px;
        right: 5px;
        height: 36px;
        i {
            margin-top: -24px;
        }
    }
    .img {
        position: absolute;
    }
    .ctrl-line {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        &.line-n {
            top: -6px;
            left: 0;
            height: 10px;
            cursor: n-resize;
        }
        &.line-e {
            top: 0;
            right: 0px;
            width: 10px;
            cursor: e-resize;
        }
        &.line-s {
            bottom: 0px;
            left: 0;
            height: 10px;
            cursor: s-resize;
        }
        &.line-w {
            top: 0;
            left: -6px;
            width: 10px;
            cursor: w-resize;
        }
    }
}

.ctrl-layer {
    position: absolute;
    background: rgba(51, 153, 255, 0.1);
    .ctrl-line {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        &.line-n {
            top: -6px;
            left: 0;
            height: 10px;
            cursor: n-resize;
        }
        &.line-e {
            top: 0;
            right: 0px;
            width: 10px;
            cursor: e-resize;
        }
        &.line-s {
            bottom: 0px;
            left: 0;
            height: 10px;
            cursor: s-resize;
        }
        &.line-w {
            top: 0;
            left: -6px;
            width: 10px;
            cursor: w-resize;
        }
    }
    .ctrl-layer-inner {
        position: relative;
        width: 100%;
        height: 100%;
        outline: 1px solid #39f;
        outline-color: rgba(51, 153, 255, 0.75);
    }
    .ctrl-center {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0;
        height: 0;
        &::before {
            top: 0;
            left: -3px;
            width: 7px;
            height: 1px;
        }
        &::after {
            top: -3px;
            left: 0;
            width: 1px;
            height: 7px;
        }
    }
    &::before,
    &::after {
        position: absolute;
        display: block;
        content: " ";
        background-color: #000;
    }
}
</style>

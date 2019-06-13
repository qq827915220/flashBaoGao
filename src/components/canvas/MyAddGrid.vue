<template>
  <div class="" :style="imgStyle">
    <!-- 'position: absolute;width:'+add._width+'px;height:'+add._height+'px;top:'+add._top+'px;left:'+add._left+'px;' -->
    <img draggable="false"
        style="width:100%;height:100%"
        :id="'img_'+add._id"
        :src='add._src' />
    <!-- v-show="isMongolia" -->
    <div class="Mongolia"
        @click="selectAddImg(add, index)"
        @mousedown="imgMouseDown($event,add._id)"></div>
  </div>
</template>

<script>
import { genEmptyGridData } from "@/utils/constants";
// import types from "@/store/mutation-types";
export default {
  name: "MyGrid",
  props: {
    // grids: Array,
    // grid: Object,
    // idx: Number,
    // selected: Number,
    // scale: Number, // canvas 缩放比
  },
  data() {
    return {
      gridData: genEmptyGridData(),
      dragable: false,
      draging: false,
      origin: '',
      del_box: true
    }
  },
  computed: {
    // gridStyle: {
    //   get() {
    //     return {
    //       top: (this.gridData.y||0)+'px',
    //       left: (this.gridData.x||0)+'px',
    //       width: (this.gridData.width||100)+'px',
    //       height: (this.gridData.height||100)+'px',
    //       'border-color': this.selected===this.idx? '#f00':'#ccc'
    //     }
    //   }
    // },
    imgStyle: {
      get() {
        return {
          top: (this.gridData.photo.y||0)+'px',
          left: (this.gridData.photo.x||0)+'px',
          // width: (this.gridData.photo.width || 100) + 'px',
          // height: (this.gridData.photo.height || 100) + 'px',
          transform: `scale(${this.gridData.photo.scale}) `+
            `rotate(${this.gridData.photo.rotation}deg) `+
            `rotateX(${this.gridData.photo.rotationX}deg) `+
            `rotateY(${this.gridData.photo.rotationY}deg)`,
          cursor: this.selected===this.idx? 'move':''
        }
      },
    }
  },
  mounted() {
    // this.gridData.width=this.grid.width||100;
    // this.gridData.height=this.grid.height||100;
    // this.gridData.x=this.grid.x||0;
    // this.gridData.y=this.grid.y||0;
    // this.gridData.photo.big='http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png';
    // this.gridData.photo.small='http://img.zcool.cn/community/0122a357de6d7e0000012e7e1f25e6.jpg@1280w_1l_2o_100sh.png';
    // this.initImg();
  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
</style>

<template>
    <Layout id="main">
        <Sider width="240">
            <MySideBar></MySideBar>
        </Sider>
        <Layout>
            <MyHeader></MyHeader>
            <MyContent ref="mainContainer"></MyContent>
        </Layout>
    </Layout>
</template>

<script>
import MySideBar from './MySideBar'
import MyContent from './MyContent'
import MyHeader from './MyHeader'
import MyCanvas from './canvas/MyCanvas'
import types from "@/store/mutation-types";

export default {
    name: 'Main',
    props: {
    },
    components: {
        MySideBar,
        MyHeader,
        MyContent,
        MyCanvas
    },
    data () {
        return {
            todo: [
                '格子大小调整, 格子删除',
                '图片上传新图',
                '底部款式图区域',
                '浮层操作',
                '页面标题和描述编辑',
            ]
        }
    },
    mounted () {
        window.onresize = this.onWindowResize;
        this.$nextTick(() => {
            this.getMainContainerSize()
        });
        this.$Notice.open({
            title: '待完成功能',
            desc: this.todo.join('<br>'),
            duration: 0
        });
    },
    methods: {
        onWindowResize () {
            this.getMainContainerSize()
        },
        getMainContainerSize () {
            const dom = this.$refs.mainContainer.$el;
            this.$store.commit(types.SET_WORKBENCH_SIZE, {
                width: dom.clientWidth,
                height: dom.clientHeight
            });
        },
    }
}
</script>

<style lang="scss">
$border-color-gray: #ddd;
$main-bg: #fff;
$aside-width: 240px;

#app {
    height: 100%;
    #main {
        height: 100%;
        .ivu-layout,
        .ivu-layout-sider,
        .ivu-layout-header,
        .ivu-layout-content,
        .ivu-layout-footer {
            background: $main-bg;
        }

        .ivu-layout-header {
            border-bottom: 1px solid $border-color-gray;
        }

        .ivu-layout-sider {
            border-right: 1px solid $border-color-gray;
        }

        .ivu-layout-content {
            display: flex;
        }
    }
}
</style>

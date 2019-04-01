<template>
    <Modal :value="Custom.isCustom" title="上传本地图片" :mask-closable="false" @on-cancel="cancel"
    @on-ok="setcustom">
        <Upload multiple type="drag" action="//www.pop-fashion.com/puzzle/uploadLocalPhoto/" :on-success="success">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>单击或拖动文件到此处上载</p>
            </div>
        </Upload>
        <Input placeholder="请输入品牌名" /><br><br>
        <Input type="textarea" :autosize="{ minRows: 5, maxRows: 8 }" placeholder="请输入图片描述" /><br><br>
        <Input placeholder="请输入链接，如 http://xxx.xxx.xxx">
            <Select slot="prepend" placeholder="链接类型" style="width: 80px">
                <Option value="1">网页</Option>
                <Option value="2">文件</Option>
            </Select>
        </Input>
    </Modal>
</template>
<script>
import types from "@/store/mutation-types";
export default {
    name: 'MyCustom',
    data () {
        return {
            
        }
    },
    components: {
    },
    computed: {
        Custom () {
            return this.$store.getters.isCustom;
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        init(){
            console.log(this.Custom);
        },
        success(){
            console.log('上传成功');
        },
        cancel(){
            this.$store.commit(types.SET_ISCUSTOM, {
                isCustom:false
            });
        },
        setcustom(){
            this.$store.commit(types.SET_ISCUSTOM, {
                isCustom:false
            });
            console.log('OK');
        }
    }
}
</script>
<style lang="scss">

</style>

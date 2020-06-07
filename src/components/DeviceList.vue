<template>
    <div class="right_main">
        <div class="user_tong_kj">
            <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                <thead>
                <tr>
                    <th width="20%">设备列表</th>
                    <th width="35%">设备json</th>
                    <th width="35%">设备信息</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td height="500px" style="vertical-align: top">
                        <div v-for="item in buttonList" class="item" :class="{'active':item.active}"
                             @click="chooseItem(item)">
                            {{item.text}}
                        </div>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                buttonList: [
                    {
                        text: "RSU信息",
                        active: false
                    },
                    {
                        text: "车牌识别仪信息",
                        active: false
                    },
                    {
                        text: "全景摄像机信息",
                        active: false
                    },
                    {
                        text: "机柜状态信息",
                        active: false
                    },
                    {
                        text: "交换机信息",
                        active: false
                    },
                    {
                        text: "防火墙信息",
                        active: false
                    },
                    {
                        text: "Atlas信息",
                        active: false
                    },
                    {
                        text: "防雷检测信息",
                        active: false
                    },
                    {
                        text: "接地电阻信息",
                        active: false
                    },
                    {
                        text: "12控制器信息",
                        active: false
                    }
                ],
                currentItem: {}
            }
        },
        computed: {},
        methods: {
            chooseItem(item) {
                this.buttonList.forEach((buttonItem) => {
                    buttonItem.active = false;
                })
                item.active = true;
                this.currentItem = item;
            }
        },
        mounted() {
        }
    }

</script>

<style scoped lang="scss">
    .item {
        border: 1px solid #0d8ff7;
        background: white;
        width: 100%;
        height: 30px;
        line-height: 33px;
        margin-top: 2px;
        cursor: pointer;
    }

    .item.active {
        background: #0d8ff7;
        color: white;
    }

</style>
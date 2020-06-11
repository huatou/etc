<template>
    <div class="right_main">
        <div class="user_tong_kj">
            <ul class="forms_box" style="float: none">
                <li>
                    <label style="width: auto;">机柜类型</label>
                    <select type="select_one" v-model="data12.firewarecount">
                        <option v-for="item in cabinetList" :value="item.value" v-text="item.text"></option>
                    </select>
                </li>
                <table width="50%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                    <thead>
                    <tr>
                        <th width="50%"></th>
                        <th width="25%">设备柜/一体化柜</th>
                        <th width="25%">电池柜</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>前门门锁地址</td>
                        <td><input class="yzhInput" style="width: 70%" v-model="data12.adrrlock1"></td>
                        <td><input class="yzhInput" style="width: 70%" v-model="data12.adrrlock3"></td>
                    </tr>
                    <tr>
                        <td>后门门锁地址</td>
                        <td><input class="yzhInput" style="width: 70%" v-model="data12.adrrlock2"></td>
                        <td><input class="yzhInput" style="width: 70%" v-model="data12.adrrlock4"></td>
                    </tr>
                    <tr>
                        <td>环境温度告警上限（25~80）</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvtempupperlimit"> ℃</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvtempupperlimit2"> ℃</td>
                    </tr>
                    <tr>
                        <td>环境温度告警下限（-20~20）</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvtemplowerlimit"> ℃</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvtemplowerlimit2"> ℃</td>
                    </tr>
                    <tr>
                        <td>环境湿度告警上限（0~100）</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvhumidityupperlimit"> %</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvhumidityupperlimit2"> %</td>
                    </tr>
                    <tr>
                        <td>环境湿度告警下限（0~100）</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvhumiditylowerlimit"> %</td>
                        <td><input class="yzhInput" v-model="data20.hwsetenvhumiditylowerlimit2"> %</td>
                    </tr>
                    <tr>
                        <td>
                            <div>空调开机温度点</div>
                            <div>纯空调模式 35-50/</div>
                            <div>智能模式　 38~50</div>
                        </td>
                        <td><input class="yzhInput" v-model="data20.hwdcairpowerontemppoint"> ℃</td>
                        <td><input class="yzhInput" v-model="data20.hwdcairpowerontemppoint2"> ℃</td>
                    </tr>
                    <tr>
                        <td>
                            <div>空调关机温度点</div>
                            <div>纯空调模式 27-45/</div>
                            <div>智能模式　 33~45</div>
                        </td>
                        <td><input class="yzhInput" v-model="data20.hwdcairpowerofftemppoint"> ℃</td>
                        <td><input class="yzhInput" v-model="data20.hwdcairpowerofftemppoint2"> ℃</td>
                    </tr>
                    </tbody>
                </table>

                <div style="margin-left: 3%;float: right;width: 45%;">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed;">
                        <tbody>
                        <tr>
                            <td width="50%" style="font-size: 13px;font-weight: bold;color: black">温控模式</td>
                            <td width="50%">
                                <select type="select_one" v-model="data20.hwcoolingdevicesmode" style="float: none;display: inline">
                                    <option v-for="item in hwCoolingDevicesModeList" :value="item.value" v-text="item.text"></option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>AC过压点设置（50-600）</td>
                            <td><input class="yzhInput" v-model="data20.hwsetacsuppervoltlimit"> V</td>
                        </tr>
                        <tr>
                            <td>AC欠压点设置（50-600）</td>
                            <td><input class="yzhInput" v-model="data20.hwsetacslowervoltlimit"> V</td>
                        </tr>
                        <tr>
                            <td>设置DC过压点（47-59）</td>
                            <td><input class="yzhInput" v-model="data20.hwsetdcsuppervoltlimit"> V</td>
                        </tr>
                        <tr>
                            <td>设置DC欠压点（47-59）</td>
                            <td><input class="yzhInput" v-model="data20.hwsetdcslowervoltlimit"> V</td>
                        </tr>
                        </tbody>
                    </table>
                    <!--数据统计-->
                    <div class="date_box" style="margin-top: 10px;">
                        <div class="ptkj_box" style="height: auto;line-height: normal;"><em style="font-size: 13px;font-weight: bold;color: black">门禁请求信息</em>
                        </div>
                        <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed;height: 170px;">
                            <thead>
                            <tr>
                                <th width="20%">序号</th>
                                <th width="40%">字段</th>
                                <th width="40%">数值</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>前门门锁地址</td>
                                <td>{{data12.adrrlock1}}</td>
                                <td><input class="yzhInput" style="width: 70%" v-model="data12.adrrlock3"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ul>

        </div>
        <div class="net_box">
            <ul class="forms_box">
                <h1>机柜1</h1>
                <li><label>IP地址</label><input type="text" class="md" v-model="data12.hwserver"></li>
                <li><label>GET密码</label><input type="text" class="md" v-model="data12.hwgetpasswd"></li>
                <li><label>SET密码</label><input type="text" class="md" v-model="data12.hwsetpasswd"></li>
                <li><label>厂商</label><input type="text" class="md" v-model="data12.cabinetfactroy"></li>
            </ul>
            <ul class="forms_box">
                <h1>机柜2</h1>
                <li><label>IP地址</label><input type="text" class="md" v-model="data12.hwserver2"></li>
                <li><label>GET密码</label><input type="text" class="md" v-model="data12.hwgetpasswd2"></li>
                <li><label>SET密码</label><input type="text" class="md" v-model="data12.hwsetpasswd2"></li>
                <li><label>厂商</label><input type="text" class="md" v-model="data12.cabinetfactroy"></li>
            </ul>
        </div>
        <!--数据统计-->
        <div class="date_box forms_box" style="margin-top: 10px;">
            <div class="ptkj_box"><em style="color:black;font-weight: bold">防雷器信息录入</em></div>
            <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                <tbody>
                <tr>
                    <td width="50%">
                        <label style="width: 120px">接地电阻IP地址</label>
                        <input type="text" class="md" v-model="data12.spdresip">
                    </td>
                    <td width="50%">
                        <label style="width: 120px">接地电阻端口</label>
                        <input type="text" class="md" v-model="data12.spdresport">
                    </td>
                </tr>
                <tr>
                    <td width="50%">
                        <label style="width: 120px">接地电阻设备地址</label>
                        <input type="text" class="md" v-model="data12.spdresid">
                    </td>
                </tr>
                <tr>
                    <td width="50%">
                        <label style="width: 120px">防雷器数量</label>
                        <select type="select_one" v-model="data12.spdcount">
                            <option v-for="n in 16" :value="n" v-text="n"></option>
                        </select>
                    </td>
                    <td width="50%">
                        <label style="width: 120px">防雷器厂家型号</label>
                        <select type="select_one" v-model="data12.spdfactory">
                            <option v-for="item in spdFactoryList" :value="item.value" v-text="item.value"></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div v-for="(item, index) in data12.spdlist.slice(0 , data12.spdcount)">
                            <button class="yzhBtn active" :class="{'active':index == currentIndex}">
                                防雷卡控制器{{index+1}}
                            </button>
                            <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1 yzhSmallTable"
                                   style="table-layout: fixed;font-size: 12px;margin-bottom: 4px">
                                <tbody>
                                <tr>
                                    <td width="30%">
                                        <label style="font-size: 12px">IP地址</label>
                                        <input type="text" class="sm" v-model="item.ip" style="line-height: 20px;height: 22px">
                                    </td>
                                    <td width="25%">
                                        <label>端口</label>
                                        <input type="text" class="sm" v-model="item.port" style="line-height: 20px;height: 22px">
                                    </td>
                                    <td width="25%">
                                        <label>设备地址</label>
                                        <input type="text" class="sm" v-model="item.addr" style="line-height: 20px;height: 22px">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="hard forms_box">
            <div class="tong_btn text-align-center">
                <a class="btn_blue" style="width: 100px" @click="submit()">录入
                    <i class="fa fa-spinner fa-pulse" v-show="submitting"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                radio: '1',
                data12: {
                    spdlist: []
                },
                data20: {},
                data22: {},
                data27: {},
                /** 机柜类型 */
                cabinetList: [{
                    value: '1',
                    text: '华为双机柜双开门'
                }, {
                    value: '2',
                    text: '华为双机柜单开门'
                }, {
                    value: '3',
                    text: '华为单机柜双开门'
                }, {
                    value: '4',
                    text: '华为单机柜单开门'
                }, {
                    value: '5',
                    text: '中兴'
                }, {
                    value: '6',
                    text: '金晟安'
                }, {
                    value: '7',
                    text: '爱特思'
                }, {
                    value: '8',
                    text: '诺龙'
                }, {
                    value: '9',
                    text: '容尊堡'
                }, {
                    value: '10',
                    text: '亚邦'
                }],
                submitting: false,
                /** 防雷器厂商型号列表 */
                spdFactoryList: [
                    {
                        value: "雷迅"
                    }, {
                        value: "华咨圣泰"
                    }
                ],
                /** 温控模式列表 */
                hwCoolingDevicesModeList: [{
                    value: "1",
                    text: "纯风扇模式",
                }, {
                    value: "2",
                    text: "纯空调模式",
                }, {
                    value: "3",
                    text: "智能模式",
                }, {
                    value: "255",
                    text: "未知",
                }]
            }
        },
        methods: {
            submit() {
                this.submitting = true;
                let params = this.jquery.extend({opt: 2}, this.data12);
                this.request.get12Data(this, params, (data) => {
                    this.submitting = false;
                    this.$message({type: "success", message: "修改成功"});
                })
            }

        },
        mounted() {
            this.request.get12Data(this, null, (data) => {
                this.data12 = data;
            })
            this.request.get20Data(this, null, (data) => {
                this.data20 = data;
            })
            this.request.get22Data(this, null, (data) => {
                this.data22 = data;
            })
            this.request.get27Data(this, null, (data) => {
                this.data27 = data;
            })
        }

    }

</script>

<style scoped lang="scss">
    .text-align-center {
        text-align: center;
    }

    .forms_box input[type="text"], .forms_box textarea {
        font-size: 13px;
    }

    .yzhInput {
        width: 50%;
        border: 1px solid #b5b5b5;
        height: 26px;
        line-height: 26px;
        background-color: #FFFFFF;
        outline: none;
        padding: 0 10px;
        color: #585757;
        font-size: 12px;
        transition: all 1s ease;
    }

    .table_s1 td {
        color: black;
        text-align: left;
        padding-left: 10px;
    }

    .yzhBtn {
        border: 1px solid #b5b5b5;
        background-color: white;
        padding: 0 10px;
        color: #585757;
        font-size: 12px;
        line-height: 20px;
    }

    .yzhBtn.active {
        background-color: #c4c4c4;
    }

    .yzhSmallTable label, input {
        height: 20px;
        line-height: 22px;
    }


</style>
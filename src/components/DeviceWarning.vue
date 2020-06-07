<template>
    <div class="right_main">
        <div class="user_tong_kj">
            <ul class="forms_box" style="float: none">
                <li>
                    <label style="width: auto;">当前配电层</label>
                    <select type="select_one" v-model="currentFloor">
                        <option v-for="item in floorList" :value="item" v-text="item"></option>
                    </select>
                </li>
                <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                    <thead>
                    <tr>
                        <th width="10%"></th>
                        <th width="15%">设备类型</th>
                        <th width="15%">车道号（编号）</th>
                        <th width="20%">设备IP地址</th>
                        <th width="10%">设备端口号</th>
                        <th width="15%">设备用户名密码<br>或GET密码</th>
                        <th width="15%">设备SET密码</th>
                    </tr>
                    </thead>
                    <tbody v-if="currentFloor == floorList[0]">
                    <tr v-for="(item,index) in doList12">
                        <td>设备{{index+1}}</td>
                        <td>
                            <select type="select_one" v-if="item.deviceModel" v-model="item.deviceModel.deviceType" @change="$forceUpdate();">
                                <option v-for="childItem in deviceTypeList" :value="childItem.value" v-text="childItem.name"></option>
                            </select>
                        </td>
                        <td>
                            <!--                            {{item.deviceModel.deviceTypeNo}}-->
                            <select type="select_one" v-model="item.deviceModel.deviceTypeNo"
                                    v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0">
                                <option v-for="(childItem,index) in getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType)" :value="index+1"
                                        v-text="childItem"></option>
                            </select>
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0" type="text" v-model="item.deviceModel.ip"
                                   style="height: 29px;width: 85%;font-size: 13px">
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType != deviceTypeList[4].value
                                            && item.deviceModel.deviceType != deviceTypeList[5].value
                                            && item.deviceModel.deviceType != deviceTypeList[6].value)"
                                   type="text" v-model="item.deviceModel.port"
                                   style="height: 29px;width: 70%;font-size: 13px">
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType == deviceTypeList[4].value || item.deviceModel.deviceType == deviceTypeList[5].value)
                                            && item.deviceModel.deviceType != deviceTypeList[0].value"
                                   type="text" v-model="item.deviceModel.getpasswd"
                                   style="height: 29px;width: 70%;font-size: 13px">

                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType != deviceTypeList[4].value && item.deviceModel.deviceType != deviceTypeList[5].value)
                                            && item.deviceModel.deviceType != deviceTypeList[0].value"
                                   type="text" v-model="item.deviceModel.key"
                                   style="height: 29px;width: 70%;font-size: 13px">
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType == deviceTypeList[4].value || item.deviceModel.deviceType == deviceTypeList[5].value)"
                                   type="text" v-model="item.deviceModel.setpasswd"
                                   style="height: 29px;width: 70%;font-size: 13px">
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-show="currentFloor == floorList[1]">
                    <tr v-for="(item,index) in doList24">
                        <td>设备{{index+13}}</td>
                        <td>
                            <select type="select_one" v-if="item.deviceModel" v-model="item.deviceModel.deviceType" @change="$forceUpdate();">
                                <option v-for="childItem in deviceTypeList" :value="childItem.value" v-text="childItem.name"></option>
                            </select>
                        </td>
                        <select type="select_one" v-model="item.deviceModel.deviceTypeNo"
                                v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0">
                            <option v-for="(childItem,index) in getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType)" :value="index+1"
                                    v-text="childItem"></option>
                        </select>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0" type="text" v-model="item.deviceModel.ip"
                                   style="height: 29px;width: 85%;font-size: 13px">
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType != deviceTypeList[4].value
                                            && item.deviceModel.deviceType != deviceTypeList[5].value
                                            && item.deviceModel.deviceType != deviceTypeList[6].value)"
                                   type="text" v-model="item.deviceModel.port"
                                   style="height: 29px;width: 70%;font-size: 13px">
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType == deviceTypeList[4].value || item.deviceModel.deviceType == deviceTypeList[5].value)
                                            && item.deviceModel.deviceType != deviceTypeList[0].value"
                                   type="text" v-model="item.deviceModel.getpasswd"
                                   style="height: 29px;width: 70%;font-size: 13px">

                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType != deviceTypeList[4].value && item.deviceModel.deviceType != deviceTypeList[5].value)
                                            && item.deviceModel.deviceType != deviceTypeList[0].value"
                                   type="text" v-model="item.deviceModel.key"
                                   style="height: 29px;width: 70%;font-size: 13px">
                        </td>
                        <td>
                            <input v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0
                                            && (item.deviceModel.deviceType == deviceTypeList[4].value || item.deviceModel.deviceType == deviceTypeList[5].value)"
                                   type="text" v-model="item.deviceModel.setpasswd"
                                   style="height: 29px;width: 70%;font-size: 13px">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </ul>
        </div>
        <div class="hard forms_box">
            <div class="tong_btn text-align-center">
                <a class="btn_blue" style="width: 100px" @click="submit()">录入
                    <i class="fa fa-spinner fa-pulse" v-show="submitting"></i>
                </a>
                <span v-show="afterSubmit">录入成功</span>
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
                    dolist: []
                },
                doList12: [],
                doList24: [],
                data20: {},
                data22: {},
                data27: {},
                /** 配电层列表 */
                floorList: [
                    "第一层配电层",
                    "第二层配电层"
                ],
                /** 当前配电层 */
                currentFloor: "第一层配电层",
                deviceTypeList: [
                    {value: "rsu", name: "RSU控制器"},
                    {value: "vehplate", name: "车牌识别仪"},
                    {value: "vehplate900", name: "全景摄像机"},
                    {value: "cam", name: "监控摄像机"},
                    {value: "ipswitch", name: "交换机"},
                    {value: "fireware", name: "防火墙"},
                    {value: "atlas", name: "ATLAS"},
                    {value: "do", name: "无设备"},

                ],
                submitting: false,
                afterSubmit: false,
            }
        },
        computed: {},
        methods: {
            getDeviceTypeNoListByDeviceType(deviceType) {
                if (deviceType == this.deviceTypeList[0].value || deviceType == this.deviceTypeList[6].value) {
                    return ["主", "备"]
                } else if (deviceType == this.deviceTypeList[4].value || deviceType == this.deviceTypeList[5].value) {
                    return ["业务", "监控"]
                } else if (deviceType == this.deviceTypeList[1].value) {
                    return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
                } else if (deviceType == this.deviceTypeList[2].value || deviceType == this.deviceTypeList[3].value) {
                    return ["1", "2", "3", "4"]
                } else {
                    return [];
                }
            },
            getDeviceModelNameByDeviceType(doListItemName, deviceType) {
                let deviceName = doListItemName.slice(0, deviceType.length + 1);
                let deviceTypeNo = doListItemName.slice(deviceType.length, deviceType.length + 1);
                let deviceModel = {
                    deviceType: deviceType,
                    deviceName: deviceName,
                    deviceTypeNo: deviceTypeNo
                };

                return deviceModel;
            },
            getDeviceModelByDoListName(doListItemName) {
                if (!doListItemName) {
                    return;
                }
                let deviceList = [];
                let deviceModel;
                if (this.stringUtils.contain(doListItemName, "rsu")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "rsu");
                    deviceList = this.data12.rsulist;
                } else if (this.stringUtils.contain(doListItemName, "vehplate") && !this.stringUtils.contain(doListItemName, "vehplate900")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "vehplate");
                    deviceList = this.data12.vehplatelist;
                } else if (this.stringUtils.contain(doListItemName, "vehplate900")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "vehplate900");
                    deviceList = this.data12.vehplate900list;
                } else if (this.stringUtils.contain(doListItemName, "cam")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "cam");
                    deviceList = this.data12.camlist;
                } else if (this.stringUtils.contain(doListItemName, "ipswitch")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "ipswitch");
                    deviceList = this.data12.ipswitchlist;
                } else if (this.stringUtils.contain(doListItemName, "fireware")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "fireware");
                    deviceList = this.data12.firewarelist;
                } else if (this.stringUtils.contain(doListItemName, "atlas")) {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "atlas");
                    deviceList = this.data12.atlaslist;
                } else if (doListItemName.slice(0, 2) == "do") {
                    deviceModel = this.getDeviceModelNameByDeviceType(doListItemName, "do");
                    deviceList = [];
                }
                // console.log("doListItemName",doListItemName);
                // console.log("deviceList",deviceList);
                // console.log("deviceName", deviceModel.deviceName);
                if (deviceList.length != 0) {
                    for (let i = 0; i < deviceList.length; i) {
                        let deviceItem = deviceList[i];
                        console.log("name", deviceItem.name);
                        if (deviceItem.name == deviceModel.deviceName) {
                            deviceItem.deviceType = deviceModel.deviceType;
                            deviceItem.deviceTypeNo = deviceModel.deviceTypeNo;
                        }
                        return deviceItem;
                    }
                } else {
                    return deviceModel;
                }
            },
            submit() {
                this.submitting = true;

                this.data12.dolist.forEach(doListItem => {


                });

                let params = this.jquery.extend({opt: 2}, this.data12);
                this.request.get12Data(this, params, (data) => {
                    this.submitting = false;
                    this.afterSubmit = true;
                    setTimeout(() => {
                        this.afterSubmit = false;
                    }, 2000)
                })
            }

        },
        mounted() {
            this.request.get12Data(this, null, (data) => {
                this.data12 = data;
                data.dolist.forEach((doListItem) => {
                    let doListItemName = doListItem.name;
                    let deviceModel = this.getDeviceModelByDoListName(doListItemName);
                    if (deviceModel) {
                        doListItem.deviceModel = deviceModel;
                    }
                });
                this.doList12 = data.dolist.slice(0, 11);
                this.doList24 = data.dolist.slice(12, 23);
            })
            this.request.get20Data(this, (data) => {
                this.data20 = data;
            })
            this.request.get22Data(this, (data) => {
                this.data22 = data;
            })
            this.request.get27Data(this, (data) => {
                this.data27 = data;
            })
        }

    }

</script>

<style scoped lang="scss">
    .text-align-center {
        text-align: center;
    }

    .yzhInput {
        height: 30px;
        width: 85%
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

    table select {
        float: none;
        border: 1px solid #dddddd;
        height: 32px;
        line-height: 35px;
        background-color: #FFFFFF;
        outline: none;
        padding-left: 10px;
        color: #585757;
        display: inline;
        font-size: 12px;
        width: 100%;
        transition: all 1s ease;
    }


</style>
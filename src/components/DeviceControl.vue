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
                        <th width="8%"></th>
                        <th width="12%">设备名称</th>
                        <th width="8%">状态</th>
                        <th width="8%">电压</th>
                        <th width="8%">电流</th>
                        <th width="40%" colspan="6">控制</th>
                    </tr>
                    </thead>
                    <tbody v-show="currentFloor == floorList[0]">
                    <tr v-for="(item,index) in data19.dolist" v-show="index<12">
                        <td>设备{{index+1}}</td>
                        <td>
                            {{getDeviceTypeNameByDeviceType(item.deviceModel.deviceType)}}
                            <span v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType)[item.deviceModel.deviceTypeNo-1]">（{{getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType)[item.deviceModel.deviceTypeNo-1]}}）</span>
                        </td>
                        <td style="text-align: center">
                            {{item.status == 0?"断电":"通电"}}
                        </td>
                        <td style="text-align: center">{{item.volt}}</td>
                        <td style="text-align: center">{{item.amp}}</td>
                        <td style="text-align: center">
                            <button :disabled="item.status == 0 || !needAuthority(3)" @click="switchEle(item,index,1)" :title="!needAuthority(3)?'无权限':''">断电
                            </button>
                        </td>
                        <td style="text-align: center">
                            <button :disabled="item.status == 1 || !needAuthority(3)" @click="switchEle(item,index,2)">通电</button>
                        </td>
                        <td style="text-align: center">
                            <button v-show="!(item.deviceModel.deviceType != deviceTypeList[0].value
                            && item.deviceModel.deviceType != deviceTypeList[1].value
                            && item.deviceModel.deviceType != deviceTypeList[2].value)"
                                    :disabled="!needAuthority(3)" :title="!needAuthority(3)?'无权限':''"
                                    @click="switchEle(item,index,3)">软重启
                            </button>
                        </td>
                        <td style="text-align: center">
                            <button v-show="!(item.deviceModel.deviceType != deviceTypeList[4].value
                            && item.deviceModel.deviceType != deviceTypeList[5].value)"
                                    :disabled="!needAuthority(3)" :title="!needAuthority(3)?'无权限':''"
                                    @click="switchEle(item,index,4)">硬重启
                            </button>
                        </td>
                        <td style="text-align: center">
                            <button :title="getLevelUpUrl(item)"
                                    v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0 && item.deviceModel.deviceType != deviceTypeList[0].value"
                                    @click="levelUp(item)">跳转
                            </button>
                        </td>
                        <td style="text-align: center">
                            <i class="fa fa-warning" style="color: red;"
                               title="设备电流为0"
                               v-show="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0 && item.amp == 0"></i>
                            <i class="fa fa-warning" style="color: red;"
                               title="无设备有电流"
                               v-show="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length ==0 && item.amp != 0"></i>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-show=" currentFloor== floorList[1]">
                    <tr v-for="(item,index) in data19.dolist" v-show="index>11 && index < 24">
                        <td>设备{{index+1}}</td>
                        <td>
                            {{getDeviceTypeNameByDeviceType(item.deviceModel.deviceType)}}
                            <span v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType)[item.deviceModel.deviceTypeNo-1]">（{{getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType)[item.deviceModel.deviceTypeNo-1]}}）</span>
                        </td>
                        <td>
                            {{item.status == 0?"断电":"通电"}}
                        </td>
                        <td>{{item.volt}}</td>
                        <td>{{item.amp}}</td>
                        <td style="text-align: center">
                            <button :disabled="item.status == 0 || !needAuthority(3)" @click="switchEle(item,index,1)" :title="!needAuthority(3)?'无权限':''">断电
                            </button>
                        </td>
                        <td style="text-align: center">
                            <button :disabled="item.status == 1 || !needAuthority(3)" @click="switchEle(item,index,2)">通电</button>
                        </td>
                        <td style="text-align: center">
                            <button v-show="!(item.deviceModel.deviceType != deviceTypeList[0].value
                            && item.deviceModel.deviceType != deviceTypeList[1].value
                            && item.deviceModel.deviceType != deviceTypeList[2].value)"
                                    :disabled="!needAuthority(3)" :title="!needAuthority(3)?'无权限':''"
                                    @click="switchEle(item,index,3)">软重启
                            </button>
                        </td>
                        <td style="text-align: center">
                            <button v-show="!(item.deviceModel.deviceType != deviceTypeList[4].value
                            && item.deviceModel.deviceType != deviceTypeList[5].value)"
                                    :disabled="!needAuthority(3)" :title="!needAuthority(3)?'无权限':''"
                                    @click="switchEle(item,index,4)">硬重启
                            </button>
                        </td>
                        <td>
                            <button :title="getLevelUpUrl(item)"
                                    v-if="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0 && item.deviceModel.deviceType != deviceTypeList[0].value"
                                    @click="levelUp(item)">跳转
                            </button>
                        </td>
                        <td>
                            <i class="fa fa-warning" style="color: red;"
                               title="设备电流为0"
                               v-show="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length!=0 && item.amp == 0"></i>
                            <i class="fa fa-warning" style="color: red;"
                               title="无设备有电流"
                               v-show="getDeviceTypeNoListByDeviceType(item.deviceModel.deviceType).length ==0 && item.amp != 0"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </ul>
        </div>
        <div class="user_tong_kj">
            <ul class="forms_box" style="float: none">
                <li>
                    <label style="width: auto;">门锁控制</label>
                </li>
                <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                    <tbody>
                    <tr>
                        <td width="50%">
                            前门状态（设备柜/一体化柜）
                        </td>
                        <td width="30%">
                            {{this.getDoorStatusNameByStatus(this.data20.hwequcabfrontdoorstatus)}}
                        </td>
                        <td width="20%">
                            <button v-show="this.data20.hwequcabfrontdoorstatus == 0" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(3,2)">开门
                            </button>
                            <button v-show="this.data20.hwequcabfrontdoorstatus == 1" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(3,1)">锁门
                            </button>
                            <span v-show="this.data20.hwequcabfrontdoorstatus == 255">无效</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            后门状态（设备柜/一体化柜）
                        </td>
                        <td>
                            {{this.getDoorStatusNameByStatus(this.data20.hwequcabbackdoorstatus)}}
                        </td>
                        <td>
                            <button v-show="this.data20.hwequcabbackdoorstatus == 0" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(4,2)">开门
                            </button>
                            <button v-show="this.data20.hwequcabbackdoorstatus == 1" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(4,1)">锁门
                            </button>
                            <span v-show="this.data20.hwequcabbackdoorstatus == 255">无效</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            前门状态（电池柜）
                        </td>
                        <td>
                            {{this.getDoorStatusNameByStatus(this.data20.hwbatcabfrontdoorstatus)}}
                        </td>
                        <td>
                            <button v-show="this.data20.hwbatcabfrontdoorstatus == 0" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(1,2)">开门
                            </button>
                            <button v-show="this.data20.hwbatcabfrontdoorstatus == 1" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(1,1)">锁门
                            </button>
                            <span v-show="this.data20.hwbatcabfrontdoorstatus == 255">无效</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            后门状态（电池柜）
                        </td>
                        <td>
                            {{this.getDoorStatusNameByStatus(this.data20.hwbatcabbackdoorstatus)}}
                        </td>
                        <td>
                            <button v-show="this.data20.hwbatcabbackdoorstatus == 0" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(2,2)">开门
                            </button>
                            <button v-show="this.data20.hwbatcabbackdoorstatus == 1" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''"
                                    @click="openDoor(2,1)">锁门
                            </button>
                            <span v-show="this.data20.hwbatcabbackdoorstatus == 255">无效</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </ul>
        </div>

        <div class="user_tong_kj">
            <ul class="forms_box" style="float: none">
                <li>
                    <label style="width: auto;">防雷控制器控制</label>
                </li>
                <div v-for="(item, index) in data27.spdlist">
                    <div class="yzhBtn active" style="width: 100px;">
                        防雷卡控制器{{index+1}}
                    </div>
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1 yzhSmallTable"
                           style="table-layout: fixed;font-size: 12px;margin-bottom: 4px">
                        <tbody>
                        <tr>
                            <td width="30%">
                                <label style="font-size: 12px">雷击次数</label>
                            </td>
                            <td width="35%">
                                <label>{{item.struck_cnt}}</label>
                            </td>
                            <td width="35%">
                                <button @click="clearSpdCount(item)" :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''">清零</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
        </div>

        <div class="hard forms_box">
            <div class="tong_btn text-align-center">
                <el-button @click="dialogVisible = true" type="danger" style="background-color: #019de5;margin-left: 10px" size="small" round
                           :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''">
                    重启ETC门架监控控制器
                    <i class="fa fa-spinner fa-pulse" v-show="submitting" style="margin: 0 6px"></i>
                </el-button>
            </div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>确认重启ETC门架监控控制器吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="reStart()">确 定</el-button>
          </span>
        </el-dialog>
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
                data19: {
                    dolist: []
                },
                data20: {},
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
                dialogVisible: false,
                interval: null
            }
        },
        computed: {},
        methods: {
            needAuthority(needAuthority) {
                let currentUserAuthority = this.$store.getters.getAuthority;
                return currentUserAuthority != null && currentUserAuthority >= needAuthority;
            },
            getDeviceTypeNameByDeviceType(deviceType) {
                let deviceTypeName;
                this.deviceTypeList.forEach((item) => {
                    if (item.value == deviceType) {
                        deviceTypeName = item.name;
                    }
                })
                return deviceTypeName;
            },
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
                    name: deviceName,
                    deviceTypeNo: deviceTypeNo
                };
                return deviceModel;
            },
            getDeviceModelByDoListName(doListItemName) {
                if (!doListItemName) {
                    return;
                }
                let deviceList = [];
                let deviceModel = {};
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
                    deviceList = this.data12.camList;
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
                if (deviceList && deviceList.length != 0) {
                    for (let i = 0; i < deviceList.length; i++) {
                        let deviceItem = deviceList[i];
                        if (deviceItem.name == deviceModel.name) {
                            deviceItem.deviceType = deviceModel.deviceType;
                            deviceItem.deviceTypeNo = deviceModel.deviceTypeNo;
                            return deviceItem;
                        }
                    }
                } else {
                    return deviceModel;
                }
            },
            switchEle(item, index, type) {
                //type:1断电，2通电，3软重启，硬重启
                let doItem = "do" + (index + 1);
                let params = {};
                params[doItem] = type + ""
                this.request.get18Data(this, params, (data) => {
                    this.$message({type: "success", message: "操作成功"});
                })
            },
            getLevelUpUrl(item) {
                let url;
                if (item.deviceModel.deviceType == this.deviceTypeList[4].value
                    || item.deviceModel.deviceType == this.deviceTypeList[5].value
                    || item.deviceModel.deviceType == this.deviceTypeList[6].value) {
                    url = "https://" + item.deviceModel.ip;
                } else {
                    url = "http://" + item.deviceModel.ip;
                }
                return url;
            },
            levelUp(item) {
                let url = this.getLevelUpUrl(item);
                window.open(url);
            },
            getDoorStatusNameByStatus(status) {
                if (status == 0) {
                    return "上锁";
                } else if (status == 1) {
                    return "开锁";
                } else if (status == 255) {
                    return "无效";
                }
            },
            openDoor(cabineid, operate) {
                //cabineid：1电池柜前门锁，2电池柜后门锁，3设备柜前门锁，4设备柜后门锁；
                //operate：1关锁，2开锁
                let param = {
                    cabineid: cabineid,
                    operate: operate,
                    opt: 2
                }
                this.request.get22Data(this, param, (data) => {
                    this.$message({type: "success", "message": "操作成功"});
                })
            },
            clearSpdCount(item) {
                //clearcounter：0保持，1清零
                let param = {
                    spdlist: [{
                        spdid: item.spdid,
                        clearcounter: 1
                    }],
                    opt: 2
                }
                this.request.get27Data(this, param, (data) => {
                    this.$message({type: "success", "message": "操作成功"});
                })
            },
            reStart() {
                this.dialogVisible = false
                //0：保持 1：重启
                let param = {
                    sysreset: 1,
                    opt: 2
                }
                this.submitting = true;
                this.request.get18Data(this, param, (data) => {
                    this.submitting = false;
                    this.$message({type: "success", "message": "操作成功"});
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
                this.request.get19Data(this, null, (data) => {
                    this.data19 = data;
                    data.dolist.forEach((doListItem) => {
                        let doListItemName = doListItem.name;
                        let deviceModel = this.getDeviceModelByDoListName(doListItemName);
                        if (deviceModel) {
                            doListItem.deviceModel = deviceModel;
                        }
                    });
                })
            }, (error) => {
                this.data12 = {};
            })
            this.request.get20Data(this, null, (data) => {
                this.data20 = data;
            }, (error) => {
                this.data20 = {};
            })
            this.request.get22Data(this, null, (data) => {
                this.data22 = data;
            }, (error) => {
                this.data22 = {};
            })
            this.request.get27Data(this, null, (data) => {
                this.data27 = data;
            }, (error) => {
                this.data27 = {};
            })
            //刷新数据
            this.interval = setInterval(() => {
                this.request.get12Data(this, null, (data) => {
                    this.data12 = data;
                    data.dolist.forEach((doListItem) => {
                        let doListItemName = doListItem.name;
                        let deviceModel = this.getDeviceModelByDoListName(doListItemName);
                        if (deviceModel) {
                            doListItem.deviceModel = deviceModel;
                        }
                    });
                    this.request.get19Data(this, null, (data) => {
                        this.data19 = data;
                        data.dolist.forEach((doListItem) => {
                            let doListItemName = doListItem.name;
                            let deviceModel = this.getDeviceModelByDoListName(doListItemName);
                            if (deviceModel) {
                                doListItem.deviceModel = deviceModel;
                            }
                        });
                    })
                }, (error) => {
                    this.data12 = {};
                })
                this.request.get20Data(this, null, (data) => {
                    this.data20 = data;
                }, (error) => {
                    this.data20 = {};
                })
                this.request.get22Data(this, null, (data) => {
                    this.data22 = data;
                }, (error) => {
                    this.data22 = {};
                })
                this.request.get27Data(this, null, (data) => {
                    this.data27 = data;
                }, (error) => {
                    this.data27 = {};
                })
            }, this.config.REFRESH_SECONDS());
        },
        destroyed() {
            clearInterval(this.interval);
            this.interval = null;
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
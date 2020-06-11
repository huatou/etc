<template>
    <div class="right_main">
        <div class="net_box">
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    机柜动环告警
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingCabinet">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                        <thead>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in cabinetList"
                            v-show="(onlyShowWarngingCabinet && item.value != '在线' && item.value != '正常' && item.value && item.value) ||!onlyShowWarngingCabinet ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">RSU控制器
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingRsu">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed;">
                        <tbody>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        <tr v-for="item in rsuList" v-show="(onlyShowWarngingRsu && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingRsu ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
        </div>
        <div class="net_box">
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    车牌识别仪/全景摄像机
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingCam">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                        <thead>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in camList" v-show="(onlyShowWarngingCam && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingCam ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    防雷监测
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingSpd">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed;">
                        <tbody>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        <tr v-for="item in spdList" v-show="(onlyShowWarngingSpd && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingSpd ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>

        </div>
        <div class="net_box">
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    交换机
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingIpSwitch">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper" style="height:150px;">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                        <thead>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in ipSwitchList"
                            v-show="(onlyShowWarngingIpSwitch && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingIpSwitch ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    防火墙
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingFireWare">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper" style="height:150px;">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed;">
                        <tbody>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        <tr>
                        <tr v-for="item in fireWareList"
                            v-show="(onlyShowWarngingFireWare && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingFireWare ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
        </div>
        <div class="net_box">
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    接地电阻
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingSpdRes">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper" style="height:150px;">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                        <thead>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in spdResList" v-show="(onlyShowWarngingSpdRes && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingSpdRes ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    门架ATLAS
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingAtlas">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper" style="height:150px;">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed;">
                        <tbody>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        <tr v-for="item in atlasList" v-show="(onlyShowWarngingAtlas && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingAtlas ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
        </div>
        <div class="net_box">
            <ul class="forms_box">
                <div style="font-size: 14px;padding-bottom: 4px;font-weight: bold;">
                    控制器
                    <el-checkbox style="line-height: 20px;float:none;display: inline;float: right;width: auto;padding-right: 10px"
                                 v-model="onlyShowWarngingcontroller">只显示告警的
                    </el-checkbox>
                </div>
                <div class="tableWrapper" style="height: 150px;">
                    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                        <thead>
                        <tr>
                            <th width="10%">报警类目</th>
                            <th width="15%">报警信息</th>
                            <th width="15%">报警等级</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <tr v-for="item in controllerList"
                            v-show="(onlyShowWarngingcontroller && item.value != '在线' && item.value != '正常' && item.value) ||!onlyShowWarngingcontroller ">
                            <td>{{item.keyName}}</td>
                            <td>{{item.value}}</td>
                            <td>
                                <span style="color: #ff9d5b;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level != 2">一般告警</span>
                                <span style="color: red;font-weight: bold;" v-if="item.value && item.value != '在线' && item.value != '正常' && item.level == 2">严重告警</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <ul class="forms_box" style="background-color: #efefef;">

            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                data14: {},
                data15: {},
                data20: {},
                data24: {},
                data27: {},
                data28: {},
                data30: {},
                cabinetList: [],
                rsuList: [],
                camList: [],
                fireWareList: [],
                ipSwitchList: [],
                spdList: [],
                spdResList: [],
                atlasList: [],
                controllerList: [],
                onlyShowWarngingCabinet: true,
                onlyShowWarngingRsu: true,
                onlyShowWarngingCam: true,
                onlyShowWarngingFireWare: true,
                onlyShowWarngingIpSwitch: true,
                onlyShowWarngingSpd: true,
                onlyShowWarngingSpdRes: true,
                onlyShowWarngingAtlas: true,
                onlyShowWarngingcontroller: true,
            }
        },
        computed: {},
        methods: {
            download(filename, text) {
                var pom = document.createElement('a');
                pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                pom.setAttribute('download', filename);
                if (document.createEvent) {
                    var event = document.createEvent('MouseEvents');
                    event.initEvent('click', true, true);
                    pom.dispatchEvent(event);
                } else {
                    pom.click();
                }
            }
            ,
            getStatusNameByType(statusType) {
                if (statusType == 1) {
                    return "待机";
                } else if (statusType == 2) {
                    return "运行中";
                } else if (statusType == 3) {
                    return "故障";
                } else if (statusType == 255) {
                    return "未知";
                }
            }
            ,
            getTempAlarmStatusNameByType(statusType) {
                if (statusType == 0) {
                    return "正常";
                } else if (statusType == 1) {
                    return "高温告警（50℃）";
                } else if (statusType == 2) {
                    return "低温告警（-20℃）";
                } else if (statusType == 3) {
                    return "高高温告警（70℃）";
                } else if (statusType == 255) {
                    return "环境温度传感器未接";
                }
            }
            ,
            getHumiAlarmStatusNameByType(statusType) {
                if (statusType == 0) {
                    return "正常";
                } else if (statusType == 1) {
                    return "高湿高级";
                } else if (statusType == 2) {
                    return "低湿告警）";
                } else if (statusType == 255) {
                    return "环境湿度传感器未接";
                }
            }
            ,
            getCoolingDevicesModeNameByMode(mode) {
                if (mode == 1) {
                    return "纯风扇模式";
                } else if (mode == 2) {
                    return "纯空调模式";
                } else if (mode == 3) {
                    return "智能模式";
                } else if (mode == 255) {
                    return "未知";
                }
            }
            ,
            getBatRunningStateNameByState(batrunningstate) {
                if (batrunningstate == 1) {
                    return "电池在线";
                } else if (batrunningstate == 2) {
                    return "电池断电";
                } else if (batrunningstate == 3) {
                    return "电池处于浮充状态";
                } else if (batrunningstate == 4) {
                    return "电池处于充电状态";
                } else if (batrunningstate == 5) {
                    return "电池处于放电状态";
                } else if (batrunningstate == 255) {
                    return "电池单元工作状态未知";
                }
            }
            ,
            getCabinetTypeNameByType(cabinettype) {
                if (cabinettype == 1) {
                    return "华为双机柜双开门";
                } else if (cabinettype == 2) {
                    return "华为双机柜单开门";
                } else if (cabinettype == 3) {
                    return "华为单机柜双开门";
                } else if (cabinettype == 4) {
                    return "华为单机柜单开门";
                } else if (cabinettype == 5) {
                    return "中兴";
                } else if (cabinettype == 6) {
                    return "金晟安";
                } else if (cabinettype == 7) {
                    return "爱特思";
                } else if (cabinettype == 8) {
                    return "诺龙";
                } else if (cabinettype == 9) {
                    return "容尊堡";
                } else if (cabinettype == 10) {
                    return "亚邦";
                }
            }
        },
        mounted() {
            this.request.get14Data(this, (data) => {
                if (!data.rsulist || data.rsulist.length == 0) {
                    this.rsuList.push({
                        keyName: "RSU控制器数量",
                        value: 0
                    });
                } else {
                    for (let i = 0; i < data.rsulist.length; i++) {
                        let rsuItem = data.rsulist[i];
                        let isOnlineName = "";
                        if (rsuItem.isonline == 0) {
                            isOnlineName = "不在线";
                        } else if (rsuItem.isonline == 1) {
                            isOnlineName = "在线";
                        }
                        this.rsuList.push({
                            keyName: "RSU控制器" + (i + 1),
                            value: isOnlineName,
                            level: 2
                        });


                        let controlStatusName = "";
                        if (rsuItem.controlstatus == 1) {
                            controlStatusName = "PSAM卡复位失败";
                        } else if (rsuItem.controlstatus == 2) {
                            controlStatusName = "路侧单元天线头连接失败";
                        } else if (rsuItem.controlstatus == 3) {
                            controlStatusName = "路侧单元控制器初始化失败";
                        }
                        this.rsuList.push({
                            keyName: "RSU控制器" + (i + 1) + "控制器工作状态",
                            value: controlStatusName,
                            level: 2
                        });


                        //psam卡列表
                        if (!rsuItem.psamlist || rsuItem.psamlist.length == 0) {
                            this.rsuList.push({
                                keyName: "RSU控制器" + (i + 1),
                                value: "PSAM列表（psamlist）为空"
                            });
                        } else {
                            for (let j = 0; j < rsuItem.psamlist.length; j++) {
                                let psamItem = rsuItem.psamlist[j];
                                let psamStatusName = "";
                                if (psamItem.status == 1) {
                                    psamStatusName = "正常";
                                } else if (psamItem.status == 2) {
                                    psamStatusName = "异常";
                                } else if (psamItem.status == 3) {
                                    psamStatusName = "未授权";
                                } else if (psamItem.status == 4) {
                                    psamStatusName = "授权失败";
                                }
                                this.rsuList.push({
                                    keyName: "RSU控制器" + (i + 1) + "-PSAM授权状态" + (j + 1),
                                    value: psamStatusName
                                });
                            }
                        }

                        //天线头列表
                        if (!rsuItem.antennalist || rsuItem.antennalist.length == 0) {
                            this.rsuList.push({
                                keyName: "RSU控制器" + (i + 1),
                                value: "天线头列表（antennalist）为空"
                            });
                        } else {
                            for (let j = 0; j < rsuItem.antennalist.length; j++) {
                                let antennaItem = rsuItem.antennalist[j];
                                let antennaStatusName = "";
                                if (antennaItem.status == 0) {
                                    antennaStatusName = "正常";
                                } else if (antennaItem.status == 1) {
                                    antennaStatusName = "异常";
                                }
                                this.rsuList.push({
                                    keyName: "RSU控制器" + (i + 1) + "-天线头状态 " + (j + 1),
                                    value: antennaStatusName
                                });
                            }
                        }
                    }
                }
            });
            this.request.get15Data(this, (data) => {
                if (!data.vehplatelist || data.vehplatelist.length == 0) {
                    this.camList.push({
                        keyName: "车牌识别仪数量",
                        value: 0
                    });
                } else {
                    for (let i = 0; i < data.vehplatelist.length; i++) {
                        let camItem = data.vehplatelist[i];
                        let isOnlineName = "";
                        if (camItem.isonline == 0) {
                            isOnlineName = "不在线";
                        } else if (camItem.isonline == 1) {
                            isOnlineName = "在线";
                        }
                        this.camList.push({
                            keyName: "车牌识别仪" + (i + 1),
                            value: isOnlineName,
                            level: 2
                        });
                        let workStatusName = "";
                        if (camItem.workStatus == 0) {
                            workStatusName = "异常";
                        } else if (camItem.controlstatus == 1) {
                            workStatusName = "正常";
                        }
                        this.camList.push({
                            keyName: "车牌识别仪" + (i + 1) + "工作状态",
                            value: workStatusName
                        });


                        let lightWorkStatusName = "";
                        if (camItem.lightworkstatus == 0) {
                            lightWorkStatusName = "异常";
                        } else if (camItem.lightworkstatus == 1) {
                            lightWorkStatusName = "正常";
                        }
                        this.camList.push({
                            keyName: "车牌识别仪" + (i + 1) + "补光灯的工作状态",
                            value: lightWorkStatusName
                        });
                    }
                }
            });
            this.request.get16Data(this, (data) => {
                if (!data.ipswitchlist || data.ipswitchlist.length == 0) {
                    this.ipSwitchList.push({
                        keyName: "交换机数量",
                        value: 0
                    });
                } else {
                    for (let i = 0; i < data.ipswitchlist.length; i++) {
                        let ipSwitchItem = data.ipswitchlist[i];
                        let isOnlineName = "";
                        if (ipSwitchItem.isonline == 0) {
                            isOnlineName = "不在线";
                        } else if (ipSwitchItem.isonline == 1) {
                            isOnlineName = "在线";
                        }
                        this.ipSwitchList.push({
                            keyName: "交换机" + (i + 1),
                            value: isOnlineName,
                            level: 2
                        });
                    }
                }
            })
            this.request.get20Data(this, null, (data) => {
                this.cabinetList.push({
                    keyName: "机柜动环是否在线",
                    value: data.isonline == 0 ? "不在线" : "在线",
                    level: 2
                }, {
                    keyName: "锂电池组是否在线",
                    value: data.acbgroupbatonline == 0 ? "不在线" : "在线",
                    level: 2
                }, {
                    keyName: "直流空调是否在线（设备柜）",
                    value: data.dcaironline == 0 ? "不在线" : "在线",
                    level: 2
                }, {
                    keyName: "直流空调是否在线（电池柜）",
                    value: data.dcaironline2 == 0 ? "不在线" : "在线",
                    level: 2
                }, {
                    keyName: "温湿度传感器是否在线（设备柜）",
                    value: data.temhumonline == 0 ? "不在线" : "在线",
                    level: 2
                }, {
                    keyName: "温湿度传感器是否在线（电池柜）",
                    value: data.temhumonline2 == 0 ? "不在线" : "在线",
                    level: 2
                }, {
                    keyName: "环境温度告警(设备柜)",
                    value: this.getTempAlarmStatusNameByType(data.hwenvtempalarmtraps)
                }, {
                    keyName: "环境温度告警(电池柜)",
                    value: this.getTempAlarmStatusNameByType(data.hwenvtempalarmtraps2)
                }, {
                    keyName: "环境湿度告警(设备柜)",
                    value: this.getHumiAlarmStatusNameByType(data.hwenvhumialarmresumetraps)
                }, {
                    keyName: "环境湿度告警(电池柜)",
                    value: this.getHumiAlarmStatusNameByType(data.hwenvhumialarmresumetraps2)
                }, {
                    keyName: "门禁告警(设备柜)",
                    value: data.hwdooralarmtraps == 0 ? "正常" : data.hwdooralarmtraps == 1 ? "告警" : "传感器未接"
                }, {
                    keyName: "门禁告警(电池柜)",
                    value: data.hwdooralarmtraps2 == 0 ? "正常" : data.hwdooralarmtraps2 == 1 ? "告警" : "传感器未接"
                }, {
                    keyName: "水浸告警(设备柜)",
                    value: data.hwwateralarmtraps == 0 ? "正常" : data.hwwateralarmtraps == 1 ? "告警" : "水浸传感器未接"
                }, {
                    keyName: "水浸告警(电池柜)",
                    value: data.hwwateralarmtraps2 == 0 ? "正常" : data.hwwateralarmtraps2 == 1 ? "告警" : "水浸传感器未接"
                }, {
                    keyName: "烟雾告警(设备柜)",
                    value: data.hwsmokealarmtraps == 0 ? "正常" : data.hwsmokealarmtraps == 1 ? "告警" : "烟雾传感器未接"
                }, {
                    keyName: "烟雾告警(电池柜)",
                    value: data.hwsmokealarmtraps2 == 0 ? "正常" : data.hwsmokealarmtraps2 == 1 ? "告警" : "烟雾传感器未接"
                }, {
                    keyName: "交流防雷器故障告警",
                    value: data.hwacspdalarmtraps == 0 ? "正常" : data.hwacspdalarmtraps == 1 ? "告警" : "防雷器传感器未接"
                }, {
                    keyName: "空调内风机故障(设备柜)",
                    value: data.hwair_cond_infan_alarm == 0 ? "正常" : data.hwair_cond_infan_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调内风机故障(电池柜)",
                    value: data.hwair_cond_infan_alarm2 == 0 ? "正常" : data.hwair_cond_infan_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调外风机故障(设备柜)",
                    value: data.hwair_cond_outfan_alarm == 0 ? "正常" : data.hwair_cond_outfan_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调外风机故障(电池柜)",
                    value: data.hwair_cond_outfan_alarm2 == 0 ? "正常" : data.hwair_cond_outfan_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调压缩机故障(设备柜)",
                    value: data.hwair_cond_comp_alarm == 0 ? "正常" : data.hwair_cond_comp_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调压缩机故障(电池柜)",
                    value: data.hwair_cond_comp_alarm2 == 0 ? "正常" : data.hwair_cond_comp_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调回风口传感器故障(设备柜)",
                    value: data.hwair_cond_return_port_sensor_alarm == 0 ? "正常" : data.hwair_cond_return_port_sensor_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调回风口传感器故障(电池柜)",
                    value: data.hwair_cond_return_port_sensor_alarm2 == 0 ? "正常" : data.hwair_cond_return_port_sensor_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调蒸发器冻结(设备柜)",
                    value: data.hwair_cond_evap_freezing_alarm == 0 ? "正常" : data.hwair_cond_evap_freezing_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调蒸发器冻结(电池柜)",
                    value: data.hwair_cond_evap_freezing_alarm2 == 0 ? "正常" : data.hwair_cond_evap_freezing_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调频繁高压力(设备柜)",
                    value: data.hwair_cond_freq_high_press_alarm == 0 ? "正常" : data.hwair_cond_freq_high_press_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调频繁高压力(电池柜)",
                    value: data.hwair_cond_freq_high_press_alarm2 == 0 ? "正常" : data.hwair_cond_freq_high_press_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调通信失败告警(设备柜)",
                    value: data.hwair_cond_comm_fail_alarm == 0 ? "正常" : data.hwair_cond_comm_fail_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "空调通信失败告警(电池柜)",
                    value: data.hwair_cond_comm_fail_alarm2 == 0 ? "正常" : data.hwair_cond_comm_fail_alarm2 == 1 ? "告警" : "无效"
                }, {
                    keyName: "交流电源输入停电告警",
                    value: data.hwacinputfailalarm == 0 ? "正常" : data.hwacinputfailalarm == 1 ? "告警" : "无效",
                    level: 2
                }, {
                    keyName: "交流电源输入L1\t相缺相告警",
                    value: data.hwacinputl1failalarm == 0 ? "正常" : data.hwacinputl1failalarm == 1 ? "告警" : "无效",
                    level: 2
                }, {
                    keyName: "交流电源输入L2\t相缺相告警",
                    value: data.hwacinputl2failalarm == 0 ? "正常" : data.hwacinputl2failalarm == 1 ? "告警" : "无效",
                    level: 2
                }, {
                    keyName: "交流电源输入L3\t相缺相告警",
                    value: data.hwacinputl3failalarm == 0 ? "正常" : data.hwacinputl3failalarm == 1 ? "告警" : "无效",
                    level: 2
                }, {
                    keyName: "直流电源输出告警",
                    value: data.hwdcvoltalarmtraps == 0 ? "正常" : data.hwdcvoltalarmtraps == 1 ? "告警" : "无效",
                    level: 2
                }, {
                    keyName: "LLVD1下电告警",
                    value: data.hwloadlvdalarmtraps == 0 ? "正常" : data.hwloadlvdalarmtraps == 1 ? "告警" : "无效"
                }, {
                    keyName: "所有锂电通信失败告警",
                    value: data.hwacbgroup_comm_fail_alarm == 0 ? "正常" : data.hwacbgroup_comm_fail_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "电池放电告警",
                    value: data.hwacbgroup_discharge_alarm == 0 ? "正常" : data.hwacbgroup_discharge_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "电池充电过流告警",
                    value: data.hwacbgroup_charge_overcurrent_alarm == 0 ? "正常" : data.hwacbgroup_charge_overcurrent_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "电池温度高告警",
                    value: data.hwacbgroup_temphigh_alarm == 0 ? "正常" : data.hwacbgroup_temphigh_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "电池温度低告警",
                    value: data.hwacbgroup_templow_alarm == 0 ? "正常" : data.hwacbgroup_templow_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "电池下电",
                    value: data.hwacbgroup_poweroff_alarm == 0 ? "正常" : data.hwacbgroup_poweroff_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "电池熔丝断",
                    value: data.hwacbgroup_fusebreak_alarm == 0 ? "正常" : data.hwacbgroup_fusebreak_alarm == 1 ? "告警" : "无效"
                }, {
                    keyName: "模块丢失",
                    value: data.hwacbgroup_moduleloss_alarm == 0 ? "正常" : data.hwacbgroup_moduleloss_alarm == 1 ? "告警" : "无效"
                });
                this.$forceUpdate();
            })

            this.request.get23Data(this, (data) => {
                if (!data.firewarelist || data.firewarelist.length == 0) {
                    this.fireWareList.push({
                        keyName: "防火墙数量",
                        value: 0
                    });
                } else {
                    for (let i = 0; i < data.firewarelist.length; i++) {
                        let fireWareItem = data.firewarelist[i];
                        let isOnlineName = "";
                        if (fireWareItem.isonline == 0) {
                            isOnlineName = "不在线";
                        } else if (fireWareItem.isonline == 1) {
                            isOnlineName = "在线";
                        }
                        this.fireWareList.push({
                            keyName: "防火墙" + (i + 1),
                            value: isOnlineName,
                            level: 2
                        });
                    }
                }
            })
            this.request.get24Data(this, (data) => {
                if (!data.atlaslist || data.atlaslist.length == 0) {
                    this.atlasList.push({
                        keyName: "Atlas数量",
                        value: 0
                    });
                } else {
                    for (let i = 0; i < data.atlaslist.length; i++) {
                        let atlasItem = data.atlaslist[i];
                        let isOnlineName = "";
                        if (atlasItem.isonline == 0) {
                            isOnlineName = "不在线";
                        } else if (atlasItem.isonline == 1) {
                            isOnlineName = "在线";
                        }
                        this.atlasList.push({
                            keyName: "Atlas" + (i + 1),
                            value: isOnlineName,
                            level: 2
                        });
                    }
                }
            })
            this.request.get27Data(this, null, (data) => {
                if (!data.spdlist || data.spdlist.length == 0) {
                    this.spdList.push({
                        keyName: "防雷器数量",
                        value: 0
                    });
                } else {
                    for (let i = 0; i < data.spdlist.length; i++) {
                        let spdItem = data.spdlist[i];
                        let isOnlineName = "";
                        if (spdItem.isonline == 0) {
                            isOnlineName = "不在线";
                        } else if (spdItem.isonline == 1) {
                            isOnlineName = "在线";
                        }
                        this.spdList.push({
                            keyName: "防雷器" + (i + 1),
                            value: isOnlineName,
                            level: 2
                        });

                        let remoteStatusAlarmName = "";
                        if (spdItem.remotestatusalarm == 0) {
                            remoteStatusAlarmName = "正常";
                        } else if (spdItem.remotestatusalarm == 1) {
                            remoteStatusAlarmName = "告警";
                        }
                        this.spdList.push({
                            keyName: "防雷器" + (i + 1) + "脱扣状态状态",
                            value: remoteStatusAlarmName
                        });

                        let lineGroundStatusName = "";
                        if (spdItem.linegroundstatusalarm == 0) {
                            lineGroundStatusName = "正常";
                        } else if (spdItem.linegroundstatusalarm == 1) {
                            lineGroundStatusName = "告警";
                        }
                        this.spdList.push({
                            keyName: "防雷器" + (i + 1) + "线路&接地状态",
                            value: lineGroundStatusName
                        });

                        let leakCurAlarmStatusName = "";
                        if (spdItem.leakcuralarm == 0) {
                            leakCurAlarmStatusName = "正常";
                        } else if (spdItem.leakcuralarm == 1) {
                            leakCurAlarmStatusName = "告警";
                        }
                        this.spdList.push({
                            keyName: "防雷器" + (i + 1) + "漏电流报警",
                            value: leakCurAlarmStatusName
                        });
                    }
                }
            })
            this.request.get28Data(this, (data) => {
                let isOnlineName = "";
                if (data.isonline == 0) {
                    isOnlineName = "不在线";
                } else if (data.isonline == 1) {
                    isOnlineName = "在线";
                }
                this.spdResList.push({
                    keyName: "接地电阻",
                    value: isOnlineName,
                    level: 2
                });
            })
            this.request.get30Data(this, (data) => {
                let cpualarmName = "";
                if (data.cpualarm == 0) {
                    cpualarmName = "正常";
                } else if (data.cpualarm == 1) {
                    cpualarmName = "报警";
                }

                let cputempalarmName = "";
                if (data.cputempalarm == 0) {
                    cputempalarmName = "正常";
                } else if (data.cputempalarm == 1) {
                    cputempalarmName = "报警";
                }

                let memalarmName = "";
                if (data.memalarm == 0) {
                    memalarmName = "正常";
                } else if (data.memalarm == 1) {
                    memalarmName = "报警";
                }

                let softalarmName = "";
                if (data.softalarm == 0) {
                    softalarmName = "正常";
                } else if (data.softalarm == 1) {
                    softalarmName = "报警";
                }

                let lan2broadcastalarmName = "";
                if (data.lan2broadcastalarm == 0) {
                    lan2broadcastalarmName = "正常";
                } else if (data.lan2broadcastalarm == 1) {
                    lan2broadcastalarmName = "报警";
                }

                this.controllerList.push({
                    keyName: "CPU使用率报警",
                    value: cpualarmName,
                    level: 2
                }, {
                    keyName: "CPU温度报警",
                    value: cputempalarmName,
                }, {
                    keyName: "内存使用率报警",
                    value: memalarmName,
                }, {
                    keyName: "主程序运行异常报警",
                    value: softalarmName,
                }, {
                    keyName: "网口2广播风暴报警",
                    value: lan2broadcastalarmName,
                    level: 2
                });
            })
        }

    }

</script>

<style scoped lang="scss">
    .net_box ul {
        padding: 10px 10px;
    }

    .el-checkbox__label {
        font-size: 12px;
    }

    .forms_box {
        margin-top: 10px;
    }

    .tableWrapper {
        margin-top: 10px;
        height: 300px;
        overflow-y: scroll;
    }


</style>
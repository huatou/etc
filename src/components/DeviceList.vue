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
                    <td style="vertical-align: top;height: 600px">
                        <div v-for="(item,index) in buttonList" class="item" :class="{'active':item.active}"
                             @click="chooseItem(item,index)">
                            {{item.text}}
                        </div>
                    </td>
                    <td style="vertical-align: top">
                        <textarea v-model="currentItem.json" style="width: 90%;height: 600px"></textarea>
                    </td>
                    <td style="vertical-align: top">
                        <div style="overflow: scroll;height: 600px">
                            <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1"
                                   style="table-layout: fixed;overflow: scroll">
                                <thead>
                                <tr>
                                    <th width="50%" style="padding: 4px 0">字段名</th>
                                    <th width="50%" style="padding: 4px 0">数值</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="childItem in showData " v-show="!childItem.list">
                                    <td style="height: 20px">
                                        <span>{{childItem.keyName}}</span>
                                    </td>
                                    <td style="height: 20px">
                                        <span>{{childItem.value}}</span>
                                    </td>
                                </tr>
                                <tr v-for="childItem in showData" v-show="childItem.list">
                                    <td style="vertical-align: top" colspan="2">
                                        <span style="font-weight: bold;margin-bottom: 3px">{{childItem.keyName}}</span>
                                        <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="table-layout: fixed">
                                            <thead>
                                            <tr>
                                                <th width="50%" style="padding: 4px 0">字段名</th>
                                                <th width="50%" style="padding: 4px 0">数值</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item_ in childItem.list ">
                                                <td style="padding: 4px 0">
                                                    {{item_.keyName}}
                                                </td>
                                                <td style="padding: 4px 0">
                                                    {{item_.value}}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
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
                        text: "门架监控控制器信息",
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
                currentItem: {},
                currentItemData: {},
                showData: null
            }
        },
        computed: {},
        methods: {
            chooseItem(item, index) {
                this.buttonList.forEach((buttonItem) => {
                    buttonItem.active = false;
                })
                item.active = true;
                this.currentItem = item;
                if (index == 0) {
                    this.getData14();
                } else if (index == 1) {
                    this.getData15();
                } else if (index == 2) {
                    this.getData29();
                } else if (index == 3) {
                    this.getData20();
                } else if (index == 4) {
                    this.getData16();
                } else if (index == 5) {
                    this.getData23();
                } else if (index == 6) {
                    this.getData24();
                } else if (index == 7) {
                    this.getData30();
                } else if (index == 8) {
                    this.getData27();
                } else if (index == 9) {
                    this.getData28();
                } else if (index == 10) {
                    this.getData12();
                }
            },
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
            },
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
            },
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
            },
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
            },
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
            },
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
            },

            getData12() {
                this.request.get12Data(this, null, (data) => {
                        this.currentItem.json = JSON.stringify(data, null, 2);
                        this.currentItemData = data;
                        this.showData = [];
                        this.showData.push({
                            keyName: "消息类型",
                            value: data.messagetype
                        }, {
                            keyName: "机柜类型",
                            value: this.getCabinetTypeNameByType(data.cabinettype)
                        }, {
                            keyName: "机柜厂商",
                            value: data.cabinetfactroy
                        }, {
                            keyName: "etc 门架路网编号",
                            value: data.flagnetroadid
                        }, {
                            keyName: "etc 门架路段编号",
                            value: data.flagroadid
                        }, {
                            keyName: "etc 门架编号",
                            value: data.flagid
                        }, {
                            keyName: "etc 门架序号",
                            value: data.posid
                        }, {
                            keyName: "行车方向",
                            value: data.direction
                        }, {
                            keyName: "行车方向说明",
                            value: data.dirdescription
                        });
                        console.log("this.showData", this.showData);
                        this.$forceUpdate();
                    }
                )
            },
            getData14() {
                this.request.get14Data(this, (data) => {
                        this.currentItem.json = JSON.stringify(data, null, 2);
                        this.currentItemData = data;
                        this.showData = [];
                        this.showData.push({
                            keyName: "消息类型",
                            value: data.messagetype
                        }, {
                            keyName: "控制器IP地址",
                            value: data.vmctrl_ipaddr
                        }, {
                            keyName: "采集时间",
                            value: data.opttime
                        }, {
                            keyName: "RSU数量",
                            value: data.rsucnt
                        });
                        if (data.rsulist) {
                            for (let i = 0; i < data.rsulist.length; i++) {
                                let rsuItem = data.rsulist[i];
                                let rsuListItemLst = [{
                                    keyName: "RSU编号",
                                    value: rsuItem.id
                                }, {
                                    keyName: "名称",
                                    value: rsuItem.name
                                }, {
                                    keyName: "RSU IP地址",
                                    value: rsuItem.ip
                                }, {
                                    keyName: "RSU端口",
                                    value: rsuItem.port
                                }, {
                                    keyName: "是否在线",
                                    value: rsuItem.isOnline == 0 ? "不在线" : "在线"
                                }, {
                                    keyName: "控制器工作状态",
                                    value: rsuItem.controlstatus == 0 ? "正常" : rsuItem.controlstatus == 1 ? "PSAM卡复位失败" : "异常"
                                }, {
                                    keyName: "电压",
                                    value: rsuItem.volt
                                }, {
                                    keyName: "电流",
                                    value: rsuItem.amp
                                }, {
                                    keyName: "PSAM数量",
                                    value: rsuItem.psamcount
                                }];
                                this.showData.push({
                                    keyName: "RSU天线控制器" + (i + 1),
                                    list: rsuListItemLst
                                });
                            }
                        }
                        console.log("this.showData", this.showData);
                        this.$forceUpdate();
                    }
                )
            },
            getData15() {
                this.request.get15Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "车牌识别仪数量",
                        value: data.vehplatecnt
                    });
                    if (data.vehplatelist) {
                        for (let i = 0; i < data.vehplatelist.length; i++) {
                            let vehplateItem = data.vehplatelist[i];
                            let rsuListItemLst = [{
                                keyName: "名称",
                                value: vehplateItem.name
                            }, {
                                keyName: "识别仪ip地址",
                                value: vehplateItem.ip
                            }, {
                                keyName: "识别仪端口",
                                value: vehplateItem.port
                            }, {
                                keyName: "用户名密码",
                                value: vehplateItem.key
                            }, {
                                keyName: "是否在线",
                                value: vehplateItem.isOnline == 0 ? "不在线" : "在线"
                            }, {
                                keyName: "流水号",
                                value: vehplateItem.picstateid
                            }, {
                                keyName: "门架编号,全网唯一编号",
                                value: vehplateItem.gantryid
                            }, {
                                keyName: "状态采集时间",
                                value: vehplateItem.statetime
                            }, {
                                keyName: "积压图片流水数",
                                value: vehplateItem.overstockImageJourCount
                            }, {
                                keyName: "积压图片数",
                                value: vehplateItem.overstockImageCount
                            }, {
                                keyName: "相机编号（101~299）",
                                value: vehplateItem.cameranum
                            }, {
                                keyName: "车道编号",
                                value: vehplateItem.lanenum
                            }, {
                                keyName: "连接状态",
                                value: vehplateItem.connectstatus == 0 ? "未连接" : "已连接"
                            }, {
                                keyName: "工作状态",
                                value: vehplateItem.workstatus == 0 ? "异常" : "正常"
                            }, {
                                keyName: "补光灯的工作状态",
                                value: vehplateItem.lightworkstatus == 0 ? "异常" : "正常"
                            }, {
                                keyName: "识别成功率",
                                value: vehplateItem.recognitionrate
                            }, {
                                keyName: "固件版本",
                                value: vehplateItem.hardwareversion
                            }, {
                                keyName: "软件版本",
                                value: vehplateItem.softwareversion
                            }, {
                                keyName: "设备从开机到现在的运行时间（秒）",
                                value: vehplateItem.runningtime
                            }, {
                                keyName: "厂商",
                                value: vehplateItem.brand
                            }, {
                                keyName: "设备型号",
                                value: vehplateItem.devicetype
                            }, {
                                keyName: "状态码",
                                value: vehplateItem.statuscode == 0 ? "正常" : "状态异常" + vehplateItem.statuscode + "：请找厂家查询状态码"
                            }, {
                                keyName: "状态描述 由厂商自定义",
                                value: vehplateItem.statusmsg
                            }];
                            this.showData.push({
                                keyName: "车牌识别仪" + (i + 1),
                                list: rsuListItemLst
                            });
                        }
                    }
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData16() {
                this.request.get16Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "交换机数量",
                        value: data.ipswitchcnt
                    });
                    if (data.ipswitchlist) {
                        for (let i = 0; i < data.ipswitchlist.length; i++) {
                            let ipswitchItem = data.ipswitchlist[i];
                            let ipswitchItemList = [{
                                keyName: "名称",
                                value: ipswitchItem.name
                            }, {
                                keyName: "生产商",
                                value: ipswitchItem.factoryname
                            }, {
                                keyName: "设备型号",
                                value: ipswitchItem.devicemodel
                            }, {
                                keyName: "IP地址",
                                value: ipswitchItem.ip
                            }, {
                                keyName: "设备类型",
                                value: ipswitchItem.type ? ipswitchItem.type == "switch" ? "交换机" : "防火墙" : ""
                            }, {
                                keyName: "是否在线",
                                value: ipswitchItem.isOnline == 0 ? "不在线" : "在线"
                            }, {
                                keyName: "CPU使用率",
                                value: ipswitchItem.cpuusage
                            }, {
                                keyName: "内存使用率",
                                value: ipswitchItem.memusage
                            }, {
                                keyName: "温度",
                                value: ipswitchItem.temperature
                            }, {
                                keyName: "端口数",
                                value: ipswitchItem.portcount
                            }];
                            this.showData.push({
                                keyName: "交换机" + (i + 1),
                                list: ipswitchItemList
                            });
                        }
                    }
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData20() {
                this.request.get20Data(this, null, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "机柜类型",
                        value: data.cabinettype == 1 ? "华为" : "未知"
                    }, {
                        keyName: "机柜动环是否在线",
                        value: data.isonline == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "锂电池组是否在线",
                        value: data.acbgroupbatonline == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "直流空调是否在线（设备柜）",
                        value: data.dcaironline == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "直流空调是否在线（电池柜）",
                        value: data.dcaironline2 == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "温湿度传感器是否在线（设备柜）",
                        value: data.temhumonline == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "温湿度传感器是否在线（电池柜）",
                        value: data.temhumonline2 == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "锂电电池电压",
                        value: data.hwacbgroupbatvolt
                    }, {
                        keyName: "电池电流",
                        value: data.hwacbgroupbatcurr
                    }, {
                        keyName: "电池总容量",
                        value: data.hwacbgrouptotalcapacity
                    }, {
                        keyName: "电池剩余容量",
                        value: data.hwacbgrouptotalremaincapacity
                    }, {
                        keyName: "电池备电时长",
                        value: data.hwacbgroupbackuptime
                    }, {
                        keyName: "电池SOH",
                        value: data.hwacbgroupbatsoh
                    }, {
                        keyName: "A/AB电压",
                        value: data.hwaporablvoltage
                    }, {
                        keyName: "B/BC电压",
                        value: data.hwbporbclvoltage
                    }, {
                        keyName: "C/CA电压",
                        value: data.hwcporcalvoltage
                    }, {
                        keyName: "A相电流",
                        value: data.hwaphasecurrent
                    }, {
                        keyName: "B相电流",
                        value: data.hwbphasecurrent
                    }, {
                        keyName: "C相电流",
                        value: data.hwcphasecurrent
                    }, {
                        keyName: "DC输出电压",
                        value: data.hwdcoutputvoltage
                    }, {
                        keyName: "DC输出电流",
                        value: data.hwdcoutputcurrent
                    }, {
                        keyName: "环境温度值(设备柜)",
                        value: data.hwenvtemperature
                    }, {
                        keyName: "环境温度值2(电池柜)",
                        value: data.hwenvtemperature2
                    }, {
                        keyName: "环境湿度值(设备柜)",
                        value: data.hwenvhumidity
                    }, {
                        keyName: "环境湿度值2(电池柜)",
                        value: data.hwenvhumidity2
                    }, {
                        keyName: "空调运行状态(设备柜)",
                        value: this.getStatusNameByType(data.hwdcairrunstatus)
                    }, {
                        keyName: "空调运行状态2(电池柜)",
                        value: this.getStatusNameByType(data.hwdcairrunstatus2)
                    }, {
                        keyName: "空调压缩机运行状态(设备柜)",
                        value: this.getStatusNameByType(data.hwdcaircompressorrunstatus)
                    }, {
                        keyName: "空调压缩机运行状态2(电池柜)",
                        value: this.getStatusNameByType(data.hwdcaircompressorrunstatus2)
                    }, {
                        keyName: "空调内机转速(设备柜)",
                        value: data.hwdcairinnrfanspeed
                    }, {
                        keyName: "空调内机转速2(电池柜)",
                        value: data.hwdcairinnrfanspeed2
                    }, {
                        keyName: "空调外风机转速(设备柜)",
                        value: data.hwdcairouterfanspeed
                    }, {
                        keyName: "空调外风机转速2(电池柜)",
                        value: data.hwdcairouterfanspeed2
                    }, {
                        keyName: "空调压缩机运行时间(设备柜)",
                        value: data.hwdcaircompressorruntime
                    }, {
                        keyName: "空调压缩机运行时间2(电池柜)",
                        value: data.hwdcaircompressorruntime2
                    }, {
                        keyName: "空调回风口温度(设备柜)",
                        value: data.hwdcairenterchanneltemp
                    }, {
                        keyName: "空调回风口温度2(电池柜)",
                        value: data.hwdcairenterchanneltemp2
                    }, {
                        keyName: "空调开机温度点(设备柜)",
                        value: data.hwdcairpowerontemppoint
                    }, {
                        keyName: "空调开机温度点2(电池柜)",
                        value: data.hwdcairpowerontemppoint2
                    }, {
                        keyName: "空调关机温度点(设备柜)",
                        value: data.hwdcairpowerofftemppoint
                    }, {
                        keyName: "空调关机温度点2(电池柜)",
                        value: data.hwdcairpowerofftemppoint2
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
                        keyName: "软件版本",
                        value: data.hwmonequipsoftwareversion
                    }, {
                        keyName: "设备生产商",
                        value: data.hwmonequipmanufacturer
                    }, {
                        keyName: "电池温度",
                        value: data.hwacbgrouptemperature
                    }, {
                        keyName: "充电过流告警点",
                        value: data.hwacbgroupovercurthr
                    }, {
                        keyName: "高温告警点",
                        value: data.hwacbgrouphightempthr
                    }, {
                        keyName: "低温告警点",
                        value: data.hwacbgrouplowtempth
                    }, {
                        keyName: "锂电放电DOD",
                        value: data.hwacbgroupdodtoacidbattery
                    }, {
                        keyName: "AC过压点设置",
                        value: data.hwsetacsuppervoltlimit
                    }, {
                        keyName: "AC欠压点设置",
                        value: data.hwsetacslowervoltlimit
                    }, {
                        keyName: "设置DC过压点",
                        value: data.hwsetdcsuppervoltlimit
                    }, {
                        keyName: "设置DC欠压点",
                        value: data.hwsetdcslowervoltlimit
                    }, {
                        keyName: "设置LVD电压",
                        value: data.hwsetlvdvoltage
                    }, {
                        keyName: "环境温度告警上限(设备柜)",
                        value: data.hwsetenvtempupperlimit
                    }, {
                        keyName: "环境温度告警上限2(电池柜)",
                        value: data.hwsetenvtempupperlimit2
                    }, {
                        keyName: "环境温度告警下限(设备柜)",
                        value: data.hwsetenvtemplowerlimit
                    }, {
                        keyName: "环境温度告警下限2(电池柜)",
                        value: data.hwsetenvtemplowerlimit2
                    }, {
                        keyName: "环境湿度告警上限(设备柜)",
                        value: data.hwsetenvhumidityupperlimit
                    }, {
                        keyName: "环境湿度告警上限2(电池柜)",
                        value: data.hwsetenvhumidityupperlimit2
                    }, {
                        keyName: "环境湿度告警下限(设备柜)",
                        value: data.hwsetenvhumiditylowerlimit
                    }, {
                        keyName: "环境湿度告警下限2(电池柜)",
                        value: data.hwsetenvhumiditylowerlimit2
                    }, {
                        keyName: "空调运行时间(设备柜)",
                        value: data.hwdcairruntime
                    }, {
                        keyName: "空调运行时间2(电池柜)",
                        value: data.hwdcairruntime2
                    }, {
                        keyName: "温控模式",
                        value: this.getCoolingDevicesModeNameByMode(data.hwcoolingdevicesmode)
                    }, {
                        keyName: "直流防雷器故障告警",
                        value: data.hwdcspdalarmtraps == 0 ? "正常" : data.hwdcspdalarmtraps == 1 ? "直流防雷器故障告警" : "防雷器传感器未接"
                    }, {
                        keyName: "交流电源输入停电告警",
                        value: data.hwacinputfailalarm == 0 ? "正常" : data.hwacinputfailalarm == 1 ? "告警" : "无效"
                    }, {
                        keyName: "交流电源输入L1\t相缺相告警",
                        value: data.hwacinputl1failalarm == 0 ? "正常" : data.hwacinputl1failalarm == 1 ? "告警" : "无效"
                    }, {
                        keyName: "交流电源输入L2\t相缺相告警",
                        value: data.hwacinputl2failalarm == 0 ? "正常" : data.hwacinputl2failalarm == 1 ? "告警" : "无效"
                    }, {
                        keyName: "交流电源输入L3\t相缺相告警",
                        value: data.hwacinputl3failalarm == 0 ? "正常" : data.hwacinputl3failalarm == 1 ? "告警" : "无效"
                    }, {
                        keyName: "直流电源输出告警",
                        value: data.hwdcvoltalarmtraps == 0 ? "正常" : data.hwdcvoltalarmtraps == 1 ? "告警" : "无效"
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
                    }, {
                        keyName: "电池状态",
                        value: this.getBatRunningStateNameByState(data.hwacbgroupbatrunningstate)
                    }, {
                        keyName: "烟雾传感器状态（设备柜）",
                        value: data.hwsmokesensorstatus == 0 ? "正常" : "报警"
                    }, {
                        keyName: "烟雾传感器状态（电池柜）",
                        value: data.hwsmokesensorstatus2 == 0 ? "正常" : "报警"
                    }, {
                        keyName: "水浸传感器状态（设备柜）",
                        value: data.hwwatersensorstatus == 0 ? "正常" : "报警"
                    }, {
                        keyName: "水浸传感器状态（电池柜）",
                        value: data.hwwatersensorstatus2 == 0 ? "正常" : "报警"
                    }, {
                        keyName: "门磁传感器状态（设备柜）",
                        value: data.hwdoorsensorstatus == 0 ? "正常" : "报警"
                    }, {
                        keyName: "门磁传感器状态（电池柜）",
                        value: data.hwdoorsensorstatus2 == 0 ? "正常" : "报警"
                    }, {
                        keyName: "空调地址（设备柜）",
                        value: data.hwdcairequipaddress == 0 ? "正常" : "报警"
                    }, {
                        keyName: "空调地址（电池柜）",
                        value: data.hwdcairequipaddress2 == 0 ? "正常" : "报警"
                    }, {
                        keyName: "温湿度地址（设备柜）",
                        value: data.hwtemhumequipaddress == 0 ? "正常" : "报警"
                    }, {
                        keyName: "温湿度地址（电池柜）",
                        value: data.hwtemhumequipaddress2 == 0 ? "正常" : "报警"
                    }, {
                        keyName: "单个电池电压",
                        value: data.hwacbbatvolt
                    }, {
                        keyName: "单个电池电流",
                        value: data.hwacbbatcurr
                    }, {
                        keyName: "单个电池串SOH",
                        value: data.hwacbbatsoh
                    }, {
                        keyName: "单个电池容量",
                        value: data.hwacbbatcapacity
                    }, {
                        keyName: "电池柜前门锁状态",
                        value: data.hwbatcabfrontdoorstatus == 0 ? "上锁" : data.hwbatcabfrontdoorstatus == 1 ? "开锁" : "无效"
                    }, {
                        keyName: "电池柜后门锁状态",
                        value: data.hwbatcabbackdoorstatus == 0 ? "上锁" : data.hwbatcabbackdoorstatus == 1 ? "开锁" : "无效"
                    }, {
                        keyName: "设备柜前门锁状态",
                        value: data.hwequcabfrontdoorstatus == 0 ? "上锁" : data.hwequcabfrontdoorstatus == 1 ? "开锁" : "无效"
                    }, {
                        keyName: "设备柜后门锁状态",
                        value: data.hwequcabbackdoorstatus == 0 ? "上锁" : data.hwequcabbackdoorstatus == 1 ? "开锁" : "无效"
                    });
                    this.$forceUpdate();
                })
            }
            ,
            getData23() {
                this.request.get23Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "防火墙数量",
                        value: data.firewarecnt
                    });
                    if (data.firewarelist) {
                        for (let i = 0; i < data.firewarelist.length; i++) {
                            let firewareItem = data.firewarelist[i];
                            let firewareItemList = [{
                                keyName: "名称",
                                value: firewareItem.name
                            }, {
                                keyName: "生产商",
                                value: firewareItem.factoryname
                            }, {
                                keyName: "设备型号",
                                value: firewareItem.devicemodel
                            }, {
                                keyName: "IP地址",
                                value: firewareItem.ip
                            }, {
                                keyName: "设备类型",
                                value: firewareItem.type ? firewareItem.type == "fireware" ? "防火墙" : "交换机" : ""
                            }, {
                                keyName: "是否在线",
                                value: firewareItem.isOnline == 0 ? "不在线" : "在线"
                            }, {
                                keyName: "CPU使用率",
                                value: firewareItem.cpuusage
                            }, {
                                keyName: "内存使用率",
                                value: firewareItem.memusage
                            }, {
                                keyName: "温度",
                                value: firewareItem.temperature
                            }, {
                                keyName: "端口数",
                                value: firewareItem.portcount
                            }];
                            this.showData.push({
                                keyName: "防火墙" + (i + 1),
                                list: firewareItemList
                            });
                        }
                    }
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData24() {
                this.request.get24Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "Atlas数量",
                        value: data.atlascnt
                    });
                    if (data.atlaslist) {
                        for (let i = 0; i < data.atlaslist.length; i++) {
                            let atlasItem = data.atlaslist[i];
                            let atlasItemList = [{
                                keyName: "主机名称",
                                value: atlasItem.hostname
                            }, {
                                keyName: "是否在线",
                                value: atlasItem.isOnline == 0 ? "不在线" : "在线"
                            }, {
                                keyName: "日期时间",
                                value: atlasItem.datetime
                            }, {
                                keyName: "CPU占用率",
                                value: atlasItem.cpurate
                            }, {
                                keyName: "CPU温度",
                                value: atlasItem.cputemp
                            }, {
                                keyName: "内存总数",
                                value: atlasItem.mentotal
                            }, {
                                keyName: "已使用内存",
                                value: atlasItem.menused
                            }, {
                                keyName: "内存使用率",
                                value: atlasItem.menrate
                            }, {
                                keyName: "MMC数量",
                                value: atlasItem.mmccount
                            }];
                            this.showData.push({
                                keyName: "Atlas" + (i + 1),
                                list: atlasItemList
                            });
                        }
                    }
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData27() {
                this.request.get27Data(this, null, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "spd数量",
                        value: data.spdcnt
                    });
                    if (data.spdlist) {
                        for (let i = 0; i < data.spdlist.length; i++) {
                            let spdItem = data.spdlist[i];
                            let spdItemList = [{
                                keyName: "编号",
                                value: spdItem.spdid
                            }, {
                                keyName: "名称",
                                value: spdItem.name
                            }, {
                                keyName: "IP地址",
                                value: spdItem.ip
                            }, {
                                keyName: "是否在线",
                                value: spdItem.isOnline == 0 ? "不在线" : "在线"
                            }, {
                                keyName: "生产商",
                                value: spdItem.factoryname
                            }, {
                                keyName: "防雷器温度",
                                value: spdItem.spd_temp
                            }, {
                                keyName: "环境温度",
                                value: spdItem.envi_temp
                            }, {
                                keyName: "当前雷击计数",
                                value: spdItem.struck_cnt
                            }, {
                                keyName: "漏电流报警阈值",
                                value: spdItem.leak_alarm_threshold
                            }, {
                                keyName: "防雷器寿命值0%~100%",
                                value: spdItem.life_time
                            }, {
                                keyName: "防雷器脱扣状态报警",
                                value: spdItem.remotestatusalarm == 0 ? "无报警" : "报警"
                            }, {
                                keyName: "线路&接地状态告警",
                                value: spdItem.linegroundstatusalarm == 0 ? "无报警" : "报警"
                            }, {
                                keyName: "漏电流报警",
                                value: spdItem.leakcuralarm == 0 ? "无报警" : "报警"
                            }, {
                                keyName: "雷击计数清零",
                                value: spdItem.clearcounter == 0 ? "保持" : "清零"
                            }];
                            this.showData.push({
                                keyName: "spd" + (i + 1),
                                list: spdItemList
                            });
                        }
                    }
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData28() {
                this.request.get28Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "接地检测器地址",
                        value: data.spdresip
                    }, {
                        keyName: "接地检测器端口",
                        value: data.spdresport
                    }, {
                        keyName: "是否在线",
                        value: data.isOnline == 0 ? "不在线" : "在线"
                    }, {
                        keyName: "接地电阻值",
                        value: data.grd_res
                    }, {
                        keyName: "电压值",
                        value: data.grd_volt
                    }, {
                        keyName: "设备id",
                        value: data.spdresid
                    }, {
                        keyName: "报警值",
                        value: data.spdres_alarm_value
                    });
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData29() {
                this.request.get29Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "900万全景车牌识别仪数量",
                        value: data.vehplate900cnt
                    });
                    if (data.vehplate900list) {
                        for (let i = 0; i < data.vehplate900list.length; i++) {
                            let vehplate900Item = data.vehplate900list[i];
                            let rsuListItemLst = [{
                                keyName: "名称",
                                value: vehplate900Item.name
                            }, {
                                keyName: "识别仪ip地址",
                                value: vehplate900Item.ip
                            }, {
                                keyName: "识别仪端口",
                                value: vehplate900Item.port
                            }, {
                                keyName: "用户名密码",
                                value: vehplate900Item.key
                            }, {
                                keyName: "是否在线",
                                value: vehplate900Item.isOnline == 0 ? "不在线" : "在线"
                            }, {
                                keyName: "流水号",
                                value: vehplate900Item.picstateid
                            }, {
                                keyName: "门架编号,全网唯一编号",
                                value: vehplate900Item.gantryid
                            }, {
                                keyName: "状态采集时间",
                                value: vehplate900Item.statetime
                            }, {
                                keyName: "积压图片流水数",
                                value: vehplate900Item.overstockImageJourCount
                            }, {
                                keyName: "积压图片数",
                                value: vehplate900Item.overstockImageCount
                            }, {
                                keyName: "相机编号（101~299）",
                                value: vehplate900Item.cameranum
                            }, {
                                keyName: "车道编号",
                                value: vehplate900Item.lanenum
                            }, {
                                keyName: "连接状态",
                                value: vehplate900Item.connectstatus == 0 ? "未连接" : "已连接"
                            }, {
                                keyName: "工作状态",
                                value: vehplate900Item.workstatus == 0 ? "异常" : "正常"
                            }, {
                                keyName: "补光灯的工作状态",
                                value: vehplate900Item.lightworkstatus == 0 ? "异常" : "正常"
                            }, {
                                keyName: "识别成功率",
                                value: vehplate900Item.recognitionrate
                            }, {
                                keyName: "固件版本",
                                value: vehplate900Item.hardwareversion
                            }, {
                                keyName: "软件版本",
                                value: vehplate900Item.softwareversion
                            }, {
                                keyName: "设备从开机到现在的运行时间（秒）",
                                value: vehplate900Item.runningtime
                            }, {
                                keyName: "厂商",
                                value: vehplate900Item.brand
                            }, {
                                keyName: "设备型号",
                                value: vehplate900Item.devicetype
                            }, {
                                keyName: "状态码",
                                value: vehplate900Item.statuscode == 0 ? "正常" : "状态异常" + vehplate900Item.statuscode + "：请找厂家查询状态码"
                            }, {
                                keyName: "状态描述 由厂商自定义",
                                value: vehplate900Item.statusmsg
                            }];
                            this.showData.push({
                                keyName: "900万全景车牌识别仪" + (i + 1),
                                list: rsuListItemLst
                            });
                        }
                    }
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
            ,
            getData30() {
                this.request.get30Data(this, (data) => {
                    this.currentItem.json = JSON.stringify(data, null, 2);
                    this.currentItemData = data;
                    this.showData = [];
                    this.showData.push({
                        keyName: "消息类型",
                        value: data.messagetype
                    }, {
                        keyName: "控制器IP地址",
                        value: data.vmctrl_ipaddr
                    }, {
                        keyName: "采集时间",
                        value: data.opttime
                    }, {
                        keyName: "主机名称",
                        value: data.hostname
                    }, {
                        keyName: "CPU占用率",
                        value: data.cpurate
                    }, {
                        keyName: "CPU温度",
                        value: data.cputemp
                    }, {
                        keyName: "内存总数",
                        value: data.mentotal
                    }, {
                        keyName: "已使用内存",
                        value: data.menused
                    }, {
                        keyName: "内存使用率",
                        value: data.menrate
                    }, {
                        keyName: "CPU使用率报警",
                        value: data.cpualarm == 0 ? "正常" : "报警"
                    }, {
                        keyName: "CPU温度报警",
                        value: data.cputempalarm == 0 ? "正常" : "报警"
                    }, {
                        keyName: "内存使用率报警",
                        value: data.memalarm == 0 ? "正常" : "报警"
                    }, {
                        keyName: "内核版本号",
                        value: data.zimagever
                    }, {
                        keyName: "内核日期",
                        value: data.zimagedate
                    }, {
                        keyName: "主程序CPU占用率",
                        value: data.softrate
                    }, {
                        keyName: "主程序运行异常报警",
                        value: data.softalarm == 0 ? "正常" : "报警"
                    }, {
                        keyName: "ksoftirqd进程CPU占用率",
                        value: data.ksoftirqdrate
                    }, {
                        keyName: "kworker进程CPU占用率",
                        value: data.kworkerrate
                    }, {
                        keyName: "网口2广播风暴报警",
                        value: data.lan2broadcastalarm == 0 ? "正常" : "报警"
                    }, {
                        keyName: "网口2广播风暴报警信息",
                        value: data.lan2broadcastalarmmesg
                    });
                    console.log("this.showData", this.showData);
                    this.$forceUpdate();
                })
            }
        }
        ,
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
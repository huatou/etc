<template>
    <div class="right_main">
        <div class="user_tong_kj">
            <label>设备信息导入导出</label>
            <div style="margin-top: 4px">
                <el-button type="primary" size="small" @click="deviceInfoImport()">设备信息导入<i class="fa fa-sign-in" style="margin-left: 4px"></i></el-button>
                <el-button type="primary" size="small" @click="deviceInfoExport()">设备信息导出<i class="fa fa-sign-out" style="margin-left: 4px"></i></el-button>
            </div>
            <table width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1" style="margin-top: 10px">
                <thead>
                <tr>
                    <th width="15%">设备名称</th>
                    <th width="10%">设备对应编码</th>
                    <th width="10%">设备类型对应编码</th>
                    <th width="20%">内容或IP地址</th>
                    <th width="15%">属性编码（内容或IP地址）</th>
                    <th width="5%">端口</th>
                    <th width="10%">用户名密码或get密码</th>
                    <th width="10%">set密码</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in exportData">
                    <td>
                        {{item.text}}
                    </td>
                    <td>
                        {{item.deviceName}}
                    </td>
                    <td>
                        {{item.deviceType}}
                    </td>
                    <td>
                        {{item.value}}
                    </td>
                    <td>
                        {{item.key}}
                    </td>
                    <td>
                        {{item.port}}
                    </td>
                    <td>
                        {{item.keyOrGetPassword}}
                    </td>
                    <td>
                        {{item.setPassword}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <el-dialog title="设备配置导入预览" :visible.sync="dialogTableVisible">

            <el-upload style="display: inline" ref="upload" :on-change="onChangeFile" :auto-upload="false" action=""
                       :multiple="false" :show-file-list="false"
                       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                <el-button size="small" type="primary">选取文件</el-button>
            </el-upload>

            <el-button size="small" type="success" class="pull-right" @click="confirmImport()">
                <span>上传配置信息<i class="el-icon-upload el-icon--right"></i></span>
            </el-button>

            <table v-if="importData && importData.length!=0" width="100%" border="1" cellspacing="0" cellpadding="0" class="table_s1"
                   style="float: none;margin-top: 10px">
                <thead>
                <tr>
                    <th width="15%">设备名称</th>
                    <th width="10%">设备对应编码</th>
                    <th width="10%">设备类型对应编码</th>
                    <th width="20%">内容或IP地址</th>
                    <th width="15%">属性编码（内容或IP地址）</th>
                    <th width="5%">端口</th>
                    <th width="10%">用户名密码或get密码</th>
                    <th width="10%">set密码</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in importData">
                    <td>
                        {{item.text}}
                    </td>
                    <td>
                        {{item.deviceName}}
                    </td>
                    <td>
                        {{item.deviceType}}
                    </td>
                    <td>
                        {{item.value}}
                    </td>
                    <td>
                        {{item.key}}
                    </td>
                    <td>
                        {{item.port}}
                    </td>
                    <td>
                        {{item.keyOrGetPassword}}
                    </td>
                    <td>
                        {{item.setPassword}}
                    </td>
                </tr>
                </tbody>
            </table>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                data12: {},
                exportData: [],
                importData: [],
                dialogTableVisible: false
            }
        },
        computed: {},
        methods: {
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            deviceInfoExport() {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('../assets/js/Export2Excel');
                    const tHeader = ['设备名称', '设备对应编码', '设备类型对应编码', '内容或IP地址', '属性编码（内容或IP地址）', '端口', '用户名密码或get密码', "set密码"];
                    const filterVal = ['text', "deviceName", "deviceType", 'value', 'key', "port", "keyOrGetPassword", "setPassword"];
                    const list = this.exportData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '门架监控控制器配置信息');
                })
            },
            deviceInfoImport() {
                this.dialogTableVisible = true;


            },
            onChangeFile(file) {
                this.importfxx(file.raw);
            },
            importfxx(obj) {
                let _this = this;
                // 通过DOM取文件数据
                this.file = obj
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function (f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if (rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            let obj = {}
                            obj.text = v['设备名称']
                            obj.deviceName = v['设备对应编码']
                            obj.deviceType = v['设备类型对应编码']
                            obj.value = v['内容或IP地址']
                            obj.key = v['属性编码（内容或IP地址）']
                            obj.port = v['端口']
                            obj.keyOrGetPassword = v['用户名密码或get密码']
                            obj.setPassword = v['set密码']
                            arr.push(obj)
                        })
                        _this.importData = arr;
                    }
                    reader.readAsArrayBuffer(f);
                }

                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            getDeviceModelByDeviceName(deviceList, deviceName) {
                if (!deviceList || deviceList.length == 0) {
                    return {};
                }
                for (let i = 0; i < deviceList.length; i++) {
                    let deviceItem = deviceList[i];
                    if (deviceItem.name == deviceName) {
                        return deviceItem;
                    }
                }
            },
            confirmImport() {

                if (!this.importData || this.importData.length == 0) {
                    alert("需要更新的配置信息为空");
                    return;
                }

                this.$confirm('确定要更配置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let i = 0; i < this.importData.length; i++) {
                        let deviceList;
                        let importDataItem = this.importData[i];
                        if (importDataItem.deviceType == "fireware") {
                            deviceList = this.data12.firewarelist;
                        } else if (importDataItem.deviceType == "ipswitch") {
                            deviceList = this.data12.ipswitchlist;
                        } else if (importDataItem.deviceType == "ip") {
                            deviceList = this.data12.iplist;
                        } else if (importDataItem.deviceType == "atlas") {
                            deviceList = this.data12.atlaslist;
                        } else if (importDataItem.deviceType == "rsu") {
                            deviceList = this.data12.rsulist;
                        } else if (importDataItem.deviceType == "vehplate") {
                            deviceList = this.data12.vehplatelist;
                        } else if (importDataItem.deviceType == "vehplate900") {
                            deviceList = this.data12.vehplate900list;
                        } else if (importDataItem.deviceType == "spd") {
                            deviceList = this.data12.spdlist;
                        }
                        let deviceModel = this.getDeviceModelByDeviceName(deviceList, importDataItem.deviceName);
                        console.log("deviceModel", deviceModel);
                        //设置ip
                        deviceModel[importDataItem.key] = importDataItem.value;
                        //setpassword
                        deviceModel.setpassword = importDataItem.setpassword;
                        //port
                        deviceModel.port = importDataItem.port;
                        //keyOrGetPassword
                        if (importDataItem.deviceType == "fireware") {
                            deviceModel.getpasswd = importDataItem.keyOrGetPassword;
                        } else if (importDataItem.deviceType == "ipswitch") {
                            deviceModel.getpasswd = importDataItem.keyOrGetPassword;
                        } else if (importDataItem.deviceType == "vehplate") {
                            deviceModel.key = importDataItem.keyOrGetPassword;
                        } else if (importDataItem.deviceType == "vehplate900") {
                            deviceModel.key = importDataItem.keyOrGetPassword;
                        } else {
                            this.data12[importDataItem.key] = importDataItem.value;
                        }
                    }
                    let params = this.jquery.extend({opt: 2}, this.data12)
                    console.log(params);
                    this.request.get12Data(this, params, (data) => {
                        this.data12 = data;
                        this.$message({
                            type: 'success',
                            message: '导入配置成功!'
                        });
                    });
                });
            }
        },
        mounted() {
            this.request.get12Data(this, null, (data) => {
                this.data12 = data;

                let fireware1 = data.firewarelist[0];
                let fireware2 = data.firewarelist[1];

                let ipswitch1 = data.ipswitchlist[0];
                let ipswitch2 = data.ipswitchlist[1];

                let lan1 = data.iplist[0];
                let lan2 = data.iplist[1];

                let atlas1 = data.atlaslist[0];
                let atlas2 = data.atlaslist[1];

                let rsu1 = data.rsulist[0];
                let rsu2 = data.rsulist[1];

                let vehplate1 = data.vehplatelist[0];
                let vehplate2 = data.vehplatelist[1];
                let vehplate3 = data.vehplatelist[2];
                let vehplate4 = data.vehplatelist[3];

                let vehplate9001 = data.vehplate900list[0];
                let vehplate9002 = data.vehplate900list[1];

                let spd1 = data.spdlist[0];
                let spd2 = data.spdlist[1];
                let spd3 = data.spdlist[2];

                this.exportData.push(
                    {text: "etc门架路网编号", key: "flagnetroadid", value: data.flagnetroadid,},
                    {text: "etc门架路段编号", key: "flagroadid ", value: data.flagroadid,},
                    {text: "etc门架编号", key: "flagid", value: data.flagid,},
                    {text: "行车方向说明", key: "dirdescription", value: data.dirdescription,},

                    {
                        text: "门架收费业务防火墙",
                        deviceName: "fireware1",
                        deviceType: "fireware",
                        key: "ip",
                        value: fireware1.ip,
                        keyOrGetPassword: fireware1.getpasswd,
                        setPassword: fireware1.setpasswd,

                    },
                    {
                        text: "门架收费业务交换机",
                        deviceName: "ipswitch1",
                        deviceType: "ipswitch",
                        key: "ip",
                        value: ipswitch1.ip,
                        keyOrGetPassword: ipswitch1.getpasswd,
                        setPassword: ipswitch1.setpasswd,

                    },
                    {
                        text: "门架监控防火墙",
                        deviceName: "fireware2",
                        deviceType: "fireware",
                        key: "ip",
                        value: fireware2.ip,
                        keyOrGetPassword: fireware2.getpasswd,
                        setPassword: fireware2.setpasswd,

                    },
                    {
                        text: "门架监控交换机",
                        deviceName: "ipswitch2",
                        deviceType: "ipswitch",
                        key: "ip",
                        value: ipswitch2.ip,
                        keyOrGetPassword: ipswitch2.getpasswd,
                        setPassword: ipswitch2.setpasswd,

                    },

                    {text: "监控控制器网口1", deviceName: "lan1", deviceType: "ip", key: "ipaddr", value: lan1.ipaddr,},
                    {text: "监控控制器网口2", deviceName: "lan2", deviceType: "ip", key: "ipaddr", value: lan2.ipaddr,},

                    {text: "机柜动环1", key: "hwserver", value: data.hwserver, keyOrGetPassword: data.hwgetpasswd, setPassword: data.hwsetpasswd,},
                    {text: "机柜动环2", key: "hwserver2", value: data.hwserver2, keyOrGetPassword: data.hwgetpasswd2, setPassword: data.hwsetpasswd2,},

                    {text: "atlas1", deviceName: "atlas1", deviceType: "atlas", key: "ip", value: atlas1.ip,},
                    {text: "atlas2", deviceName: "atlas2", deviceType: "atlas", key: "ip", value: atlas2.ip,},

                    {text: "RSU天线控制器1", deviceName: "rsu1", deviceType: "rsu", key: "ip", value: rsu1.ip,},
                    {text: "RSU天线控制器2", deviceName: "rsu2", deviceType: "rsu", key: "ip", value: rsu2.ip,},

                    {
                        text: "一体化抓拍单元1",
                        deviceName: "vehplate1",
                        deviceType: "vehplate",
                        key: "ip",
                        value: vehplate1.ip,
                        keyOrGetPassword: vehplate1.key,
                        port: vehplate1.port,

                    },
                    {
                        text: "一体化抓拍单元2",
                        deviceName: "vehplate2",
                        deviceType: "vehplate",
                        key: "ip",
                        value: vehplate2.ip,
                        keyOrGetPassword: vehplate2.key,
                        port: vehplate2.port,

                    },
                    {
                        text: "一体化抓拍单元3",
                        deviceName: "vehplate3",
                        deviceType: "vehplate",
                        key: "ip",
                        value: vehplate3.ip,
                        keyOrGetPassword: vehplate3.key,
                        port: vehplate3.port,

                    },
                    {
                        text: "一体化抓拍单元4",
                        deviceName: "vehplate4",
                        deviceType: "vehplate",
                        key: "ip",
                        value: vehplate4.ip,
                        keyOrGetPassword: vehplate4.key,
                        port: vehplate4.port,

                    },

                    {text: "全景高清摄像头1", deviceName: "vehplate9001", deviceType: "vehplate900", key: "ip", value: vehplate9001.ip,},
                    {text: "全景高清摄像头2", deviceName: "vehplate9002", deviceType: "vehplate900", key: "ip", value: vehplate9002.ip,},

                    {text: "防雷检测器1", deviceName: "spd1", deviceType: "spd", key: "ip", value: spd1.ip,},
                    {text: "防雷检测器2", deviceName: "spd2", deviceType: "spd", key: "ip", value: spd2.ip,},
                    {text: "防雷检测器3", deviceName: "spd3", deviceType: "spd", key: "ip", value: spd3.ip,},

                    {text: "接地电阻", key: "spdresip", value: data.spdresip, port: data.spdresport,},
                )
            })
        }
    }
</script>

<style scoped lang="scss">
</style>
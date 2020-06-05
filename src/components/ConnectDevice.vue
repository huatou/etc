<template>
    <div class="right_main">
        <!--工作台-->
        <div class="sqzt_box">
            <div class="time_box">
                <a @click="syncTime()">设置时钟同步
                    <i class="fa fa-spinner fa-pulse" v-show="syncingTime"></i>
                </a>
                <div class="time_show">{{serverTimeShowStr}}
                    <p>{{serverTimeShowStrYear}}&nbsp;年&nbsp;{{serverTimeShowStrMonth}}&nbsp;月&nbsp;{{serverTimeShowStrDate}}&nbsp;日</p>
                </div>
            </div>
        </div>
        <!--数据统计-->
        <div class="date_box" style="margin-top: 0px;">
            <div class="ptkj_box"><em>运行状态</em></div>
            <ul class="date_list">
                <li>{{data30.hostname}}
                    <p>主机名称</p>
                </li>
                <li>CPU
                    <div class="strip_box" :class="{'hot':data30.cpualarm==1}">
                        <p><strong>{{(data30.cpurate*100)}}%</strong>占用率<span>100%</span></p>
                        <em><i :style="{width:(data30.cpurate*100)+'%'}"></i></em>
                    </div>
                </li>
                <li>内存
                    <div class="strip_box" :class="{'hot':data30.memalarm==1}">
                        <!--当数值大于警告值时加入“hot”样式-->
                        <p><strong>{{data30.menrate}}%</strong>使用率<span>100%</span></p>
                        <em><i :style="{width:(data30.menrate)+'%'}"></i></em>
                    </div>
                </li>
                <li>温度
                    <div class="strip_box" :class="{'hot':data30.cputempalarm==1}">
                        <p><strong>{{(data30.cputemp)}} ℃</strong><span></span></p>
                        <em><i :style="{width:(data30.cputemp)+'%'}"></i></em>
                    </div>
                </li>
            </ul>
        </div>
        <div class="hard forms_box">
            <label style="width: auto;">硬件ID</label>
            <input type="text" class="sm" v-model="data12.hardwareid">
            <div class="tong_btn" style="margin-left: 10PX;">
                <a @click="setHardWareId()" class="btn_blue">设置ID
                    <i class="fa fa-spinner fa-pulse" v-show="settingHardWareId"></i>
                </a>
                <span v-show="afterSetHardWareId">设置成功</span>
            </div>
        </div>
        <!--标题带新键按钮-->
        <div class="control_box">网络相关</div>
        <div class="net_box">
            <ul class="forms_box">
                <h1>网口1</h1>
                <li><label>IP地址</label><input type="text" class="md" v-model="data5.ipaddr"></li>
                <li><label>子网掩码</label><input type="text" class="md" v-model="data5.mask"></li>
                <li><label>网关</label><input type="text" class="md" v-model="data5.gateway"></li>
                <li><label>DNS地址</label><input type="text" class="md" v-model="data5.dns"></li>
                <li class="tong_btn"><a href="#" class="btn_blue">设置</a></li>
            </ul>
            <ul class="forms_box">
                <h1>网口2</h1>
                <li><label>IP地址</label><input type="text" class="md" v-model="data25.ipaddr2"></li>
                <li><label>子网掩码</label><input type="text" class="md" v-model="data25.mask2"></li>
                <li><label>网关</label><input type="text" class="md" v-model="data25.gateway2"></li>
                <li><label>DNS地址</label><input type="text" class="md" v-model="data25.dns2"></li>
                <li class="tong_btn"><a href="#" class="btn_blue">设置</a></li>
            </ul>
        </div>
        <div class="date_box">
            <div class="system_info">
                <p>主程序版本号<span>{{data12.softversion}}</span></p>
                <p>电源板程序版本号：
                    <label>第一层：<span>{{data12.secsoftversion1?data12.secsoftversion1:'无'}}</span></label>
                    <label>第二层：<span>{{data12.secsoftversion2?data12.secsoftversion2:'无'}}</span></label>
                    <label>第三层：<span>{{data12.secsoftversion3?data12.secsoftversion3:'无'}}</span></label>
                </p>
            </div>
        </div>
        <div class="hard forms_box">
            <input type="text" class="md" v-model="file.name" readonly style="font-size: 12px;" :title="file.name">
            <div class="send_btn fl">
                <a style="border-left: none;padding: 0;line-height: normal;width:100px;">
                    <label style="position:absolute;text-align: center;margin: 0;">请选择文件</label>
                    <input type="file" @change="handleFileChange" style="opacity: 0;height: 34px;width: 100px" placeholder="选择文件"/>
                </a>
            </div>
            <div class="tong_btn" style="margin-left: 10px;">
                <a class="btn_blue" @click="uploadFile()">版本升级</a>
                <a class="not">版本升级中</a>
                <span>版本升级中，请勿做其他操作!</span>
            </div>
        </div>
    </div>
</template>

<script>
    import VueUploads from "vue-uploads";

    export default {
        components: {VueUploads},
        data() {
            return {
                data5: {},
                data12: {},
                data25: {},
                data30: {},
                serverTime: null,
                serverTimeShowStr: null,
                serverTimeShowStrYear: null,
                serverTimeShowStrMonth: null,
                serverTimeShowStrDate: null,
                timeout: null,
                syncingTime: false,//正在时钟同步
                settingHardWareId: false,//正在设置硬件id
                afterSetHardWareId: false,
                file: {}
            }
        },
        methods: {
            timeAdd() {
                this.serverTime.setSeconds(this.serverTime.getSeconds() + 1);
                this.serverTimeShowStr = this.serverTime.format("HH:mm:ss");
                this.showTime();
            },
            showTime() {
                let timeout = setTimeout(this.timeAdd, 1000);
            },
            //时钟同步
            syncTime() {
                this.syncingTime = true;
                this.request.get18Data(this, (data) => {
                    this.syncingTime = false;
                })
            },
            //设置硬件id
            setHardWareId() {
                this.settingHardWareId = true;
                let params = {
                    hardwareid: this.data12.hardwareid,
                    opt: 2
                }
                this.request.get12Data(this, params, (data) => {
                    this.settingHardWareId = false;
                    this.afterSetHardWareId = true;
                    setTimeout(() => {
                        this.afterSetHardWareId = false;
                    }, 2000)
                })
            },
            //文件上传
            handleFileChange(e) {
                this.file = e.target.files[0];
                console.log(this.file);
            },
            uploadError() {
                alert("上传失败");
            },
            uploadFile() {
                let that = this;
                let file = this.file;
                let reader = new FileReader();
                reader.readAsBinaryString(file);//这个读法是异步的
                reader.onloadend = function () {
                    // 这个事件在读取结束后，无论成功或者失败都会触发
                    if (reader.error) {
                        console.log(reader.error);
                    } else {
                        let blob = reader.result;
                        let settings = {
                            "url": that.request.getApi(that),
                            "method": "POST",
                            "timeout": 0,
                            "crossDomain": true,
                            "headers": {
                                "Content-Type": "application/octet-stream"
                            },
                            "data": blob
                        };
                        that.jquery.ajax(settings).done(function (response) {
                            console.log(response);
                        });
                    }
                }
            }
        },
        mounted() {

            this.request.get5Data(this, (data) => {
                this.data5 = data;
            })

            this.request.get12Data(this, null, (data) => {
                this.data12 = data;
                this.serverTime = new Date(data.opttime);
                this.serverTimeShowStr = this.serverTime.format("HH:mm:ss");
                this.serverTimeShowStrYear = this.serverTime.format("yyyy");
                this.serverTimeShowStrMonth = this.serverTime.format("MM");
                this.serverTimeShowStrDate = this.serverTime.format("dd");
                this.showTime();
            })

            this.request.get25Data(this, (data) => {
                this.data25 = data;
            })

            this.request.get30Data(this, (data) => {
                this.data30 = data;
            })
        }
    }

</script>

<style scoped lang="scss">

</style>
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
                        <p><strong>{{(data30.cpurate)}}%</strong>占用率<span>100%</span></p>
                        <em><i :style="{width:(data30.cpurate)+'%'}"></i></em>
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
                <el-button @click="setHardWareId()" type="primary" style="background-color: #019de5;margin-left: 10px" size="small" round
                           :disabled="!needAuthority(3)" :title="!needAuthority(3)?'无权限':''">
                    设置ID
                    <i class="fa fa-spinner fa-pulse" v-show="settingHardWareId" style="margin: 0 6px"></i>
                </el-button>
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
                <li class="tong_btn">
                    <el-button @click="setIpAddr1()" type="primary" style="background-color: #019de5;margin-left: 10px" size="small" round
                               :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''">
                        设置
                    </el-button>
                </li>
            </ul>
            <ul class="forms_box">
                <h1>网口2</h1>
                <li><label>IP地址</label><input type="text" class="md" v-model="data25.ipaddr2"></li>
                <li><label>子网掩码</label><input type="text" class="md" v-model="data25.mask2"></li>
                <li><label>网关</label><input type="text" class="md" v-model="data25.gateway2"></li>
                <li><label>DNS地址</label><input type="text" class="md" v-model="data25.dns2"></li>
                <li class="tong_btn">
                    <el-button @click="setIpAddr2()" type="primary" style="background-color: #019de5;margin-left: 10px" size="small" round
                               :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''">
                        设置
                    </el-button>
                </li>
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

        <div class="date_box">
            <div v-show="!needAuthority(3)" style="font-weight: bold">
                无权限升级
            </div>
            <el-upload v-show="needAuthority(3)"
                       ref="upload"
                       :auto-upload="false"
                       :action="uploadActionUrl"
                       :multiple="false"
                       :show-file-list="true"
                       :file-list="fileList"
                       :on-error="onErrorUploadFile"
                       :on-success="onSuccessUploadFile"
                       :on-change="handleChange"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-exceed="handExceed"
                       :with-credentials="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFile">升级</el-button>
            </el-upload>
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
                file: {},
                // uploadActionUrl: 'https://jsonplaceholder.typicode.com/posts/',
                // uploadActionUrl: '/Device/RemoteCtl/',
                uploadActionUrl: this.request.getApi(this),
                uploading: false,
                interval: null,
                fileList: []
            }
        },
        methods: {
            needAuthority(needAuthority) {
                let currentUserAuthority = this.$store.getters.getAuthority;
                return currentUserAuthority != null && currentUserAuthority >= needAuthority;
            },
            getTime() {
                this.request.get12Data(this, null, (data) => {
                    this.data12 = data;
                    this.serverTime = new Date(data.opttime);
                    this.serverTimeShowStr = this.serverTime.format("HH:mm:ss");
                    this.serverTimeShowStrYear = this.serverTime.format("yyyy");
                    this.serverTimeShowStrMonth = this.serverTime.format("MM");
                    this.serverTimeShowStrDate = this.serverTime.format("dd");
                    this.showTime();
                })
            },
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
                let nowDate = new Date().format("yyyy-MM-dd HH:mm:ss");
                let params = {
                    setsystemtime: nowDate,
                    opttime: nowDate,
                    opt: 2
                }
                this.request.get18Data(this, params, (data) => {
                    this.syncingTime = false;
                    this.request.get12Data(this, null, (data) => {
                        this.data12 = data;
                        this.serverTime = new Date(data.opttime);
                        this.serverTimeShowStr = this.serverTime.format("HH:mm:ss");
                        this.serverTimeShowStrYear = this.serverTime.format("yyyy");
                        this.serverTimeShowStrMonth = this.serverTime.format("MM");
                        this.serverTimeShowStrDate = this.serverTime.format("dd");
                    });
                }, (error) => {
                    this.$message({type: "error", message: "同步失败"})
                });
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
                    this.$message({type: "success", message: "修改成功"});
                }, (error) => {
                    this.$message({type: "error", message: "修改失败"})
                })
            },

            //设置网口1
            setIpAddr1() {
                let params = this.jquery.extend({opt: 2}, this.data5);
                this.request.get5Data(this, params, (data) => {
                    this.$message({type: "success", message: "修改成功"})
                }, (data) => {
                    this.$message({type: "error", message: "修改失败"})
                })
            },
            //设置网口2
            setIpAddr2() {
                let params = this.jquery.extend({opt: 2}, this.data25);
                this.request.get25Data(this, this.params, (data) => {
                    this.$message({type: "success", message: "修改成功"})
                }, (data) => {
                    this.$message({type: "error", message: "修改失败"})
                })
            },
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
                console.log("handleChange--file", this.file);
                console.log("handleChange--fileList", this.fileList);
            },
            //文件上传
            handleFileChange(e) {
                this.file = e.target.files[0];
            },
            uploadFile() {
                if (!this.fileList || this.fileList.length == 0) {
                    this.$message.error("请选择文件");
                    return;
                }
                this.$confirm('确定要升级吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("uploadFile--fileList", this.fileList);
                    this.uploading = true;
                    this.$refs.upload.submit();
                });
            },
            onSuccessUploadFile() {
                this.uploading = false;
            },
            onErrorUploadFile(err, file, uploadFiles) {
                this.fileList = [];
                this.$message.error("升级失败");
                console.log("onErrorUploadFile--err", err);
                console.log("onErrorUploadFile--file", this.file);
                console.log("onErrorUploadFile--fileList", this.fileList);
            },
            handleRemove(file, fileList) {
                console.log("handleRemove", this.fileList);
            },
            handlePreview(file) {
                console.log("handlePreview", this.fileList);
            },
            handExceed(file, fileList) {
                console.log("handExceed--file", this.file);
                console.log("handExceed--fileList", fileList);
            }
        },
        mounted() {
            this.request.get5Data(this, null, (data) => {
                this.data5 = data;
            }, (error) => {
                this.data5 = {};
            })

            this.request.get12Data(this, null, (data) => {
                this.data12 = data;
                this.serverTime = new Date(data.opttime);
                this.serverTimeShowStr = this.serverTime.format("HH:mm:ss");
                this.serverTimeShowStrYear = this.serverTime.format("yyyy");
                this.serverTimeShowStrMonth = this.serverTime.format("MM");
                this.serverTimeShowStrDate = this.serverTime.format("dd");
                this.showTime();
            }, (error) => {
                this.data12 = {};
            })

            this.request.get25Data(this, null, (data) => {
                this.data25 = data;
            }, (error) => {
                this.data25 = {};
            })

            this.request.get30Data(this, (data) => {
                this.data30 = data;
            }, (error) => {
                this.data30 = {};
            })


            //刷新数据
            this.interval = setInterval(() => {
                this.request.get30Data(this, null, (data) => {
                    this.data30 = data;
                }, (error) => {
                    this.data30 = {};
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
    .hard span {
        color: #FFFFFF;
        font-size: 12px;
        margin-left: 0;
    }

    .upload-demo {
        display: flex;
    }

    /deep/ .el-list-enter-active,
    /deep/ .el-list-leave-active {
        transition: none;
    }

    /deep/ .el-list-enter,
    /deep/ .el-list-leave-active {
        opacity: 0;
    }

    /deep/ .el-upload-list {
        height: 40px;
    }
</style>
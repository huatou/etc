<template>
    <div class="right_main">
        <div class="user_tong_kj">
            <ul class="forms_box">
                <li>
                    <label>etc门架路网编号</label>
                    <input type="text" class="lg" v-model="data12.flagnetroadid">
                </li>
                <li>
                    <label>etc门架路段编号</label>
                    <input type="text" class="lg" v-model="data12.flagroadid ">
                </li>
                <li>
                    <label>etc门架编号</label>
                    <input type="text" class="lg" v-model="data12.flagid">
                </li>
                <li>
                    <label>行车方向说明</label>
                    <input type="text" class="lg" v-model="data12.dirdescription">
                </li>
                <li>
                    <label>服务端url1(省中心)</label>
                    <input type="text" class="lg" v-model="data12.serverurllist[0].url">
                </li>
                <li>
                    <label>服务端url2(运维中心)</label>
                    <input type="text" class="lg" v-model="data12.serverurllist[1].url">
                </li>
                <li>
                    <label>服务端url3(车道工控机)</label>
                    <input type="text" class="lg" v-model="data12.serverurllist[2].url">
                </li>
                <li>
                    <label>服务端url4(门禁)</label>
                    <input type="text" class="lg" v-model="data12.serverurllist[3].url">
                </li>
                <li>
                    <label>CPU使用率报警阀值</label>
                    <select type="select_one" v-model="data12.cpualarmvalue">
                        <option v-for="n in 100" :value="n+''" v-text="n + '%'"></option>
                    </select>
                    <label style="text-align: right">CPU温度报警阀值</label>
                    <select type="select_one" v-model="data12.cputempalarmvalue">
                        <option v-for="n in 100" :value="n+''" v-text="n + '℃'"></option>
                    </select>
                    <label style="text-align: right">内存使用率报警阀值</label>
                    <select type="select_one" v-model="data12.memalarmvalue">
                        <option v-for="n in 100" :value="n+''" v-text="n + '%'"></option>
                    </select>
                </li>
                <li>
                    <label>交换机数量</label>
                    <select type="select_one" v-model="data12.ipswitchtype">
                        <option v-for="n in 5" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                    <label style="text-align: right">交换机厂商</label>
                    <select type="select_one" v-model="data12.ipswitchtype ">
                        <option v-for="item in ipSwitchTypeList" :value="item.value" v-text="item.text"></option>
                    </select>
                </li>
                <li>
                    <label>防火墙数量</label>
                    <select type="select_one" v-model="data12.firewarecount">
                        <option v-for="n in 5" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                    <label style="text-align: right">防火墙厂商</label>
                    <select type="select_one" v-model="data12.firewaretype">
                        <option v-for="item in fireWareTypeList" :value="item.value" v-text="item.text"></option>
                    </select>
                </li>
                <li>
                    <label>rsu控制器数量</label>
                    <select type="select_one" v-model="data12.rsucount">
                        <option v-for="n in 5" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                </li>
                <li>
                    <label>车牌识别仪数量</label>
                    <select type="select_one" v-model="data12.vehplatecount">
                        <option v-for="n in 13" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                </li>
                <li>
                    <label>全景摄像机数量</label>
                    <select type="select_one" v-model="data12.vehplate900count">
                        <option v-for="n in 5" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                </li>
                <li>
                    <label>Atlas数量</label>
                    <select type="select_one" v-model="data12.atlascount">
                        <option v-for="n in 5" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                </li>
                <li>
                    <label>监控摄像机数量</label>
                    <select type="select_one" v-model="data12.camcount">
                        <option v-for="n in 5" :value="(n-1)+''" v-text="n-1"></option>
                    </select>
                </li>
                <li>
                    <label>DO端口数量数量</label>
                    <select type="select_one" v-model="data12.do_count">
                        <option v-for="item in doCountList" :value="item.value" v-text="item.name"></option>
                    </select>
                </li>
                <div class="hard forms_box">
                    <div class="tong_btn text-align-center">
                        <el-button @click="submit()" type="primary" style="background-color: #019de5;margin-left: 10px;width: 160px" size="small" round
                                   :disabled="!needAuthority(2)" :title="!needAuthority(2)?'无权限':''">
                            录入<i class="fa fa-spinner fa-pulse" v-show="submitting"></i>
                        </el-button>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                data12: {
                    serverurllist: [{}, {}, {}, {}]
                },
                ipSwitchTypeList: [
                    {
                        value: "1",
                        text: "华为",
                    }, {
                        value: "2",
                        text: "新华三",
                    }
                ],
                fireWareTypeList: [
                    {
                        value: "1",
                        text: "华为",
                    }, {
                        value: "2",
                        text: "迪普",
                    }, {
                        value: "3",
                        text: "深信服",
                    }
                ],
                doCountList: [
                    {
                        value: '12',
                        name: '12（单层配电层）'
                    }, {
                        value: '24',
                        name: '24（双层配电层）'
                    },

                ],
                submitting: false,
            }
        },
        methods: {
            needAuthority(needAuthority) {
                let currentUserAuthority = this.$store.getters.getAuthority;
                return currentUserAuthority != null && currentUserAuthority >= needAuthority;
            },
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
            }, (error) => {
                this.data12 = {};
            })
        }

    }

</script>

<style scoped lang="scss">
    .text-align-center {
        text-align: center;
    }

    .forms_box label {
        float: left;
        margin-right: 15px;
        width: 130px;
        height: 32px;
        display: inline-block;
        text-align: left;
        font-size: 12px;
        line-height: 32px;
        overflow: hidden;
    }

    .forms_box .lg {
        width: 682px;
    }

    .forms_box input[type="text"], .forms_box textarea {
        float: left;
        border: 1px solid #b5b5b5;
        height: 32px;
        line-height: 35px;
        background-color: #FFFFFF;
        outline: none;
        padding: 0 10px;
        color: #2d2d2d;
        display: block;
        font-size: 14px;
    }
</style>
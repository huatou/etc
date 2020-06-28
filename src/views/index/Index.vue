<template>
    <div>
        <div class="wrap">
            <div class="wrap_main">
                <!--顶部菜单-->
                <div class="user_header">
                    <div class="nav_box">
                        <div class="u_logo">
                            <a href="index.html">
                                <p>ETC门架监控控制系统</p>
                            </a>
                        </div>
                    </div>
                </div>
                <!--主体-->
                <div class="user_main_box">
                    <!--左侧菜单 -->
                    <div class="left_menu">
                        <div class="user_info">
                            <p class="user_name" style="margin-bottom: 2px">用户名：{{username}}</p>
                            <p>权限等级{{authority}}</p>
                            <p style="margin-top: 8px;font-weight: bold;font-size: 18px" :style="{'color':deviceStatus?'#019e00':'red'}">
                                设备状态：{{deviceStatus?'在线':"离线"}}
                            </p>
                        </div>
                        <div class="menu_list_box" style="margin-top: 10px">
                            <a v-for="menuItem in menuList" @click="to(menuItem)" :class="menuItem.active?'hover':''"><i :class="menuItem.icon"></i>{{menuItem.text}}
                            </a>
                        </div>
                    </div>
                    <!--主版块-->
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <!--底部-->
        <div class="bottom_box">
            <div class="bot_info_box clearfix">
                <div class="bot_info_fl">
                    <a href="#">关于我们</a>
                    <span>|</span>
                    <a href="#">技术支持</a>
                    <p>COPYRIGHT © 版权归属<span> ETC门架监控控制系统</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import '../../assets/css/hd_main.css'

    export default {
        components: {},
        data() {
            return {
                username: this.$store.getters.getUsername,
                authority: this.$store.getters.getAuthority,

                menuList: [
                    {
                        to: '/index/connect-device',
                        icon: 'ico_link',
                        text: '连接设备',
                        active: true
                    }, {
                        to: '/index/base-settings-input',
                        icon: 'ico_m3',
                        text: '基础配置录入'
                    }, {
                        to: '/index/cabinet-info-input',
                        icon: 'ico_cab',
                        text: '机柜信息录入'
                    }, {
                        to: '/index/distribution-floor-info-input',
                        icon: 'ico_power',
                        text: '配电层信息录入'
                    }, {
                        to: '/index/device-list',
                        icon: 'ico_list',
                        text: '设备信息列表'
                    }, {
                        to: '/index/device-control',
                        icon: 'ico_steup',
                        text: '设备控制'
                    }, {
                        to: '/index/device-warning',
                        icon: 'ico_alert',
                        text: '重要设备报警'
                    }, {
                        to: '/index/device-info-import-export',
                        icon: 'ico_list',
                        text: '设备信息导入导出'
                    },
                ],
                data12: null,
                data20: null,
                data30: null,
            }
        },
        methods: {
            to(menuItem) {
                // if (this.$router.currentRoute.path == menuItem.to) {
                //     return;
                // }
                this.$router.push(menuItem.to);
                this.menuList.forEach(menuItem_ => {
                    menuItem_.active = false;
                });
                menuItem.active = true;
                this.$forceUpdate();
            }
        },

        computed: {
            deviceStatus: function () {
                let deviceStatus = this.$store.getters.getDeviceStatus;
                return deviceStatus;
            }
        }
    }

</script>
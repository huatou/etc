<template>
    <div>
        <div class="blue_css">
            <div class="login_kj">
                <div class="main_login_box">
                    <div class="logo"></div>
                    <!--用户登录-->
                    <div class="reg_login_box">
                        <h1>用户登录</h1>
                        <ul>
                            <li>
                                <i class="name_ico"></i>
                                <input type="text" class="reg_input" placeholder="请输入账号" v-model="loginModel.username">
                            <li>
                                <i class="pass_ico"></i>
                                <input type="password" class="reg_input" placeholder="请输入密码" v-model="loginModel.password" @keyup.enter="submitLogin()">
                            <li class="reg_btn">
                                <a style="cursor: pointer;" @click="submitLogin()">登 录 <span class="fa fa-spinner fa-pulse" v-show="logining"></span></a>
                            </li>
                        </ul>
                    </div>
                    <div class="login_info"><img src="images/shadowbg.png" alt=""/></div>
                </div>
            </div>
            <div class="foot">
                <div class="foot_info">
                    Copyright© 2020 Version：2.0.0.0 Build
                    <p>技术支持：广东新粤交通投资有限公司</p>
                </div>
            </div>
        </div>
        <div id="h1" class="jawbone-takeover-minimulti jawbone-hero">
            <i class="jawbone-hero-image" data-hero-image-fixed="true" data-hero-image-fade="true"
               data-hero-min-opacity=".3" style="opacity: 1.05;">
            </i>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/login.css'

    export default {
        name: "Login",
        components: {},
        data() {
            return {
                loginModel: {
                    username: "",
                    password: ""
                },
                logining: false
            }
        },
        methods: {
            submitLogin() {
                this.logining = true;
                this.request.get0Data(this, this.loginModel, (data) => {
                    this.logining = false;
                    if (data.code == 0) {
                        this.$store.commit('setAuthority', data.authority);
                        this.$store.commit('setToken', data.token);
                        this.$store.commit('setUsername', this.loginModel.username);
                        this.$router.push('/')
                        this.$message({"type": "success", message: '登录成功'})
                    } else {
                        this.$message({"type": "error", message: data.describe})
                    }
                }, (error) => {
                    this.logining = false;
                    this.$message({"type": "error", message: "登录失败"});
                });
            }
        }
    }
</script>

<style scoped>

</style>
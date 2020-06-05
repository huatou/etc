// 设置当前开发环境

const DEV = "DEV";
const PROD = "PROD";

const PROFILE = DEV

export default {
    IS_DEV() {
        return PROFILE == DEV
    }
}




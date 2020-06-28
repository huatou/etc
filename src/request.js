/**
 * @author yzh
 * @description 对网络请求的封装类
 */

const prod_endpoint = "http://" + document.domain + ':8081';
const dev_endpoint = "http://183.236.13.195:8081";

/**
 * 消息类型
 */
const MESSAGE_TYPE_0 = 0;
const MESSAGE_TYPE_5 = 5;
const MESSAGE_TYPE_12 = 12;
const MESSAGE_TYPE_14 = 14;
const MESSAGE_TYPE_15 = 15;
const MESSAGE_TYPE_16 = 16;
const MESSAGE_TYPE_18 = 18;
const MESSAGE_TYPE_19 = 19;
const MESSAGE_TYPE_20 = 20;
const MESSAGE_TYPE_22 = 22;
const MESSAGE_TYPE_23 = 23;
const MESSAGE_TYPE_24 = 24;
const MESSAGE_TYPE_25 = 25;
const MESSAGE_TYPE_27 = 27;
const MESSAGE_TYPE_28 = 28;
const MESSAGE_TYPE_29 = 29;
const MESSAGE_TYPE_30 = 30;

export default {
    getEndPoint(vue) {
        let endPoint = vue.config.IS_DEV() ? dev_endpoint : prod_endpoint;
        return endPoint;
    },
    getApi(vue) {
        // let api = "/api/Device/RemoteCtl";
        let api = this.getEndPoint(vue) + "/Device/RemoteCtl";
        return api;
    },
    config(vue, params, data, headers) {
        return {
            // proxy: {
            //     '/api': {
            //         target: "http://183.236.13.195:8081",
            //         changeOrigin: true,
            //         pathRewrite: {
            //             '^/api': ''
            //         }
            //     }
            // }
            proxy: {
                host: '183.236.13.195',
                port: 8081,
                protocol: 'http'
            },
        }
    },
    getNetData(vue, params, onSuccess, onError) {

        // let token = vue.$store.getters.getToken;
        // if (!token) {
        //     if (!(params && params.messageType == MESSAGE_TYPE_0)) {
        //         vue.$router.push("/login")
        //         return;
        //     }
        // }
        // vue.$axios.post(this.getApi(vue), params, this.config(vue)).then((response) => {
        //     vue.$store.commit('setDeviceStatus', true);
        //     onSuccess && onSuccess(response.data);
        // }).catch((error) => {
        //     vue.$store.commit('setDeviceStatus', false);
        //     onError && onError(error);
        // });

        let token = vue.$store.getters.getToken;
        if (!token) {
            if (!(params && params.messageType == MESSAGE_TYPE_0)) {
                vue.$router.push("/login")
                return;
            }
        }
        let settings = {
            "url": this.getApi(vue),
            "method": "POST",
            "timeout": 0,
            "data": JSON.stringify(params)
        };
        vue.jquery.ajax(settings).then(function (response) {
            onSuccess && onSuccess(response);
            vue.$store.commit('setDeviceStatus', true);
        }, function (error) {
            vue.$store.commit('setDeviceStatus', false);
            onError && onError(error);
        });
    },
    getMessageTypeData(vue, messageType, params, onSuccess, onError) {
        params = vue.jquery.extend(params, {messageType: messageType});
        this.getNetData(vue, params, onSuccess, onError);
    },
    get0Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_0, params, onSuccess, onError);
    },
    get5Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_5, params, onSuccess, onError);
    },
    get12Data(vue, param, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_12, param, onSuccess, onError);
    },
    get14Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_14, null, onSuccess, onError);
    },
    get15Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_15, null, onSuccess, onError);
    },
    get16Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_16, null, onSuccess, onError);
    },
    get18Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_18, params, onSuccess, onError);
    },
    get19Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_19, params, onSuccess, onError);
    },
    get20Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_20, params, onSuccess, onError);
    },
    get22Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_22, params, onSuccess, onError);
    },
    get23Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_23, null, onSuccess, onError);
    },
    get24Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_24, null, onSuccess, onError);
    },
    get25Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_25, params, onSuccess, onError);
    },
    get27Data(vue, params, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_27, params, onSuccess, onError);
    },
    get28Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_28, null, onSuccess, onError);
    },
    get29Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_29, null, onSuccess, onError);
    },
    get30Data(vue, onSuccess, onError) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_30, null, onSuccess, onError);
    }
}
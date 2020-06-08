/**
 * @author yzh
 * @description 对网络请求的封装类
 */

const prod_endpoint = "http://" + document.domain + ':8081';
const dev_endpoint = "http://183.236.13.195:8081";

/**
 * 消息类型
 */
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
    getApi(vue) {
        let endPoint = vue.config.IS_DEV() ? dev_endpoint : prod_endpoint;
        let api = endPoint + "/Device/RemoteCtl";
        return api;
    },
    getNetData(vue, params, onSuccess) {
        let settings = {
            "url": this.getApi(vue),
            "method": "POST",
            "timeout": 0,
            "data": JSON.stringify(params)
        };
        vue.jquery.ajax(settings).then(function (response) {
            onSuccess(response);
        });
    },
    getMessageTypeData(vue, messageType, params, onSuccess) {
        params = vue.jquery.extend(params, {messageType: messageType});
        this.getNetData(vue, params, onSuccess);
    },
    get5Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_5, null, onSuccess);
    },
    get12Data(vue, param, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_12, param, onSuccess);
    },
    get14Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_14, null, onSuccess);
    },
    get15Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_15, null, onSuccess);
    },
    get16Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_16, null, onSuccess);
    },
    get18Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_18, null, onSuccess);
    },
    get19Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_19, null, onSuccess);
    },
    get20Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_20, null, onSuccess);
    },
    get22Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_22, null, onSuccess);
    },
    get23Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_23, null, onSuccess);
    },
    get24Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_24, null, onSuccess);
    },
    get25Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_25, null, onSuccess);
    },
    get27Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_27, null, onSuccess);
    },
    get28Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_28, null, onSuccess);
    },
    get29Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_29, null, onSuccess);
    },
    get30Data(vue, onSuccess) {
        this.getMessageTypeData(vue, MESSAGE_TYPE_30, null, onSuccess);
    }
}
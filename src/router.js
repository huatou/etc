import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index/Index";
import ConnectDevice from "@/components/ConnectDevice";
import BaseSettingsInput from "@/components/BaseSettingsInput";
import CabinetInfoInput from "@/components/CabinetInfoInput";
import DistributionFloorInfoInput from "@/components/DistributionFloorInfoInput";

Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '*', redirect: '/index'},
        {path: '/', redirect: '/index'},
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {path: '/index', redirect: '/index/connect-device'},
                {
                    path: '/index/connect-device',
                    name: 'ConnectDevice',
                    component: ConnectDevice
                },
                {
                    path: '/index/base-settings-input',
                    name: 'BaseSettingsInput',
                    component: BaseSettingsInput
                },
                {
                    path: '/index/cabinet-info-input',
                    name: 'CabinetInfoInput',
                    component: CabinetInfoInput
                },
                {
                    path: '/index/distribution-floor-info-input',
                    name: 'DistributionFloorInfoInput',
                    component: DistributionFloorInfoInput
                }
            ]
        }
    ]
});
export default router;

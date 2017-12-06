/**
 * @author rubyisapm
 */
import Interface from 'common/interface';
import utility from 'ct-utility';
import Vue from 'vue';
const config = {
    'check-record': {
        page: 300105,
        operate: {
            edit: 102343,
            check: 102345
        }
    }
};
const getPagePermission = function(page, permisson = []) {
    const pageConfig = config[page];
    const pagePermissionStr = JSON.stringify(pageConfig).replace(/\d{6}/g, (match)=> {
        match = match * 1;
        return (permisson.indexOf(match) > -1).toString();
    });

    return JSON.parse(pagePermissionStr);
};

export default function(page) {
    const pageConfig = config[page];
    const pageId = pageConfig.page;

    return Promise.resolve($.ajax({
        url: Interface.permission.getPermission,
        type: 'get',
        data: {
            pageId: pageId
        }
    })).then(res=> {
        res = utility.objTransfer.lowerKey(res);
        if (res.statusCode === 0) {
            const pagePermission = getPagePermission(page, res.data);

            return Promise.resolve(pagePermission);
        }
        return Promise.reject(res.message);
    }).catch(msg=> {
        if (typeof msg !== 'string') {
            msg = '权限获取失败';
        }
        new MiniMsg({
            type: 'error',
            content: msg
        }).animation();
        const pagePermission = getPagePermission(page);

        return Promise.resolve(pagePermission);
    }).then((permission)=> {
        Vue.mixin({
            data(){
                return {
                    permission: permission
                };
            }
        });
        if (!permission.page) {
            new Vue({
                el: '#app'
            });
            return Promise.reject('');
        }
        return Promise.resolve('');
    });
}

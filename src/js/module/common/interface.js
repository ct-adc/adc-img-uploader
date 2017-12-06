/**
 * 该模块主要用于配置系统中的接口、链接等地址
 *
 * 其通过检测url中的顶级域名(如org / net)和端口号来判断系统当前所在的环境(测试版/预发版/正式版)
 * 根据环境的不同将需要改变的地址改变到对应环境中的地址
 *
 * 开发时请咨询后端开发，根据实际情况进行判断环境(环境判断逻辑可修改，!!!请注意)
 *
 */

import utility from 'ct-utility';
var getEnv = function() {
    const env = {
        'org:1506': 'dev',
        'org:1507': 'test',
        'org:1505': 'testStable',
        'net:8001': 'pre',
        'net': 'official'
    };
    const tdl = location.host.split('.').slice(-1)[0];

    return env[tdl] || 'dev';
};
var base = {
    common: {
        api1: '/api/api111',
        api2: '/api/api2'
    },
    patchList: {
        api3: '/api/api3'
    },
    patchMonitor: {
        api4: '/api/api4'
    },
    singlePackage: {
        api5: '/api/api5'
    }
};
var Interface = {
    dev: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api11'
        }
    }),
    test: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api11'
        }
    }),
    testStable: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api11'
        }
    }),
    pre: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api111'
        }
    }),
    official: utility.base.extend(true, {}, base, {
        common: {
            api1: '/api/api111'
        }
    })
};
var env = getEnv();

export default Interface[env];

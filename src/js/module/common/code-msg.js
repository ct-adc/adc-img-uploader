/**
 * @author rubyisapm
 */
const codeMsg = {
    groupError: 10200, // 当一个code错误码为组合错误(即包含了多个错误)时，使用组合code
    msgByCode: {
        10101: '游戏缩写不合法',
        10102: '存在游戏缩写与代码版本的项目',
        10200: '配置文件值异常',
        10211: 'MCRuntime svn地址不正确',
        10212: 'gamesrc svn地址不正确',
        10213: 'mMBBase svn地址不正确',
        10214: 'mGameFrame svn地址不正确',
        10215: 'mhall svn地址不正确',
        10216: 'imgres svn地址不正确',
        10231: '游戏名称不合法',
        10232: '游戏ID不合法',
        10233: 'package不合法',
        10234: 'versionName不合法',
        10235: 'versionCode不合法',
        10236: 'abbr不合法',
        10237: 'engineVersionMin不合法',
        10238: 'engineVersionMax不合法',
        10239: 'projectTarget不合法',
        10301: '正在制包中,无法开始制包',
        10302: '正在制包中,无法修改',
        10303: '已提交审核, 无法修改',
        10304: '已提交审核,无需再提交',
        10401: '制包环境异常',
        10402: '制包格式异常',
        10403: '渠道信息错误',
        20100: '已审核，无需审核',
        20101: '已审核，无法修改',
        20200: '发行制包环境异常',
        20201: '无可选制包版本',
        20202: '获取制包信息异常',
        20203: '制包系统异常',
        20204: '代码已修改',
        20300: '集成包制包同城游app异常',
        20301: '渠道信息获取异常',
        20303: '获取单包信息异常',
        90001: '系统异常',
        90002: '磁盘空间不足',
        90003: '制包系统接口调用异常',
        90004: '磁盘IO错误',
        90005: '获取登录信息错误',
        90006: '操作数据不存在',
        90007: '参数配置异常',
        90008: '数据库异常'
    },
    /**
     * 根据code码得到对应的错误信息
     * @param {Number} code 接口响应数据中的code属性
     * @param {Array=} codeList 当接口响应数据中的code码为组合错误时, 该值为code数组，如[1002,1003]
     * @param {Function=} groupErrorTransfer 处理组合错误的方法
     * @returns {Array,String} 消息字符串或消息字符串组成的数组
     */
    getMsgByCode(code, codeList, groupErrorTransfer){
        if (code === codeMsg.groupError) {
            const errors = codeList.map(item=> {
                return codeMsg.msgByCode[item] || '';
            });

            if (typeof groupErrorTransfer === 'function') {
                return groupErrorTransfer(errors);
            }
            return errors;
        }
        return codeMsg.msgByCode[code] || '';
    },
    /**
     * 处理消息以便得到可供显示的内容
     * @param {String, Array, Object} msg error接收到的参数，一般为响应回调中计算出的消息字符串或消息字符串组成的数组，或者xhr对象
     * @param {String} defaultMsg 默认错误信息
     * @returns {Array, String} 错误信息字符串 或 错误信息数组
     */
    resolveMsg(msg, defaultMsg = ''){
        const msgForXhr = {
            401: '您没有登录',
            403: '您没有权限'
        };
        const isXhr = typeof msg.status !== 'undefined';
        const notMsg = typeof msg !== 'string' && !Array.isArray(msg);
        const isEmpty = msg === '';

        if (isXhr) {
            msg = msgForXhr[msg.status] || '接口错误';
        } else if (notMsg || isEmpty) {
            msg = defaultMsg;
        }
        return msg;
    }
};

export default codeMsg;

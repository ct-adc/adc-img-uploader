/**
 * @author rubyisapm
 * 该模块用于管理项目中的所有常量
 *
 * 约定：
 * 1. 常量为一个数组，其中的每一项有两个key(key:常量的唯一标识; val:常量的描述)
 * 2. 常量的设置请遵循key val的形式，因为后面的统一方法中是读取数据的key val的。
 * 3. 常量必须有默认项，即'请选择'、'全部'、'不限'所在的项，并且保证在数组的第一项
 * 4. 模块支持的常量默认项兼容'请选择'、'全部'、'不限'三种
 *
 * 名词解释：
 * 静态常量: 前端静态写入的常量，如下面的auditStatus
 * 动态常量: 需要从后端获取的常量，如下面的portraitType
 *
 * 写法：
 * 常量全部写入到constConfig对象，如下面的auditStatus和portraitType。项目中的常量都放置在constConfig里面，请开发者根据项目自行加入
 *
 * 模块外部对常量的获取方式:
 * 1. 建议统一采用constConfig.getData进行获取
 * 2. 对于动态常量的获取，首先确保数据被请求到，请使用例如
 * constConfig.portraitType().then(function(){this.portraitTypeList=constConfig.getData('portraitType')})的方式获取并设置到自己的模块中。
 *
 * constConfig内的通用方法:
 * !!注意: 通用方法不需要开发者改写
 * 1. getData 获取一个常量
 * 2. getVal 获取一个常量的指定描述，如获取auditStatus中key为1的val值
 * 3. getKey 获取一个常量的指定key，如获取auditStatus中val为'审核通过'的key
 */
import utility from 'ct-utility';
import Interface from 'common/interface';
var constConfig = {
    //请保证第一项为默认项，默认项为除去定义常量后的默认选项，一般为'不限''全部''请选择'
    auditStatus: [{
        key: 0,
        val: '不限'
    }, {
        key: 1,
        val: '审核通过'
    }, {
        key: 2,
        val: '审核不通过'
    }],
    /**
     * 该方法为动态常量的定义
     * 该方法返回一个promise，用于通过接口获取后端常量，开发者需要使用该常量时需要调用该方法，以便拿到请求数据的promise实例，来进行下一步操作
     *
     * 缓存：
     * 该方法通过将数据加入到如portraitType.data中进行数据缓存，二次获取直接读取缓存中的内容。
     * 后续提到的缓存，是指portraitType.data
     *
     * 方法的调用时机：
     * 在用到portraitType常量时，执行例如constConfig.portraitType().then(function(){this.portraitTypeList=constConfig.getData('portraitType')})。
     * 其中的this.portraitTypeList为vue对象中的portraitType属性.
     */
    portraitType(){
        const that = constConfig;
        let p;

        //检测缓存中数据是否有length>0的数据，如果有，则直接读取缓存
        if (Array.isArray(that.portraitType.data) && that.portraitType.data.length > 0) {
            p = Promise.resolve(that.portraitType.data);
        } else {
            //当缓存没有数据时，发起请求
            p = Promise.resolve($.ajax({
                url: Interface.common.getPortraitTypeList,
                cache: false
            })).then(res=> {
                //请按照自己的接口处理数据并存入到缓存中，遵循key val的形式
                res = utility.objTransfer.lowerKey(res);

                if (res.statusCode === 0) {
                    that.portraitType.data = [{
                        key: 0,
                        val: '不限'
                    }];
                    res.data.map(item=> {
                        that.portraitType.data.push({
                            key: item.key,
                            val: item.val
                        });
                    });
                } else {
                    //warning!请给出默认值
                    that.portraitType.data = [];
                }
            }).catch(()=> {
                //warning!请给出默认值
                that.portraitType.data = [];
            });
        }
        //返回一个promise实例，用于在模块外部请求portraitType
        return p;
    },
    /**
     * 获取某个常量的数据
     * @param col String 需要获取的常量，如'auditStatus'
     * @param hasDef Boolean 返回的数据中是否需要带默认值，如'全部'/'不限'
     * @param def String 在hasDef为true时生效，此项指定默认值的描述，默认为'不限'；如果你需要默认值为'全部',请将参数def设置为'全部'
     */
    getData(col, hasDef = true, def = '不限'){
        let data;
        const that = constConfig;

        if (Array.isArray(that[col])) {
            data = JSON.parse(JSON.stringify(that[col]));
        } else if (Array.isArray(that[col].data) && that[col].data.length > 0) {
            data = JSON.parse(JSON.stringify(that[col].data));
        }

        if (!hasDef) {
            data = data.slice(1);
        } else if (def !== '不限') {
            data[0].val = def;
        }
        return data;
    },
    /**
     * 获取某个常量中指定key对应的val
     * @param col String 需要获取的常量，如'auditStatus'
     * @param key [js基础类型的数据] 指定需要获取val值对应的key值
     * @param def String 此项指定默认值的描述，默认为'不限'；如果你需要默认值为'全部',请将参数def设置为'全部'
     */
    getVal(col, key, def = '不限'){
        const data = constConfig.getData(col);
        const matchedItem = data.filter((item)=> {
            return item.key === key;
        });

        if (matchedItem[0].val === '不限' && (def === '请选择' || def === '全部')) {
            return def;
        }
        return matchedItem[0].val;
    },
    /**
     * 获取某个常量中指定val对应的key
     * @param col String 需要获取的常量，如'auditStatus'
     * @param val String 指定需要获取key值对应的val值
     */
    getKey(col, val){
        if (val === '请选择' || val === '全部') {
            val = '不限';
        }
        const data = constConfig.getData(col);
        const matchedItem = data.filter((item)=> {
            return item.val === val;
        });

        return matchedItem[0].key;
    }
};

export default constConfig;

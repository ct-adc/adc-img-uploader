## ct-adc-img-uploader

图片上传组件；用于一个或多个图片文件的上传；

## 组件示例图

[!img](图片地址)

## 在线demo

[在线demo]({在线demo地址})

## 功能点

1. 上传固定数量的图片
2. 设置可变的缩略图大小
3. 控制是否可以重复上传相同的一张图片

## 使用

从npm安装ct-adc-img-uploader

```
npm install ct-adc-img-uploader --save
```
在代码中使用

```
import ImgUploader from 'ct-adc-img-uploader';

//全局注册
Vue.component(ImgUploader.name,ImgUploader);

//局部注册

new Vue({
    ...
    components:{
        ImgUploader
    },
    ...
})

```

## props

参数|说明|类型|默认值 | 可选值 | 描述 |
--- | --- | --- | --- | --- |
thumbnailWidth | 生成缩略图的宽度 | Number | 110 | | 图片列表中每个图片缩略图的宽度
thumbnailHeight | 生成缩略图的高度 | Number | 110 | | 图片列表中每个图片缩略图的宽度
imgs | 图片列表 | Array | [] | | 数组的每项为一个字符串，即图片路径
server | 接口地址 | String | '' | | 上传图片的接口地址，由后端人员给出
resultFilter | 上传结果过滤器 | Function | new Function() | | 将响应数据处理为固定格式结果的过滤器，**详细见下方**
method | 上传请求类型 | String | 'post' | http方法 | 上传图片的ajax请求类型
duplicate | 是否可重复上传 | Boolean | false | | 是否允许同样的图片上传两张
accept | 上传文件类型限制 | Object | | | 设置允许上传的图片的格式
- extensions | 可上传文件扩展名 | String | 'gif,jpg,jpeg,bmp,png' | | 扩展名之间用逗号分隔, 如果要支持jpg,请同时加上jpeg
- mimeTypes | 可选择的文件类型 | String | 'image/gif,image/jpg,image/jpeg,image/bmp,image/png' | | 媒体类型之间用逗号分隔, 如果要支持jpg,请同时加上jpeg
fileSingleSizeLimit | 单个文件的大小限制 | Number | 2 * 1024 * 1024 | | 单位: Byte
fileNumLimit | 可上传图片数量 | Number | 5 | | 最多可上传几张图片
formData | 表单数据 | Object | {} | | 上传图片时附加的表单数据

### props.resultFilter

用于开发者干预响应报文的解析，告诉组件什么样的数据是正确的。
如:
```
function(res){
    if (res.IsFinish) {
        return {
            status: true,
            path: res.ReturnPath
        };
    }
    return {
        status: false,
        msg: res.msg
    };
}
```
该函数接收服务端的响应数据，并解析出一个结果对象，该结果对象包含：

* status 上传是否成功

* path 上传成功后服务器返回的路径

* msg 上传失败时服务器返回的错误信息

## 方法

### isPending

组件是否处于上传状态，即其中有没有正在上传的图片

#### 参数列表

无

#### 返回值

类型: {Boolean}

说明:

1. true - 当前有正在上传的图片
2. false - 当前没有正在上传的图片

### getUploadedImgs

获取组件中已成功上传的文件

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个[file对象](#file)

### getErrorImgs

获取组件中上传失败的文件

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个[file对象](#file)

### getPendingImgs

获取组件中正在上传的文件

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个[file对象](#file)

### getUrls

获取组件中上传成功的文件路径集合

#### 参数列表

无

#### 返回值

类型: {Array}

说明:

Array的每一项为一个图片在服务器上的路径

### refreshUploader

刷新图片上传组件，例如当图片组件在初始化时处于隐藏状态，那么显示时需要调用该方法进行刷新以保证组件功能

#### 参数列表

无

#### 返回值

无

### resetUploader

重置图片上传组件

#### 参数列表

无

#### 返回值

无

### cancelUpload

取消还未上传成功的图片

#### 参数列表

无

#### 返回值

无

## 事件

### runtime-success

事件名称 | 说明 | 回调参数 | 描述
runtime-success | 文件上传成功 | 无 | 文件上传成功时触发该事件
runtime-error | 实时错误 | 信息对象[Object](详见下方) | 实时错误信息发生变化时触发该事件
change-status | 状态变化 | 无 | 文件上传成功/失败（状态发生改变）时触发该事件

#### runtime-error参数详解

runtime-error的参数为一个信息对象，该对象包含两个属性，分别是code和msg；
##### code 错误码

该错误码有仅由以下几种值：

Q_EXCEED_NUM_LIMIT // '文件数量超出限制!'
Q_EXCEED_SIZE_LIMIT // '文件总大小超出限制!'
Q_TYPE_DENIED // '文件类型不正确!'
F_EXCEED_SIZE // '文件大小超出限制!'
F_DUPLICATE // '文件重复!'
HTTP_ERROR http错误, 此时msg为'http-状态码'形式 如http-404
RESET 重置错误消息，即清空实时错误，表示实时错误已不能表示当前的状态，已被其他的操作清掉；
错误消息被重置有以下两种情况：
1. 图片上传成功；例如第一张图片上传失败，实时错误信息为非空，程序展示该信息，第二张图片上传成功，那么将给出'RESET',即实时错误信息为''，不用继续展示第一张图片的错误信息
2. 图片被删除; 当图片被删除时，因为整个列表发生了变化，此时也会触发runtime-error，并将code设置为'RESET'，因为整个列表被变化，意味着整个列表的状态发生了变化

##### msg 错误信息

以下为不同的code对应的提示信息:

Q_EXCEED_NUM_LIMIT // '文件数量超出限制!'
Q_EXCEED_SIZE_LIMIT // '文件总大小超出限制!'
Q_TYPE_DENIED // '文件类型不正确!'
F_EXCEED_SIZE // '文件大小超出限制!'
F_DUPLICATE // '文件重复!'
HTTP_ERROR // 'http-状态码' 如'http-404'
RESET // ''

## 其他

### <span id = "file">file对象</span>

一个file对象包含以下内容:

* status

    - inited 初始状态
    - queued 已经进入队列, 等待上传
    - progress 上传中
    - complete 上传完成并逻辑上成功
    - error 上传出错，可重试
    - interrupt 上传中断，可续传
    - invalid 文件不合格，不能重试上传。会自动从队列中移除
    - cancelled 文件被移除

* errorText

文件上传失败或上传成功但逻辑上失败时，保存失败信息

* previewStatus

预览图片的生成状态

* previewSrc

预览图片生成的image data。

注：但是如果是外部传入的图片列表时，该值等于图片的真实路径(file.url)

* url

图片在服务器上的路径


## 更新日志

[更新日志]({CHANGELOG.md的线上地址})

## 外部资源依赖列表

- [webuploader.html5only.js](http://static.uc108.com/cdn/webuploader/0.1.6/webuploader.html5only.js) V0.1.6+
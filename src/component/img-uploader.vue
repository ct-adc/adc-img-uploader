<template>
    <ul class="filelist ct-adc-img-uploader" ref="root">
        <li v-for="(thumb,index) in thumbs"
            :style="{width:thumbnailWidth+'px',height:thumbnailHeight+'px'}">
            <img :src="thumb.previewSrc"/>

            <div class="thumbInfo text-center pending" v-if="isPendingImg(thumb.status)">
                <span class="glyphicon glyphicon-refresh"></span>
            </div>
            <div class="thumbInfo text-center success" v-if="isCompleteImg(thumb.status)">
                <span class="glyphicon glyphicon-ok"></span>
            </div>
            <div class="thumbInfo text-center error" v-if="isErrorImg(thumb.status)">
                <span class="glyphicon glyphicon-remove"></span>
            </div>
            <div class="file-panel" @click="removeFile(index)">
                <span class="glyphicon glyphicon-trash"></span>
            </div>
        </li>
        <li class="addThumb"
            v-if="thumbs.length<fileNumLimit"
            :style="{width:thumbnailWidth+'px',height:thumbnailHeight+'px'}">
            <span class="glyphicon glyphicon-plus"></span>
        </li>
    </ul>
</template>

<script type="es6">
    import utility from 'ct-utility';
    var ERRORS = {
        Q_EXCEED_NUM_LIMIT: '文件数量超出限制!',
        Q_EXCEED_SIZE_LIMIT: '文件总大小超出限制!',
        Q_TYPE_DENIED: '文件类型不正确!',
        F_EXCEED_SIZE: '文件大小超出限制!',
        F_DUPLICATE: '文件重复!'
    };
    /**
     * 事件
     * runtime-error 实时的上传文件失败信息。注意: 不存储历史错误
     * runtime-success 实时的上传文件成功信息。注意: 不存储历史信息
     * change-status 当发生错误或者成功时执行。注意: 当文件状态发生细小状态变化并不会触发该事件。file的status实时变化对使用者不可见
     */
    export default{
        name: 'img-uploader',
        props: {
            thumbnailWidth: {
                type: Number,
                default: 110
            },
            thumbnailHeight: {
                type: Number,
                default: 110
            },
            imgs: {
                type: Array,
                default(){
                    return [];
                }
            },
            server: {
                type: String,
                default: ''
            },
            resultFilter: {
                type: Function,
                default(){
                    return new Function();
                }
            },
            method: {
                type: String,
                default: 'post'
            },
            duplicate: {
                type: Boolean,
                default: true
            },
            accept: {
                type: Object,
                default(){
                    return {
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                    }
                }
            },
            fileSingleSizeLimit: {
                type: Number,
                default: 2 * 1024 * 1024
            },
            fileNumLimit: {
                type: Number,
                default: 5
            },
            formData: {
                type: Object,
                default(){
                    return {};
                }
            }
        },
        data(){
            return {
                thumbs: []
            }
        },
        computed: {
            uploadedImgs(){
                var imgs = [];

                this.thumbs.map((item)=> {
                    if (this.isCompleteImg(item.status)) {
                        imgs.push({
                            errorText: item.errorText,
                            previewSrc: item.previewSrc,
                            previewStatus: item.previewStatus,
                            status: item.status,
                            url: item.url
                        });
                    }
                });
                return imgs;
            },
            errorImgs(){
                var imgs = [];

                this.thumbs.map(item=> {
                    if (this.isErrorImg(item.status)) {
                        imgs.push({
                            errorText: item.errorText,
                            previewSrc: item.previewSrc,
                            previewStatus: item.previewStatus,
                            status: item.status,
                            url: item.url
                        });
                    }
                });
                return imgs;
            },
            pendingImgs(){
                var imgs = [];

                this.thumbs.map((item)=> {
                    if (this.isPendingImg(item.status)) {
                        imgs.push({
                            errorText: item.errorText,
                            previewSrc: item.previewSrc,
                            previewStatus: item.previewStatus,
                            status: item.status,
                            url: item.url
                        });
                    }
                });
                return imgs;
            }
        },
        created(){
            this.initThumbs();
        },
        mounted(){
            this.initUploader();
            setTimeout(()=> {
                var element = this.$refs.root.querySelector('.webuploader-element-invisible');
                element.style.width = this.thumbnailWidth + 'px';
                element.style.height = this.thumbnailHeight + 'px';
            })
        },
        methods: {
            isCompleteImg(status){
                return status === 'complete';
            },
            isPendingImg(status){
                var statuses = ['inited', 'progress', 'queued', 'progress'];

                return statuses.indexOf(status) > -1;
            },
            isErrorImg(status){
                var statuses = ['error', 'cancelled', 'interrupt', 'invalid'];

                return statuses.indexOf(status) > -1;
            },
            isCanBeStoppedImg(status){
                var statuses = ['inited', 'queued', 'progress', 'interrupt', 'cancelled'];

                return statuses.indexOf(status) > -1;
            },
            initThumbs(){
                var defaults = {
                    file: null,
                    status: '', // 文件从选择到上传经历的一系列状态
                    errorText: '',//文件上传失败信息
                    previewStatus: true, // 预览生成状态
                    previewSrc: '', // 预览生成后的image data
                    url: '' // 上传到服务器后的返回地址
                };
                this.imgs.map(url=> {
                    this.thumbs.push(utility.base.extend(defaults, {
                        url: url,
                        previewSrc: url,
                        status: 'complete'
                    }))
                })
            },
            removeFile(index){
                if (index === this.thumbs.length - 1) {
                    this.$emit('runtime-error', '');
                    this.$emit('change-status');
                }
                if (this.thumbs[index].file !== null) {
                    this.uploader.removeFile(this.thumbs[index].file);
                }
                this.thumbs = this.thumbs.filter((item, i)=> {
                    return i !== index;
                })
            },
            upload(){
                this.uploader.upload();
            },
            initUploader(){
                var that = this;
                // 实例化
                var uploader = WebUploader.create({
                    pick: {
                        id: '.addThumb'
                    },
                    server: that.server,
                    method: that.method,
                    duplicate: that.duplicate,
                    auto: true,
                    chunked: true,
                    accept: that.accept,
                    fileSingleSizeLimit: that.fileSingleSizeLimit,
                    fileNumLimit: that.fileNumLimit
                });

                function addFile(file) {
                    var fileData = {
                        file: file,
                        status: '', // 文件从选择到上传经历的一系列状态
                        errorText: '',//文件上传失败信息
                        previewStatus: false, // 预览生成状态
                        previewSrc: '', // 预览生成后的image data
                        url: '' // 上传到服务器后的返回地址
                    };
                    uploader.makeThumb(file, function(error, src) {
                        if (error) {
                            fileData.previewStatus = false;
                            return;
                        }
                        fileData.previewStatus = true;
                        fileData.previewSrc = src;
                    }, that.thumbnailWidth, that.thumbnailHeight);
                    //监听状态
                    file.on('statuschange', function(cur) {
                        /**
                         * inited 初始状态
                         * queued 已经进入队列, 等待上传
                         * progress 上传中
                         * complete 上传完成。
                         * error 上传出错，可重试
                         * interrupt 上传中断，可续传。
                         * invalid 文件不合格，不能重试上传。会自动从队列中移除。
                         * cancelled 文件被移除。
                         */
                        fileData.status = cur;
                    });
                    that.thumbs.push(fileData);
                }

                uploader.on('uploadBeforeSend', function(object, data, headers) {
                    utility.base.extend(data, that.formData);
                })
                uploader.onFileQueued = function(file) {
                    addFile(file);
                };
                uploader.onUploadSuccess = function(file, res) {
                    var result = that.resultFilter(res);
                    that.thumbs = that.thumbs.map(item=> {
                        if (item.file !== null && item.file.id === file.id) {
                            if (result.status) {
                                item.url = result.path;
                                that.$emit('runtime-success');
                                that.$emit('runtime-error', '');
                                that.$emit('change-status');
                                return item;
                            } else {
                                item.url = '';
                                item.status = 'error';
                                item.errorText = result.msg;
                                that.$emit('runtime-error', result.msg);
                                that.$emit('change-status');
                                return item;
                            }

                        } else {
                            return item;
                        }
                    })
                };
                uploader.onUploadError = function(file, reason) {
                    that.thumbs = that.thumbs.map((item)=> {
                        that.$emit('runtime-error', reason);
                        that.$emit('change-status');
                        if (item.file !== null && item.file.id === file.id) {
                            item.url = '';
                            item.errorText = reason;
                            return item;
                        } else {
                            return item;
                        }
                    })
                };
                uploader.onError = function(code) {
                    that.$emit('runtime-error', ERRORS[code] || '请检查文件是否符合要求!');
                    that.$emit('change-status');
                };
                that.uploader = uploader;
            },
            isPending(){
                return this.pendingImgs.length > 0;
            },
            getUploadedImgs(){
                return this.uploadedImgs;
            },
            getErrorImgs(){
                return this.errorImgs;
            },
            getPendingImgs(){
                return this.pendingImgs;
            },
            getUrls(){
                return this.uploadedImgs.map(item=> {
                    return item.url;
                });
            },
            refreshUploader(){
                this.uploader.refresh();
            },
            resetUploader(){
                this.uploader.reset();
            },
            cancelUpload(){
                this.uploader.stop(true);
                this.thumbs = this.thumbs.filter(item=> {
                    if (this.isCanBeStoppedImg(item.status)) {
                        if (item.file !== null) {
                            this.uploader.removeFile(item.file, true);
                        }
                    }
                    return !this.isCanBeStoppedImg(item.status);
                });
            }
        },
        watch: {
            imgs(){
                this.initThumbs();
            },
            thumbs(newVal, oldVal){
                if (newVal.length < oldVal.length && oldVal.length === this.fileNumLimit) {
                    this.$nextTick(()=> {
                        this.uploader.addButton({
                            id: '.addThumb'
                        });
                    })
                }
            },
            server: function(server) {
                this.uploader.option('server', server);
            },
            method(newVal){
                this.uploader.option('method', newVal);
            },
            duplicate(){
                this.uploader.destroy();
                this.initUploader();
            },
            accept(){
                this.uploader.destroy();
                this.initUploader();
            },
            fileSingleSizeLimit(){
                this.uploader.destroy();
                this.initUploader();
            }
        }
    }
</script>

<style>
    .ct-adc-img-uploader .webuploader-pick {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .ct-adc-img-uploader .webuploader-element-invisible {
        /*width: 110px;*/
        /*height: 110px;*/
        outline: none;
        opacity: 0;
        cursor: pointer;
    }

    .ct-adc-img-uploader.filelist {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .ct-adc-img-uploader.filelist:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        overflow: hidden;
        clear: both;
    }

    .ct-adc-img-uploader.filelist li {
        /*width: 110px;*/
        /*height: 110px;*/
        border: 1px solid #d4d4d4;
        border-radius: 6px;
        text-align: center;
        margin: 0 8px 20px 0;
        position: relative;
        display: inline;
        float: left;
        overflow: hidden;
        font-size: 12px;
    }

    .ct-adc-img-uploader.filelist li img {
        width: 100%;
        height: 100%;
    }

    .ct-adc-img-uploader.filelist li .thumbInfo {
        position: absolute;
        bottom: -2px;
        right: -14px;
        width: 46px;
        height: 20px;
        line-height: 20px;
        transform: rotate(-45deg);
    }

    .ct-adc-img-uploader.filelist li .success {
        background-color: #13ce66;
        box-shadow: 0 0 5px #116235;
    }

    .ct-adc-img-uploader.filelist li .pending {
        background-color: #ff5722;
        box-shadow: 0 0 5px #c13509;
    }

    .ct-adc-img-uploader.filelist li .error {
        background-color: #ec1515;
        box-shadow: 0 0 5px #bf0303;
    }

    .filelist li .thumbInfo span {
        transform: rotate(45deg);
        color: #fff;
    }

    .filelist li.addThumb {
        position: relative;
        border: 1px dashed #d4d4d4;
        cursor: pointer;
    }

    .filelist li.addThumb span {
        font-size: 30px;
        color: #e3e3e3;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .filelist li.addThumb:hover span {
        color: #aaaaaa;

    }

    .filelist li img {
        width: 100%;
    }

    .filelist li:hover .file-panel {
        display: block;
    }

    .filelist div.file-panel {
        display: none;
        position: absolute;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: 300;
    }

    .filelist div.file-panel span {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .glyphicon-refresh {
        animation: refreshing .8s infinite linear;
    }

    @keyframes refreshing {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

</style>

/**
 * @author rubyisapm
 */
import Vue from 'vue';
import ImgUploader from '../../../component/img-uploader.vue';

new Vue({
    el: '#uploader',
    components: {
        ImgUploader
    },
    data: {
        uploader1: {
            error: '',
            imgs: [],
            formData: {
                os: 1
            },
            server: '/NewApp/UplodeICon?APPCode=kdmj&position=2',
            thumbnailWidth: 200,
            thumbnailHeight: 200,
            method: 'post',
            duplicate: false,
            accept: {
                extensions: 'jpg',
                mimeTypes: 'image/jpg'
            },
            fileSingleSizeLimit: 2 * 1024 * 1024
        },
        uploader2: {
            error: '',
            imgs: [],
            formData: {
                os: 1
            },
            server: '/NewApp/UplodeICon?APPCode=kdmj&position=2',
            thumbnailWidth: 200,
            thumbnailHeight: 200,
            method: 'post',
            duplicate: false,
            accept: {
                extensions: 'jpg',
                mimeTypes: 'image/jpg'
            },
            fileSingleSizeLimit: 2 * 1024 * 1024
        }
    },
    methods: {
        changeThumbnail(){
            this.thumbnailWidth = 100;
            this.thumbnailHeight = 100;
        },
        changeMethod(){
            this.method = 'get';
        },
        changeAccept(){
            this.accept = {
                extensions: 'png',
                mimeTypes: 'image/png'
            };
        },
        changeFileSingleSizeLimit(){
            this.fileSingleSizeLimit = 1024;
        },
        changeDuplicate(){
            this.duplicate = true;
        },
        resultFilter(res){
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
        },
        showError(error){
            this.error = error;
        },
        getUrls(){
            console.log(this.$refs.imgUploader.getUrls());
        },
        isPending(){
            console.log(this.$refs.imgUploader.isPending());
        },
        getUploadedImgs(){
            console.log(this.$refs.imgUploader.getUploadedImgs());
        },
        getErrorImgs(){
            console.log(this.$refs.imgUploader.getErrorImgs());
        },
        getPendingImgs(){
            console.log(this.$refs.imgUploader.getPendingImgs());
        },
        emptyList(){
            this.imgs = [];
        },
        refreshUploader(){
            this.$refs.imgUploader.refreshUploader();
            console.log('----刷新成功');
        },
        resetUploader(){
            this.$refs.imgUploader.resetUploader();
            console.log('-----重置成功');
        },
        cancelUpload(){
            this.$refs.imgUploader.cancelUpload();
        },
        setImgs(){
            this.imgs = ['http://m.tcy365.com/img//006d9ae4-6688-45a9-a031-79268e63855f.png', 'http://m.tcy365.com/img//6e02965f-a07e-481c-990f-5e59084f6651.png'];
        }
    }
});

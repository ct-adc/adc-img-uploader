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
        error: '',
        imgs: ['http://mobileimg.tcy365.com/Logo/qzsl_115.png', 'http://mobileimg.tcy365.com/Logo/qzsm_115.png'],
        formData: {
            os: 1
        },
        server: '/api/common/uploadPic',
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        method: 'post',
        duplicate: false,
        accept: {
            extensions: 'jpg, png',
            mimeTypes: 'image/jpg, image/png'
        },
        fileSingleSizeLimit: 2 * 1024 * 1024
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
            if (res.Code === 0) {
                return {
                    status: true,
                    path: res.Data
                };
            }
            return {
                status: false,
                msg: res.msg
            };
        },
        showError(error){
            this.error = error.msg;
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
            this.imgs = ['http://mobileimg.tcy365.com/Logo/qzsl_115.png', 'http://mobileimg.tcy365.com/Logo/qzsm_115.png'];
        },
        deleteImg(info){
            console.log(info);
        }
    }
});

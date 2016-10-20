<template>
<div id="app">

    <div class="row" style="margin-top:50px;margin-bottom:50px;">
        <div class="col-sm-12 col-md-12">
            <label for="file" id="label_file" class="btn btn-primary">
      点击上传文件
      <input type="file" name="uploadFile" id="file" accept="image/*" @change="showinfo()" >
    </label>
        </div>
    </div>
    <div class="row" v-for="item in info">
        <div class="col-sm-12 col-md-4" style="margin-top:50px;">
            <div id="img">
                <img alt="" v-bind:src="item.base64" />
            </div>
        </div>
        <div class="col-sm-12 col-md-8" style="margin-top:50px;">
            <ul class="list-group">
                <li class="list-group-item">文件名称:{{item.origin.name}}</li>
                <li class="list-group-item">文件类型:{{item.origin.type}}</li>
                <li class="list-group-item">文件原始大小:{{(item.origin.size/1024).toFixed(2)}}kb</li>
                <li class="list-group-item">压缩后文件大小:{{(item.file.size/1024).toFixed(2)}}kb</li>
                <li class="list-group-item">压缩比例:{{ (((item.origin.size-item.file.size)/item.origin.size)*100).toFixed(2)}}%</li>
            </ul>
            <h1>服务器返回结果:{{result}}</h1>
        </div>
    </div>
</div>


</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            info: [],
            result: {}
        }
    },
    methods: {
        add() {
            var v = this
            console.log(v.info)
        },
        showinfo() {
            var file = document.getElementById('file');
            var v = this
            lrz(file.files[0], {
                    width: 1024
                })
                .then(function(rst) {
                    v.info.push(rst)
                    console.log(rst)
                    console.log(rst.formData)
                    return rst;
                })
                .then(function(rst) {
                    rst.formData.append('fileLen', rst.fileLen);
                    rst.formData.append('uploadFile', rst.file);
                    console.log(rst.formData)
                    /*v.$http.post('UploadFile', rst.formData)
                        .then(function(response) {
                            alert(response)
                            v.result = JSON.stringify(response.body)
                        })*/
                    $.ajax({
                        url: 'UploadFile', // 这个地址做了跨域处理，可以用于实际调试
                        data: rst.formData,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        success: function(data) {
                            //alert(JSON.stringify(data));
                            v.result = JSON.stringify(data)
                        }
                    });
                })

            .catch(function(err) {
                console.log(err)
            })

            .always(function() {
                // 不管是成功失败，这里都会执行
            });
        }
    },
    mounted() {}
}
</script>

<style>
#file {
    width: 0px;
    height: 0px;
    position: relative;
    z-index: 9;
    opacity: 0;
}

#label_file {
    width: 300px;
    height: 200px;
    line-height: 200px;
    font-size: 40px;
    text-align: center
}

#img img {
    width: 100%;
    max-width: 320px;
}

.list-group {
    font-size: 20px !important;
}
</style>

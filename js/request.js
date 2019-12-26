/**
 * Created by ZSW on 2019/2/28.
 */
const request = {};
/**
 * 通过json传参的post请求
 * @param url
 * @param data
 * @param cb
 */
request.postJson = function (url, data,headers, cb) {
    let param = null;
    if(data instanceof Array){
        param = []
        for(let x in data){
            let d = utils.json.removeNull(data[x]);
            param.push(d);
        }
    }else{
        param = utils.json.removeNull(data);
    }
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(param),
        traditional:true,
        headers:headers,
        success:function(resp){
            handerResponse(resp);
            cb(resp);
        }
    });
};

/**
 * 通过formdata传参的post请求
 * @param url
 * @param data
 * @param cb
 */
request.postForm = function (url, data, headers,cb) {
    let param = null;
    if(data instanceof FormData){
        param = data;
    }else{
        param = utils.json.format.formData(data);
    }
    $.ajax({
        url:url,
        type:"post",
        processData: false,
        contentType: false,
        data:param,
        headers:headers,
        success:function(resp){
            handerResponse(resp);
            cb(resp);
        }
    });
};


/**
 * 通过formdata传参的post请求
 * @param url
 * @param data
 * @param cb
 */
request.postFormAsync = function (url, data,headers, cb) {
    let param = null;
    if(data instanceof FormData){
        param = data;
    }else{
        param = utils.json.format.formData(data);
    }
    $.ajax({
        url:url,
        type:"post",
        async:false,
        processData: false,
        contentType: false,
        data:param,
        headers:headers,
        success:function(resp){
            handerResponse(resp);
            cb(resp);
        }
    });
};

/**
 * 通过json传参的get请求
 * @param url
 * @param data
 * @param cb
 */
request.getJson = function (url, data,headers, cb) {
    data = utils.json.removeNull(data);
    $.ajax({
        type:"GET",
        url:url,
        data:utils.json.format.kv(data),
        headers:headers,
        success:function(resp){
            handerResponse(resp);
            cb(resp);
        }
    });
};
/**
 * 通过json传参的get请求(同步方式)
 * @param url
 * @param data
 * @param cb
 */
request.getJsonAsync = function (url, data,headers, cb) {
    data = utils.json.removeNull(data);
    $.ajax({
        type:"GET",
        async:false,
        url:url,
        data:utils.json.format.kv(data),
        headers:headers,
        success:function(resp){
           handerResponse(resp);
           cb(resp);
        }
    });
};

/**
 * 下载文件
 * @param url
 */
request.downLoad = function (url,data) {
    let a = document.createElement("a");
    if(utils.obj.isEmpty(data)){
        a.setAttribute("href",url);
    }else{
        a.setAttribute("href",url+"?"+utils.json.format.kv(data));
    }
    a.click();
}


function handerResponse(resp){
    let response;
    if(utils.str.isJson(resp)){
        response = JSON.parse(resp);
    }else{
        response = resp;
    }

    if(response.success){
        return;
    }

    let errorMsg = response.msg;
    if(!errorMsg){
        errorMsg = response.message;
    }
    
    if(!utils.str.isEmpty(errorMsg)){
        msg.error(errorMsg);
    }
    let redirectUrl = response.redirectUrl
    if(!utils.str.isEmpty(redirectUrl)){
        if (window != top){
            top.location.href = redirectUrl;
        }else{
            window.location.href = redirectUrl;
        }
    }


}


const confirm = {};



confirm.remove = function (confirmFun,cancelFun) {
  confirm.warning("确定删除吗？",confirmFun,cancelFun);
};

confirm.warning = function (content,confirmFun,cancelFun) {
    vm.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(function(resp){
        if(confirmFun){
            confirmFun(resp);
        }
    }).catch(function(resp) {
        if(cancelFun){
            cancelFun(resp);
        }
    });
};

confirm.prompt = function (title,reg,errMsg,confirmFun,cancelFun) {
    vm.$prompt(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: reg,
        inputErrorMessage: errMsg
    }).then(function(value){
        if(confirmFun){
            confirmFun(value);
        }
    }).catch(function(value){
        if(cancelFun){
            cancelFun(value);
        }
    });
};

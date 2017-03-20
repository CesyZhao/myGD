/**
 * Created by Administrator on 2017/3/16.
 */

exports.check = function(inputs){
    console.log(inputs);
    if(inputs.username == '' || inputs.password == '' ||
        inputs.rePassword == '' || inputs.question == '' || inputs.answer == ''){
        return Promise.reject(new Error('您有信息未填写!'));
    }else if(inputs.password != inputs.rePassword){
        return Promise.reject(new Error('两次输入的密码不一致!'));
    }else{
        return Promise.resolve(1);
    }
};
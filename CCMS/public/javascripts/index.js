/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){
    checkRepeat();
    //在输入的时候判断空值
    $("input").on("keydown",function(){
        checkEmpty();
    });
    submit();
});
//异步判断用户名是否存在
function checkRepeat(){
    $("input[name='username']").on("blur",function(){
        var username = {username:$(this).val()};
        var url = "checkRepeat";
        //ajax异步查询用户名是否重复
        $.get(url,username,function(data){
            if(data.length!=0){
                //重复则弹出警告框，并且将输入框变为警告的红色，自动聚焦
                warning("该用户名已经被占用!");
                $("input[name='username']").parent().parent().addClass("has-error");
                $("input[name='username']").focus();
            }else{
                warningMis();
                $("input[name='username']").parent().parent().removeClass("has-error");
            }
        })
    })
}
//当有错误与信息存在的时候，不允许提交
function submit(){
    $("button").on("click",function(e){
        $("input").trigger("keydown");
        var flag = $(".alert").attr("class");
        if(flag.lastIndexOf("invisible") == -1){
            //假如在有警告信息的情况下，阻止提交
            e.preventDefault();
            //alert("请先修改有错误的内容再注册")
        }
    })
}
//判空
function checkEmpty(){
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    var rePassword = $("input[name='rePassword']").val();
    var question = $("input[name='question']").val();
    var answer = $("input[name='answer']").val();
    //只要有空的输入框没填，则弹出警告框
    if(username==""||password==""||rePassword==""||question==""||answer==""){
        warning("您有信息未填写!");
    }else{
        warningMis();
    }
}
//弹出警告信息的函数
function warning(msg){
    $(".alert").text(msg);
    $(".alert").removeClass("invisible");
}
//警告信息消失的函数
function warningMis(){
    $(".alert").addClass("invisible");
}
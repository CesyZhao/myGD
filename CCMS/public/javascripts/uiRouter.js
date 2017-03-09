/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){
    $(".menuOfAss li").on("click",function(){
            switch ($(this).index()){
                case 0:
                    $(".viewer").load('../templates/tem_home.html');
                    break;
                case 1:
                    $(".viewer").load('../templates/tem_member.html');
                    break;
                case 2:
                    $(".viewer").load('../templates/tem_announcement.html');
                    break;
            }
    })
    $(".menuOfAss li").eq(0).trigger("click");
    checkRepeat();
    submit();
    checkEmpty();
});
//异步判断用户名是否存在
function checkRepeat(){
    $("input[name='registerUsername']").on("blur",function(){
        var username = {username:$(this).val()};
        var url = "checkRepeat";
        $.get(url,username,function(data){
            if(data.length!=0){
                $(".alert").text("该用户名已经被占用!");
                $(".alert").removeClass("invisible");
                $("input[name='registerUsername']").parent().parent().addClass("has-error");
                $("input[name='registerUsername']").focus();
            }else{
                $(".alert").addClass("invisible");
                $("input[name='registerUsername']").parent().parent().removeClass("has-error");
            }
        })
    })
}
//当有错误与信息存在的时候，不允许提交
function submit(){
    $("button").on("click",function(e){
        var flag = $(".alert").attr("class");
        if(flag.lastIndexOf("invisible") == -1){
            e.preventDefault();
            alert("请先修改有错误的内容再注册")
        }
    })
}
//判空
function checkEmpty(){
    var username = $("input[name='registerUsername']").val();
    var password = $("input[name='Password']").val();
    var rePassword = $("input[name='rePassword']").val();
    var question = $("input[name='question']").val();
    var answer = $("input[name='answer']").val();
    if(username==""||password==""||rePassword==""||question==""||answer==""){
        $(".alert").text("您有栏目未填写!");
        $(".alert").removeClass("invisible");
    }
}
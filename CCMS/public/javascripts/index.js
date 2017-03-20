$(function(){
    $("input[type='file']").on("change",function(){
        $(".formAvatar").eq(0).trigger("submit");
    });
    $(".edit").on('click',function(){
       $('.userNameNow').trigger('focus');
    })
});
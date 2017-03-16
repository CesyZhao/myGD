$(function(){
    console.log($("input[type='file']"));
    $("input[type='file']").on("change",function(){
        console.log($(this).val());
        $(".formAvatar").eq(0).trigger("submit");
    })
});
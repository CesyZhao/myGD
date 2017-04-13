$(function(){
    $("input[type='file']").on("change",function(){
        $(".formAvatar").eq(0).trigger("submit");
    });
    $(".edit").on('click',function(){
       $('.userNameNow').trigger('focus');
    });
    //否决按钮
    $('.btn-refuse').on('click',function(){
        var id = $(this).parent().children("input[type='hidden']").val();
        console.log(id);
        var keyword = $(this).parent().siblings().eq(2).text();
        $('#refuse').find("input[name='keyword']").val(keyword);
        $('#refuse').find('form').attr('action','review/'+id+'/deny');
    });
    //新闻类型
    $('select.add').on('change',function(){
        var className = $('#hot').attr('class');
        if($(this).val() == 'normal'){
            $("#hot").removeClass('in');
        }else if($(this).val() == 'hot'){
            $("#hot").addClass('in');
        }
    });
    //更新新闻内容
    $('select.update').on('change',function(){
        var className = $('#hot').attr('class');
        if($(this).val() == 'normal'){
            $("#hot1").removeClass('in');
        }else if($(this).val() == 'hot'){
            $("#hot1").addClass('in');
        }
    });
    //点击新闻内容
    $('.news').on('click',function(){
        var title = $(this).find('.news_title').text();
        var content = $(this).find('.news_content').text();
        $('#newsModal').modal('toggle');
        $('#newsModal').find('.modal-body').find('h4').eq(1).text(title);
        $('#newsModal').find('.modal-body').find('h4').eq(3).text(content);
    });
    //修改按钮点击时弹出模态框
    $('.btn-update').on('click',function(){
        var title = $(this).parent().parent().find('.news_title').text();
        var content = $(this).parent().parent().find('.news_content').text();
        var kind = $(this).parent().parent().find('.news_kind').text()=='普通新闻'?'normal':'hot';
        var id = $(this).parent().find("input[type='hidden']").val();
        $('#update').modal('show');
        $("#update").find("input[type='hidden']").val(id);
        $("#update").find("input[name='title']").val(title);
        $("#update").find("textarea").val(content);
        $("#update").find("select").val(kind);
        if(kind == 'hot'){
            $("#update").find('.collapse').addClass('in');
        }
    });
    //删除按钮点击时
    $('.btn-delete').on('click',function(){
        var id = $(this).parent().find("input[type='hidden']").val();
        swal({
            title: "确定删除吗?",
            text: "这个操作是不可逆的!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的,删除!",
            cancelButtonText: "算了,取消!",
            closeOnConfirm: false,
            closeOnCancel: false
        },function(isConfirm){
            if (isConfirm) {
                $.post('deleteNews',{id:id},function(data){
                   if(data=='success'){
                       swal("已删除!", "", "success");
                       setTimeout('location.reload()',2000);
                   }else{
                       swal("删除失败!", "删除失败，请重试!", "error");
                       setTimeout('location.reload()',2000);
                   }
                });
            } else {
                swal("已取消!", "已经取消删除操作!", "error");
            }
        })
    });
    //查看细节按钮
    $('.btn-detials').on('click',function(){
        var name = $(this).parent().siblings().eq(1).text();
        var word = $(this).parent().siblings().eq(2).text();
        var reason = $(this).parent().siblings().eq(4).text();
        $('#detials').find('h4').eq(1).text(name);
        $('#detials').find('h4').eq(3).text(word);
        $('#detials').find('h4').eq(5).text(reason);
        $('#detials').modal('show');

    });
    //修改申请按钮
    $(".btn-change").on('click',function(){
        var name = $(this).parent().siblings().eq(1).text();
        var keyword = $(this).parent().siblings().eq(2).text();
        var id = $(this).parent().siblings().eq(0).find('input').val();
        console.log(id);
        $('#change').find("input[name='id']").val(id);
        $('#change').find("input[name='name']").val(name);
        $('#change').find("input[name='keyword']").val(keyword);
        $("#change").modal('show');
    });
    //撤销申请按钮
    $(".btn-dismiss").on('click',function(){
        var id = $(this).parent().siblings().eq(0).find('input').val();
        swal({
            title: "确定撤销吗?",
            text: "这个操作是不可逆的!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的,撤销!",
            cancelButtonText: "算了,取消!",
            closeOnConfirm: false,
            closeOnCancel: false
        },function(isConfirm){
            if (isConfirm) {
                $.post('dismissApply',{id:id},function(data){
                    if(data=='success'){
                        swal("已撤销!", "", "success");
                        setTimeout('location.reload()',2000);
                    }else{
                        swal("撤销失败!", "撤销失败，请重试!", "error");
                        setTimeout('location.reload()',2000);
                    }
                });
            } else {
                swal("已取消!", "已经撤销删除操作!", "error");
            }
        })
    });
    var gender = $("input[type='hidden']").eq(0).val();
    $("input[type='radio']").each(function(index,item){
        if($(item).val() == gender){
            console.log(item);
            $(this).attr('checked',true);
        }
    });
    var hobby = $("input[type='hidden']").eq(1).val();
    $("input[type='checkbox']").each(function(index,item){
        if(hobby.indexOf($(item).val()) != -1){
            $(this).attr('checked',true);
        }
    });
});

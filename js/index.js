// 读取本地存储的数据
function getData() {
    var data = localStorage.getItem("todolist");
    if(data !== null) {
        return JSON.parse(data);
    }else {
        return [];
    }
}
// 保存数据到本地存储
function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
}
// 渲染加载数据
function load() {
    // 读取本地数据
    var data = getData();
    // 先清空ol的元素内容
    $("ol,ul").empty();
    var todoCount = 0;//正在进行的个数
    var doneCount = 0;//已经完成的个数
    // 遍历数据
    $.each(data, function(i, n) {
        if(n.done) {
            $("ul").prepend("<li><input type='checkbox' checked='checked'><p>"+n.title+"</p><a href='javascript:;' id='"+i+"'></a></li>");
            doneCount++;
        }else {
            $("ol").prepend("<li><input type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id='"+i+"'></a></li>");
            todoCount++;
        }
    });
    $("#todocount").text(todoCount);
    $("#donecount").text(doneCount);
}
// 删除操作
$("ol,ul").on("click", "a", function() {
    var data = getData();
    // 修改数据,先获取数据的索引号
    var index = $(this).attr("id");
    data.splice(index, 1);
    saveData(data);
    load();
});

// 正在进行和已完成的选项操作
$("ol, ul").on("click","input",function() {
    var data = getData();
    // 拿兄弟a的索引号
    var index = $(this).siblings("a").attr("id");
    // 设置done的值为checked的值
    data[index].done = $(this).prop("checked");
    saveData(data);
    load();
});


load();

$("#title").on("keydown",function(event) {
    if(event.keyCode === 13) {
        if($(this).val()) {
            // 按下回车，先读取本地存储原来的数据
        var local = getData();
        // 更新local数组，把最新的数据给local
        local.push({title: $(this).val(), done: false});
        // 把数组local存储到本地存储
        saveData(local);
        load();
        }
    }
});

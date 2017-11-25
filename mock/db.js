const mockjs=require("mockjs");

module.exports=function(){
    var data=mockjs.mock({
            "news|5-10":[{"title":"@city","content":"@cname"}],
            "news-detail":{
                "title":"标题",
                "content":"内容"
            },
            "login":{
                "id":function(){
                    return 1000+Math.random()*5000|0;
                },
                "name":"@cname"
            }
        });

    return data;
};
const phantomJsCloud = require("phantomjscloud");
const fs=require("fs")


var browser = new phantomJsCloud.BrowserApi("ak-6rtyg-193t9-baz9e-j8z88-hy80a");
var userRequest={
    pages:[
        {
            "url": "http://cn.epubee.com",
            renderType: 'script',
            outputAsJson: true,
            renderSettings: {
                quality: 70,
                viewport: {
                height: 1280,
                width: 1280,
                },
                zoomFactor: 1,
                passThroughHeaders: false,
                emulateMedia: 'screen',
                omitBackground: false,
                passThroughStatusCode: false,
            },
            scripts: {
                "domReady": ["window.akeys='a';"],
        "loadFinished": [
            "$('#identify').attr('target','_self');",
            //"$('#identify').click()",
            //"if(location.pathname.indexOf('files.aspx')<0){ top.location='files.aspx' }",     
            
            //"_pjscMeta.manualWait=true;",
            //"setInterval(function(){ if($('#muser').attr('title')=='user' && $('#identify').text()!='0'){_pjscMeta.manualWait=false;} },2000)"
            "$.ajax({"
            +"   type:'post',"
                +"   contentType: 'application/json',"
                +"   url: 'app_books/click_key.asmx/getkey',"
                //+"   data: '{isVip:' + isVip + ',uid:' + uid + ',strbid:\'qoKAOqScCHzRg9B5IRfEN%2bAaapKXfprbpW4H7dC2Br2F9md4witPRI0pxA%2f5YHVnImawOITnxSZ862XBks%2b3Yz5YTnumfVzYAXrnPeMHdAcqpDSOMFKN6b0NP9S7kY7LmCas5C6rzOs%3d\'},"
                +'data: "{isVip:0 ,uid:" + uid + ",strbid:\'qoKAOqScCHzRg9B5IRfEN%2bAaapKXfprbpW4H7dC2Br2F9md4witPRI0pxA%2f5YHVnImawOITnxSZ862XBks%2b3Yz5YTnumfVzYAXrnPeMHdAcqpDSOMFKN6b0NP9S7kY7LmCas5C6rzOs%3d\'}",'
                +"   dataType: 'json',"
                +"   success: function (result) {"
                +"     $.each(result.d, function (index, data) {"
                            //+"_pjscMeta.scriptOutput=$('#identify').text()"
                            +"$('#identify').attr('akeys',data);"
                    +"       if (data == 'limited') {"
                        +"           window.akeys='limited'"
                            +"       } else if (data == 'timeout') {"
                        +"           window.akeys='timeout'"
                            +"        } else {"                            
                        //+"             var download_url = 'http:\/\/files.epubee.com/getFile.ashx?bid=' + initurl + &quot;&uid=&quot; + uid + &quot;&t_key=&quot; + data;"
                            +"             window.akeys=data;"
                            +"         }"
                        +"      });"
                    +"   },"
                +"   error: function () {"
                +"      popalert(_ts('systemerror'));"
                    +"      return false;"
                    +"  }"
            +"});",

            //"setInterval(function(){ if(window.akeys!='a'){_pjscMeta.scriptOutput=$('#identify').text()+window.akeys} },2000)"
            //"setInterval(function(){ if(window.akeys!='a'){_pjscMeta.manualWait=true } },2000)"
            "setInterval(function(){ if(window.akeys!='a'){_pjscMeta.scriptOutput={'uids':uid,'keys':window.akeys};_pjscMeta.manualWait=false;} },500)",

            ]
            }
            }
    ],
    //proxy:{builtin:{location:"any"}},
    requestSettings: {
        ignoreImages: false,
        disableJavascript: false,
        userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.34 (KHTML, like Gecko) Safari/534.34 PhantomJS/2.0.0 (PhantomJsCloud.com/2.0.1)',
        xssAuditingEnabled: false,
        webSecurityEnabled: false,
        resourceWait: 15000,
        resourceTimeout: 35000,
        maxWait: 35000,
        ioWait: 2000,
        waitInterval: 1000,
        stopOnError: false,
        resourceModifier: [],
        customHeaders: {},
        clearCache: false,
        clearCookies: false,
        cookies: [],
        deleteCookies: [],
    },
};/*
browser.requestSingle({ 
    url: "http://cn.epubee.com", 
    renderType: "jpeg",
    outputAsJson: true,
    "requestSettings":{
        "maxWait":20000,
        "clearCache":true,
    },
    proxy:"geo-us",
    scripts: {
        "domReady": ["window.akeys=''"],
        "loadFinished": [
            "$('#identify').attr('target','_self');",
            //"$('#identify').click()",
            "if(location.pathname.indexOf('files.aspx')<0){ top.location='files.aspx' }",     
            
            //pjscMeta.manualWait=true;",
            //"setInterval(function(){ if($('#muser').attr('title')=='user' && $('#identify').text()!='0'){_pjscMeta.manualWait=false;} },2000)"
            "$.ajax({"
            +"   type:'post',"
                +"   contentType: 'application/json',"
                +"   url: 'app_books/click_key.asmx/getkey',"
                //+"   data: '{isVip:' + isVip + ',uid:' + uid + ',strbid:\'qoKAOqScCHzRg9B5IRfEN%2bAaapKXfprbpW4H7dC2Br2F9md4witPRI0pxA%2f5YHVnImawOITnxSZ862XBks%2b3Yz5YTnumfVzYAXrnPeMHdAcqpDSOMFKN6b0NP9S7kY7LmCas5C6rzOs%3d\'},"
                +'data: "{isVip:" + isVip + ",uid:" + uid + ",strbid:\'qoKAOqScCHzRg9B5IRfEN%2bAaapKXfprbpW4H7dC2Br2F9md4witPRI0pxA%2f5YHVnImawOITnxSZ862XBks%2b3Yz5YTnumfVzYAXrnPeMHdAcqpDSOMFKN6b0NP9S7kY7LmCas5C6rzOs%3d\'}",'
                +"   dataType: 'json',"
                +"   success: function (result) {"
                +"     $.each(result.d, function (index, data) {"
                    +"       if (data == 'limited') {"
                        +"           window.akeys='limited'"
                            +"       } else if (data == 'timeout') {"
                        +"           window.akeys='timeout'"
                            +"        } else {"                            
                        //+"             var download_url = 'http:\/\/files.epubee.com/getFile.ashx?bid=' + initurl + &quot;&uid=&quot; + uid + &quot;&t_key=&quot; + data;"
                            +"             window.akeys=data;"
                            +"         }"
                        +"      });"
                    +"   },"
                +"   error: function () {"
                +"      popalert(_ts('systemerror'));"
                    +"      return false;"
                    +"  }"
            +"});",

            "setInterval(function(){ if($('#muser').attr('title')=='user'){_pjscMeta.scriptOutput=$('#identify').text()+window.akeys} },2000)"
            ]
}
}, (err, userResponse) => {
    //can use a callback like this example, or a Promise (see the Typescript example below)
    if (err != null) {
        throw err;
    }
    fs.writeFile(userResponse.content.name, userResponse.content.data,{
        encoding: userResponse.content.encoding,
    }, (err) => {
        console.log("captured page written to " + userResponse.content.name);
    });
    console.log("last:");
    console.log(JSON.stringify(userResponse.content));
});
*/
function mainJob(){
browser.requestSingle(userRequest, (err, userResponse) => {
    //can use a callback like this example, or a Promise (see the Typescript example below)
    if (err != null) {
        throw err;
    }
    fs.writeFile(userResponse.content.name, userResponse.content.data,{
        encoding: userResponse.content.encoding,
    }, (err) => {
        console.log("captured page written to " + userResponse.content.name);
    });
    console.log("last:");
    console.log(userResponse.content);
    console.log(JSON.stringify(userResponse.content));
    
    //var $doc=$(userResponse.content);

    console.log(userResponse.content.data.uids,userResponse.content.data.keys);
    var bid="y40vDgJLqmYt1yJpkfjGi9xYmC1WAyk2zaW5eN9qVxlFR18FLSNGdrQntbxV%2b4wUqthwTOCoO%2fm4diAlAnAQUGqaaJ3ko3kJH9kJxCeQQOvyyXOUvRho0OhBzB20cjRjk8a2uw%2bbDsE%3d";
    downloadmyFile(bid,userResponse.content.data.uids,userResponse.content.data.keys)
});
}
/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback); 
}
var fileUrl  = 'http://www.haodoo.net/?M=d&P=BV12G9.mobi';
var filename = 'beauty.mobi';
function downloadmyFile(initurl,uid,tkey){
    var download_url = "http:\/\/files.epubee.com/getFile.ashx?bid=" + initurl + '&uid=' + uid + '&t_key=' + tkey;
    downloadFile(download_url,filename,function(){
        console.log(filename+'下载完毕');
    });
}



const schedule=require("node-schedule")
var date = new Date(2019,6,6,2,37,05);  
var rule = new schedule.RecurrenceRule();
rule.second=10;
var j = schedule.scheduleJob(date,mainJob);

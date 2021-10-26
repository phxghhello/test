#### 微信公众号获取openid

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Web_Developer_Tools.html#%E8%B0%83%E8%AF%95%E5%BE%AE%E4%BF%A1%E7%BD%91%E9%A1%B5%E6%8E%88%E6%9D%83

官网文档





https://blog.csdn.net/Jane_96/article/details/110273962

微信网页授权获取用户信息，Scope 参数错误或没有 Scope 权限



https://blog.csdn.net/a1034386099/article/details/104914784

vue微信公众号授权页面获取openid、跨域



https://www.cnblogs.com/jin-zhe/p/11950526.html

前端通过js获取微信公众号用户的唯一标识符openId



vue登陆获取openid

获取openid
实现思路：
获取url中参数code； 根据code 获取openId；调用后台接口获取openId 。

```
function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
 }

function getCodeApi(state){//获取code   
     let urlNow=encodeURIComponent(window.location.href);
     let scope='snsapi_base';    //snsapi_userinfo   //静默授权 用户无感知
     let appid='wx4cc5d5c123123123';
     let url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
     window.location.replace(url);
}

//注意代码放置位置
export default {
    created(){
        let code=getUrlKey("code");//获取url参数code
        if(code){ //拿到code， code传递给后台接口换取opend
            getOpenIdApi(code).then(res=>{
                 console.log(res);
            }).catch(res=>{})
         }else{
            getCodeApi("123");
         }
    }
}
```



https://blog.csdn.net/qq_39759115/article/details/80506194

echarts 自定义 markPoint 的 symbol 样式

```js

        var myChart = echarts.init(document.getElementById(id));
        var option = {
            title: {
                text: "标题",
                top: 20,
                left: '10%',
                textStyle:{
                    fontSize: 14,
                    fontWeight: 600
                }
            },
            legend: {
                data: ["line1"],
                top: 30,
                right: "6.5%",
                formatter: function (name) {
                    return  name;
                },
                itemGap: 40
            },
            grid:{
                top: 60,
                left: "10%",
                right: "7%",
                bottom: 40
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (data){
                    var html = '';
                    if(data.componentType == 'markPoint'){
                        html = data.seriesName;
                    }else{
                        html = data[0].name;
                        for(var i=0; i<data.length; i++){
                            var now = data[i];
                            html += '</br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+now.color+'"></span>' + now.seriesName + ': ' + toHSpeed(now.data, 2);
                        }
                    }
                    return html
                }
            },
            xAxis: [
                {
                    type : 'category',
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: false,
                        interval: 0
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#8cccca'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#a19e9e'
                        },
                        interval:0,
                        formatter: function (value, index) {
                            return value;
                        }
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            color:'#dadada'
                        }
                    },
                    data:["01","02","03","04","05","06","07","08"]
                }
            ],
            yAxis: [
                {
                    type : 'value',
                    axisLine:{ // y 线样式修改
                        lineStyle:{
                            color:'#8cccca'
                        }
                    },
                    axisLabel: { // y 名称样式修改
                        textStyle: {
                            color: '#a19e9e'
                        },
                        formatter: function (data){
                            return toHSpeed(data, 2);
                        }
                    },
                    splitLine:{ // 取消y轴的网格
                        show: true,
                        lineStyle:{
                            color:'#dadada'
                        }
                    },
                    min: 0,
                    max:function(value) {
                        return value.max + 100;
                    }
                }
            ],
            series: [
                {
                    name: "line1" ,
                    type: 'line',
                    color: ['#31b573'],// 颜色
                    showSymbol: false,
                    silent: true, // 取消点击事件
//                    areaStyle:{ // 填充颜色
//                        normal:{
//                            opacity: 0.1
//                        }
//                    },
                    smooth:true,
                    itemStyle:{ // 转折点 控制
                        normal:{
                            borderColor:'#277cdc'
                        }
                    },
                    data: [35,50,44,30,60,33,70,61],
                    markPoint: {
                        symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
                        symbolSize: function(val){
                            return [textSize(toHSpeed(val, 2),"12px").width+5,40]
                        },
                        symbolOffset: ['34%', '-50%'],
                        symbolKeepAspect: true,// 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
                        label:{
                            position: "insideTop",
                            distance: 7,
                            formatter: function (data){
                                return toHSpeed(data.value, 2);
                            }
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option,true);
        window.addEventListener("resize", function () {
            myChart.resize();
        });


    /**
     * 获取文本宽高
     * @param text       文本
     * @param fontSize   代表汉字的大小，英文字会自动按照默认值
     * @returns {{width: *, height: *}}
     */
    function textSize(text,fontSize) {
        var span = document.createElement("span");
        var result = {
            "width": span.offsetWidth,
            "height": span.offsetHeight
        };
        span.style.visibility = "hidden";
        span.style.fontSize = fontSize || "14px";
        document.body.appendChild(span);

        if (typeof span.textContent != "undefined")
            span.textContent = text || "国";
        else span.innerText = text || "国";

        result.width = span.offsetWidth - result.width;
        result.height = span.offsetHeight - result.height;
        span.parentNode.removeChild(span);
        return result;
    }

   function toHSpeed(speed,fix) {
        if(isNaN(speed))
            return speed;
        if(!fix&&fix!=0)
            fix=2;
        if(speed>=125000000)
        {
            speed/=125000000;
            speed=speed.toFixed(fix)+"Gbps"
        }
        else if(speed>=125000)
        {
            speed/=125000;
            speed=speed.toFixed(fix)+"Mbps"
        }
        else if(speed>=125)
        {
            speed/=125;
            speed=speed.toFixed(fix)+"Kbps"
        }
        else
        {
            speed*=8;
            speed=speed.toFixed(fix)+"bps"
        }
        return speed
    }
```


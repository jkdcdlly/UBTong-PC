# UBTong-PC
优百通PC商城

###@@@@#会员中心
##表单输入格式判断 (要引jquery基础包)
####默认css样式
1、表单前面文字提示
```
 .form-font{ font-size:14px;margin-right:5px;}
```
2、表单的文本输入框
```
.text{border:1px solid #ccc; width:291px; height:14px; padding:8px 6px；outline:none;}
```

- 判断手机号
```
<label class="Tel-font" for="Phone">请输入手机号码：</label><input type="text" value="18050784102" class=”text” id="Tel"/>
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>
<script type="text/javascript">setTelChoose('Tel');</script>
```
- 判断电话号码
```
<label class="phone-font" for="Phone">请输入电话号码：</label><input type="text" value="0591-85476522" id="Phone" class=”text”/>
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>
<script type="text/javascript">setPhoneChoose('Phone');</script>
```
- 判断身份证
```
<label class="idcard-font" for="Phone">请输入身份证：</label><input type="text" value="350582199309144524" id="IDCard" class=”text”/>
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>
<script type="text/javascript">setIDCardChoose('IDCard');</script>
```
- 判断邮箱
```
<label class="mail-font" for="Mail">请输入邮箱：</label><input type="text" value="512615967@99.com" id="Mail" class=”text”/>
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>
<script type="text/javascript">setMailChoose('Mail');</script>
```

##选择日期
####css样式
1、表单前面文字提示
```
 .form-font{ font-size:14px;margin-right:5px;}
```
2、表单的文本输入框
```
.text{border:1px solid #ccc; width:291px; height:14px; padding:8px 6px；outline:none;}
```

####布局（此控件必须引进js文件）
```
<label class="form-font" for="J-xl">选择日期：</label><input type="text" value="1997-09-01" id="J-xl" class=”text”/>
<script type="text/javascript" src="res/js/laydate.dev.js"></script>
<script type="text/javascript">laydate({elem: '#J-xl'});</script>
```

## 获取验证码
####css样式
```
.setMessage{display: inline-block; width: 96px; height: 36px; font-size: 14px; background: #339900; text-align: center; line-height: 36px; color: #fff;border: none;outline: none; font-family:"微软雅黑";}
```
#### 布局
```
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>

<input type="button" class="setMessage" id="setMessage" value="获取验证码" onclick="sendMessage()" />
```
##单选按钮
#### css样式
1、表单前面文字提示 
```
.form-font{ font-size:14px;margin-right:5px;}
```
2、单选按钮的样式为：
```
.radio{display: block; width: 14px;height: 34px;margin-right: 5px;background:url(res/img/radio/radio.jpg) no-repeat 0 -21px; float: left;}
```
3、同时要将按钮的隐藏这样才会是我们自己样式
```
.radio input{ display:none;}
```
4、按钮选择时的样式
```
.radio.act{  background-position: 0 11px;}
```
5、按钮旁的文字
```
.radio-font{float: left; display: block;margin-right: 22px; font-size: 14px; color: #444; height: 34px; line-height: 34px;}
```
####布局（要引入js文件）
```
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>
<label class="form-font"></label>
<label class="act radio"><input type="radio"/></label><span class="radio-font">男</span><label class="radio"><input type="radio"/></label><span class="radio-font">女</span>
```
##复选按钮
####css样式
1、表单前面文字提示 
```
.form-font{ font-size:14px;margin-right:5px;}
```
2、单选复选按钮的样式为：
```
.checkbox{display: block; width: 15px; height: 34px; float: left;background:url(res/img/radio/radio1.jpg) no-repeat 0 -25px; margin-right: 5px; }
```
3、同时要将按钮的隐藏这样才会是我们自己样式
```
.checkbox input{ display:none;}
```
4、复选按钮选择时的样式
```
.checkbox.act{ background-position: 0 10px;}
```

####布局（要引入js文件）
```

<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/phone-choose.js" type="text/javascript"></script>
<a href="###" class="checkbox"></a> <!--选中状态为act-->
<script type="text/javascript">selectCheckBox('checkbox');</script>
```
##省市区-仿京东选择
####css样式
```
.go{ float:left; font-size:14px; margin-left:5px;  color: #7b7b7b; margin-top:10px;}
#store-selector{position:relative;z-index:3; margin-top:8px;float:left; height:29px; margin-right: 6px;}
#store-selector .text{float:left;position:relative;top:0;height:26px;border:1px solid #ccc;line-height:26px;overflow:hidden;padding:0 22px 0 8px; background:#fff;}
#store-selector .font{color:#7b7b7b; font-size:14px; }
#store-selector .text b{ display: block; position: absolute;top: 0; right: 0; width: 17px; height: 26px; overflow: hidden;background:url(res/img/store-selector/dot.jpg) no-repeat 2px center ;}
#store-selector.hover .text{z-index: 1;height: 25px;border-bottom: 0;}
#store-selector .close{display:none;position:absolute;z-index:2;top:20px;left:365px;width:17px;height:17px;background:url(res/img/store-selector/20120418.png) no-repeat -40px 0;}
#store-selector .content{ display:none;position:absolute;top:25px;left:-45px;width:390px;padding:15px;background:#fff;-moz-box-shadow: 0 0 5px #ddd;-webkit-box-shadow: 0 0 5px #ddd;box-shadow: 0 0 5px #ddd;border:1px solid #ccc;}
#store-selector.hover .content{ display:block;}
#store-selector.hover .close{ display:block;}
```
####布局（要引入js文件和css文件）
```
<link href="res/css/common.css" rel="stylesheet" type="text/css" />
<div class="container">
    <span class="go">配送至：</span>                     
    <div id="store-selector" class="">
        <div class="text" id="text">
            <div title="福建省福州市区" class="font">福建省福州市区</div>
            <b></b>
        </div>
        <div class="close" onclick="$('#store-selector').removeClass('hover')"></div>
    </div>
</div>
<div class="clr"></div>
<script src="res/js/location.js" type="text/javascript"></script>
```
##省市区-普通-三个框
####css样式
```
.select {border: solid 1px #000;appearance:none;-moz-appearance:none;background:url(res/img/store-selector/dot.jpg) no-repeat 118px center;-webkit-appearance:none;font-size: 14px;padding-left: 9px;padding-left: 9px;display: inline-block;height:34px;width: 132px;border: 1px solid #e0e0e0;  line-height: 34px;color: #afafaf; margin-right: 15px; padding-right: 14px;}
.select::-ms-expand { display: none; }
```
####布局
```
<script src="res/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="res/js/prcco.js" type="text/javascript"></script>
<div class="container">
<select name="province" id="province"></select>
	<select name="city" id="city"></select>
	<select name="county" id="county"></select>
</div>
<script type="text/javascript">setup()</script>
```
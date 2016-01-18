!function ($) {
	$.extend({
		_jsonp : {
			scripts : {},
			counter : 1,
			charset : "gb2312",
			head : document.getElementsByTagName("head")[0],
			name : function (callback) {
				var name = "_jsonp_" + (new Date).getTime() + "_" + this.counter;
				this.counter++;
				var cb = function (json) {
					eval("delete " + name),
					callback(json),
					$._jsonp.head.removeChild($._jsonp.scripts[name]),
					delete $._jsonp.scripts[name]
				};
				return eval(name + " = cb"),
				name
			},
			load : function (a, b) {
				var c = document.createElement("script");
				c.type = "text/javascript",
				c.charset = this.charset,
				c.src = a,
				this.head.appendChild(c),
				this.scripts[b] = c
			}
		},
		getJSONP : function (a, b) {
			var c = $._jsonp.name(b),
			a = a.replace(/{callback};/, c);
			return $._jsonp.load(a, c),
			this
		}
	})
}
(jQuery);

var iplocation = {"福州市": { id: "1", root: 0, djd: 1,c:72 },"莆田市": { id: "2", root: 1, djd: 1,c:78 },"泉州市": { id: "3", root: 0, djd: 1,c:51035 },"厦门市": { id: "4", root: 3, djd: 1,c:113 },"漳州市": { id: "5", root: 0, djd: 1,c:142 },"宁德市": { id: "6", root: 0, djd: 1,c:303 },"南平市": { id: "7", root: 0, djd: 1,c:412 },"三明市": { id: "8", root: 0, djd: 1,c:560 },"龙岩市": { id: "9", root: 0, djd: 1,c:639 },"平潭县": { id: "10", root: 0, djd: 1,c:698 }};

var provinceCityJson = {"1":[{"id":72,"name":"鼓楼区"},{"id":2800,"name":"台江区"},{"id":2801,"name":"仓山区"},{"id":2802,"name":"马尾区"},{"id":2803,"name":"晋安区"},{"id":2804,"name":"福清市"},{"id":2805,"name":"长乐市"},{"id":2806,"name":"闽侯县"},{"id":2807,"name":"连江县"},{"id":2808,"name":"罗源县"},{"id":2809,"name":"闽清县"},{"id":2810,"name":"永泰县"}],"2":[{"id":2811,"name":"城厢区"},{"id":2813,"name":"涵江区"},{"id":2815,"name":"荔城区"},{"id":2817,"name":"秀屿区"},{"id":2820,"name":"仙游县"}],"3":[{"id":51035,"name":"丰泽区"},{"id":51036,"name":"鲤城区"},{"id":51037,"name":"洛江区"},{"id":51038,"name":"泉港区"},{"id":51039,"name":"石狮市"},{"id":51040,"name":"晋江市"},{"id":51041,"name":"南安市"},{"id":51042,"name":"惠安县"},{"id":51043,"name":"安溪县"},{"id":51044,"name":"永春县"},{"id":51045,"name":"德化县"},{"id":51046,"name":"金门县"}],"4":[{"id":113,"name":"思明区"},{"id":114,"name":"海沧区"},{"id":115,"name":"湖里区"},{"id":119,"name":"集美区"},{"id":123,"name":"同安区"},{"id":126,"name":"翔安区"}],"5":[{"id":142,"name":"芗城区"},{"id":148,"name":"龙文区"},{"id":164,"name":"龙海市"},{"id":199,"name":"漳浦县"},{"id":224,"name":"南靖县"},{"id":239,"name":"云霄县"},{"id":248,"name":"和平县"},{"id":258,"name":"华安县"},{"id":264,"name":"长泰县"},{"id":274,"name":"诏安县"},{"id":275,"name":"东三县"}],"6":[{"id":303,"name":"蕉城区"},{"id":309,"name":"东桥新区"},{"id":318,"name":"福安市"},{"id":325,"name":"福鼎市"},{"id":330,"name":"霞浦县"},{"id":336,"name":"古田县"},{"id":350,"name":"屏南县"},{"id":368,"name":"寿宁县"},{"id":379,"name":"周宁县"},{"id":398,"name":"柘荣县"}],"7":[{"id":412,"name":"延平区"},{"id":420,"name":"建阳区"},{"id":427,"name":"邵武市"},{"id":438,"name":"武夷山市"},{"id":446,"name":"建瓯市"},{"id":454,"name":"顺昌县"},{"id":458,"name":"浦城县"},{"id":468,"name":"光泽县"},{"id":475,"name":"松溪县"},{"id":482,"name":"政和县"}],"8":[{"id":560,"name":"梅列区"},{"id":573,"name":"三元区"},{"id":579,"name":"永安市"},{"id":584,"name":"明溪县"},{"id":589,"name":"清流县"},{"id":593,"name":"宁化县"},{"id":598,"name":"大田县"},{"id":604,"name":"尤溪县"},{"id":609,"name":"沙县"},{"id":613,"name":"将乐县"},{"id":617,"name":"泰宁县"},{"id":621,"name":"建宁县"}],"9":[{"id":639,"name":"新罗区"},{"id":644,"name":"永定区"},{"id":651,"name":"漳平市"},{"id":2992,"name":"长汀县"},{"id":657,"name":"上杭县"},{"id":664,"name":"武平县"},{"id":674,"name":"连城县"}],"10":[{"id":727,"name":"潭城"},{"id":731,"name":"苏澳"},{"id":737,"name":"流水"},{"id":742,"name":"澳前"},{"id":753,"name":"北厝"},{"id":757,"name":"平原"},{"id":765,"name":"敖东"}]};
var cName = "ipLocation";
var currentLocation = "北京";
var currentProvinceId = 1;

//根据省份ID获取名称
function getNameById(provinceId){
	for(var o in iplocation){
		if (iplocation[o]&&iplocation[o].id==provinceId){
			return o;
		}
	}
	return "福州市";
}

var isUseServiceLoc = true; //是否默认使用服务端地址
var provinceHtml = '<div class="content"><div data-widget="tabs" class="m JD-stock" id="JD-stock">'
								+'<div class="mt">'
								+'    <ul class="tab">'
								+'        <li data-index="0" data-widget="tab-item" class="curr"><a href="#none" class="hover"><em>请选择</em><i></i></a></li>'
								+'        <li data-index="1" data-widget="tab-item" style="display:none;"><a href="#none" class=""><em>请选择</em><i></i></a></li>'
								+'    </ul>'
								+'    <div class="stock-line"></div>'
								+'</div>'
								+'<div class="mc" data-area="0" data-widget="tab-content" id="stock_province_item">'
								+'    <ul class="area-list">'
								+'       <li><a href="#none" data-value="1">福州市</a></li><li><a href="#none" data-value="2">莆田市</a></li><li><a href="#none" data-value="3">泉州市</a></li><li><a href="#none" data-value="4">厦门市</a></li><li><a href="#none" data-value="5">漳州市</a></li><li><a href="#none" data-value="6">宁德市</a></li><li><a href="#none" data-value="7">南平市</a></li><li><a href="#none" data-value="8">三明市</a></li><li><a href="#none" data-value="9">龙岩市</a></li><li><a href="#none" data-value="9">平潭</a></li>'
								+'    </ul>'
								+'</div>'
								+'<div class="mc" data-area="1" data-widget="tab-content" id="stock_city_item"></div>'
								+'</div></div>';
function getAreaList(result){
	var html = ["<ul class='area-list'>"];
	var longhtml = [];
	var longerhtml = [];
	if (result&&result.length > 0){
		for (var i=0,j=result.length;i<j ;i++ ){
			result[i].name = result[i].name.replace(" ","");
			if(result[i].name.length > 12){
				longerhtml.push("<li class='longer-area'><a href='#none' data-value='"+result[i].id+"'>"+result[i].name+"</a></li>");
			}
			else if(result[i].name.length > 5){
				longhtml.push("<li class='long-area'><a href='#none' data-value='"+result[i].id+"'>"+result[i].name+"</a></li>");
			}
			else{
				html.push("<li><a href='#none' data-value='"+result[i].id+"'>"+result[i].name+"</a></li>");
			}
		}
	}
	else{
		html.push("<li><a href='#none' data-value='"+currentAreaInfo.currentFid+"'> </a></li>");
	}
	html.push(longhtml.join(""));
	html.push(longerhtml.join(""));
	html.push("</ul>");
	return html.join("");
}
function cleanKuohao(str){
	if(str&&str.indexOf("(")>0){
		str = str.substring(0,str.indexOf("("));
	}
	if(str&&str.indexOf("（")>0){
		str = str.substring(0,str.indexOf("（"));
	}
	return str;
}

function getStockOpt(id,name){
	if(currentAreaInfo.currentLevel==3){
		currentAreaInfo.currentAreaId = id;
		currentAreaInfo.currentAreaName = name;
		if(!page_load){
			currentAreaInfo.currentTownId = 0;
			currentAreaInfo.currentTownName = "";
		}
	}
	else if(currentAreaInfo.currentLevel==4){
		currentAreaInfo.currentTownId = id;
		currentAreaInfo.currentTownName = name;
	}
	//添加20140224
	$('#store-selector').removeClass('hover');
	//setCommonCookies(currentAreaInfo.currentProvinceId,currentLocation,currentAreaInfo.currentCityId,currentAreaInfo.currentAreaId,currentAreaInfo.currentTownId,!page_load);
	if(page_load){
		page_load = false;
	}
	//替换gSC
	var address = currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName;
	$("#store-selector .text div").html(currentAreaInfo.currentProvinceName+cleanKuohao(currentAreaInfo.currentCityName)).attr("title",address);
}
function getAreaListcallback(r){
	currentDom.html(getAreaList(r));
	if (currentAreaInfo.currentLevel >= 2){
		currentDom.find("a").click(function(){
			if(page_load){
				page_load = false;
			}
			if(currentDom.attr("id")=="stock_area_item"){
				currentAreaInfo.currentLevel=3;
			}
			else if(currentDom.attr("id")=="stock_town_item"){
				currentAreaInfo.currentLevel=4;
			}
			getStockOpt($(this).attr("data-value"),$(this).html());
		});
		if(page_load){ //初始化加载
			currentAreaInfo.currentLevel = currentAreaInfo.currentLevel==2?3:4;
			if(currentAreaInfo.currentAreaId&&new Number(currentAreaInfo.currentAreaId)>0){
				getStockOpt(currentAreaInfo.currentAreaId,currentDom.find("a[data-value='"+currentAreaInfo.currentAreaId+"']").html());
			}
			else{
				getStockOpt(currentDom.find("a").eq(0).attr("data-value"),currentDom.find("a").eq(0).html());
			}
		}
	}
}
function chooseProvince(provinceId){
	provinceContainer.hide();
	currentAreaInfo.currentLevel = 1;
	currentAreaInfo.currentProvinceId = provinceId;
	currentAreaInfo.currentProvinceName = getNameById(provinceId);
	if(!page_load){
		currentAreaInfo.currentCityId = 0;
		currentAreaInfo.currentCityName = "";
		currentAreaInfo.currentAreaId = 0;
		currentAreaInfo.currentAreaName = "";
		currentAreaInfo.currentTownId = 0;
		currentAreaInfo.currentTownName = "";
	}
	areaTabContainer.eq(0).removeClass("curr").find("em").html(currentAreaInfo.currentProvinceName);
	areaTabContainer.eq(1).addClass("curr").show().find("em").html("请选择");
	areaTabContainer.eq(2).hide();
	areaTabContainer.eq(3).hide();
	cityContainer.show();
	areaContainer.hide();
	townaContainer.hide();
	if(provinceCityJson[""+provinceId]){
		cityContainer.html(getAreaList(provinceCityJson[""+provinceId]));
		cityContainer.find("a").click(function(){
			if(page_load){
				page_load = false;
			}
			$("#store-selector").unbind("mouseout");
			chooseCity($(this).attr("data-value"),$(this).html());
			var address = currentAreaInfo.currentProvinceName+currentAreaInfo.currentCityName;
			$("#store-selector .text div").html(currentAreaInfo.currentProvinceName+cleanKuohao(currentAreaInfo.currentCityName)).attr("title",address);
			$("#store-selector").removeClass('hover');
		});
		if(page_load){ //初始化加载
			if(currentAreaInfo.currentCityId&&new Number(currentAreaInfo.currentCityId)>0){
				chooseCity(currentAreaInfo.currentCityId,cityContainer.find("a[data-value='"+currentAreaInfo.currentCityId+"']").html());
			}
			else{
				chooseCity(cityContainer.find("a").eq(0).attr("data-value"),cityContainer.find("a").eq(0).html());
			}
		}
	}
}
function chooseCity(cityId,cityName){
	provinceContainer.hide();
	cityContainer.hide();
	currentAreaInfo.currentLevel = 2;
	currentAreaInfo.currentCityId = cityId;
	currentAreaInfo.currentCityName = cityName;
	if(!page_load){
		currentAreaInfo.currentAreaId = 0;
		currentAreaInfo.currentAreaName = "";
		currentAreaInfo.currentTownId = 0;
		currentAreaInfo.currentTownName = "";
	}
	areaTabContainer.eq(1).removeClass("curr").find("em").html(cityName);
	areaTabContainer.eq(2).addClass("curr").show().find("em").html("请选择");
	areaTabContainer.eq(3).hide();
	areaContainer.show().html("<div class='iloading'>正在加载中，请稍候...</div>");
	townaContainer.hide();
	currentDom = areaContainer;
	$.getJSONP("http://d.360buy.com/area/get?fid="+cityId+"&callback=getAreaListcallback");
}

$("#store-selector .text").after(provinceHtml);
var areaTabContainer=$("#JD-stock .tab li");
var provinceContainer=$("#stock_province_item");
var cityContainer=$("#stock_city_item");
var areaContainer=$("#stock_area_item");
var townaContainer=$("#stock_town_item");
var currentDom = provinceContainer;
//当前地域信息
var currentAreaInfo;
//初始化当前地域信息
function CurrentAreaInfoInit(){
	currentAreaInfo =  {"currentLevel": 1,"currentProvinceId": 1,"currentProvinceName":"福州市","currentCityId": 0,"currentCityName":"","currentAreaId": 0,"currentAreaName":"","currentTownId":0,"currentTownName":""};
	var ipLoc = getCookie("ipLoc-djd");
	ipLoc = ipLoc?ipLoc.split("-"):[1,72,0,0];
	if(ipLoc.length>0&&ipLoc[0]){
		currentAreaInfo.currentProvinceId = ipLoc[0];
		currentAreaInfo.currentProvinceName = getNameById(ipLoc[0]);
	}
	if(ipLoc.length>1&&ipLoc[1]){
		currentAreaInfo.currentCityId = ipLoc[1];
	}
	if(ipLoc.length>2&&ipLoc[2]){
		currentAreaInfo.currentAreaId = ipLoc[2];
	}
	if(ipLoc.length>3&&ipLoc[3]){
		currentAreaInfo.currentTownId = ipLoc[3];
	}
}
var page_load = true;
(function(){
	
	
	
	$("#store-selector").unbind("mouseover").bind("mouseover",function(){
		$('#store-selector').addClass('hover');
		$("#store-selector .content,#JD-stock").show();
	}).find("dl").remove();
	
	$('#text').unbind('mouseover').bind('mouseover',function(){
		
		if(areaTabContainer.eq(0).hasClass('curr')){
			return;	
		}else{
			areaTabContainer.eq(1).addClass("curr").show();
			cityContainer.show();	
		}
	})
	
	
	
	CurrentAreaInfoInit();
	areaTabContainer.eq(0).find("a").click(function(){
		areaTabContainer.removeClass("curr");
		areaTabContainer.eq(0).addClass("curr").show();
		provinceContainer.show();
		cityContainer.hide();
		areaTabContainer.eq(1).hide();
	});
	areaTabContainer.eq(1).find("a").click(function(){
		areaTabContainer.removeClass("curr");
		areaTabContainer.eq(1).addClass("curr").show();
		provinceContainer.hide();
		cityContainer.show();
	});
	
	provinceContainer.find("a").click(function() {
		if(page_load){
			page_load = false;
		}
		$("#store-selector").unbind("mouseout");
		chooseProvince($(this).attr("data-value"));
	}).end();
	chooseProvince(currentAreaInfo.currentProvinceId);
})();

function getCookie(name) {
	var start = document.cookie.indexOf(name + "=");
	var len = start + name.length + 1;
	if ((!start) && (name != document.cookie.substring(0, name.length))) {
		return null;
	}
	if (start == -1) return null;
	var end = document.cookie.indexOf(';', len);
	if (end == -1) end = document.cookie.length;
	return unescape(document.cookie.substring(len, end));
};






// JavaScript Document

//二维码弹出框
function getContact(_id){
	var _obj = $('#'+_id);
	var _a = _obj.find('.contact a');
	var _d = _obj.find('.items');
	var _w = $(window).width()>1200?($(window).width()-1200)/2:0;
	var _t=null;
	$.each(_a,function(i,e){
		var _this = $(e);
		_this.hover(function(){
			clearTimeout(_t);
			_d.hide();
			_d.eq(i).show();	
			_d.eq(i).css('left',1025+(50*i));
		},function(){
			_t=setTimeout(function(){
				_d.eq(i).hide();		
			},300)
		})
	})	
	_d.hover(function(){
		clearTimeout(_t);
		$(this).show();	
	},function(){
		$(this).hide();		
	})
}

//input 提示框
function setInputFocus(_obj){
	$.each($(_obj),function(i,e){
		var _this = $(e);
		
		if(_this.val() == ''){
			_this.css('color','#afafaf').val(_this.attr('prompt'));
		}else{
			_this.css('color','#414141');
		}
		
		_this.focus(function(){
			_this.css('color','#414141');
			if(_this.val() == _this.attr('prompt')){
				_this.val('');
			}
		}).blur(function(){
			_this.css('color','#414141');
			if(_this.val() == '' || _this.val() == _this.attr('prompt')){
				_this.css('color','#afafaf').val(_this.attr('prompt'));
			}
		});
	})
}


/*下拉框效果 三级下拉效果*/
/*function setType(_id){
	var _obj = $('#'+_id);
	var _type = _obj.find('.a-type');
	var _box = _obj.find('.d-type');
	var _a = _box.find('li a');
	var area=[['11111','11112'],['22221','22222']];
	var city=[['33331','33332'],['44441','44442']];
	var pro;
	var cty;
	$.each(_type,function(i,e){
		var _this = $(e);
		var n = i;
		_this.click(function(){
			if(n==0){
				$(this).next('.d-type').show();
				var _a = $(this).next('.d-type').find('li a');
				$.each(_a,function(i,e){
					var _t = $(e);
					var m = i;
					_t.click(function(){
						$(this).attr('title',m);
						_this.css('color','#000').html(_t.html());	
						_this.attr('title',_t.html());
						_this.next('.d-type').hide();
						pro = m;
					})	
				})
			}else if(n==1){
				if(_type.eq(n-1).html()=='请选择省份'){
					alert('请选择省份');
					return;
				}else{
					var opt2='';
					for(var i=0,len=area[pro].length;i<len;i++){
						opt2=opt2 + '<li><a href="###" title="'+i+'">' + area[pro][i] + '</a></li>'
					}
					$(this).next('.d-type').find('ul').html(opt2);
					$(this).next('.d-type').show();
					var _a = $(this).next('.d-type').find('li a');
					$.each(_a,function(i,e){
						var _t = $(e);
						var h = i;
						_t.click(function(){
							$(this).attr('title',h);
							_this.css('color','#000').html(_t.html());	
							_this.attr('title',_t.html());
							_this.next('.d-type').hide();
							cty = h;
						})	
					})
				}	
			}else if(n==2){
				if(_type.eq(n-1).html()=='请选择市级'){
					alert('请选择市级');
					return;
				}else{
					var opt1='';
					for(var j=0,lem=city[cty].length;j<lem;j++){
						opt1=opt1 + '<li><a href="###" title="'+j+'">' + city[cty][j] + '</a></li>';
					}
					$(this).next('.d-type').find('ul').html(opt1);
					$(this).next('.d-type').show();
					var _a = $(this).next('.d-type').find('li a');
					$.each(_a,function(i,e){
						var _t = $(e);
						_t.click(function(){
							_this.css('color','#000').html(_t.html());	
							_this.attr('title',_t.html());
							_this.next('.d-type').hide();
						})	
					})	
				}
			}
		})	
	})
	
	if(_box.height() > 140)
	{
		_box.css({'height':'140','overflow-y':'auto'});
	}else{
		_box.css({'height':'auto','overflow-y':'hidden'});
	}
	
}*/


function setDown(_id){
	var _obj = $('#'+_id);	
	var _a = _obj.find('.a-type');
	var _type = _obj.find('.d-type');
	var _sA = _type.find('a');
	
	_a.click(function(){
		var _this = $(this);
		_type.hide();
		$(this).next('.d-type').show();		
		//var _sA = $(this).next('.d-type').find('a');
	})	
	
	$.each(_sA,function(i,e){
		var _dotA = $(e);	
		_dotA.click(function(){
			$(this).parents('.d-type').prev('.a-type').html($(this).html());
			alert(0);	
			return;
		})
	})

	$(document).click(function(){
		_type.hide();
	})
	_a.click(function(){
		return false
	})

}





/*验证码 校验*/
var InterValObj; //timer变量，控制时间
var count = 59; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function sendMessage() {
  　curCount = count;
　　//设置button效果，开始计时
     $("#get").attr("disabled", "true");
	 $("#get").css('background','grey');
     $("#get").val(curCount+"s重新获取");
     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
　　  //向后台发送处理数据
     $.ajax({
     　　type: "POST", //用POST方式传输
     　　dataType: "text", //数据格式:JSON
     　　url: 'Login.ashx', //目标地址
    　　 data: "dealType=" + dealType +"&uid=" + uid + "&code=" + code,
    　　 error: function (XMLHttpRequest, textStatus, errorThrown) { },
     　　success: function (msg){ }
     });
}

//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);//停止计时器
		$("#get").removeAttr("disabled");//启用按钮
		$("#get").css('background','#339900');
		$("#get").val("获取验证码");
	}
	else {
		curCount--;
		$("#get").val(curCount+"s重新获取");
	}
}

function getInput(_id){
	var _t = $('#'+_id);
	_inp = _t.find('.td-middle input');
	_inp.focus(function(){
		var _s = $(this).parent('td').next('td').find('span');
		_s.show();	
		
	}).blur(function(){
		var _s = $(this).parent('td').next('td').find('span');
		if(_s.hasClass('s-check')){
			_s.show();	
		}else{
			_s.hide();		
		}
		
	})
		
}

/*产品中心 图片放大动画*/
function MyGarden(_id){
	var _garden = $('#'+_id);
	var _item = _garden.find('.tabs-items .tabs-item');	
	var _a = _item.find('li a');
	$.each(_a,function(){
		_a.hover(function(i,e){
			$(this).animate({height:"418px",width:"907px",top:"-35px",left:"-53px"},"fast");
		},function(){
			$(this).animate({height:"348px",width:"801px",top:"0px",left:"0px"},"fast");	
		})	
	})
}

/*产品中心 遮罩弹出层*/
function getPopup(_id){
	var _p = $('#'+_id);
	var _a = _p.find('.city a');
	$.each(_a,function(i,e){
		var _this = $(e);
		_this.click(function(){
			_p.hide();		
		})	
	})	
}


/*tab 页面切换*/
function setTab(_id){
	var _obj = $('#'+_id);
	var _a = _obj.find('.meau a');
	var _list = _obj.find('.lists .list');
	_a.eq(0).addClass('act');
	_list.eq(0).show();
	
	$.each(_a,function(i,e){
		var _this = $(e);
		_this.hover(function(){
			_a.removeClass('act');
			$(this).addClass('act');
			_list.hide();
			_list.eq(i).show();		
		},function(){
			
		})	
	})
}

/*图片切换*/
function BigPic(id){
	var _obj = $('#' + id);
	var _big = _obj.find('.big-img');
	var _li = _obj.find('li');
	
	_big.find('img').attr('src',_li.eq(0).find('a img').attr('src'))
	$.each(_li,function(){
		$(this).click(function(){
			_big.find('img').attr('src',$(this).find('a img').attr('src'));
			_li.find('a').removeClass('act');
			$(this).find('a').addClass('act');
		})
	})
}

/*加减*/
function Settlement(_id){
	var _obj = $('#'+_id);
	var _reduct = _obj.find('.number-input .reduct');
	var _add = _obj.find('.number-input .add');
	var _inp = _obj.find('.inp-text');
	
	_add.click(function(){
		_inp.val(function(){
			return Number($(this).val())+1;
		})
	})
	_reduct.click(function(){
		if(_inp.val()!=1){
			_inp.val(function(){
				return Number($(this).val())-1;
			});
		}
	});	
}

/*年卡 半年卡 季卡 切换*/
function setYearCar(_id){
	var _obj = $('#'+_id);
	var _li = _obj.find('#HomeBanner li');
	var _item =_obj.find('.d-items .d-item');
	_li.eq(0).addClass('roundabout-in-focus');
	_item.eq(0).show();
	
	
	$.each(_li,function(i,e){
		var _this = $(e);
		var _n = i;
		_this.click(function(){
			_item.hide();
			_item.eq(_n).show();
			
		})	
	})
}

/*购物车*/
function tableDel(_id){
	var _table = $('#'+_id);
	var _order = _table.find('tr.order');
	var _sqr = _order.find('.td-info .t-sqr');
	var _all = _table.find('.a-check .c-all');
	var alldel = _table.find('.a-check .c-del')
	var flag = true;
	_all.click(function(){
		if($(this).hasClass('act')){
			_sqr.removeClass('act');
			$(this).removeClass('act');	
		}else{
			_sqr.addClass('act');
			_all.removeClass('midle');
			$(this).addClass('act');		
		}			
	})
	alldel.click(function(){
		$.each(_sqr,function(i,e){
			if(_sqr.eq(i).hasClass('act')){
				$(this).parents('tr.order').remove();
				_all.removeClass('act')
			}
		})
	})
	$.each(_order,function(i,e){
		var _this = $(e);
		var _qr = _this.find('.td-info .t-sqr');
		_qr.click(function(){
			var flag;
			if($(this).hasClass('act')){	
			    $(this).removeClass('act');
				if(_all.hasClass('act')){
					_all.removeClass('act');
					_all.addClass('midle');
				}
			}else{
				$(this).addClass('act');
			}
		})
	})
	
	
}
/*单选按钮*/
function selectRadio(_class){
	var _select=$('.'+_class);
	$.each(_select,function(i,e){
		$(this).click(function(){
			_select.removeClass('act');
			$(this).addClass('act');	
		})	
	})		
}

function selectCheckBox(_class){
	var _select=$('.'+_class);
	$.each(_select,function(i,e){
		$(this).click(function(){
			if($(this).hasClass('act')){
				$(this).removeClass('act');	
			}else{
				$(this).addClass('act');		
			}	
		})	
	})		
}

/* 收藏管理 删除*/
function setDel(_id){
	var _c = $('#collection');
	var _li = _c.find('li');
	var _del = _c.find('.li-del');
	var _t=null;
	var n=3;
	$.each(_li,function(i,e){
		var _this = $(e);
		_this.hover(function(){
			_this.find('.li-del').show();
			$(this).find('.li-del').click(function(){	
				var r=confirm("确定要删除？")
				if (r==true)
				{
					$(this).parent('li').remove();			
				}
				else
				{
					Console('You pressed Cancel!');
					
				}
				var _newLi = _c.find('li');
				_newLi.removeClass('last');
				$.each(_newLi,function(i,e){
					if(i%3==2){
						_newLi.eq(i).addClass('last');	
					}
				})	
			})	
			
		},function(){
			_this.find('.li-del').hide();	
		})
	})
}
/*tab 页面切换*/
function setTabClick(_id){
	var _obj = $('#'+_id);
	var _a = _obj.find('.tabs-menus a');
	var _list = _obj.find('.tabs-item .s-table');
	_a.eq(0).addClass('act');
	_list.eq(0).show();
	
	$.each(_a,function(i,e){
		var _this = $(e);
		_this.click(function(){
			_a.removeClass('act');
			$(this).addClass('act');
			_list.hide();
			_list.eq(i).show();		
		})	
	})
}

function autoHeight(){
	var _left = $('.c-left');
	var _right = $('.c-right');
	if(_left.height()>_right.height()){
		_right.height(_left.height());	
	}else{
		_left.height(_right.height());	
	}	
}

/*订单管理*/
function orderDel(_id){
	var _table = $('#'+_id);
	var _order = _table.find('li.order');
	var _sqr = _order.find('.t-head .t-sqr');
	var flag = true;
	
	$.each(_order,function(i,e){
		var _this = $(e);
		var _qr = _this.find('.t-head .t-sqr');
		var del = _this.find('.t-head .del');	
		_qr.click(function(){
			if($(this).hasClass('act')){	
			    $(this).removeClass('act');
			}else{
				$(this).addClass('act');
			}	
		})
		
		del.click(function(){
			if($(this).siblings('a').hasClass('act')){
				$(this).parents('li.order').remove();	
			}	
		})

	})
}



function HoverAddress(_id){
	var _obj = $('#'+_id);
	var _show = _obj.find('.show-add');
	var _li = _show.find('li:not(.add-add)');
	var _edit = _show.find('.d-edit');
	var num =1;
	 _show.find('li:not(.add-add)').hover(function(){
		var _li = _show.find('li:not(.add-add)');
		_li.removeClass('edit');
		$(this).addClass('edit');
		$(this).append(_edit);
		if($(this).hasClass('on')){
			$(this).find('.d-edit .a1').hide();
		}else{
			$(this).find('.d-edit .a1').show();	
		}
		if($(this).hasClass('act')){
			$(this).removeClass('act');
			$(this).addClass('index');
		}
		
		_edit.find('.a3').click(function(){
			var _this = $(this);
			var s=confirm("确定要删除？")
			if (s==true)
			{
				$(this).parents('li.edit').remove();
			}		
		})
	},function(){
		$(this).removeClass('edit');
		_edit.remove();
		if($(this).hasClass('index')){
			$(this).addClass('act');	
		}
		
	})
	_show.on('click','li:not(.add-add)',function(i,e){
		var _li = _show.find('li:not(.add-add)');
		if($(this).index() !=0){
			$(this).insertBefore(_li.eq(0));	
			_li.removeClass('on');
			$(this).addClass('on');
		}
		e.stopPropagation();
	})	
}

/*编辑地址*/
function editAddress(_id){
	var _obj = $('#'+_id);	
	var _show = _obj.find('.show-add');
	var _editA = _obj.find('.edit-address');
	var _ul = _show.find('#showUl')
	var _edit = _obj.find('.d-edit');
	var num;
	var flag=0;
	var s;
	var no = true;
    var obj = {}; 
	var tel = '';
	var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
    var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
	var _now;
	var msg = '';
	
	
	_ul.on('mouseenter','li:not(.add-add)',function(i,e){
		var _li = 	_show.find('li:not(.add-add)');
		_now = $(this).index();
		$(this).addClass('edit');
		$(this).append(_edit);
		if($(this).hasClass('on')){
			$(this).find('.d-edit .a1').hide();
		}else{
			$(this).find('.d-edit .a1').show();	
		}
		if($(this).hasClass('act')){
			$(this).removeClass('act');
			$(this).addClass('index');
		}
		
		var _a = _edit.find('a');
		
		$.each(_a,function(i,e){
			var _this = $(e);
			_this.click(function(){
				if(_this.hasClass('a1')){
					_li.removeClass('on');
					_this.parent('.d-edit').parent('li').addClass('on');
					_li.removeClass('act');
					_li.removeClass('index');
					_this.parent('.d-edit').parent('li').addClass('act');	
				}else if(_this.hasClass('a2')){
					if(num == 1){
						alert('请先保存好信息');	
					}else{
						_editA.show();
						num = 2;	
						$('#name').val(_li.eq(_now).find('.p-name').html());
						$('#pro').html(_li.eq(_now).find('.p-address .p1').html());
						$('#city').html(_li.eq(_now).find('.p-address .p2').html());
						$('#qu').html(_li.eq(_now).find('.p-address .p3').html());
						$('#stree').val(_li.eq(_now).find('.p-address .p4').html());
						var _mytel =$.trim(_li.eq(_now).find('.p-phone').html());
						if (_mytel.substring(0, 1) == 1) {  
							if (isMobile.exec(_mytel) && _mytel.length == 11) {  
								$('#tel').val(_mytel);
							}
						}else if(_mytel.substring(0, 1) == 0){  
							if (isPhone.test(_mytel)) {  
								$('#phone').val(_mytel);
							}
						}
					}		
				}else if(_this.hasClass('a3')){
					_this.parent('.d-edit').parent('li.edit').remove();
					setNewLi();
				}	
			})	
		})
	})
	_ul.on('mouseleave','li:not(.add-add)',function(i,e){
		var _li = 	_show.find('li:not(.add-add)');
		$(this).removeClass('edit');
		if($(this).hasClass('index')){
			$(this).addClass('act');	
		}
	})
	
	/*添加按钮*/
	$('#addLi').click(function(){
		if(num == 2){
			alert('请先保存好信息！');	
		}else{
			_editA.show();	
			_editA.find('input').val(' ');
			num=1;	
		}
	})
	
	
	/*保存按钮*/
	
	$('#save').click(function(){
		/*num == 1 则证明是从add按钮点击进来的 如果num==2 则证明是从edit按钮点击进来的*/
		if(num == 1){
			setInputVal();
			setInformation();
			if(msg == 'error'){
				return;	
			}else{
				if(flag == 0){
					var address = obj.pro+obj.city+obj.qu+obj.stree;
					var str = "<li class='on'><p class='p-name'>"+obj.name+"</p><p class='p-address'><span class='p1'>"+obj.pro+"</span><span class='p2'>"+obj.city+"</span><span class='p3'>"+obj.qu+"</span><span class='p4'>"+obj.stree+"</span></p><p class='p-phone'>"+tel+"</p></li>";
					$(str).insertBefore(_show.find('ul li:first'));	
					setNewLi();
					_editA.hide();	
					_editA.find('input').val(' ');	
					num=0;	
				}else{
					alert('带星号的都是必填的！！');
				}
			}
		}else if(num == 2){
			setInputVal();
			setInformation()
			if(msg == 'error'){
				return;	
			}else{
				if(flag == 0){
					var _Nli = 	_show.find('li:not(.add-add)');
					_Nli.eq(_now).find('.p-name').html(obj.name);
					_Nli.eq(_now).find('.p-address .p1').html(obj.pro);
					_Nli.eq(_now).find('.p-address .p2').html(obj.city);
					_Nli.eq(_now).find('.p-address .p3').html(obj.qu);
					_Nli.eq(_now).find('.p-address .p4').html(obj.stree);
					_Nli.eq(_now).find('.p-phone').html(tel);	
					_editA.hide();	
					_editA.find('input').val(' ');	
					num=0;	
				}else{
					alert('带星号的都是必填的！！');	
				}
			}
			
		}	
	})
	
	/*判断添加的信息 电话信息填写正确否*/
	 function setInformation(){
		 var _w = _editA.find('.w');
		 for(var i=0;i<_w.length;i++){ 
			var attrVal
			if($(_w[i]).is('input')){
				attrVal = $(_w[i]).val(); 	
			}else{
				attrVal = $(_w[i]).html(); 	
			}
			  $(obj).attr(_w[i].id,attrVal); 
		  } 
		var mobile = '';
		if($('#tel').val() != ' '||$('#tel').val().length==0){
			tel = obj.tel;
			mobile = $.trim(tel); 
			 if (mobile.substring(0, 1) == 1) {  
				if (isMobile.exec(mobile) && mobile.length == 11) {  
					 tel = mobile;
				}else{
					alert("移动电话填写不正确");
					msg=error;
					return msg;
				} 
			} else{
				alert("移动电话填写不正确");
				return msg;
			}
		}else{
			tel = obj.phone;	
			mobile = $.trim(tel); 
			if (mobile.substring(0, 1) == 0) {  
				if (isPhone.test(mobile)) {  
					tel = mobile;
				}else{
					alert("固定电话填写不正确");	
					msg=error;
					return msg;
				}  
			}else{
				alert("固定电话填写不正确");
				return msg;	
			}  
		}	
		
	 }
	
	/*判断*是否都填写了*/
	function setInputVal(){
		flag=0;
		$.each(_editA.find('input'),function(i,e){
			var _this = $(e);
			if($(this).val()== ' ' || $(this).val().length == 0){
				flag++;
			}
		})	
		if(flag == 1){
			if($('#tel').val() != ' ' || $('#tel').val().length != 0 || $('#phone').val() != ' ' || $('#phone').val().length != 0){
				flag=0;	
			}	
		}
	}
	
	/*从新计算li的个数 添加last*/
	function setNewLi(){
		var _newLi = _show.find('li');
		_newLi.removeClass('last');
		$.each(_newLi,function(i,e){
			if(i%3==2){
				_newLi.eq(i).addClass('last');	
			}	
		})
		_newLi.removeClass('on');
		_newLi.eq(0).addClass('on');	
	}
	
}

/*广告图片*/
function setAdImg(_id){
	var _obj = $('#'+_id);
	var _w = $(window).width();
	var _img = _obj.find('img')
	var _iw = _img.width();
	if(_w <= 1200){
		_img.css('margin-left',-(_iw-1200)/2);	
	}else{
		_img.css('margin-left',-(_iw-_w)/2);		
	}
}





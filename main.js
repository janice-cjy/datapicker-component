(function() {
	var date = window.datePicker.getDate();
	var $wrapper;
	var $input;
	var year = date.year;
	var month = date.month;

	//数字格式
	function format(value) {
		if (value < 10) {
			return '0'+value;
		}else{
			return value;
		}
	}

	//获取数据html格式
	datePicker.getDateHtml = function(){
		var html = '';
		html += '<div class="j-datepicker-header">'+
		'<a href="#" class="j-datepicker-btn j-datepicker-pre-btn">&lt</a>'+
		'<a href="#" class="j-datepicker-btn j-datepicker-next-btn">&gt</a>'+
		'<span>'+ year + '-' + format(month) + '</span>'+
	'</div>'+
	'<div class="j-datepicker-body">'+
		'<table>'+
			'<thead>'+
				'<tr>'+
					'<td>一</td>'+
					'<td>二</td>'+
					'<td>三</td>'+
					'<td>四</td>'+
					'<td>五</td>'+
					'<td>六</td>'+
					'<td>七</td>'+
				'</tr>'+
			'</thead>'+
			'<tbody>';
		for(var i = 0;i<6*7;i++){
			if (i%7==0) {
				html+='<tr>';
			}
			if (date.date[i].markData==-1) {
				html+='<td class="j-date j-pre-date" data-date="' +date.date[i].year+'-'+date.date[i].month+'-'+date.date[i].date + '">'+date.date[i].date;+'</td>';
			}
			if(date.date[i].markData==1) {
				html+='<td class="j-date j-next-date" data-date="' +date.date[i].year+'-'+date.date[i].month+'-'+date.date[i].date + '">'+date.date[i].date;+'</td>';
			}
			if (date.date[i].markData==0) {
				html+='<td class="j-date j-now-date" data-date="' +date.date[i].year+'-'+date.date[i].month+'-'+date.date[i].date + '">'+date.date[i].date;+'</td>';
			}
			
			if (i%7==6) {
				html+='</tr>';
			}
		}

			html += '</tbody>'+
		'</table>'+
	'</div>'
	return html;
	}

	//数据渲染
	datePicker.render = function() {
		$wrapper = document.createElement('div');
		$wrapper.className='j-datepicker-wrapper';
		$wrapper.innerHTML = datePicker.getDateHtml();
		document.body.appendChild($wrapper);

		//选择日期
		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			if($target.tagName.toLowerCase() == 'td'&&$target.classList.contains('j-date')) {
				var dateArr = $target.dataset.date.split('-');
				dateArr[1] = format(dateArr[1]);
				dateArr[2] = format(dateArr[2]);
				$input.value = dateArr.join('-');
				$wrapper.classList.remove('j-datepicker-wrapper-show');
			}
		},false)

		//改变月份
		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			if ($target.classList.contains('j-datepicker-pre-btn')) {
				month = month - 1;
				if (month==0) {
					month = 12;
					year =  year - 1;
				}
				date = datePicker.getDate(year,month);
				$wrapper.innerHTML = datePicker.getDateHtml();
				console.log(date)
			}
			if ($target.classList.contains('j-datepicker-next-btn')) {
				month = month + 1;
				if (month == 13) {
					month = 1;
					year =year + 1;
				}
				date = datePicker.getDate(year,month);
				$wrapper.innerHTML = datePicker.getDateHtml();
				console.log(date)
			}
		},false)
	}

	//datePicker样式定义
	datePicker.styleInit = function(){
		var left = $input.offsetLeft;
		var top = $input.offsetTop;
		var height = $input.offsetHeight;
		$wrapper.style.left = left+'px';
		$wrapper.style.top = (top + height + 2) + 'px';
	}

	//数据初始化
	datePicker.init=function(input) {
		$input = document.querySelector('input');
		var isShow = false;
		$input.addEventListener('click',function(){
			if (!isShow) {
				datePicker.render();
				datePicker.styleInit();
				$wrapper.classList.add('j-datepicker-wrapper-show');
				isShow = true;
			}else{
				$wrapper.classList.remove('j-datepicker-wrapper-show');
				isShow = false;
			}
			
		},false)		
	}
})()
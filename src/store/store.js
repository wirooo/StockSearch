import Vue from "vue";
import Vuex from "vuex";
import { _ } from "core-js";

Vue.use(Vuex);

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Stock_Data";

// returns a string formatted YYYY-MM-DD given a unix time
function unixToDate(unixTime) {
	var val = new Date(unixTime * 1000);
	var date = val.getDate() < 10 ? "0" + val.getDate() : val.getDate();
	var month =
		val.getMonth() + 1 < 10 ? "0" + (val.getMonth() + 1) : val.getMonth() + 1;
	var year = val.getFullYear();
	return `${year}-${month}-${date}`;
}

// fetches data from finance api about symbol, stores return in Dynamo, and adds to state.cachedStocks
function searchStockData(stock_symbol) {
	fetch(
		`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${stock_symbol}/1d`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
				"x-rapidapi-key": "13936ca5a0msh65b40ef4d9fca4dp1ab4d1jsn8ecfe1e5214b",
			},
		}
	)
		.then(response => {
			response.json().then(data => {
				if ("error" in data && data.error) {
					alert("Please enter a valid symbol");
					console.log(data);
					console.log(data.error);
					console.log(!data.error);
					return;
				}
				fetch(
					`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock_symbol}`,
					{
						method: "GET",
						headers: {
							"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
							"x-rapidapi-key":
								"13936ca5a0msh65b40ef4d9fca4dp1ab4d1jsn8ecfe1e5214b",
						},
					}
				)
					.then(quote_response => {
						quote_response.json().then(quote_data => {
							var params = {
								TableName: table,
								Item: {
									symbol: stock_symbol,
									market: data.meta.exchangeName,
									history: data.items,
									quote_data: quote_data[0],
								},
							};
							docClient.put(params, function(err, data) {
								if (err) {
									console.error(
										"Unable to add item. Error JSON:",
										JSON.stringify(err, null, 2)
									);
								} else {
									console.log("Added item:", JSON.stringify(data, null, 2));
								}
							});
							store.commit("addStock", {
								symbol: stock_symbol,
								market: data.meta.exchangeName,
								history: data.items,
								quote_data: quote_data[0],
							});
						});
					})
					.catch(err => {
						console.log(err);
					});
			});
		})
		.catch(err => {
			console.log(err);
		});
}

// adds stock data for symbol to state.cachedStocks, using data from AWS if previously queried, otherwise calls searchStockData()
async function fetchStockData(stock_symbol) {
	var checkParams = {
		TableName: table,
		Key: {
			symbol: stock_symbol,
		},
	};
	docClient.get(checkParams, function(err, data) {
		if (err) {
			console.error("Error connecting to DynamoDB: ", JSON.stringify(err));
		} else {
			if (Object.keys(data).length === 0) {
				console.log(`${stock_symbol} not in DynamoDB`);
				searchStockData(stock_symbol);
			} else {
				console.log(`${stock_symbol} exists in DynamoDB`);
				store.commit("addStock", data.Item);
			}
		}
	});
}

export const store = new Vuex.Store({
	state: {
		cachedStocks: {},
		focusStock: "",
	},
	getters: {
		getFocusStockHistory: state => {
			if (Object.keys(state.cachedStocks).length === 0) {
				return {};
			}
			var focusStockData = state.cachedStocks[state.focusStock];
			var focusStockHistory = Object.keys(focusStockData.history).map(key => {
				return {
					label: unixToDate(focusStockData.history[key].date),
					value: focusStockData.history[key].close,
				};
			});
			focusStockHistory.sort((a, b) => {
				var asplit = a.label.toString().split("-");
				var bsplit = b.label.toString().split("-");
				if (asplit[0] < bsplit[0]) {
					return -1;
				} else if (asplit[0] > bsplit[0]) {
					return 1;
				} else {
					if (asplit[1] < bsplit[1]) {
						return -1;
					} else if (asplit[1] > bsplit[1]) {
						return 1;
					} else {
						if (asplit[2] < bsplit[2]) {
							return -1;
						} else if (asplit[2] > bsplit[2]) {
							return 1;
						} else {
							return 0;
						}
					}
				}
			});
			return focusStockHistory;
		},
		getFocusStockQuote: state => {
			if (Object.keys(state.cachedStocks).length === 0) {
				return {};
			}
			return state.cachedStocks[state.focusStock].quote_data;
		},
	},
	mutations: {
		addStock: (state, payload) => {
			Vue.set(state.cachedStocks, payload.symbol, payload);
			state.focusStock = payload.symbol;
		},
	},
	actions: {
		searchStock: (context, payload) => {
			console.log("searching stock price for: ", payload);
			fetchStockData(payload);
		},
	},
});

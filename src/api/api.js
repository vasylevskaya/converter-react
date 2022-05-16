const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'api.currencyapi.com',
		'X-RapidAPI-Key': 'OGBPB3h7p8tCuDR6B41Gb4FL6A4FdPQbHYSnIPfV'
	}
}
	

export const getLatestCurrencyValues = async (currencies = [], base_currency) => {
  const urlToFetch = `https://${options.headers['X-RapidAPI-Host']}/v3/latest?apikey=${options.headers['X-RapidAPI-Key']}&currencies=${currencies.join('%2C')}&base_currency=${base_currency}`
  let mainResult = {}

  try {
    const { data } = await fetch(urlToFetch, options)
      .then((resolve => resolve.json()))
    currencies.forEach((currency) => mainResult[currency] = (data[currency].value * 1000).toFixed(2))
  } catch (error) {
    console.error(error)
  }

  return mainResult
}

export const exchangeCurrency = async (fromCurrency, toCurrency, amount) => {
  let mainResult

  try {
    const data = await getLatestCurrencyValues([fromCurrency], toCurrency)
    mainResult = data[fromCurrency] * amount
  } catch (error) {
    console.error(error)
  }

  return mainResult
}

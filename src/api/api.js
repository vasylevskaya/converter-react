const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com',
		'X-RapidAPI-Key': '0c1421cf59mshee07ab6e9ce7f06p1c08b9jsnb355d42ebd42'
	}
}
	

export const getLatestCurrencyValues = async (base, symbols) => {
  const urlToFetch = `https://${options.headers['X-RapidAPI-Host']}/latest?base=${base}&symbols=${symbols.join('%2C')}`
  let mainResult

  try {
    mainResult = await fetch(urlToFetch, options)
      .then(resolve => resolve.json())
  } catch (error) {
    console.error(error)
  }

  return mainResult?.rates?.UAH?.toFixed(2)
}

export const exchangeCurrency = async (fromCurrency, toCurrency, amount) => {
  const urlToFetch = `https://${options.headers['X-RapidAPI-Host']}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
  let mainResult

  try {
    mainResult = await fetch(urlToFetch, options)
      .then(resolve => resolve.json())
  } catch (error) {
    console.error(error)
  }

  return mainResult?.result?.toFixed(2)
}

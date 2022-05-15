import React, { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce';
import 'bulma/css/bulma.min.css';

import Select from './Select';
import Loader from './Loader';

import { exchangeCurrency } from '../api/api'

const Converter = () => {
  const [valuesFromForm, setValuesFromForm] = useState({
    fromAmount: 0,
    fromCurrency: '-',
    toAmount: 0,
    toCurrency: '-'
  })
  const [errorToDisplay, setErrorToDisplay] = useState('')
  const [validationTrigger, setValidationTrigger] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    fromAmount, fromCurrency, toAmount, toCurrency,
  } = valuesFromForm

  const validate = useCallback(
    debounce(
      () => {
        const atLeastOneAmountIsTouched = (fromAmount !== 0) || (toAmount !== 0)
        const allCurrenciesAreTouched = (fromCurrency !== '-') && (toCurrency !== '-')
        const allAmountsAreValid = (fromAmount > 0) || (toAmount > 0)
        const allCurrenciesAreValid = (fromCurrency !== toCurrency)

        if (atLeastOneAmountIsTouched && allCurrenciesAreTouched) {
          if (!allCurrenciesAreValid) {
            setErrorToDisplay('Please, choose different currencies')
          } else if (!allAmountsAreValid) {
            setErrorToDisplay('Amount of currency to convert must be more than 0')
          } else if (allAmountsAreValid && allCurrenciesAreValid) {
            setIsLoading(true)
            setErrorToDisplay('')
            const amountForRequest = fromAmount > 0 ? fromAmount : toAmount
            const fromCurrencyForRequest = fromAmount > 0 ? fromCurrency : toCurrency
            const toCurrencyForRequest = fromAmount > 0 ? toCurrency : fromCurrency
            exchangeCurrency(fromCurrencyForRequest, toCurrencyForRequest, amountForRequest)
              .then(resolve => (
                setValuesFromForm((prevValuesFromForm) => ({
                  ...prevValuesFromForm,
                  [fromAmount > 0 ? 'toAmount' : 'fromAmount']: resolve,
                }))
              ))
              .catch(error => console.error(error))
              setTimeout(() => setIsLoading(false), 800)
          }
        }
      }, 1000,
    ),
    [valuesFromForm]
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setValuesFromForm((prevValuesFromForm) => ({
      ...prevValuesFromForm,
      fromAmount: name === 'toAmount' ? 0 : prevValuesFromForm.fromAmount,
      toAmount: name === 'fromAmount' ? 0 : prevValuesFromForm.toAmount,
      [name]: value,
    }))
    setValidationTrigger(!validationTrigger)
  }

  const handleSwitchButton = () => {
    setValuesFromForm((prevValuesFromForm) => ({
      fromAmount: prevValuesFromForm.toAmount,
      fromCurrency: prevValuesFromForm.toCurrency,
      toAmount: prevValuesFromForm.fromAmount,
      toCurrency: prevValuesFromForm.fromCurrency,
    }))
  }

  useEffect(() => validate(), [validationTrigger])

  return (
    <div className="converter">
      <form className="converter_form">
        <div className="inputs_container">
          <div className="inputs_container_column">
            <label className="label">From</label>
            <Select
              value={valuesFromForm.fromCurrency}
              name="fromCurrency"
              label="From"
              handleInputChange={handleInputChange}
            />
            <input
              type="number"
              name="fromAmount"
              className="input"
              placeholder="0.00"
              value={valuesFromForm.fromAmount}
              onChange={handleInputChange}
            />
          </div>
          {
            isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  className="button button_switch is-rounded"
                  onClick={handleSwitchButton}
                />
              )
          }
          <div className="inputs_container_column">
            <label className="label">To</label>
            <Select
              value={valuesFromForm.toCurrency}
              name="toCurrency"
              handleInputChange={handleInputChange}
            />
            <input
              type="number"
              name="toAmount"
              className="input"
              placeholder="0.00"
              value={valuesFromForm.toAmount}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <p className="error-message">{errorToDisplay}</p>
      </form>
    </div>
  )
}

export default Converter

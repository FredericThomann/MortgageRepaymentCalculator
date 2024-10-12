// ---------------------- FORMAT AMOUNT MORTGAGE

function formatAmount() {
  const amount = document.getElementById('mortgageAmount');
  const unformatedAmount = amount.value.toString().replace(/[,]/g, '');
  if(isNaN(+unformatedAmount) || +unformatedAmount <= 0) {
    amount.value = '';
  }
  else {
    amount.value = new Intl.NumberFormat('en-US').format(+unformatedAmount);
  }
}

// ---------------------- CALCULATE MORTGAGE & SHOW RESULT SECTION

document.querySelector('#calculateBtn').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.errorField').forEach(errorField => {
    errorField.style.display = 'none';
  });
  document.querySelectorAll('.inputBox').forEach(inputBox => {
    inputBox.classList.remove('error');
  });
  let errors = [];
  const amount = document.getElementById('mortgageAmount').value.trim().toString().replace(/[,]/g, '');
  const years = document.getElementById('mortgageTerm').value.trim();
  const rate = document.getElementById('interestRate').value.trim();
  const repayment = (document.querySelector('input[name="mortgageType"]:checked') !== null) ? document.querySelector('input[name="mortgageType"]:checked').value : 'null';
  if(amount === '' || amount <= 0) {
    errors.push('mortgageAmount');
  }
  if(years === '' || years <= 0) {
    errors.push('mortgageTerm');
  }
  if(rate === '' || rate <= 0) {
    errors.push('interestRate');
  }
  if(repayment === 'null') {
    errors.push('mortgageType');
  }
  if(errors.length < 1) {
    let monthAmount = (amount * ((rate / 100) / 12)) / (1 - Math.pow((1 + ((rate / 100) / 12)), (-12 * years)));
    let totalAmount = monthAmount * 12 * years;
    let totalInterest = totalAmount - amount;
    let averageMonthAmount = totalInterest / (years * 12);
    if(+repayment === 1) {
      document.getElementById('monthAmount').innerHTML = '&pound;' + new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(+monthAmount);
      document.getElementById('totalAmount').innerHTML = '&pound;' + new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(+totalAmount);
    }
    else if(+repayment === 2) {
      document.getElementById('monthAmount').innerHTML = '&pound;' + new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(+averageMonthAmount);
      document.getElementById('totalAmount').innerHTML = '&pound;' + new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(+totalInterest);
    }
    document.getElementById('emptyResultBox').style.display = 'none';
    document.getElementById('fullResultBox').style.display = 'block';
  }
  else {
    errors.forEach(error => {
      document.querySelector('.' + error + ' .errorField').style.display = 'block';
      if(error !== 'mortgageType') {
        document.querySelector('.' + error + ' .inputBox').classList.add('error');
      }
    });
  }
});

// ---------------------- HIDE RESULT SECTION

document.querySelector('#clearBtn').addEventListener('click', () => {
  document.querySelectorAll('.errorField').forEach(errorField => {
    errorField.style.display = 'none';
  });
  document.querySelectorAll('.inputBox').forEach(inputBox => {
    inputBox.classList.remove('error');
  });
  document.getElementById('emptyResultBox').style.display = 'flex';
  document.getElementById('fullResultBox').style.display = 'none';
});

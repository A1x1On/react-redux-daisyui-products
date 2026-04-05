export const formatBoolean = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined || value === '') {
    return false
  }

  if (typeof value === 'number') {
    return value >= 1
  }

  if (typeof value === 'string') {
    return value.trim().toLowerCase() === 'true'
  }

  return false
}

export const showToast = (
  classes: string = 'alert-info',
  data: string | ErrorEvent | { data: { message: string } } = 'done',
  id: string = 'toast-container'
) => {
  console.log('datadatadatadata', data)
  const container = document.getElementById(id)
  const toast = document.createElement('div')
  toast.className = `alert ${classes}`

  if (classes.includes('alert-error')) {
    let message = 'Something went wrong'

    if (typeof data === 'string') {
      message = data
    } else if (data instanceof ErrorEvent) {
      message = data.message || data.error?.message || message
    } else if (data?.data?.message) {
      message = data.data.message
    }

    toast.innerHTML = `<span>${message}</span>`
  } else {
    toast.innerHTML = `<span>${data}</span>`
  }

  container?.appendChild(toast)

  setTimeout(() => {
    toast.classList.remove('translate-x-full', 'opacity-0')
    toast.classList.add('translate-x-0', 'opacity-100')
  }, 10)

  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove('translate-x-0', 'opacity-100')
      toast.classList.add('translate-x-full', 'opacity-0')
      setTimeout(() => toast.remove(), 300)
    }
  }, 5000)
}

export const formatMoney = (
  amount: number,
  currency: string = 'RUB',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
) => {
  return new Intl.NumberFormat('de-DE', { currency, minimumFractionDigits, maximumFractionDigits }).format(amount)
}

export const formatMoneyByParts = (data: number) => {
  const money = formatMoney(data).toString().split(/[.,]/)

  if (money[2] === undefined) {
    money[2] = money[1]
    money[1] = ''
  }

  return {
    whole: money[0],
    fractional: money[1],
    cents: money[2],
  }
}

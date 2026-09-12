interface Styles {
  [key: string]: {
    labelClass: string
    inputClass: string
    prependClass: string
    appendClass: string
    buttonGroupClass: string
    wrapperClass: string
    wrapperGroupClass: string
  }
}

const styles: Styles = {
  tailwind: {
    labelClass: 'block text-sm font-medium text-gray-700',
    inputClass: 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
    prependClass: 'rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-lg font-bold text-gray-700 hover:bg-gray-200',
    appendClass: 'rounded-r-md border border-l-0 border-gray-300 bg-gray-100 px-3 text-lg font-bold text-gray-700 hover:bg-gray-200',
    buttonGroupClass: 'flex flex-col',
    wrapperClass: '',
    wrapperGroupClass: 'flex items-stretch'
  },
  bootstrap: {
    labelClass: 'form-label',
    inputClass: 'form-control',
    prependClass: 'btn btn-outline-secondary fw-bold',
    appendClass: 'btn btn-outline-success fw-bold',
    buttonGroupClass: 'd-flex flex-column',
    wrapperClass: '',
    wrapperGroupClass: 'input-group'
  }
}

export default styles

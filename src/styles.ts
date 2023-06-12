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

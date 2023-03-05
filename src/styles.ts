interface Styles {
  [bootstrap: string]: {
    labelClass: string;
    inputClass: string;
    prependClass: string;
    appendClass: string;
    wrapperClass: string;
    wrapperGroupClass: string;
  };
}

const styles: Styles = {
  bootstrap: {
    labelClass: 'form-label',
    inputClass: 'form-control',
    prependClass: 'btn btn-outline-secondary fw-bold',
    appendClass: 'btn btn-outline-success fw-bold',
    wrapperClass: '',
    wrapperGroupClass: 'input-group',
  },
}

export default styles;

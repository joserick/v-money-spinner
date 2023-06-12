import defaults from './options'

export default {
  modelValue: {
    type: [Number, String],
    default: () => defaults.modelValue
  },
  template: {
    type: [Boolean, String],
    default: () => defaults.template
  },
  spinner: {
    type: Boolean,
    default: () => defaults.spinner
  },
  spinnerAlign: {
    type: String,
    default: () => defaults.spinnerAlign
  },
  step: {
    type: Number,
    default: () => defaults.step
  },
  align: {
    type: String,
    default: () => defaults.align
  },
  label: {
    type: String,
    default: () => defaults.label
  },
  labelClass: {
    type: String,
    default: () => defaults.labelClass
  },
  wrapperClass: {
    type: String,
    default: () => defaults.wrapperClass
  },
  wrapperGroupClass: {
    type: String,
    default: () => defaults.wrapperGroupClass
  },
  prependClass: {
    type: String,
    default: () => defaults.prependClass
  },
  appendClass: {
    type: String,
    default: () => defaults.appendClass
  },
  inputClass: {
    type: String,
    default: () => defaults.inputClass
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  }
}

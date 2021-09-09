import defaults from './options'

export default {
  id: {
    required: false,
    type: [Number, String],
    default: () => defaults.id
  },
  template: {
    type: [Boolean, String],
    default: () => defaults.template
  },
  spinner: {
    type: Boolean,
    default: () => defaults.spinner
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
  wrapperPrependClass: {
    type: String,
    default: () => defaults.wrapperPrependClass
  },
  wrapperAppendClass: {
    type: String,
    default: () => defaults.wrapperAppendClass
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
  invalidClass: {
    type: String,
    default: () => defaults.invalidClass
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
}

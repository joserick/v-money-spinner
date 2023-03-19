import defaults from './options'

export default {
  id: {
    type: [Number, String],
    default: () => defaults.id
  },
  modelValue: {
    required: true,
    type: [Number, String]
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

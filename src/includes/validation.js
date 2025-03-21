import { Form as VeeForm, Field as VeeField, ErrorMessage, defineRule } from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphSpaces,
  email,
  numeric,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alphSpaces', alphSpaces)
    defineRule('email', email)
    defineRule('numeric', numeric)
    defineRule('minValue', minValue)
    defineRule('maxValue', maxValue)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)
  },
}

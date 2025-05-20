import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate'
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
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alphSpaces', alphSpaces)
    defineRule('email', email)
    defineRule('numeric', numeric)
    defineRule('minValue', minValue)
    defineRule('maxValue', maxValue)
    defineRule('confirmed', confirmed)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `This field ${ctx.field} is required`,
          min: `This field ${ctx.field} is too short`,
          max: `This field ${ctx.field} is too long`,
          alphSpaces: `This field ${ctx.field} must contain only letters and spaces`,
          email: `This field ${ctx.field} must be a valid email`,
          numeric: `This field ${ctx.field} must be a number`,
          minValue: `This field ${ctx.field} must be at least ${ctx.rule.params[0]}`,
          maxValue: `This field ${ctx.field} must be at most ${ctx.rule.params[0]}`,
          confirmed: `This field ${ctx.field} must match {target}`,
          excluded: `This field ${ctx.field} is not allowed`,
          passwords_mismatch: `The passwords don't match`,
          country_excluded: `Due to restrictions, we do not accept users from this locations`,
          tos: `You must accept the term of service`,
        }
        return messages[ctx.rule.name] || `This field ${ctx.field} is invalid`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}

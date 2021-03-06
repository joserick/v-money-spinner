# Welcome to V-Money-Spinner
V-Money-Spinner is a component which can preset a input spinner with mask currency and style bootstrap, this latter can be disabled.
![enter image description here](https://joserick.com/v_money_spinner/v_money_spinner.gif)

## [Demo](https://joserick.com/v_money_spinner/)

Enjoy :smile:

Don't forget to support us with a star: [![Star on GitHub](https://img.shields.io/github/stars/joserick/v-money-spinner?style=social)](https://github.com/joserick/v-money-spinner/stargazers)

## Installation
```
npm i v-money-spinner
```
```js
import MoneySpinner from 'v-money-spinner'
Vue.use(MoneySpinner)
```

## Use
```html
<template>
  <div>
    <v-money-spinner v-model="amount" v-bind="config"></v-money-spinner>
    {{ amount }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        amount: 123.45,
        config: {
          spinner: true,
          step: 10,
          min: -10,
          max: 200,
          prefix: "$ ",
          suffix: " MXN",
          precision: 2,
          decimal: '.',
          thousands: ',',
          bootstrap: true,
          amend: false,
          masked: true,
          invalidMessage: 'Min is -10 and Max is 200'
        }
      }
    }
  }
</script>
```

## Properties
| Property       | Type    | Default                 | Description                                                 |
|----------------|---------|-------------------------|---------------------------------------------------------    |
| spinner        | Boolean | true                    | Apply spinner buttons to the input                          |
| step           | Number  | 1                       | Number of steps                                             |
| precision      | Number  | 2                       | How many decimal places                                     |
| decimal        | String  | "."                     | Decimal separator                                           |
| thousands      | String  | ","                     | Thousands separator                                         |
| prefix         | String  | ""                      | Currency symbol followed by a Space, like "R$ "             |
| suffix         | String  | ""                      | Percentage for example: " %"                                |
| min            | Number  | Number.MIN_SAFE_INTEGER | The min value allowed                                       |
| max            | Number  | Number.MAX_SAFE_INTEGER | The max value allowed                                       |
| invalidMessage | String  | ""                      | Message if exceeding min or max value allowed               |
| amend          | Boolean | false                   | In case of exceeding min or max, overwrite it when deselect |
| bootstrap      | Boolean | true                    | Apply Bootstrap styles                                      |
| masked         | Boolean | false                   | If the component output should include the mask or not      |
| allowBlank     | Boolean | false                   | If the field can start blank and be cleared out by user     |
| label          | String  | ""                      | Text for label tag                                          |
| align          | String  | "center"                | Change by "left" or "right" to align the text in the input  |
| id             | String  | "v-money-spinner"       | Input id                                         |

## Events
| Event          | Parameters                         | Description                                                |
|----------------|------------------------------------|------------------------------------------------------------|
| change         | unformatted, formatted, old_amount | Fires when the input value change                          |
| plus           | unformatted, formatted             | Fires when user click on the plus button                   |
| minus          | unformatted, formatted             | Fires when user click on the minus button                  |
| positive       | unformatted, formatted, old_amount | Fires when the amount change to positive                   |
| negative       | unformatted, formatted, old_amount | Fires when the amount change to negative                   |
| exceeded       | unformatted, formatted, min, max   | Fires when the amount exceeded the min or max              |

## Classes (style css)
| Classes             | Description                                                                                |
|---------------------|--------------------------------------------------------------------------------------------|
| labelClass          | Class for the label tag                                                                    |
| inputClass          | Class for the input tag                                                                    |
| prependClass        | Class for the left button tag                                                              |
| appendClass         | Class for the right button tag                                                             |
| wrapperClass        | Class for div contains all money-spinner                                                   |
| wrapperGroupClass   | Class for div contains input and the buttons                                               |
| wrapperPrependClass | Class for div contains left button tag                                                     |
| wrapperAppendClass  | Class for div contains right button tag                                                    |

# Multiple amount formats

![multiple amount formats](https://joserick.com/v_money_spinner/v_money_spinner_amounts.gif)

## Use differents maskout
```html
<v-money-spinner-amount
  format="de-DE"
  prefix="€ "
  suffix=" EUR"
  class="badge badge-dark"> // Ej. Style-Bootstrap badges
</v-money-spinner-amount>
```
## Properties
| Property       | Type    | Default                 | Description                                                 |
|----------------|---------|-------------------------|---------------------------------------------------------    |
| money_id       | String  | "v-money-spinner"       | Id of the input where you will get the amount               |
| format         | String  | "en-US"                 | A format of 'locales' of the Intl.NumberFormat              |
| precision      | Number  | 2                       | How many decimal places                                     |
| prefix         | String  | ""                      | Currency symbol followed by a Space, like "R$ "             |
| suffix         | String  | ""                      | Percentage for example: " %"                                |
| class          | String  | ""                      | Class for the 'span' tag                                    |

## References

 - https://github.com/JoaoPedroAS51/v-money

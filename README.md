# Welcome to V-Money-Spinner
[![Npm package total downloads](https://badgen.net/npm/dt/v-money-spinner)](https://npmjs.ccom/package/express) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/joserick/v-money-spinner/blob/master/LICENSE) [![GitHub release](https://img.shields.io/github/release/joserick/v-money-spinner.svg)](https://gitHub.com/joserick/v-money-spinner/releases/) [![Star on GitHub](https://img.shields.io/github/stars/joserick/v-money-spinner?style=social)](https://github.com/joserick/v-money-spinner/stargazers)

**V-Money-Spinner** for **Vue3** is a component which can preset a input spinner with mask currency and style bootstrap, this latter can be disabled.

> Notice: [Migration Vue2 to Vue3](https://github.com/joserick/v-money-spinner#migration-vue2---vue3) || [I need V-Money-Spinner for Vue2](https://github.com/joserick/v-money-spinner#i-need-for-vue2)

![demo](https://joserick.com/v_money_spinner/spinner.gif)

## [Demo](https://joserick.com/v_money_spinner/)
Enjoy :smile:

## Installation
```bash
npm i v-money-spinner
```
```js
import MoneySpinner from 'v-money-spinner'
app.use(MoneySpinner)
```

## Use
```html
<template>
    <v-money-spinner v-model="amount" v-bind="config"></v-money-spinner>
    {{ amount }}
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
          template: "bootstrap",
          masked: true,
          disableNegative: false,
          align: "center",
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
| min            | Number  | null                    | The min value allowed                                       |
| max            | Number  | null                    | The max value allowed                                       |
| template       | String  | "bootstrap"             | Apply template styles, use false if you not need template   |
| masked         | Boolean | false                   | If the component output should include the mask or not      |
| allowBlank     | Boolean | false                   | If the field can start blank and be cleared out by user     |
| disableNegative| Boolean | false                   | Don't allow negative values                                 |
| minCharacters  | Number  | 0                       | Minimum number of characters (leading zero)                 |
| id             | String  | "v-money-spinner"       | Input id                                                    |
| label          | String  | ""                      | Text for label tag                                          |
| align          | String  | "center"                | Change by "left" or "right" to align the text in the input  |


## Events
| Event          | Parameters                         | Description                                                |
|----------------|------------------------------------|------------------------------------------------------------|
| change         | unformatted, formatted, old_amount | Fires when the input value change                          |
| plus           | unformatted, formatted             | Fires when user click on the plus button                   |
| minus          | unformatted, formatted             | Fires when user click on the minus button                  |
| positive       | unformatted, formatted, old_amount | Fires when the amount change to positive                   |
| negative       | unformatted, formatted, old_amount | Fires when the amount change to negative                   |


## Classes (style css)
| Classes             | Description                                                                                |
|---------------------|--------------------------------------------------------------------------------------------|
| labelClass          | Class for the label tag                                                                    |
| inputClass          | Class for the input tag                                                                    |
| prependClass        | Class for the left button tag                                                              |
| appendClass         | Class for the right button tag                                                             |
| wrapperClass        | Class for div contains all money-spinner                                                   |
| wrapperGroupClass   | Class for div contains input and the buttons                                               |

## Migration Vue2 -> Vue3
Summary of changes of the VMoneySpinner files and documentation to help you migrate from Vue2 to Vue3.

### New Core
Previously for the use of the **VMoneySpinner** with *Vue2* was used as core the component [VMoney](https://github.com/vuejs-tips/v-money) by @vuejs-tips, now for *Vue3* is used as core [VMoney3](https://github.com/jonathanpmartins/v-money3) by @jonathanpmartins.

### Properties
 - Added `disableNegative` (by core) for block the use of negative numbers.
 - Added `minCharacters` alias `minimumNumberOfCharacters` (by core) for insert 0 digit that comes before the first nonzero digit.
 - ![Breaking](https://img.shields.io/badge/-Breaking-dc3545.svg) Renamed `bootstrap` to `template` for the handling different
   templates though string.
 - ![Breaking](https://img.shields.io/badge/-Breaking-dc3545.svg) Dropped `amend`  and `invalidMessage` since the new core does not allow to exceed the properties maximum and minimum.

### Style
 - ![Breaking](https://img.shields.io/badge/-Breaking-dc3545.svg) Change/Update classes (style css) default of Bootstrap 4.6 to Bootstrap 5.1.
 - ![Breaking](https://img.shields.io/badge/-Breaking-dc3545.svg) Dropped `wrapperPrependClass` for change in structure of Bootstrap 5.

### Events
 - ![Breaking](https://img.shields.io/badge/-Breaking-dc3545.svg) Dropped `exceeded`  since the new core does not allow to exceed the properties maximum and minimum.

## I need for Vue2
### Install for Vue2
```bash
npm i v-money-spinner@0.1.8
```

### [Configuration for Vue2](https://github.com/joserick/v-money-spinner/tree/v0.1.8)

## References

 - https://github.com/JoaoPedroAS51/v-money
 - https://github.com/jonathanpmartins/v-money3

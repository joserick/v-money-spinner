<template>
  <div :class="style('wrapperClass')">
    <label v-if="label" :class="style('labelClass')" :for="id.toString()">
      {{ label }}
    </label>
    <div :class="style('wrapperGroupClass')">
      <button v-if="spinner" type="button" @click="minus"
        :class="style('prependClass')">-</button>
      <money v-model="amount" ref="money" :id="id" v-bind="vAttrs"
        :class="[style('inputClass'), template ? 'text-' + align : '']">
      </money>
      <button v-if="spinner" type="button" @click="plus"
        :class="style('appendClass')">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
} from 'vue'
import { Money, unformat, VMoneyOptions } from 'v-money3'
import BigNumber from './big_number'
import stylesList from "./styles"
import defaults from "./validations"

export default defineComponent({
  name: "money-spinner",
  components: { Money },
  inheritAttrs: false,
  data () {
    return {
      amount: 0,
    }
  },
  props: defaults,
  setup(props, { emit, attrs }) {
    const money = ref<VMoneyOptions>()

    // Create a new object to store the amount data
    const amount = {
      // Define a getter for the value
      get value(): BigNumber {
        // If the money component has a masked value
        if (money.value?.masked) {
          // Return a BigNumber object converted from the unformatted money value
          return new BigNumber(
            unformat(money.value?.modelValue, money.value?.$props)
          )
        }

        // Return a BigNumber object converted from the unformatted money value
        return new BigNumber(money.value?.modelValue)
      },

      // Define a function to update the amount
      update(new_val: string | number | BigNumber, precision: number = 2) {
        if (typeof new_val === 'string') {
          // Emit an update event with the new value
          emit("update:modelValue", new_val)
        // Otherwise, if the new value is a number
        }else{
          // Emit an update event with the new value rounded to the precision
          emit("update:modelValue", new_val.toFixed(precision))
        }
      }
    };

    const signChange = (val: string, pre_val: string) => {
      // Convert the string to BigNumber.
      const pre_val_big = new BigNumber(unformat(pre_val, money.value?.$props))
      const val_big = new BigNumber(unformat(val, money.value?.props))

      // Detect if the number is positive, negative or neutral.
      if (pre_val_big.lessThan(0) && val_big.biggerEqualThan(0)) {
        emit("positive", val_big.toFixed(money.value?.precision), val, pre_val)
      } else if (pre_val_big.biggerEqualThan(0) && val_big.lessThan(0)) {
        emit("negative", val_big.toFixed(money.value?.precision), val, pre_val)
      }
    }

    // Update the amount in base the plus or minus of the step.
    const setPlusMinus = (event: boolean) => {
      if (money.value?.max && amount.value.biggerThan(money.value?.max)) {
        // if the amount is bigger than the maximum value, set the amount to the max value.
        amount.update(money.value.max, money.value.precision)
      } else if (money.value?.min && amount.value.lessThan(money.value?.min)) {
        // if the amount is less than the minimum value, set the amount to the min value.
        amount.update(money.value.min, money.value.precision)
      } else if ( event && (money.value?.max === null || amount.value.lessThan(<string|number>money.value?.max))) {
        // if the amount is less than the maximum value, add the step value to the amount.
        amount.update(amount.value.minMax(event, props.step, <string|number>money.value?.max), money.value?.precision)
      } else if ( !event && (money.value?.min === null || amount.value.biggerThan(<string|number>money.value?.min))) {
        // if the amount is bigger than the minimum value, subtract the step value from the amount.
        amount.update(amount.value.minMax(event, props.step, <string|number>money.value?.min), money.value?.precision)
      }

      // emit the event based on whether it was to add or subtract.
      emit(
        event ? "plus" : "minus",
        amount.value.toFixed(money.value?.precision),
        money.value?.$el.value
      )
    }

    const plus = () => {
      setPlusMinus(true)
    }

    const minus = () => {
      setPlusMinus(false)
    }

    const style = (cls: string) => {
      // If the template name is a string then we can use it to get the styles.
      if (typeof props.template === 'string') {
        // If the template is in the stylesList then we can use it to get the class list.
        if (stylesList[props.template]) {
          // Return the class list for the element.
          return stylesList[props.template][cls as keyof typeof stylesList.bootstrap] + " " + props[cls as keyof typeof props]
        }
      }

      // Return nothing if the template is false or not in the stylesList.
      return ''
    }

    const vAttrs = computed(() => {
      const payload = {
        ...attrs,
      }

      // If the number modifier is present, do not mask the input.
      if (props.modelModifiers.number) {
        payload.masked = false
      }

      // Rename minCharacters to minimumNumberOfCharacters.
      if (payload.minCharacters) {
        payload.minimumNumberOfCharacters = payload.minCharacters
      }

      // if negative numbers is active mark the min in 0.
      if (payload.disableNegative) {
        payload.min = 0
      }

      return payload
    })

    onMounted(() => {
      watch(() => money.value?.$el.value, (val, pre_val) => {
        // Emit change event
        emit('change', amount.value.toFixed(money.value?.precision), val, pre_val)
        // Check if sign to changed.
        signChange(val, pre_val)
      })
    })

    return {
      money,
      vAttrs,
      plus,
      minus,
      style,
    }
  },
})
</script>

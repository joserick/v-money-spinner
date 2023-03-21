<template>
  <div :class="style('wrapperClass')">
    <label v-if="label" :class="style('labelClass')" :for="money?.id">
      {{ label }}
    </label>
    <div :class="style('wrapperGroupClass')">
      <button v-if="spinner" type="button" @click="minus"
        :class="style('prependClass')">-</button>
      <Money v-model="amount.model.value" v-bind="vAttrs"
        ref="money" @keydown.up.prevent="plus" @keydown.down.prevent="minus"
        :class="[style('inputClass'), template ? 'text-' + align : '']"/>
      <button v-if="spinner" type="button" @click="plus"
        :class="style('appendClass')">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch, useAttrs, watchEffect } from 'vue'
  import { Money, unformat, VMoneyOptions } from 'v-money3'
  import BigNumber from './big_number'
  import stylesList from './styles'
  import defaults from './validations'

  const emit = defineEmits([
    "update:modelValue",
    "plus",
    "minus",
    "positive",
    "negative",
    "input",
    "change",
  ])

  const attrs = useAttrs()
  const props = defineProps(defaults)
  const money = ref<VMoneyOptions | null>(null)
  // Create a new object to store the amount data
  const amount = {
    model: ref(props.modelValue),

    // Define a getter for the value
    get value(): BigNumber {
      // If the money component has a masked value
      if (typeof this.model.value === "string") {
        // Return a BigNumber object converted from the unformatted money value
        return new BigNumber(
          unformat(this.model.value, money.value!.$props)
        )
      }

      // Return a BigNumber object converted from the unformatted money value
      return new BigNumber(this.model.value)
    },

    set value(value: string | number | BigNumber) {
      if (typeof value === "string") {
        this.model.value = value
      } else {
        this.model.value = value.toFixed(money.value!.precision)
      }
    },
  }

  const signChange = (val: BigNumber, pre_val: BigNumber) => {
    // Detect if the number is positive, negative or neutral.
    if (pre_val.lessThan(0) && val.biggerEqualThan(0)) {
      emit("positive", val.toFixed(money.value!.precision), val, pre_val)
    } else if (pre_val.biggerEqualThan(0) && val.lessThan(0)) {
      emit("negative", val.toFixed(money.value!.precision), val, pre_val)
    }
  }

  // Update the amount in base the plus or minus of the step.
  const setPlusMinus = (event: boolean) => {
    if (money.value!.max !== null && amount.value.biggerThan(money.value!.max)) {
      // if the amount is bigger than the maximum value, set the amount to the max value.
      amount.value = money.value!.max
    } else if (money.value!.min !== null && amount.value.lessThan(money.value!.min)) {
      // if the amount is less than the minimum value, set the amount to the min value.
      amount.value = money.value!.min
    } else if (event && (money.value!.max === null || amount.value.lessThan(money.value!.max))) {
      // if the amount is less than the maximum value, add the step value to the amount.
      amount.value = amount.value.minMax(event, props.step, money.value!.max)
    } else if (!event && (money.value!.min === null || amount.value.biggerThan(money.value!.min))) {
      // if the amount is bigger than the minimum value, subtract the step value from the amount.
      amount.value = amount.value.minMax(event, props.step, money.value!.min)
    }

    // emit the event based on whether it was to add or subtract.
    emit(
      event ? "plus" : "minus",
      amount.value.toFixed(money.value!.precision),
      money.value!.$el.value
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
    if (typeof props.template === "string") {
      // If the template is in the stylesList then we can use it to get the class list.
      if (stylesList[props.template]) {
        // Return the class list for the element.
        return (
          stylesList[props.template][cls as keyof typeof stylesList.bootstrap] +
          " " +
          props[cls as keyof typeof props]
        )
      }
    }

    // Return nothing if the template is false or not in the stylesList.
    return ""
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

  watchEffect(() => {
    emit('update:modelValue', amount.model.value);
  })

  onMounted(() => {
    watch(() => amount.value,
      (val, pre_val) => {
        // Emit change event
        emit(
          "change",
          amount.value.toFixed(money.value!.precision),
          val,
          pre_val
        )
        // Check if sign to changed.
        signChange(val, pre_val)
      }
    )
  })
</script>

<template>
  <div :class="style('wrapperClass')">
    <label v-if="label" :class="style('labelClass')" :for="id">{{
      label
    }}</label>
    <div :class="style('wrapperGroupClass')">
      <button v-if="spinner" type="button" @click="minus"
        :class="style('prependClass')">-</button>
      <money ref="money" :id="id" v-bind="vAttrs"
        :class="[style('inputClass'), template ? 'text-' + align : '']"></money>
      <button v-if="spinner" type="button" @click="plus"
        :class="style('appendClass')">+</button>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
} from 'vue'
import Money from 'v-money3/src/component.vue'
import unformat from 'v-money3/src/unformat'
import BigNumber from './big_number'
import stylesList from "./styles"
import defaults from "./validations"

export default defineComponent({
  name: "money-spinner",
  components: { Money },
  inheritAttrs: false,
  props: defaults,
  setup(props, { emit, attrs }) {
    const money = ref()
    const amount = computed({
      get() {
        if (money.value.masked) {
          return new BigNumber(
            unformat(money.value.modelValue, money.value.$props)
          )
        }
        return new BigNumber(money.value.modelValue)
      },
      set(new_val) {
        emit("update:modelValue", new_val)
      },
    })

    const signChange = (val, pre_val) => {
      let pre_val_big = new BigNumber(unformat(pre_val, money.value.$props))
      let val_big = new BigNumber(unformat(val, money.value.$props))

      if (pre_val_big.lessThan(0) && val_big.biggerEqualThan(0)) {
        emit("positive", val_big.toFixed(money.value.precision), val, pre_val)
      } else if (pre_val_big.biggerEqualThan(0) && val_big.lessThan(0)) {
        emit("negative", val_big.toFixed(money.value.precision), val, pre_val)
      }
    }

    const setPlusMinus = (event) => {
      if (money.value.max && amount.value.biggerThan(money.value.max)) {
        amount.value = money.value.max.toFixed(money.value.precision)
      } else if (money.value.min && amount.value.lessThan(money.value.min)) {
        amount.value = money.value.min.toFixed(money.value.precision)
      } else if (
        event &&
        (money.value.max === null || amount.value.lessThan(money.value.max))
      ) {
        amount.value = amount.value
          .minMax(event, props.step, money.value.max)
          .toFixed(money.value.precision)
      } else if (
        !event &&
        (money.value.min === null || amount.value.biggerThan(money.value.min))
      ) {
        amount.value = amount.value
          .minMax(event, props.step, money.value.min)
          .toFixed(money.value.precision)
      }

      emit(
        event ? "plus" : "minus",
        amount.value.toFixed(money.value.precision),
        money.value.data.formattedValue
      )
    }

    const plus = () => {
      setPlusMinus(true)
    }

    const minus = () => {
      setPlusMinus(false)
    }

    const style = (cls) => {
      return stylesList[props.template]
        ? stylesList[props.template][cls] + " " + props[cls]
        : props[cls]
    }

    const vAttrs = computed(() => {
      const payload = {
        ...attrs,
      }

      if (props.modelModifiers.number) {
        payload.masked = false
      }

      if (payload.minCharacters) {
        payload.minimumNumberOfCharacters = payload.minCharacters
      }

      if (payload.disableNegative) {
        payload.min = 0
      }

      return payload
    })

    onMounted(() => {
      watch(() => money.value.data.formattedValue, (val, pre_val) => {
        emit('change', amount.value.toFixed(money.value.precision), val, pre_val)
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

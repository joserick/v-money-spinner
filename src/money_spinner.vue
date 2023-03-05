<template>
  <div :class="style('wrapperClass')">
    <label v-if="label" :class="style('labelClass')" :for="id.toString()">{{ label }}</label>
    <div :class="style('wrapperGroupClass')">
      <button v-if="spinner" type="button" @click="minus"
        :class="style('prependClass')">-</button>
      <money v-model="amount" ref="money" :id="id" v-bind="vAttrs"
        :class="[style('inputClass'), template ? 'text-' + align : '']"></money>
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
  Ref,
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
  setup(props, { emit, attrs, expose }) {
    const money = ref<VMoneyOptions>()

    const amount = {
      get value(): BigNumber {
        if (money.value?.masked) {
          return new BigNumber(
            unformat(money.value?.modelValue, money.value?.$props)
          )
        }

        return new BigNumber(money.value?.modelValue)
      },

      update(new_val: string | number | BigNumber, precision: number = 2) {
        if (typeof new_val === 'string') {
          emit("update:modelValue", new_val)
        }else{
          emit("update:modelValue", new_val.toFixed(precision))
        }
      }
    };

    const signChange = (val: string, pre_val: string) => {
      let pre_val_big = new BigNumber(unformat(pre_val, money.value?.$props))
      let val_big = new BigNumber(unformat(val, money.value?.$props))

      if (pre_val_big.lessThan(0) && val_big.biggerEqualThan(0)) {
        emit("positive", val_big.toFixed(money.value?.precision), val, pre_val)
      } else if (pre_val_big.biggerEqualThan(0) && val_big.lessThan(0)) {
        emit("negative", val_big.toFixed(money.value?.precision), val, pre_val)
      }
    }

    const setPlusMinus = (event: boolean) => {
      if (money.value?.max && amount.value.biggerThan(money.value?.max)) {
        amount.update(money.value.max, money.value.precision)
      } else if (money.value?.min && amount.value.lessThan(money.value?.min)) {
        amount.update(money.value.min, money.value.precision)
      } else if ( event && (money.value?.max === null || amount.value.lessThan(<string|number>money.value?.max))) {
        amount.update(amount.value.minMax(event, props.step, <string|number>money.value?.max), money.value?.precision)
      } else if ( !event && (money.value?.min === null || amount.value.biggerThan(<string|number>money.value?.min))) {
        amount.update(amount.value.minMax(event, props.step, <string|number>money.value?.min), money.value?.precision)
      }

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
      if (typeof props.template === 'string') {
        if (stylesList[props.template]) {
          return stylesList[props.template][cls as keyof typeof stylesList.bootstrap] + " " + props[cls as keyof typeof props]
        }
      }

      return ''
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
      console.log(expose)
      watch(() => money.value?.$el.value, (val, pre_val) => {
        emit('change', amount.value.toFixed(money.value?.precision), val, pre_val)
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

<template>
	<div :class="style('wrapperClass')">
		<label v-if="label" :class="style('labelClass')" :for="id">{{ label }}</label>
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
import { ref, computed, onMounted, watch } from 'vue'
import { Money, format, unformat } from "v-money3";
import stylesList from "./styles";
import defaults from "./validations";

export default {
  name: "money-spinner",
  components: { Money },
  inheritAttrs: false,
  props: defaults,
  setup(props, { emit, attrs }) {
    const money = ref()
    const amount = computed({
      get(){
        if (money.value.masked) {
          return Number(unformat(money.value.modelValue, money.value.$props))
        }
        return Number(money.value.modelValue)
      },
      set(new_val){
        emit('update:modelValue', new_val)
      }
    })

    const signChange = (val, pre_val) => {
      let pre_val_unformat = Number(unformat(pre_val, money.value.$props))
      let val_unformat = Number(unformat(val, money.value.$props))

      if (pre_val_unformat < 0 && val_unformat >= 0) {
			  emit('positive', val_unformat, val, pre_val)
      }else if (pre_val_unformat >= 0 && val_unformat < 0) {
			  emit('negative', val_unformat, val, pre_val)
      }
    }

    const setPlusMinus = (event) => {
      if (amount.value > money.value.max){
        amount.value = money.value.max.toFixed(money.value.precision)
      }else if (money.value.disableNegative && (amount.value + ((event ? 1 : -1) * props.step)) < 0) {
        amount.value = money.value.masked ? format(0, money.value.$props) : 0
      }else if (amount.value < money.value.min) {
        amount.value = money.value.min.toFixed(money.value.precision)
      }else if (event && amount.value < money.value.max) {
        amount.value = Math.min(amount.value + props.step, money.value.max).toFixed(money.value.precision);
      }else if (!event && amount.value > money.value.min){
        amount.value = Math.max(amount.value - props.step, money.value.min).toFixed(money.value.precision);
      }

			emit(event ? 'plus' : 'minus', amount.value, money.value.data.formattedValue)
    }

    const plus = () => {
			setPlusMinus(true)
    }

    const minus = () => {
			setPlusMinus(false)
    }

    const style = (cls) => {
      return stylesList[props.template]
        ? stylesList[props.template][cls] + ' ' + props[cls] : props[cls]
    }

    const vAttrs = computed(() => {
      const payload = {
        ...attrs,
      };

      if (props.modelModifiers.number) {
        payload.masked = false
      }

      if (payload.minCharacters) {
        payload.minimumNumberOfCharacters = payload.minCharacters
      }

      return payload;
    });

    onMounted(() => {
      watch(() => money.value.data.formattedValue, (val, pre_val) => {
        emit('change', amount.value, val, pre_val)
        signChange(val, pre_val)
      })
    })

    return {
      money,
      vAttrs,
      plus,
      minus,
      style,
    };
  },
};
</script>

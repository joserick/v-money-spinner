<template>
	<div v-bind:class="[{'form-group': bootstrap, 'was-validated': bootstrap && invalid}, wrapperClass]">
		<label v-if="label" v-bind:class="labelClass" :for="id">{{ label }}</label>
		<div v-bind:class="[{'input-group': bootstrap}, wrapperGroupClass]">
			<div v-if="spinner" v-bind:class="[{'input-group-prepend': bootstrap}, wrapperPrependClass]">
				<button type="button" v-on:click="setAmountMinus"
					v-bind:class="[{'btn btn-outline-secondary font-weight-bold': bootstrap}, prependClass]">-</button>
			</div>
			<money ref="money" :id="id"
				v-bind:class="[{'form-control': bootstrap}, bootstrap ? 'text-' + align : '', inputClass]"
				:minMaxMessage="invalidMessage" v-model="amount" v-bind="$attrs"></money>
			<div v-if="spinner" v-bind:class="[{'input-group-append': bootstrap}, wrapperAppendClass]">
				<button type="button" v-on:click="setAmountPlus"
					v-bind:class="[{'btn btn-outline-success rounded-right font-weight-bold': bootstrap}, appendClass]">+</button>
			</div>
			<div v-if="bootstrap" class="invalid-feedback">
				{{ invalidMessage }}
			</div>
		</div>
	</div>
</template>

<script>
	import { Money } from 'v-money'
	import defaults from './options'

	export default {
		name: 'money-spinner',
		components: {Money},
		inheritAttrs: false,
		props: {
			value: {
				required: false,
				type: [Number, String]
			},
			id: {
				type: String,
				default: () => defaults.id
			},
			spinner: {
				type: Boolean,
				default: () => defaults.spinner
			},
			step: {
			  type: Number,
			  default: () => defaults.step
			},
			bootstrap: {
				type: Boolean,
				default: () => defaults.bootstrap
			},
			align: {
				type: String,
				default: () => defaults.align
			},
			label: {
				type: [Boolean, String],
				default: () => defaults.label
			},
			labelClass: {
				type: String,
				default: () => defaults.labelClass
			},
			invalidMessage: {
				type: String,
				default: () => defaults.invalidMessage
			},
			wrapperClass: {
				type: String,
				default: () => defaults.wrapperClass
			},
			wrapperGroupClass: {
				type: String,
				default: () => defaults.wrapperGroupClass
			},
			wrapperPrependClass: {
				type: String,
				default: () => defaults.wrapperPrependClass
			},
			wrapperAppendClass: {
				type: String,
				default: () => defaults.wrapperAppendClass
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
			}
		},
		data () {
			return {
				amount: 0,
				invalid: false,
				is_negative: false,
			}
		},
		created() {
			if (this.value) {
				this.amount = this.value;
			}
			if (parseFloat(this.amount) > 0) {
				this.is_negative = false
			}else{
				this.is_negative = true
			}
		},
		mounted() {
			this.updateEventBus(this.$refs.money.masked ? this.$refs.money.innerValue : this.amount)
			this.$watch("$refs.money.innerValue",(new_val, old_val) => {
				this.determineSignEvent(new_val, old_val)
				this.updateEventBus(this.amount)
			});
			this.$watch("$refs.money.masked", (new_val) => {
				this.$emit('input', this.updateEventBus(
					this.$refs.money[new_val ? 'format' : 'unformat'](this.amount)))
			});
			this.$watch("$refs.money.pattern", (new_val) => {
				if (new_val == '.*') {
					this.invalid = false
				}else if (this.invalidMessage) {
					this.invalid = true
				}
			});

		},
		methods: {
			setAmount: function (plus_minus) {
				if (typeof this.amount === 'string' || this.amount instanceof String) {
					this.amount = this.unformat(this.amount)
				}
				if (this.amount > this.$refs.money.max){
					this.amount = this.$refs.money.max.toFixed(this.$refs.money.precision)
				}else if (this.amount < this.$refs.money.min) {
					this.amount = this.$refs.money.min.toFixed(this.$refs.money.precision)
				}else if (plus_minus && this.amount < this.$refs.money.max) {
					this.amount = Math.min(this.amount + this.step, this.$refs.money.max).toFixed(this.$refs.money.precision);
				}else if (!plus_minus && this.amount > this.$refs.money.min){
					this.amount = Math.max(this.amount - this.step, this.$refs.money.min).toFixed(this.$refs.money.precision);
				}
				return this.amount;
			},
			sendEventAmount : function (type, plus_minus) {
				this.$emit(type, this.setAmount(plus_minus), this.format(this.amount))
			},
			setAmountPlus: function (event) {
				this.sendEventAmount('plus', true)
			},
			setAmountMinus: function (event) {
				this.sendEventAmount('minus', false)
			},
			updateEventBus: function (new_val) {
				if (this.$eventBus) {
					this.$eventBus.$emit('money_spinner_amount', new_val)
				}
				return new_val
			},
			determineSignEvent: function (new_val, old_val) {
				let val_format = this.format(new_val)
				let val_unformat = this.unformat(new_val)

				this.$emit('change', val_unformat, val_format, old_val)

				if (val_unformat > 0 && this.is_negative) {
					this.is_negative = false
					this.$emit('positive', val_unformat, val_unformat)
				}else if (val_unformat < 0 && !this.is_negative) {
					this.is_negative = true
					this.$emit('negative', val_unformat, val_unformat)
				}
			},
			unformat: function (val) {
				return this.$refs.money.unformat(val)
			},
			format: function (val) {
				return this.$refs.money.format(val)
			}
		},
		watch: {
			amount: function (new_val, old_val) {
				if (new_val === old_val) return
				this.$emit('input', new_val)
			},
			value: function (new_val) {
				this.amount = new_val
			},
			invalid: function (new_val, old_val) {
				if (new_val !== old_val && new_val){
					this.$emit('exceeded',
						this.unformat(this.amount),
						this.format(this.amount),
						this.$refs.money.min,
						this.$refs.money.max,
					)
				}
			}
		}
	}
</script>

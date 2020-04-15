<template>
	<div v-bind:class="[{'form-group': bootstrap, 'was-validated': bootstrap && invalid}, wrapperClass]">
		<label v-if="label" v-bind:class="labelClass" :for="id">{{ label }}</label>
		<div v-bind:class="[{'input-group': bootstrap}, wrapperGroupClass]">
			<div v-if="spinner" v-bind:class="[{'input-group-prepend': bootstrap}, wrapperPrependClass]">
				<button type="button" v-on:click="setAmountMinus"
					v-bind:class="[{'btn btn-outline-secondary font-weight-bold': bootstrap}, prependClass]">-</button>
			</div>
			<money ref="money" :id="id" v-bind:class="[{'form-control text-center': bootstrap}, inputClass]" 
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
			bootstrap: {
				type: Boolean,
				default: () => defaults.bootstrap
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
				invalid: false
			}
		},
		created() {
			if (this.value) {
				this.amount = this.value;
			}
		},
		mounted() {
			this.updateEventBus(this.$refs.money.masked ? this.$refs.money.innerValue : this.amount)
			this.$watch("$refs.money.innerValue",(new_val) => {
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
					this.amount = this.$refs.money.unformat(this.amount)
				}
				if (this.amount > this.$refs.money.max){
					this.amount = this.$refs.money.max.toFixed(this.$refs.money.precision)
				}else if (this.amount < this.$refs.money.min) {
					this.amount = this.$refs.money.min.toFixed(this.$refs.money.precision)
				}else if (plus_minus && this.amount < this.$refs.money.max) {
					this.amount = Math.min(this.amount + this.$refs.money.step, this.$refs.money.max).toFixed(this.$refs.money.precision);
				}else if (!plus_minus && this.amount > this.$refs.money.min){
					this.amount = Math.max(this.amount - this.$refs.money.step, this.$refs.money.min).toFixed(this.$refs.money.precision);
				}
			},
			setAmountPlus: function (event) {
				this.setAmount(true)
			},
			setAmountMinus: function (event) {
				this.setAmount(false)
			},
			updateEventBus: function (new_val) {
				this.$eventBus.$emit('money_spinner_amount', new_val)
				return new_val
			}
		},
		watch: {
			amount: function (new_val, oldVal) {
				if (new_val === oldVal) return
				this.$emit('input', new_val)
			},
			value: function (new_val) {
				this.amount = new_val
			}
		}
	}
</script>

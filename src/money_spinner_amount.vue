<template>
	<span>{{ amount }}</span>
</template>

<script>
	export default {
		name: 'money-spinner-amount',
		props: {
			money_id:{
				type: String,
				default: 'v-money-spinner'
			},
			format: {
				type: String,
				default: 'en-US'
			},
			prefix: {
				type: String,
				default: ''
			},
			suffix: {
				type: String,
				default: ''
			},
			precision: {
				type: Number,
				default: 2
			},
		},
		data () {
			return {
				amount: null
			}
		},
		created: function () {
			this.$eventBus.$on(this.money_id, (val) => {
				this.amount = this.prefix
					+ new Intl.NumberFormat(this.format, 
						{minimumFractionDigits: this.precision}).format(val)
					+ this.suffix
			});
		}
	}
</script>

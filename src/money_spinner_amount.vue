<template>
	<span>{{ amount }}</span>
</template>

<script>
	export default {
		name: 'money-spinner-amount',
		data () {
			return {
				amount: null
			}
		},
		created: function () {
			this.$eventBus.$on('money_spinner_amount', (val) => {
				this.amount = val
			});
		}
	}
</script>

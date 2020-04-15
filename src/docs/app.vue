<template>
	<div id="app">
		<div class="sticky-top bg-white shadow">
			<a href="https://github.com/joserick/v-money-spinner" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
			<v-money-spinner name="amount"
			:spinner="spinner"
			v-model="amount"
			:step="step"
			:min="min"
			:max="max"
			:prefix="prefix"
			:suffix='suffix'
			:precision="precision"
			:thousands="thousands"
			:bootstrap="bootstrap"
			:decimal="decimal"
			:amend="amend"
			:allowBlank="blank"
			:masked="masked"
			:invalidMessage="invalidMessage"
			:input-class="inputClass"
			:label-class="labelClass"
			wrapper-class="wrapper-height col-12 col-md-4 offset-md-4 pt-5 text-center"></v-money-spinner>
		</div>
		<div class="col-12 col-md-10 col-lg-6 mx-auto">
			<div class="row mt-4">
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" title="Apply spinner buttons to the input" data-toggle="tooltip">
							<span class="mx-auto">Spinner</span>
						</label>
					</div>
					<div class="input-group-append btn-group-toggle w-50">
							<label v-bind:class="['btn btn-primary btn-block', { active: spinner }]">
								<input v-model="spinner" type="checkbox"> {{ spinner ? 'Active' : 'Inactive' }}
							</label>
					</div>
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="step" title="Number of steps" data-toggle="tooltip">
							<span class="mx-auto">Step</span>
						</label>
					</div>
					<input id="step" v-model="stepFormat" type="number" min="0" :step="stepDesimal" class="form-control w-50" placeholder="1">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="precision" title="How many decimal places" data-toggle="tooltip">
							<span class="mx-auto">Precision</span>
						</label>
					</div>
					<input id="precision" v-model="precisionFormat" type="number" min="0" class="form-control w-50" placeholder="2">
				</div>
			</div>
			<hr class="d-none d-md-block">
			<div class="row">
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="min" title="The min value allowed" data-toggle="tooltip">
							<span class="mx-auto">Minimum</span>
						</label>
					</div>
					<input id="min" v-model.number="min" type="number" class="form-control w-50" placeholder="-infinite">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="max" title="The max value allowed" data-toggle="tooltip">
							<span class="mx-auto">Maximum</span>
						</label>
					</div>
					<input id="max" v-model.number="max" type="number" class="form-control w-50" placeholder="infinite">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" title="Apply Bootstrap styles" data-toggle="tooltip">
							<span class="mx-auto" style="font-size: 0.9rem">Bootstrap</span>
						</label>
					</div>
					<div class="input-group-append btn-group-toggle w-50">
							<label v-bind:class="['btn btn-primary btn-block', { active: bootstrap }]">
								<input v-model="bootstrap" type="checkbox" checked> {{ bootstrap ? 'Active' : 'Inactive' }}
							</label>
					</div>
				</div>
			</div>
			<hr class="d-none d-md-block">
			<div class="row">
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="prefix" title="Currency symbol followed by a Space, like '$ '" data-toggle="tooltip">
							<span class="mx-auto">Prefix</span>
						</label>
					</div>
					<input id="prefix" v-model="prefixFormat" type="text" class="form-control w-50" placeholder="$">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="suffix" title="Percentage for example: ' MXN'" data-toggle="tooltip">
							<span class="mx-auto">Suffix</span>
						</label>
					</div>
					<input id="suffix" v-model="suffixFormat" type="text" class="form-control w-50" placeholder="MXN">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" title="In case of exceeding min or max, overwrite it when deselect" data-toggle="tooltip">
							<span class="mx-auto" style="font-size: 0.9rem">Amend</span>
						</label>
					</div>
					<div class="input-group-append btn-group-toggle w-50">
							<label v-bind:class="['btn btn-primary btn-block', { active: amend }]">
								<input v-model="amend" type="checkbox" checked> {{ amend ? 'Active' : 'Inactive' }}
							</label>
					</div>
				</div>
			</div>
			<hr class="d-none d-md-block">
			<div class="row">
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="decimal" title="Decimal separator" data-toggle="tooltip">
							<span class="mx-auto">Decimal</span>
						</label>
					</div>
					<input id="decimal" v-model="decimalFormat" type="text" class="form-control w-50" placeholder=".">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" for="thousands" title="Thousands separator" data-toggle="tooltip">
							<span class="mx-auto" style="font-size: 0.8rem">Thousands</span>
						</label>
					</div>
					<input id="thousands" v-model="thousandsFormat" type="text" class="form-control w-50" placeholder=",">
				</div>
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" title="If the field can start blank and be cleared out by user" data-toggle="tooltip">
							<span class="mx-auto" style="font-size: 0.9rem">Blank</span>
						</label>
					</div>
					<div class="input-group-append btn-group-toggle w-50">
							<label v-bind:class="['btn btn-primary btn-block', { active: blank }]">
								<input v-model="blank" type="checkbox" checked> {{ blank ? 'Active' : 'Inactive' }}
							</label>
					</div>
				</div>
			</div>
			<hr class="d-none d-md-block">
			<div class="row">
				<div class="input-group col-12 col-md-4">
					<div class="input-group-prepend w-50">
						<label class="input-group-text w-100" title="If the component output should include the mask or not" data-toggle="tooltip">
							<span class="mx-auto" style="font-size: 0.9rem">Masked</span>
						</label>
					</div>
					<div class="input-group-append btn-group-toggle w-50">
							<label v-bind:class="['btn btn-primary btn-block', { active: masked }]">
								<input v-model="masked" type="checkbox" checked> {{ masked ? 'Active' : 'Inactive' }}
							</label>
					</div>
				</div>
				<div class="input-group col-12 col-md-8">
					<div class="input-group-prepend w-50 w-md-30">
						<label class="input-group-text w-100" for="invalidMessage" title="Message if exceeding min or max value allowed" data-toggle="tooltip">
							<span class="mx-auto" style="font-size: 0.9rem">Invalid Message</span>
						</label>
					</div>
					<input id="invalidMessage" v-model="invalidMessage" type="text" class="form-control w-50 w-md-60" placeholder="Message if exceeding min or max value allowed">
				</div>
			</div>
			<hr class="d-none d-md-block">
			<div class="row mt-4 mt-md-0">
				<div class="col-6 offset-3 text-center h2">
					<v-money-spinner-amount></v-money-spinner-amount>
				</div>
			</div>
		</div>
		<div class="jumbotron text-center mt-5">
			<div class="container">
				<h1 class="display-3">More Information</h1>
				<p>If you require more information for installation and configuration you can visit our repository in:</p>
				<p><a class="btn btn-primary btn-lg" href="https://github.com/joserick/v-money-spinner" role="button">https://github.com/joserick/v-money-spinner »</a></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				// Config
				spinner: true,
				amount: 100,
				step: 10,
				min: -10,
				max: 200,
				prefix: "$ ",
				suffix: " MXN",
				precision: 2,
				decimal: '.',
				thousands: ',',
				bootstrap: true,
				amend: false,
				blank: false,
				masked: true,
				invalidMessage: 'Min is -10 and Max is 200',

				// Docs
				inputClass: 'form-control-lg',
				labelClass: 'h2',
			}
		},
		mounted: function () {
	  $('[data-toggle="tooltip"]').tooltip()
		},
		computed:{
			stepDesimal:{
				get: function () {
					let d = ''
					for (let i = 0; i < this.precision; i++) {
						d += '0'
					}
					d+= '1'
					if (this.precision > 0) {
						d = [d.slice(0, 1), '.', d.slice(1)].join('');
					}
					return d;
				}
			},
			stepFormat: {
				get: function () {
					return parseFloat(this.step).toFixed(this.precision)
				},
				set: function (v) {
					if (!isNaN(parseFloat(v))) {
						this.step = parseFloat(v)
					}
				}
			},
			precisionFormat: {
				get: function () {
					return parseInt(this.precision)
				},
				set: function (v) {
					if (!isNaN(parseInt(v))) {
						this.precision = parseInt(v)
					}
				}
			},
			prefixFormat: {
				get: function () {
					return this.prefix
				},
				set: function (v) {
					this.prefix = v.replace(/\d+$/, '')
				}
			},
			suffixFormat: {
				get: function () {
					return this.suffix
				},
				set: function (v) {
					this.suffix = v.replace(/\d*/, '')
				}
			},
			decimalFormat: {
				get: function () {
					return this.decimal
				},
				set: function (v) {
					this.decimal = v.replace(/\d/g, '')
				}
			},
			thousandsFormat: {
				get: function () {
					return this.thousands
				},
				set: function (v) {
					this.thousands = v.replace(/\d/g, '')
				}
			}
		},
		watch:{
			bootstrap: function (val) {
				this.spinner = true
				if (val) {
					this.inputClass = 'form-control-lg'
					this.labelClass = 'h2'
				}else{
					this.inputClass = this.labelClass = ''
				}
			}
		}
	}
</script>

<style>
		.wrapper-height{
			height: 180px;
		}
		.github-corner{
			position: absolute;
			z-index: 1;
			right: 0;
		}
		.github-corner:hover .octo-arm{
			animation:octocat-wave 560ms ease-in-out
		}
		@keyframes octocat-wave{
			0%, 100% { transform:rotate(0) } 20%, 60% { transform:rotate(-25deg) } 40%, 80%{ transform:rotate(10deg) }
		}
		@media (max-width:500px){
			.github-corner:hover .octo-arm{
				animation:none
			}
			.github-corner .octo-arm{
				animation:octocat-wave 560ms ease-in-out
			}
		}
</style>

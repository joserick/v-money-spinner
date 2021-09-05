<template>
	<div class="sticky-top bg-white shadow">
		<a href="https://github.com/joserick/v-money-spinner" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
		<v-money-spinner
			ref="money"
			name="amount"
			v-model="amount"
			v-bind="config"
			label="Vuejs Money Spinner"
			wrapper-class="wrapper-height col-12 col-md-4 offset-md-4 pt-5 text-center"/>
	</div>
	<div class="col-12 col-md-10 col-lg-6 mx-auto mt-5">
		<div class="row row-cols-2 row-cols-md-3">
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" data-tippy-content="Apply spinner buttons to the input">
							Spinner
						</label>
					</div>
					<input id="spinner" class="btn-check" v-model="config.spinner" type="checkbox" checked>
					<label for="spinner" class="btn btn-primary btn-block w-50">{{ config.spinner ? 'Active' : 'Inactive' }}</label>
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text py-auto w-50">
						<label class="mx-auto" for="step" data-tippy-content="Number of steps">
							Step
						</label>
					</div>
					<input id="step" v-model="stepFormat" type="number" min="0" :step="stepDesimal" class="form-control w-50" placeholder="1">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="precision" data-tippy-content="How many decimal places">
							Precision
						</label>
					</div>
					<input id="precision" v-model="precisionFormat" type="number" min="0" class="form-control w-50" placeholder="2">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="min" data-tippy-content="The min value allowed">
							Minimum
						</label>
					</div>
					<input id="min" v-model.number="config.min" type="number" class="form-control w-50" placeholder="-infinite">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="max" data-tippy-content="The max value allowed">
							Maximum
						</label>
					</div>
					<input id="max" v-model.number="config.max" type="number" class="form-control w-50" placeholder="infinite">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" data-tippy-content="Apply template styles for default 'Bootstrap'">
							<span class="mx-auto" style="font-size: 0.9rem">Template</span>
						</label>
					</div>
					<input id="template_type" class="btn-check" v-model="template_type" type="checkbox">
					<label for="template_type" class="btn btn-primary btn-block w-50">{{ template_type ? 'Active' : 'Inactive' }}</label>
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="prefix" data-tippy-content="Currency symbol followed by a Space, like '$ '">
							Prefix
						</label>
					</div>
					<input id="prefix" v-model="prefixFormat" type="text" class="form-control w-50" placeholder="$">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="suffix" data-tippy-content="Percentage for example: ' MXN'">
							Suffix
						</label>
					</div>
					<input id="suffix" v-model="suffixFormat" type="text" class="form-control w-50" placeholder="MXN">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" data-tippy-content="Allow negative values">
							<span class="mx-auto" style="font-size: 0.9rem">Negatives</span>
						</label>
					</div>
					<input id="disableNegative" class="btn-check" v-model="disableNegative" type="checkbox">
					<label for="disableNegative" class="btn btn-primary btn-block w-50">{{ config.disableNegative ? 'Inactive' : 'Active' }}</label>
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="decimal" data-tippy-content="Decimal separator">
							Decimal
						</label>
					</div>
					<input id="decimal" v-model="decimalFormat" type="text" class="form-control w-50" placeholder=".">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" for="thousands" data-tippy-content="Thousands separator">
							<span class="mx-auto" style="font-size: 0.8rem">Thousands</span>
						</label>
					</div>
					<input id="thousands" v-model="thousandsFormat" type="text" class="form-control w-50" placeholder=",">
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" data-tippy-content="If the field can start blank and be cleared out by user">
							<span class="mx-auto" style="font-size: 0.9rem">Blank</span>
						</label>
					</div>
					<input id="allowBlank" class="btn-check" v-model="config.allowBlank" type="checkbox">
					<label for="allowBlank" class="btn btn-primary btn-block w-50">{{ config.allowBlank ? 'Active' : 'Inactive' }}</label>
				</div>
			</div>
			<div class="col">
				<div class="input-group mb-4">
					<div class="input-group-text w-50">
						<label class="mx-auto" data-tippy-content="If the component output should include the mask or not">
							<span class="mx-auto" style="font-size: 0.9rem">Masked</span>
						</label>
					</div>
					<input id="masked" class="btn-check" v-model="config.masked" type="checkbox">
					<label for="masked" class="btn btn-primary btn-block w-50">{{ config.masked ? 'Active' : 'Inactive' }}</label>
				</div>
			</div>
		</div>
		<hr class="d-none d-md-block">
		<div class="row mt-4 mt-md-0">
			<div class="col-6 offset-3 text-center h2">
				{{ amount }}
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
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
        amount: 1748.36,
				config: {
					spinner: true,
					step: 10,
					min: -10,
					max: 2000,
					prefix: "$ ",
					suffix: " MXN",
					precision: 2,
					decimal: '.',
					thousands: ',',
					template: 'bootstrap',
					masked: true,
					allowBlank: false,
					disableNegative: false,

					// Docs
					inputClass: 'form-control-lg',
					labelClass: 'h2',
				},
				template_type: true,
        //Style
				style: null,
				bootstrap: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css',
			}
		},
		mounted: function () {
	  	tippy('[data-tippy-content]')
      this.style = document.createElement('link')
			this.style.type = "text/css"
			this.style.rel = "stylesheet"
			this.style.href = this.bootstrap
			document.head.appendChild(this.style)
		},
		computed:{
			stepDesimal:{
				get: function () {
					let d = ''
					for (let i = 0; i < this.config.precision; i++) {
						d += '0'
					}
					d+= '1'
					if (this.config.precision > 0) {
						d = [d.slice(0, 1), '.', d.slice(1)].join('');
					}
					return d;
				}
			},
			stepFormat: {
				get: function () {
					return parseFloat(this.config.step).toFixed(this.config.precision)
				},
				set: function (v) {
					if (!isNaN(parseFloat(v))) {
						this.config.step = parseFloat(v)
					}
				}
			},
			precisionFormat: {
				get: function () {
					return parseInt(this.config.precision)
				},
				set: function (v) {
					if (!isNaN(parseInt(v))) {
						this.config.precision = parseInt(v)
					}
				}
			},
			prefixFormat: {
				get: function () {
					return this.config.prefix
				},
				set: function (v) {
					this.config.prefix = v.replace(/\d+$/, '')
				}
			},
			suffixFormat: {
				get: function () {
					return this.config.suffix
				},
				set: function (v) {
					this.config.suffix = v.replace(/\d*/, '')
				}
			},
			decimalFormat: {
				get: function () {
					return this.config.decimal
				},
				set: function (v) {
					this.config.decimal = v.replace(/\d/g, '')
				}
			},
			thousandsFormat: {
				get: function () {
					return this.config.thousands
				},
				set: function (v) {
					this.config.thousands = v.replace(/\d/g, '')
				}
			},
			disableNegative: {
				get: function () {
					return !this.config.disableNegative
				},
				set: function (v) {
					this.config.disableNegative = !v
				}
			}
		},
		watch:{
			template_type: function (val) {
				this.config.spinner = true
				if (val) {
					this.config.inputClass = 'form-control-lg rounded-0'
					this.config.labelClass = 'h2'
					this.config.template = 'bootstrap'
				}else{
					this.config.inputClass = this.config.labelClass = this.wrapperGroupClass = ''
					this.config.template = false
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

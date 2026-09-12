<template>
  <div class="sticky top-0 z-10 bg-white shadow">
    <a
      href="https://github.com/joserick/v-money-spinner"
      class="github-corner"
      aria-label="View source on GitHub">
      <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <VMoneySpinner
      ref="money"
      name="amount"
      v-model="amount"
      v-bind="config"
      label="Vuejs Money Spinner"
      wrapper-class="w-full max-w-md mx-auto px-4 py-10 text-center"/>
  </div>

  <main class="mx-auto mt-8 max-w-5xl px-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Apply spinner buttons to the input">
          Spinner
        </label>
        <button type="button" :class="toggleClass(config.spinner)" @click="config.spinner = !config.spinner">
          {{ config.spinner ? 'Active' : 'Inactive' }}
        </button>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Number of steps">
          Step
        </label>
        <input v-model="stepFormat" type="number" min="0" :step="stepDesimal" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="1">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="How many decimal places">
          Precision
        </label>
        <input v-model.number="precisionFormat" type="number" min="0" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="2">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="The min value allowed">
          Minimum
        </label>
        <input v-model.number="config.min" type="number" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="-infinite">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="The max value allowed">
          Maximum
        </label>
        <input v-model.number="config.max" type="number" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="infinite">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Apply template styles">
          Template
        </label>
        <div class="flex w-3/5 divide-x divide-gray-200">
          <button
            v-for="state in templateStates"
            :key="state.value"
            type="button"
            :class="segmentClass(templateState === state.value)"
            @click="templateState = state.value">
            {{ state.label }}
          </button>
        </div>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Currency symbol followed by a Space, like '$ '">
          Prefix
        </label>
        <input v-model="prefixFormat" type="text" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="$">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Percentage for example: ' MXN'">
          Suffix
        </label>
        <input v-model="suffixFormat" type="text" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="MXN">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Allow negative values">
          Negatives
        </label>
        <button type="button" :class="toggleClass(negativesActive)" @click="negativesActive = !negativesActive">
          {{ config.disableNegative ? 'Inactive' : 'Active' }}
        </button>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Decimal separator">
          Decimal
        </label>
        <input v-model="decimalFormat" type="text" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder=".">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Thousands separator">
          Thousands
        </label>
        <input v-model="thousandsFormat" type="text" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder=",">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="If the field can start blank and be cleared out by user">
          Blank
        </label>
        <button type="button" :class="toggleClass(config.allowBlank)" @click="config.allowBlank = !config.allowBlank">
          {{ config.allowBlank ? 'Active' : 'Inactive' }}
        </button>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="If the component output should include the mask or not">
          Masked
        </label>
        <button type="button" :class="toggleClass(config.masked)" @click="config.masked = !config.masked">
          {{ config.masked ? 'Active' : 'Inactive' }}
        </button>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Insert 0 digit that comes before the first nonzero digit">
          Leading-Zero
        </label>
        <input v-model.number="minCharactersFormat" type="number" min="0" class="w-3/5 px-3 py-2 text-sm focus:outline-none" placeholder="2">
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Determine the position of the buttons">
          Spinner Align
        </label>
        <div class="flex w-3/5 divide-x divide-gray-200">
          <button
            v-for="option in alignOptions"
            :key="option"
            type="button"
            :class="segmentClass(config.spinnerAlign === option)"
            @click="config.spinnerAlign = option">
            {{ option }}
          </button>
        </div>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="When focus, set the cursor to the far right">
          Focus On Right
        </label>
        <button type="button" :class="toggleClass(config.focusOnRight)" @click="config.focusOnRight = !config.focusOnRight">
          {{ config.focusOnRight ? 'Active' : 'Inactive' }}
        </button>
      </div>

      <div class="flex items-stretch overflow-hidden rounded-md border border-gray-300">
        <label class="flex w-2/5 items-center bg-gray-100 px-3 text-sm text-gray-600" data-tippy-content="Determine the position of the input text">
          Align input text
        </label>
        <div class="flex w-3/5 divide-x divide-gray-200">
          <button
            v-for="option in alignOptions"
            :key="option"
            type="button"
            :class="segmentClass(config.align === option)"
            @click="config.align = option">
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <hr class="my-6 hidden sm:block">

    <div class="mt-6 text-center text-3xl font-semibold">
      {{ amount }}
    </div>
  </main>

  <footer class="mt-12 bg-gray-900 py-12 text-center text-white">
    <h2 class="text-4xl font-bold">More Information</h2>
    <p class="mt-3 text-gray-300">If you require more information for installation and configuration you can visit our repository in:</p>
    <a class="mt-4 inline-block rounded-md bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500" href="https://github.com/joserick/v-money-spinner">
      https://github.com/joserick/v-money-spinner »
    </a>
  </footer>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import VMoneySpinner from '../money_spinner.vue'

  declare const tippy: ((selector: string) => unknown) | undefined

  type TemplateState = 'tailwind' | 'bootstrap' | 'none'

  interface DemoConfig {
    spinner: boolean
    step: number
    min: number | null
    max: number | null
    prefix: string
    suffix: string
    precision: number
    decimal: string
    thousands: string
    template: string | boolean
    masked: boolean
    allowBlank: boolean
    disableNegative: boolean
    minCharacters: number
    spinnerAlign: string
    align: string
    focusOnRight: boolean
    inputClass: string
    labelClass: string
  }

  const money = ref()
  const amount = ref(1748.36)
  const templateState = ref<TemplateState>('tailwind')

  const config = reactive<DemoConfig>({
    spinner: true,
    step: 10,
    min: -10,
    max: 2000,
    prefix: '$ ',
    suffix: ' MXN',
    precision: 2,
    decimal: '.',
    thousands: ',',
    template: 'tailwind',
    masked: true,
    allowBlank: false,
    disableNegative: false,
    minCharacters: 0,
    spinnerAlign: 'normal',
    align: 'center',
    focusOnRight: false,
    inputClass: 'text-2xl py-3',
    labelClass: 'text-2xl font-semibold'
  })

  const templateStates: { value: TemplateState; label: string }[] = [
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'bootstrap', label: 'Bootstrap' },
    { value: 'none', label: 'None' }
  ]

  const alignOptions = ['start', 'center', 'end']

  const bootstrapHref = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  let bootstrapLink: HTMLLinkElement | null = null

  const setBootstrap = (enabled: boolean) => {
    if (enabled && !bootstrapLink) {
      bootstrapLink = document.createElement('link')
      bootstrapLink.rel = 'stylesheet'
      bootstrapLink.href = bootstrapHref
      document.head.appendChild(bootstrapLink)
    } else if (!enabled && bootstrapLink) {
      bootstrapLink.remove()
      bootstrapLink = null
    }
  }

  watch(templateState, (state) => {
    config.spinner = true
    if (state === 'tailwind') {
      config.template = 'tailwind'
      config.inputClass = 'text-2xl py-3'
      config.labelClass = 'text-2xl font-semibold'
    } else if (state === 'bootstrap') {
      config.template = 'bootstrap'
      config.inputClass = 'form-control-lg rounded-0'
      config.labelClass = 'h2'
    } else {
      config.template = false
      config.inputClass = ''
      config.labelClass = ''
    }
    setBootstrap(state === 'bootstrap')
  })

  const stepDesimal = computed(() => {
    let d = ''
    for (let i = 0; i < config.precision; i++) {
      d += '0'
    }
    d += '1'
    if (config.precision > 0) {
      d = [d.slice(0, 1), '.', d.slice(1)].join('')
    }
    return d
  })

  const stepFormat = computed({
    get: () => parseFloat(String(config.step)).toFixed(config.precision),
    set: (v: string) => {
      if (!isNaN(parseFloat(v))) {
        config.step = parseFloat(v)
      }
    }
  })

  const precisionFormat = computed({
    get: () => config.precision,
    set: (v: number) => {
      if (!isNaN(v)) {
        config.precision = v
      }
    }
  })

  const prefixFormat = computed({
    get: () => config.prefix,
    set: (v: string) => {
      config.prefix = v.replace(/\d+$/, '')
    }
  })

  const suffixFormat = computed({
    get: () => config.suffix,
    set: (v: string) => {
      config.suffix = v.replace(/\d*/, '')
    }
  })

  const decimalFormat = computed({
    get: () => config.decimal,
    set: (v: string) => {
      config.decimal = v.replace(/\d/g, '')
    }
  })

  const thousandsFormat = computed({
    get: () => config.thousands,
    set: (v: string) => {
      config.thousands = v.replace(/\d/g, '')
    }
  })

  const negativesActive = computed({
    get: () => !config.disableNegative,
    set: (v: boolean) => {
      config.disableNegative = !v
    }
  })

  const minCharactersFormat = computed({
    get: () => config.minCharacters,
    set: (v: number) => {
      if (!isNaN(v)) {
        config.minCharacters = v
      }
    }
  })

  const segmentClass = (active: boolean) =>
    active
      ? 'flex-1 bg-indigo-600 px-1 py-2 text-xs font-medium text-white'
      : 'flex-1 bg-white px-1 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100'

  const toggleClass = (active: boolean) =>
    active
      ? 'w-3/5 bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500'
      : 'w-3/5 bg-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-300'

  onMounted(() => {
    if (typeof tippy === 'function') {
      tippy('[data-tippy-content]')
    }
  })

  onBeforeUnmount(() => {
    setBootstrap(false)
  })
</script>

<style>
  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
  @keyframes octocat-wave {
    0%, 100% { transform: rotate(0); }
    20%, 60% { transform: rotate(-25deg); }
    40%, 80% { transform: rotate(10deg); }
  }
  @media (max-width: 500px) {
    .github-corner:hover .octo-arm {
      animation: none;
    }
    .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
</style>

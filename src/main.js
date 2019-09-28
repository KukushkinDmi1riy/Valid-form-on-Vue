import Vue from 'vue'
import Vuelidate from 'vuelidate' // библиотеки с библиотеками, компоненты с компонентами
import App from './App.vue'


Vue.use(Vuelidate)

new Vue({
  el: '#app',
  render: h=>h(App)
  
})


import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter, faSoundcloud, faMixcloud, faDiscord, faTwitch, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import VueGtag from 'vue-gtag'
import App from './App.vue'
import i18n from './i18n'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import './styles/main.sass'

library.add(faTwitter, faSoundcloud, faMixcloud, faDiscord, faTwitch, faInstagram, faFacebookF, faEarthAsia)

const app = createApp(App)

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(i18n)
  .use(VueGtag, { config: { id: 'G-6E15JTQ95D' } })
  .mount('#app')

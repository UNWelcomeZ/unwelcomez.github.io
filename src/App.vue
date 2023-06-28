<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useSwipe } from '@vueuse/core'
import gsap from 'gsap'
import LogoVRC from '@/components/LogoVRC.vue'
import HomePage from '@/components/HomePage.vue'
import DJPage from '@/components/DJPage.vue'
import EventsPage from '@/components/EventsPage.vue'
import TwitterPage from '@/components/TwitterPage.vue'
import { useI18n } from 'vue-i18n'
import { loadFull } from 'tsparticles'

const bg = ref(null)

/** Particles **/
const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#4fc3fc', '#ff2d75']
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 10,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: '#ffffff',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'top',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'bubble'
      },
      onclick: {
        enable: false,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 0.5
        }
      },
      bubble: {
        distance: 400,
        size: 4,
        duration: 0.3,
        opacity: 1,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
}
const particlesInit = async engine => {
  await loadFull(engine)
  animate()
}

/** Components **/
const components = [HomePage, DJPage, EventsPage, TwitterPage]
const componentRefs = ref([])

/** Animate **/
const animate = () => {
  // Loading faeout
  gsap.to('#loading', {
    duration: 0.5,
    autoAlpha: 0,
    delay: 2.0,
    onStart () {
      document.querySelector('#loading .ld-fade').classList.remove('ld-fade')
    },
    onComplete () {
      componentRefs.value[0].animate()
    }
  })
  gsap.to('#header .fade-in, #footer .fade-in', {
    duration: 2,
    opacity: 1,
    delay: 2.5,
    onStart () {
    }
  })
}

/** Locale **/
const { locale } = useI18n({ useScope: 'global' })
const langs = [
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' }
]
const setLocale = (lang) => {
  locale.value = lang
}

/** FullPage.js **/
const fullpage = ref(null)
const onFullLeave = (origin, destination, direction, trigger) => {
  bg.value.style.backgroundPosition = 'center ' + origin.index * 20 * -1 + 'px'
  if (origin !== 0) {
    setTimeout(() => {
      componentRefs.value[destination.index].animate()
    }, 150)
  }
}
const fullPageOptions = {
  licenseKey: 'gplv3-license',
  navigation: true,
  navigationPosition: 'right',
  onLeave: onFullLeave
}
</script>

<template lang="pug">
#loading
  .row.w-100
    .col-12.text-center
      img.ld.ld-fade(src="@/assets/emoji.webp")
      h4.text-white.my-5 #VRC_UNWZ
#bg(ref='bg')
  Particles(
    id="tsparticles"
    :particlesInit="particlesInit"
    :options="particlesOptions"
  )
nav.navbar.navbar-expand-sm.navbar-dark.fixed-top#header
  .container
    a.navbar-brand.fade-in(href='#' @click.prevent='scrollToSection(0)')
      img(src='./assets/nav.webp')
    button.navbar-toggler(type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation")
      span.navbar-toggler-icon
    .collapse.navbar-collapse#navbar-content
      ul.navbar-nav.ms-auto.mb-lg-0
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://twitter.com/VRC_UNWelcomeZ' target='_blank')
            font-awesome-icon.fa-fw(:icon="['fab', 'twitter']")
            span.d-sm-none &emsp;Twitter
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://www.facebook.com/profile.php?id=100091842720646' target='_blank')
            font-awesome-icon.fa-fw(:icon="['fab', 'facebook-f']")
            span.d-sm-none &emsp;Facebook
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://discord.gg/BPpNaUTxMy' target='_blank')
            font-awesome-icon.fa-fw(:icon="['fab', 'discord']")
            span.d-sm-none &emsp;Discord
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://www.twitch.tv/twitch_unwelcomez' target='_blank')
            font-awesome-icon.fa-fw(:icon="['fab', 'twitch']")
            span.d-sm-none &emsp;Twitch
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://vrchat.com/home/group/grp_519b637b-c5b8-4d5c-a024-e5b688fc45d7' target='_blank')
            LogoVRC.fa-fw
            span.d-sm-none &emsp;VRC Group
        li.nav-item.dropdown
          a.nav-link.dropdown-toggle.fade-in(href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false')
            font-awesome-icon.fa-fw(:icon="['fas', 'earth-asia']")
            span.d-sm-none &emsp;{{ $t('nav.languages') }}
          ul.dropdown-menu
            li(v-for='lang in langs' :key='lang.code')
              a.dropdown-item(@click.prevent='setLocale(lang.code)' :class="{ active: lang.code === locale }" href='#') {{ lang.name }}
#sections-menu
  span.menu-point(v-for='(offset, idx) in offsets' :key='idx' :class='{active: activeSection == idx}' @click='scrollToSection(idx)')
full-page#fullpage(ref="fullpage" :options="fullPageOptions")
  component(v-for='(component, idx) in components' :key='idx' :is='component' ref='componentRefs')
footer#footer
  .row.h-100.align-items-center
    .col-12
      a.text-center.text-white.d-block.fade-in.text-decoration-none(href='https://twitter.com/hashtag/VRC_UNWZ' target='_blank') #VRC_UNWZ
</template>

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

/** CSS Doodle background **/
const bg = ref(null)
// const doodle = ref(null)
// const cssDoodle = () => import(
//   /* webpackChunkName: "css-doodle" */
//   /* webpackMode: "eager" */
//   'css-doodle'
// )

/** Fullpage scroll, edited from https://codepen.io/WebDEasy/pen/NVOEBL **/
const inMove = ref(true)
const activeSection = ref(0)
const offsets = reactive([])

const isModalOpen = () => document.body.classList.contains('modal-open')

const calculateSectionOffsets = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  const sections = document.querySelectorAll('section.fullpage')
  const length = sections.length
  offsets.splice(0, offsets.length)
  for (let i = 0; i < length; i++) {
    const sectionOffset = sections[i].offsetTop
    offsets.push(sectionOffset)
  }
  scrollToSection(activeSection.value, true)
}
const handleMouseWheel = (e) => {
  if (inMove.value) return false
  if (e.wheelDelta < 30) moveUp()
  else if (e.wheelDelta > 30) moveDown()
  e.preventDefault()
  return false
}
const handleMouseWheelDOM = (e) => {
  if (inMove.value) return false

  if (e.detail > 0) moveUp()
  else if (e.detail < 0) moveDown()

  return false
}
const moveDown = () => {
  if (isModalOpen()) return

  inMove.value = true
  activeSection.value--

  if (activeSection.value < 0) activeSection.value = offsets.length - 1

  scrollToSection(activeSection.value, true)
}
const moveUp = () => {
  if (isModalOpen()) return

  inMove.value = true
  activeSection.value++

  if (activeSection.value > offsets.length - 1) activeSection.value = 0

  scrollToSection(activeSection.value, true)
}
const scrollToSection = (id, force = false) => {
  if ((inMove.value && !force) || isModalOpen()) return
  activeSection.value = id
  inMove.value = true
  document.getElementById('content').style.transform = `translate3d(0px, ${window.innerHeight * id * -1}px, 0px)`
  bg.value.style.backgroundPosition = 'center ' + activeSection.value * 20 * -1 + 'px'
  setTimeout(async () => {
    await componentRefs.value[activeSection.value].animate()
    inMove.value = false
  }, 400)
}

const swipeTarget = ref(null)
let swipping = false
useSwipe(
  swipeTarget,
  {
    passive: false,
    onSwipeStart (e) {
      setTimeout(() => {
        if (swipping) return

        if (e.target.classList.contains('swiper-button-next') || e.target.classList.contains('swiper-button-prev')) {
          e.target.click()
        } else if (activeSection.value === 1) {
          // e.target is card img
          const card = e.target?.parentElement?.parentElement
          if (card?.classList?.contains('card-dj')) {
            e.target.click()
          }
        } else if (activeSection.value === 2) {
          // e.target is card img
          const card = e.target?.parentElement?.parentElement
          if (card?.classList?.contains('card-event')) {
            e.target.click()
          }
        }
      }, 100)
    },
    onSwipe (e) {
      swipping = true
    },
    onSwipeEnd (e, direction) {
      swipping = false

      if (inMove.value) return

      if (direction === 'UP') moveUp()
      else if (direction === 'DOWN') moveDown()
    }
  }
)

/** Components **/
const components = [HomePage, DJPage, EventsPage, TwitterPage]
const componentRefs = ref([])

/** Animate **/
const animate = () => {
  gsap.to('#loading', {
    duration: 0.5,
    autoAlpha: 0,
    delay: 1.5
  })
  gsap.to('#header .fade-in, #footer .fade-in', {
    duration: 2,
    opacity: 1,
    delay: 2,
    onStart () {
      inMove.value = false
      calculateSectionOffsets()
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

/** Lifecycles **/
onMounted(async () => {
  try {
    // await cssDoodle()
    // await nextTick()

    // doodle.value = bg.value.firstElementChild
    // doodle.value.update()

    window.addEventListener('DOMMouseScroll', handleMouseWheelDOM) // Mozilla Firefox
    window.addEventListener('mousewheel', handleMouseWheel, { passive: false }) // Other browsers
    window.addEventListener('resize', calculateSectionOffsets)

    animate()
  } catch (error) {
    if (import.meta.env.DEV) {
      console.log(error)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('mousewheel', handleMouseWheel, { passive: false }) // Other browsers
  window.removeEventListener('DOMMouseScroll', handleMouseWheelDOM) // Mozilla Firefox
  window.removeEventListener('resize', calculateSectionOffsets)
})
</script>

<template lang="pug">
#loading
  .row.w-100
    .col-12
      .loader-container.w-100
        .loader
          span
        .loader
          span
        .loader
          i
        .loader
          i
    .col-12.my-3
      h4.text-white.text-center #VRC_UNWZ
#bg(ref='bg')
  //- CSS Doodle Remake
  //- https://www.youtube.com/watch?v=wuUSVEcK-kM
  //- css-doodle(v-pre).
  //-   :doodle {
  //-     @grid: 7x7 / 100vmax;
  //-     position: relative;
  //-     top: 0; left: 0;
  //-     z-index: 0;
  //-   }

  //-   left: @r(100%);
  //-   border-radius: 50%;
  //-   bottom: 0;

  //-   @size: 5% 5%;
  //-   position: absolute;

  //-   background:
  //-     @p(
  //-       radial-gradient(circle at center, #4fc3fc 0%, #4fc3fc00 100%),
  //-       radial-gradient(circle at center, #ff2d75 0%, #ff2d7500 100%),
  //-     )
  //-     @r(0%, 100%) @r(0%, 100%) /
  //-     100% 100%
  //-     no-repeat;

  //-   will-change: transform;
  //-   animation: f 10s linear calc(-20s / @size() * @i()) infinite;
  //-   filter: blur(5px);
  //-   @keyframes f {
  //-     from { transform: scale(0%); bottom: 0; }
  //-     to { transform: scale(100%); bottom: 100%; }
  //-   }
nav.navbar.navbar-expand.navbar-dark.fixed-top#header
  .container
    a.navbar-brand.fade-in(href='#' @click.prevent='scrollToSection(0)')
      img(src='./assets/nav.png')
    .collapse.navbar-collapse#navbarSupportedContent
      ul.navbar-nav.ms-auto.mb-lg-0
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://twitter.com/search?q=%23VRC_UNWZ&src=typed_query&f=live' target='_blank')
            font-awesome-icon(:icon="['fab', 'twitter']")
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://www.twitch.tv/twitch_unwelcomez' target='_blank')
            font-awesome-icon(:icon="['fab', 'twitch']")
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://discord.gg/BPpNaUTxMy' target='_blank')
            font-awesome-icon(:icon="['fab', 'discord']")
        li.nav-item
          a.nav-link.link-light.fade-in(href='https://vrchat.com/home/group/grp_519b637b-c5b8-4d5c-a024-e5b688fc45d7' target='_blank')
            LogoVRC
        li.nav-item.dropdown
          a.nav-link.dropdown-toggle.fade-in(href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false')
            font-awesome-icon(:icon="['fas', 'earth-asia']")
          ul.dropdown-menu
            li(v-for='lang in langs' :key='lang.code')
              a.dropdown-item(@click.prevent='setLocale(lang.code)' :class="{ active: lang.code === locale }" href='#') {{ lang.name }}
#sections-menu
  span.menu-point(v-for='(offset, idx) in offsets' :key='idx' :class='{active: activeSection == idx}' @click='scrollToSection(idx)')
#content(ref='swipeTarget')
  component(v-for='(component, idx) in components' :key='idx' :is='component' ref='componentRefs')
footer#footer
  .row.h-100.align-items-center
    .col-12
      a.text-center.text-white.d-block.fade-in.text-decoration-none(href='https://twitter.com/hashtag/VRC_UNWZ' target='_blank') #VRC_UNWZ
</template>

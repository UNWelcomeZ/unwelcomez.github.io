<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import gsap, { Expo } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper'

const events = [
  {
    name: 'UNWPA Vol.1',
    sub: 'DJ 五人眾，媽的貢丸',
    image: new URL('../assets/events/vol1.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol1-time.webp', import.meta.url).href,
    date: '2022/10/08 20:00'
  },
  {
    name: 'UNWPA Vol.2',
    sub: '幹你小高',
    image: new URL('../assets/events/vol2.webp', import.meta.url).href,
    imageTime: null,
    date: '2022/11/12 20:00'
  },
  {
    name: 'UNWPA Vol.3',
    sub: '藍色妖姬',
    image: new URL('../assets/events/vol3.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/03/24 20:00'
  },
  {
    name: 'UNWPA Vol.4',
    sub: '五月生日眾',
    image: new URL('../assets/events/vol4.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/05/06 20:00'
  },
  {
    name: 'UNWPA Vol.5',
    sub: '頂上戰爭',
    image: new URL('../assets/events/vol5.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol5-time.webp', import.meta.url).href,
    date: '2023/06/10 19:30'
  },
  {
    name: 'UNWPA Vol.6',
    sub: '少打音遊多讀書',
    image: new URL('../assets/events/vol6.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/08/26 20:00'
  },
  {
    name: 'UNWPA Vol.7',
    sub: '1st-Our Show',
    image: new URL('../assets/events/vol7.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol7-time.webp', import.meta.url).href,
    date: '2023/10/07 20:00'
  },
  {
    name: 'UNWPA Vol.8',
    sub: 'It’s so UwU',
    image: new URL('../assets/events/vol8.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/12/23 20:00'
  },
  {
    name: 'UNWPA Vol.9',
    sub: 'MY FAVORITE NUMBER - 69',
    image: new URL('../assets/events/vol9.webp', import.meta.url).href,
    imageTime: null,
    date: '2024/06/09 19:00'
  },
  {
    name: 'UNWPA Vol.10',
    sub: 'VS - ROUND 2',
    image: new URL('../assets/events/vol10.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol10-time.webp', import.meta.url).href,
    date: '2024/08/10 19:30'
  },
  {
    name: 'UNWPA Vol.11',
    sub: '2nd Anniversary',
    image: new URL('../assets/events/vol11.webp', import.meta.url).href,
    imageTime: null,
    date: '2024/10/26 20:00'
  },
  {
    name: 'UNWPA Vol.12',
    sub: 'RHYTHM GAMES Track. 02',
    image: new URL('../assets/events/vol12.webp', import.meta.url).href,
    imageTime: null,
    date: '2024/12/14 20:00'
  },
  {
    name: 'Unite With UNWZ',
    sub: 'UNWelcomeZ 3rd Anniversary',
    image: new URL('../assets/events/unite2025.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/unite2025-time.webp', import.meta.url).href,
    date: '2025/10/11 13:00'
  }
].reverse()

/** Modal **/
let modal = null
const modalRef = ref(null)
const modalEvent = ref(0)
const modalSet = ref(0)
const showModal = (idx) => {
  modalEvent.value = idx
  modalSet.value = 0
  modal.show()
  swiperRef.value.autoplay.pause()
}

/** Animate **/
const eventRefs = ref([])
const animated = ref(false)
const animate = () => {
  return new Promise((resolve) => {
    if (animated.value) {
      resolve()
      return
    }
    animated.value = true
    gsap.to('#events .overlay-right', {
      duration: 2,
      '--afterWidth': 0,
      ease: Expo.easeOut
    })
    for (const i in eventRefs.value) {
      gsap.to(eventRefs.value[i], {
        duration: 1,
        opacity: 1,
        delay: 0.5 * i,
        ease: Expo.easeOut,
        onComplete () {
          // Start swiper autoplay when page scroll into view
          swiperRef.value.autoplay.start()
          resolve()
        }
      })
    }
  })
}
defineExpose({ animate })

/** Swiper **/
const swiperRef = ref(null)
// Stop autoplay

const getSwiperRef = (swiperInstance) => {
  swiperRef.value = swiperInstance
  swiperRef.value.autoplay.stop()
}

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  navigation: {
    prevEl: '#swiper-event-prev',
    nextEl: '#swiper-event-next'
  },
  modules: [Navigation, Autoplay],
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  },
  autoplay: {
    delay: 5000
  }
  // loop: true
}

/** Lifcycles **/
onMounted(() => {
  modal = new Modal('#modal-event')
  modalRef.value.addEventListener('hidden.bs.modal', () => {
    swiperRef.value.autoplay.run()
  })
})
</script>

<template lang="pug">
section.section#events
  .container.h-100
    .row.align-content-center.justify-content-center.h-100
      .col-12.overlay-right
        h1.text-white.text-center Events
        //- hr.opacity-100.bg-white
      .col-1.position-relative
        #swiper-event-prev.swiper-button-prev
      .col-8#events-wrapper
        Swiper(v-bind='swiperOptions' @swiper='getSwiperRef')
          SwiperSlide(v-for='(event, idx) in events' :key='idx' ref='eventRefs')
            .card-event(:id='"event-"+(idx+1)' @click='showModal(idx)')
              span
                img.card-event-img(:alt='event.name' :src='event.image')
            .text-white.text-center.my-3
              p.h4 {{ event.name }}
      .col-1.position-relative
        #swiper-event-next.swiper-button-next
Teleport(to='body')
  .modal.fade#modal-event(ref="modalRef")
    .modal-dialog.modal-dialog-centered.modal-xl
      .modal-content-wrapper
        .modal-content.position-relative
          .modal-close.position-absolute
            button(type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close")
          .modal-header
            h5.modal-title.text-center.w-100
              | {{ events[modalEvent].name }}
              br
              | {{ events[modalEvent].sub }}
              br
              span.h6.text-white {{ events[modalEvent].date }}
          .modal-body.d-none.d-sm-block
            .container-fluid
              .row.justify-content-center
                .col-6.poster-wrapper
                  img.poster(:alt='events[modalEvent].name' :class='{"poster-left": events[modalEvent].imageTime}' :src='events[modalEvent].image')
                .col-6.poster-wrapper(v-if='events[modalEvent].imageTime')
                  img.poster.poster-right(:alt='events[modalEvent].name' :src='events[modalEvent].imageTime')
</template>

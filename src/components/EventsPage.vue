<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import gsap, { Expo } from 'gsap'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper'

const events = [
  {
    name: 'UNWPA Vol.1',
    sub: 'DJ 五人眾，媽的貢丸',
    image: new URL('../assets/events/vol1.jpg', import.meta.url).href,
    imageTime: new URL('../assets/events/vol1-time.jpg', import.meta.url).href,
    date: '2022/10/08 20:00',
    sets: [
      {
        dj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol1%2F'
      },
      {
        dj: 'StarlightPoetry',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FStarlightPoetry%2Funwpa-vol1-starlightpoetry%2F'
      },
      {
        dj: 'DJ_Jill',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FDJ_JILL%2F20221008-unwpa-vol1-jpop-remix%2F'
      },
      {
        dj: 'Eliot',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Feliot0507%2Funwpa-vol1-20221008%2F'
      },
      {
        dj: 'Xiaokao',
        player: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1360676227&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
      }
    ]
  },
  {
    name: 'UNWPA Vol.2',
    sub: '幹你小高',
    image: new URL('../assets/events/vol2.jpg', import.meta.url).href,
    imageTime: null,
    date: '2022/10/08 20:00',
    sets: [
      {
        dj: 'DJ_Jill',
        player: ''
      },
      {
        dj: 'Vengtz',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fvengtz%2Funwpa-vol2-%E7%88%86%E7%99%BA%2F'
      },
      {
        dj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol2%2F'
      },
      {
        dj: '九彌 Kuya',
        player: ''
      },
      {
        dj: 'Roxwindy',
        player: ''
      },
      {
        dj: 'Xiaokao',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FXiaokao%2Funwap-vol2-%E5%9B%82%E5%91%8A%2F'
      }
    ]
  }
]

/** Modal **/
let modal = null
const modalEvent = ref(0)
const modalSet = ref(0)
const showModal = (idx) => {
  modalEvent.value = idx
  modalSet.value = 0
  modal.show()
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
})
</script>

<template lang="pug">
section.fullpage#events
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
                img.card-event-img(:src='event.image')
            .text-white.text-center.my-3
              h4 {{ event.name }}
      .col-1.position-relative
        #swiper-event-next.swiper-button-next
Teleport(to='body')
  .modal.fade#modal-event
    .modal-dialog.modal-dialog-centered.modal-xl
      .modal-content-wrapper
        .modal-content
          .modal-header
            h5.modal-title.text-center.w-100
              | {{ events[modalEvent].name }}
              br
              | {{ events[modalEvent].sub }}
              br
              span.text-muted {{ events[modalEvent].date }}
          .modal-body
            .container-fluid
              .row.justify-content-center
                .col-6.poster-wrapper
                  img.poster(:class='{"poster-left": events[modalEvent].imageTime}' :src='events[modalEvent].image')
                .col-6.poster-wrapper(v-if='events[modalEvent].imageTime')
                  img.poster.poster-right(:src='events[modalEvent].imageTime')
          .modal-footer
            .container-fluid
              .row
                .col-12
                  ul.nav.justify-content-center
                    li.nav-item(v-for='(set, idx) in events[modalEvent].sets' :key='idx')
                      a.nav-link(:class="{ disabled: idx !== modalSet}" href='#' @click='modalSet = idx') {{ set.dj }}
                .col-12
                  iframe.w-100(v-if='events[modalEvent].sets[modalSet].player' height="120" :src="events[modalEvent].sets[modalSet].player" frameborder="0")
                  h4.my-2.text-white.text-center(v-else) - NOT UPLOADED -
</template>

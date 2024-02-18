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
    image: new URL('../assets/events/vol1.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol1-time.webp', import.meta.url).href,
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
    image: new URL('../assets/events/vol2.webp', import.meta.url).href,
    imageTime: null,
    date: '2022/11/12 20:00',
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
  },
  {
    name: 'UNWPA Vol.3',
    sub: '藍色妖姬',
    image: new URL('../assets/events/vol3.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/03/24 20:00',
    sets: [
      {
        dj: 'Eliot',
        player: ''
      },
      {
        dj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol3%2F'
      },
      {
        dj: 'LR163',
        player: ''
      },
      {
        dj: 'Xiaokao',
        player: ''
      },
      {
        dj: 'Zilka',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fzilka0116%2F324-unwpavol3-jill-birthday-set%2F'
      },
      {
        dj: 'DJ_Jill',
        player: ''
      }
    ]
  },
  {
    name: 'UNWPA Vol.4',
    sub: '五月生日眾',
    image: new URL('../assets/events/vol4.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/05/06 20:00',
    sets: [
      {
        dj: 'Xiaokao',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FXiaokao%2Funwap-vol4-hardcore-xiaokao%2F'
      },
      {
        dj: 'DJ_Jill',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FDJ_JILL%2F230506-unwpa-vol4-dubstep-jerseyclub-hardcore%2F'
      },
      {
        dj: 'Tamato_Poi',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FTamato_poi%2Funwpa-vol4-set%E5%86%8D%E7%8F%BE%2F'
      },
      {
        dj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol4%2F'
      },
      {
        dj: 'ROKUMORI',
        player: ''
      },
      {
        dj: 'Eliot',
        player: ''
      }
    ]
  },
  {
    name: 'UNWPA Vol.5',
    sub: '頂上戰爭',
    image: new URL('../assets/events/vol5.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol5-time.webp', import.meta.url).href,
    date: '2023/06/10 19:30',
    sets: [
      {
        dj: 'StarlightPoetry',
        vj: 'novu',
        player: ''
      },
      {
        dj: 'Eliot',
        vj: 'kste5000',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Feliot0507%2Funwpa-vol5-team-ims-20230610%2F'
      },
      {
        dj: 'DJ_Jill',
        vj: 'Yan-K',
        player: ''
      },
      {
        dj: 'Kento',
        vj: 'novu',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol5%2F'
      },
      {
        dj: 'Souya',
        vj: 'kste5000',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fdj_souya%2F20230610unwpa-vol5%E3%82%A2%E3%82%A4%E3%83%9E%E3%82%B9%E3%81%97%E3%81%8B%E5%8B%9D%E3%81%9F%E3%82%93%2F'
      },
      {
        dj: 'kuriko',
        vj: 'Yan-K',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkuriko_tw%2F20230610-unwpa-vol5%2F'
      },
      {
        dj: 'Xiaokao',
        vj: 'novu',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FXiaokao%2Funwpa-vol5-team-touhou-xiaokao%2F'
      },
      {
        dj: 'Yu5ei',
        vj: 'kste5000',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FThisIsYusei%2F230610-unwpa-vol5-side-ims%2F'
      },
      {
        dj: 'LR163',
        vj: 'Yan-K',
        player: ''
      }
    ]
  },
  {
    name: 'UNWPA Vol.6',
    sub: '少打音遊多讀書',
    image: new URL('../assets/events/vol6.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/08/26 20:00',
    sets: [
      {
        dj: 'DJ_Jill',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FDJ_JILL%2F230826-unwpa-vol6-maimai-setlist%2F'
      },
      {
        dj: 'Eliot',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Feliot0507%2Funwpa-vol6-rhythm-games-20230826%2F'
      },
      {
        dj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol6%2F'
      },
      {
        dj: 'RainyDays',
        player: ''
      },
      {
        dj: 'Xiaokao',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FXiaokao%2Funwpa-vol6-cytus%2F'
      },
      {
        dj: 'NeLiME',
        player: ''
      }
    ]
  },
  {
    name: 'UNWPA Vol.7',
    sub: '1st-Our Show',
    image: new URL('../assets/events/vol7.webp', import.meta.url).href,
    imageTime: new URL('../assets/events/vol7-time.webp', import.meta.url).href,
    date: '2023/10/07 20:00',
    sets: [
      {
        dj: 'Eliot',
        vj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Feliot0507%2Funwpa-vol7-1st-our-show-20231007%2F'
      },
      {
        dj: 'DJ_Jill',
        vj: 'Kento',
        player: ''
      },
      {
        dj: 'Xiaokao',
        vj: 'kste5000',
        player: ''
      },
      {
        dj: 'Kento',
        vj: 'kste5000',
        player: ''
      }
    ]
  },
  {
    name: 'UNWPA Vol.8',
    sub: 'It’s so UwU',
    image: new URL('../assets/events/vol8.webp', import.meta.url).href,
    imageTime: null,
    date: '2023/12/23 20:00',
    sets: [
      {
        dj: 'Kento',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fkento520%2Funwpa-vol8%2F'
      },
      {
        dj: '夕張蜜柑',
        player: 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fyuubarimikan%2Funwpa-vol8-its-so-uwu-2nd-dj%2F'
      },
      {
        dj: 'CAXZ',
        player: ''
      },
      {
        dj: 'Eliot',
        player: ' https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Feliot0507%2Funwpa-vol8-its-so-uwu-20231223%2F'
      },
      {
        dj: 'とかげ',
        player: ''
      }
    ]
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
                img.card-event-img(:src='event.image')
            .text-white.text-center.my-3
              h4 {{ event.name }}
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
              span.h6.text-muted {{ events[modalEvent].date }}
          .modal-body.d-none.d-sm-block
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
          .modal-footer
            .container-fluid
              .row
                .col-12
                  iframe.w-100(v-if='events[modalEvent].sets[modalSet].player' height="120" :src="events[modalEvent].sets[modalSet].player" frameborder="0")
                  h6.my-2.text-white.text-center(v-else) - NOT UPLOADED -
</template>

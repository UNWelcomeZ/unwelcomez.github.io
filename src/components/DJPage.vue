<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import gsap, { Expo } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper'

/** DJ data **/
const djs = [
  {
    name: 'Kento',
    role: 'Owner / DJ / VJ',
    image: new URL('../assets/dj/kento.jpg', import.meta.url).href,
    text: 'profile.kento',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/kentotw0520' },
      { type: 'soundcloud', link: 'https://soundcloud.com/kento0520' },
      { type: 'mixcloud', link: 'https://www.mixcloud.com/kento520/' }
    ]
  },
  {
    name: 'Xiaokao',
    role: 'DJ',
    image: new URL('../assets/dj/xiaokao.png', import.meta.url).href,
    text: 'profile.xiaokao',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/Xia0KAO' },
      { type: 'soundcloud', link: 'https://soundcloud.com/xiaokao' }
    ]
  },
  {
    name: 'Jill',
    role: 'DJ / Art',
    image: new URL('../assets/dj/jill.jpg', import.meta.url).href,
    text: 'profile.jill',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/DJ_Jill32' },
      { type: 'soundcloud', link: 'https://soundcloud.com/jill-dj' },
      { type: 'mixcloud', link: 'https://www.mixcloud.com/DJ_JILL/' }
    ]
  },
  {
    name: 'kste5000',
    role: 'Art / VJ',
    image: new URL('../assets/dj/kste.png', import.meta.url).href,
    text: 'profile.kste',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/kste5000' }
    ]
  },
  {
    name: 'Eliot',
    role: 'DJ',
    image: new URL('../assets/dj/eliot.png', import.meta.url).href,
    text: 'profile.eliot',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/eliot0507' },
      { type: 'instagram', link: 'https://www.instagram.com/eliot0507/' },
      { type: 'mixcloud', link: 'https://www.mixcloud.com/eliot0507/' }
    ]
  }
]

/** Modal **/
let modal = null
const modalDJ = ref(0)
const showModal = (idx) => {
  modalDJ.value = idx
  modal.show()
}

/** Animate **/
const djRefs = ref([])
const animated = ref(false)
const animate = () => {
  return new Promise((resolve) => {
    if (animated.value) {
      resolve()
      return
    }
    animated.value = true
    gsap.to('#dj .overlay-right', {
      duration: 2,
      '--afterWidth': 0,
      ease: Expo.easeOut
    })
    for (const i in djRefs.value) {
      gsap.to(djRefs.value[i], {
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
  navigation: {
    prevEl: '#swiper-dj-prev',
    nextEl: '#swiper-dj-next'
  },
  modules: [Navigation, Autoplay],
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  },
  autoplay: {
    delay: 5000
  },
  loop: true
}

/** Lifcycles **/
onMounted(() => {
  modal = new Modal('#modal-dj')
})
</script>

<template lang="pug">
section.fullpage#dj
  .container.h-100
    .row.align-content-center.justify-content-center.h-100
      .col-12.overlay-right
        h1.text-white.text-center Members
      //- hr.opacity-100.bg-white
      .col-1.position-relative
        #swiper-dj-prev.swiper-button-prev
      .col-8
        Swiper(v-bind='swiperOptions' @swiper='getSwiperRef')
          SwiperSlide(v-for='(dj, idx) in djs' :key='idx' ref='djRefs')
            .card-dj(:id='"dj-"+(idx+1)' @click='showModal(idx)')
              span
                img.card-dj-img(:src='dj.image')
            .text-white.text-center.my-3
              h4 {{ dj.name }}
      .col-1.position-relative
        #swiper-dj-next.swiper-button-next
Teleport(to='body')
  .modal.fade#modal-dj
    .modal-dialog.modal-dialog-centered.modal-lg
      .modal-content-wrapper
        .modal-content.position-relative
          .modal-close.position-absolute.d-none.d-lg-block
            button(type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close")
          .modal-header.border-0.d-flex.d-lg-none
            button(type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close")
          .modal-body
            .container-fluid
              .row
                .col-12.col-lg-6.text-center
                  img#modal-dj-avatar(:src='djs[modalDJ].image')
                .col-12.col-lg-6.my-3
                  .row.align-items-center.h-100
                    .col-12
                      h2.text-center {{ djs[modalDJ].name }}
                      h5.text-center.text-muted {{ djs[modalDJ].role }}
                    hr.opacity-100.bg-white
                    .col-12
                      p(v-html='$t(djs[modalDJ].text)')
                    hr.opacity-100.bg-white
                    .col-12
                      h4
                        a.link-light.mx-2(v-for='link in djs[modalDJ].sns' :href='link.link' target='_blank')
                          font-awesome-icon(:icon="['fab', link.type]")
</template>

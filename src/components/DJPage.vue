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
    role: 'Owner / DJ',
    image: new URL('../assets/dj/kento.jpg', import.meta.url).href,
    text: '大家好，我是 Kento，高中時玩 PSP 的 DJMAX P3 .2T 混音模式後開始對 DJ 產生興趣，2021年底參加了某 VRDJ 活動後看到了櫃子裡還沒用的五倍券，隔天就去三創抱一台控制器回家完成夢想了。',
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
    text: '我是小高 aka LittleHigh aka 高怡君<br>是個無情的 hardcore 機器人<br>在某次的 VRDJ 活動上啟發了開始 DJ 的想法<br>之後就開始炸觀眾了，歡迎大家來被我炸',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/Xia0KAO' },
      { type: 'soundcloud', link: 'https://soundcloud.com/xiaokao' }
    ]
  },
  {
    name: 'Jill',
    role: 'DJ',
    image: new URL('../assets/dj/jill.jpg', import.meta.url).href,
    text: 'Hi~ 我是 Jill，國中接觸到街機音遊，就開始熱愛上音樂，2022 年 3 月在 VRC 上接觸到 VRDJ 活動之後，就開始對 DJ 產生興趣，在同年的 7 月入手人生第一台 DDJ-400。',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/DJ_Jill32' },
      { type: 'soundcloud', link: 'https://soundcloud.com/jill-dj' },
      { type: 'mixcloud', link: 'https://www.mixcloud.com/DJ_JILL/' }
    ]
  },
  {
    name: 'kste5000',
    role: 'Art',
    image: new URL('../assets/dj/kste.png', import.meta.url).href,
    text: '「速攻魔法!屁眼噴射棕色光線」<br>アイコン: @pumony',
    genre: [],
    sns: [
      { type: 'twitter', link: 'https://twitter.com/kste5000' }
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
        .modal-content
          .modal-body
            .container-fluid
              .row
                .col-12.col-lg-6
                  img.w-100(:src='djs[modalDJ].image')
                .col-12.col-lg-6.my-3
                  .row.align-items-center.h-100
                    .col-12
                      h2.text-center {{ djs[modalDJ].name }}
                      h5.text-center.text-muted {{ djs[modalDJ].role }}
                    hr.opacity-100.bg-white
                    .col-12
                      p(v-html='djs[modalDJ].text')
                    hr.opacity-100.bg-white
                    .col-12
                      h4
                        a.link-light.mx-2(v-for='link in djs[modalDJ].sns' :href='link.link' target='_blank')
                          font-awesome-icon(:icon="['fab', link.type]")
</template>

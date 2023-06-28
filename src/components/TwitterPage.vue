<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import gsap, { Expo } from 'gsap'

/** Animate **/
const animated = ref(false)
const animate = () => {
  return new Promise((resolve) => {
    if (animated.value) {
      resolve()
      return
    }
    animated.value = true
    gsap.to('#twitter .overlay-right', {
      duration: 2,
      '--afterWidth': 0,
      ease: Expo.easeOut,
      onComplete () {
        resolve()
      }
    })
  })
}
defineExpose({ animate })
</script>

<template lang="pug">
section.section#twitter
  .container.h-100
    .row.align-content-center.justify-content-center.h-100
      .col-12.overlay-right
        h1.text-white.text-center Tweets
      .col-10
        .wbctA.w-100(data-name='onstipe')
          component(:is="'script'" defer src='https://onstipe.com/web/js/webembed.js' type='text/javascript')
          .wbctB.h-100(data-val='wvq40')
</template>

<script setup>
import { ref } from 'vue'
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
      .col-10.wbctA
        iframe(title='Twitter Hashtag Feed' src='https://widgets.sociablekit.com/twitter-hashtag-feed/iframe/171269' frameborder='0' width='100%' height='1000')
</template>

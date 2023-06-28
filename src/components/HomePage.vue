<script setup>
import { ref } from 'vue'
import gsap, { Expo } from 'gsap'
import LogoImage from './LogoImage.vue'

/** Animate **/
const animated = ref(false)

const animate = () => {
  return new Promise((resolve) => {
    if (animated.value) {
      resolve()
      return
    }

    animated.value = true

    const masks = ['left-right', 'left-left', 'right-right', 'right-left', 'mouth']
    masks.forEach((mask, index, el) => {
      const id = `#mask-path-${mask}`
      const path = document.querySelector(id)
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
    })

    const tl = gsap.timeline({
      onComplete () {
        resolve()
      }
    })

    // Emoji animations
    for (const mask of masks) {
      tl.to(`#mask-path-${mask}`, {
        duration: 0.2,
        'stroke-dashoffset': 0
      })
    }

    // Text animations
    tl.to('#logosvg #text', {
      duration: 0.3,
      opacity: 1
    })
      .to('#logosvg .line', {
        duration: 0.3,
        opacity: 1,
        x: 0,
        y: 0
      })
      .to('#logosvg .star', {
        duration: 0.3,
        opacity: 1
      })
  })
}
defineExpose({ animate })
</script>

<template lang="pug">
section.section#home
  .container.h-100
    .row.align-content-center.justify-content-center.h-100
      .col-12.col-lg-8#logo-wrapper
        LogoImage
</template>

/* eslint-disable no-undef */
import { useRef } from 'react'

export default function useTestimonialSlider() {
  const testimonialRef = useRef()

  function handleTestimonialSlider() {
    const $this = $(testimonialRef.current)
    var $carousel = $this.find('.images .list').flickity({
      contain: true,
      wrapAround: false,
      freeScroll: false,
      cellAlign: 'center',
      lazyLoad: 2,
      imagesLoaded: true,
      prevNextButtons: false,
      on: {
        ready: function () {
          let dotsSlideTes = $this.find('.flickity-page-dots')
          let dotsNew = $this.find('.dots')
          dotsSlideTes.appendTo(dotsNew)
        },
        change: function (index) {
          $this.find('.ct').removeClass('active')
          $this.find('.ct-' + (index + 1)).addClass('active')
        },
      },
    })
    var flkty = $carousel.data('flickity')
    var $imgs = $this.find('.carousel-cell picture img')

    $carousel.on('scroll.flickity', function () {
      flkty.slides.forEach(function (slide, i) {
        var img = $imgs[i]
        var x = ((slide.target + flkty.x) * -1) / 2
        img.style.transform = 'translateX( ' + x + 'px)'
      })
    })

    let ctrPrevTes = $this.find('.btn_ctr.prev'),
      ctrNextTes = $this.find('.btn_ctr.next')

    ctrPrevTes.on('click', function () {
      $carousel.flickity('previous', true)
    })
    ctrNextTes.on('click', function () {
      $carousel.flickity('next', true)
    })
  }

  return { testimonialRef, handleTestimonialSlider }
}

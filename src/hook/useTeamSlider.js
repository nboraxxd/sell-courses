/* eslint-disable no-undef */
import { useRef } from 'react'

export default function useTeamSlider() {
  const teamSliderRef = useRef()

  function handleTeamSlider() {
    const $this = $(teamSliderRef.current)
    let $carouselGallery = $this.find('.list'),
      $progressBar = $this.find('.timeline .process')

    $carouselGallery.flickity({
      contain: true,
      wrapAround: false,
      freeScroll: true,
      cellAlign: 'left',
      lazyLoad: 3,
      imagesLoaded: true,
      prevNextButtons: false,
    })

    $carouselGallery.on('scroll.flickity', function (event, progress) {
      progress = Math.max(0.05, Math.min(1, progress))
      $progressBar.width(progress * 100 + '%')
    })

    let ctrPrevGallery = $this.find('.btn_ctr.prev'),
      ctrNextGallery = $this.find('.btn_ctr.next')

    ctrPrevGallery.on('click', function () {
      $carouselGallery.flickity('previous')
    })
    ctrNextGallery.on('click', function () {
      $carouselGallery.flickity('next')
    })
  }

  return { teamSliderRef, handleTeamSlider }
}

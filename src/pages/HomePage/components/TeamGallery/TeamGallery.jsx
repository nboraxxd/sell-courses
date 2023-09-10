import useTeamSlider from '@/hook/useTeamSlider'
import { useEffect } from 'react'

export default function TeamGallery() {
  const { teamSliderRef, handleTeamSlider } = useTeamSlider()

  useEffect(() => {
    handleTeamSlider()
  }, [handleTeamSlider])

  return (
    <section className="section-gallery" ref={teamSliderRef}>
      <div className="textbox">
        <h2 className="main-title">Hình ảnh hoạt động</h2>
      </div>
      <div className="list">
        <div className="item">
          <div>
            <img data-flickity-lazyload="/img/img_team1.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team2.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team3.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team4.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team5.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team6.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team7.jpg" alt="" />
          </div>
        </div>
        <div className="item">
          <div>
            <img data-flickity-lazyload="/img/img_team8.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team9.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team10.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team11.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team12.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team13.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team14.jpg" alt="" />
          </div>
        </div>
        <div className="item">
          <div>
            <img data-flickity-lazyload="/img/img_team15.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team16.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team17.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team18.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team19.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team20.jpg" alt="" />
          </div>
          <div>
            <img data-flickity-lazyload="/img/img_team21.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="controls">
        <div className="btn_ctr prev" />
        <span>Trượt qua</span>
        <div className="timeline">
          <div className="process" />
        </div>
        <div className="btn_ctr next" />
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

import video from '../../assets/video/learn once, use anywhere.mp4'
import img1 from '../../assets/images/blog_1.jpg'
import img2 from '../../assets/images/blog_2.jpg'
import img3 from '../../assets/images/blog_3.jpg'
import './landing.css'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const Landing = () => {
    const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);

    return (
        <div>
            <div className="landing__video">
                <video
                    id="landingVideo"
                    controls
                    muted={true}
                    autoPlay={true}
                    loop
                    src={video}
                />
            </div>
            <div className="landing__ti text-center">
                <h2 className="heading__line">{t('msg88')}?</h2>
                <p className="lead text-muted">
                    {t('msg89')}.
                </p>
            </div>
            <div className="landing__content">
                <div className="landing__description">
                    <div className="landing__title">
                        <h2 className="landing__assembly2">
                        {t('msg90')}
                        </h2>
                    </div>
                    <div className="landing-description2">
                        <p className="landing__assembly paragraph"></p>
                        <p className="landing__assembly paragraph2">
                        {t('msg91')}.
                        </p>
                        <p></p>
                    </div>
                    <div className="landing__link">
                        <div className="landing__container">
                            <Link
                                className="landing__btn"
                                role="button"
                                tabIndex="0"
                                to="/login"
                            >
                                <span>{t('startWithUs')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="landing-image">
                    <img
                        alt=""
                        srcSet="https://images.prismic.io/quizlet-prod/130dc509-6919-47bc-b27d-17f600a41b0c_IntlFirstSlice.png"
                    />
                </div>
            </div>
            <div className="landing__content">
                <div className="landing-image2">
                    <img
                        alt=""
                        srcSet="https://images.prismic.io/quizlet-prod/1d359d1f-be06-481d-af18-30a4d93b3b0f_commute-image.png"
                    />
                </div>
                <div className="landing__description">
                    <div className="landing__title">
                        <h2 className="landing__assembly2">
                        {t('msg92')}
                        </h2>
                    </div>
                    <div className="landing-description2">
                        <p className="landing__assembly paragraph"></p>
                        <p className="landing__assembly paragraph2">
                        {t('msg93')}.
                        </p>
                        <p></p>
                    </div>
                    <div className="landing__link">
                        <div className="landing__container">
                            <Link
                                className="landing__btn"
                                role="button"
                                tabIndex="0"
                                to="/discovery/sets"
                            >
                                <span>{t('msg94')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-title">
                <h4 className="title text-center">
                {t('msg95')}
                </h4>
                <p className="text-muted para-desc mx-auto text-center">
                {t('msg96')}{' '}
                    <span className="text-primary fw-bold">NihongoLevelUp</span>{' '}
                    {t('msg97')}
                </p>
            </div>
            <div
                className="row feedback"
                style={{
                    marginTop: '50px',
                    width: '80%',
                    height: '40%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <div className="col-12 col-md-6 col-lg-4">
                    <div
                        className="single-blog wow fadeIn res-margin"
                        data-wow-duration="2s"
                    >
                        <div className="blog-thumb">
                            <img src={img1} alt="" className="row__img" />
                        </div>
                        <div className="blog-content p-4">
                            <ul className="meta-info d-flex justify-content-between">
                                <li className="landing_li">{t('msg99')}</li>
                                <li className="landing_li">
                                    <a href="/">{t('msg100')}</a>
                                </li>
                            </ul>
                            <h3 className="blog-title my-3">
                                <a href="/">{t('msg101')}</a>
                            </h3>
                            <p>
                            {t('msg102')}
                            </p>
                            <a href="/" className="blog-btn mt-3">
                            {t('readMore')}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div
                        className="single-blog wow fadeIn res-margin"
                        data-wow-duration="2s"
                    >
                        <div className="blog-thumb">
                            <a href="/">
                                <img src={img2} alt="" className="row__img" />
                            </a>
                        </div>
                        <div className="blog-content p-4">
                            <ul className="meta-info d-flex justify-content-between">
                                <li className="landing_li">{t('msg98')}</li>
                                <li className="landing_li">
                                    <a href="/">{t('msg100')}</a>
                                </li>
                            </ul>
                            <h3 className="blog-title my-3">
                                <a href="/">{t('msg103')}</a>
                            </h3>
                            <p>
                            {t('msg104')}
                            </p>
                            <a href="/" className="blog-btn mt-3">
                            {t('readMore')}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div
                        className="single-blog wow fadeIn res-margin"
                        data-wow-duration="2s"
                    >
                        <div className="blog-thumb">
                            <a href="/">
                                <img src={img3} alt="" className="row__img" />
                            </a>
                        </div>
                        <div className="blog-content p-4">
                            <ul className="meta-info d-flex justify-content-between">
                                <li className="landing_li">{t('msg105')}</li>
                                <li className="landing_li">
                                    <a href="/">{t('msg100')}</a>
                                </li>
                            </ul>
                            <h3 className="blog-title my-3">
                                <a href="/">{t('msg106')}</a>
                            </h3>
                            <p>
                            {t('msg107')}
                            </p>
                            <a href="/" className="blog-btn mt-3">
                            {t('readMore')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Landing

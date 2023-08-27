import { Link, useNavigate } from 'react-router-dom'

import '../../assets/styles/Helpcenter.css'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function HelpCenter() {
    const navigate = useNavigate()
    const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);

    return (
        <div className="hkb__main">
            <div className="ht-container">
                <h2 className="site-header__title">{t('msg121')}?</h2>

                <form className="hkb-site-search">
                    <label className="hkb-screen-reader-text" for="hkb-search">
                    {t('searchFor')}
                    </label>
                    <input
                        className="hkb-site-search__field"
                        type="text"
                        placeholder="Search help center..."
                    />
                    <button className="hkb-site-search__button" type="submit">
                        <span>{t('search')}</span>
                    </button>
                </form>
            </div>
            <div className="ht-container1">
                <div className="ht-page__content">
                    <h2 className="hkb-archive__title">{t('helpTopic')}</h2>

                    <ul className="hkb-archive  hkb-archive--2cols">
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--4">
                                <Link className="hkb-category__link" to="/useaccount">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/17-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                        {t('myAcc')}{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                        {t('msg122')}.
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--3">
                                <Link className="hkb-category__link" to="/useclass">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/04-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                        {t('msg123')}{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                        {t('msg124')}.
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--9">
                                <Link className="hkb-category__link" to="/privacy">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/02-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                        {t('copyright')} &amp; {t('legal')}{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                        {t('msg133')}.
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--7">
                                <Link className="hkb-category__link" to="/term">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/13-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                        {t('developers')}{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                        {t('msg132')}.
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <aside
                    className="sidebar"
                    itemscope=""
                    itemtype="https://schema.org/WPSideBar"
                >
                    <section
                        id="ht-kb-articles-widget-2"
                        className="widget hkb_widget_articles"
                    >
                        <h3 className="widget__title">{t('msg131')}</h3>
                        <ul>
                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                {t('msg130')}?
                                </a>
                            </li>

                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                {t('msg129')}?
                                </a>
                            </li>

                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                {t('msg128')}?
                                </a>
                            </li>

                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                {t('msg127')}?
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section className="widget hkb_widget_exit">
                        <h3 className="widget__title">
                        {t('msg126')}?
                        </h3>
                        <div className="hkb_widget_exit__content">
                        {t('msg125')}!
                        </div>
                        <button
                            className="hkb_widget_exit__btn"
                            onClick={() => {
                                navigate('send-feedback')
                            }}
                        >
                            {t('sendFeedback')}
                        </button>
                    </section>{' '}
                </aside>
            </div>
        </div>
    )
}

export default HelpCenter

import React from "react";
import "../footer/Footer.css"
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Term() {
  const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);
  return (
    <div className="term__full">
      <h2 className="term__service">{t('msg176')}</h2>
      <div className="term__container">
        <p className="term__intro">
          ("<strong>NihongoLevelUp</strong>") {t('msg177')}
          <a className="" href="/privacy">
            <span>{t('msg178')}</span>
          </a>
          {t('msg179')}
        </p>
        <ol className="term__number">
          <li class="number__1">
            <strong>{t('msg180')}.</strong> {t('msg181')}
          </li>
          <li class="number__2">
            <strong>{t('msg182')}.</strong> {t('msg183')}
          </li>
          <li class="number__3">
            <strong>{t('msg184')}.</strong> {t('msg185')}
          </li>
          <li class="number__4">
            <strong>{t('msg186')}.</strong> {t('msg187')}
          </li>
          <li class="number__5">
            <strong>{t('msg188')}.</strong> {t('msg189')}
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Term;

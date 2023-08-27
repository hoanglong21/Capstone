import React from 'react'
import '../footer/Footer.css'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Privacy() {
    const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);
    
    return (
        <div className="privacy__content">
            <h2 className="privacy__header">{t('msg190')}</h2>
            <div className="privacy__container">
                <p className="privacy__paragraph">
                {t('msg191')}
                </p>
                <ul className="privacy__ul">
                    <li className="privacy__ul1">
                    {t('msg192')}
                    </li>
                    <li className="privacy__ul2">
                    {t('msg193')}
                    </li>
                    <li className="privacy__ul3">
                    {t('msg194')}
                    </li>
                    <li className="privacy__ul4">
                    {t('msg195')}
                    </li>
                    <li className="privacy__ul5">
                    {t('msg196')}
                    </li>
                </ul>
                <h3 className="privacy__info">
                {t('msg197')}
                </h3>
                <p className="privacy__paragraph1">
                {t('msg198')}
                </p>
                <h4 className="privacy__info1">
                {t('msg199')}
                </h4>
                <p className="privacy__paragraph1">
                    <strong> {t('msg200')}</strong>. {t('msg201')}
                </p>
                <p className="privacy__paragraph1">
                {t('msg202')}
                </p>
                <h4 className="privacy__info">
                {t('msg203')}
                </h4>
                <p className="privacy__paragraph1">
                {t('msg204')}
                </p>
            </div>
        </div>
    )
}

export default Privacy

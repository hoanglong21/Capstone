import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function UseClas() {
  const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);
  return (
    <div className="container">
      <div className="useaccount">
        <h4>{t('msg160')}?</h4>
        <ul className="useaccount-ul">
          <li>
          {t('msg161')}
          </li>
          <li>
          {t('msg162')}
          </li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>{t('msg163')}?</h4>
        <ul className="useaccount-ul">
          <li>{t('msg164')}</li>
          <li>
          {t('msg165')}
          </li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>{t('learn')}?</h4>
        <ul className="useaccount-ul">
          <li>{t('msg164')}</li>
          <li>
          {t('msg166')}
          </li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>{t('msg167')}?</h4>
        <ul className="useaccount-ul">
          <li>
          {t('msg168')}
          </li>
          <li>
          {t('msg169')}
          </li>
          <li>
          {t('msg170')}
          </li>
          <li>{t('msg171')}</li>
        </ul>
      </div>
      <div className="useaccount">
        <h4>{t('joinClass')}?</h4>
        <ul className="useaccount-ul">
          <li>
          {t('msg172')}
          </li>
          <li>
          {t('msg173')}
          </li>
          <li>{t('msg174')}</li>
          <li>
          {t('msg175')}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UseClas;

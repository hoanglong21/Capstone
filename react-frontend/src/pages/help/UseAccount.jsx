import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Helpcenter.css";
import register from "../../assets/images/register.png";
import account from "../../assets/images/account.png";
import language from "../../assets/images/language.png";
import changePass from "../../assets/images/change-password.png";
import resetPass from "../../assets/images/resetpass.png";
import deleteAcc from "../../assets/images/deleteaccount.png";
import '../../assets/styles/Helpcenter.css'
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function UseAccount() {
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
      <div className="row useaccount mt-4">
        <div className="use-account-col-8">
          <h4>{t('msg134')} ?</h4>
          <ul className="useaccount-ul">
            <li>
            {t('msg135')}.
            </li>
            <li>
              {t('msg136')}.
            </li>
            <li>{t('msg137')}.</li>
            <li>
            {t('msg138')}
            </li>
          </ul>
        </div>
        <div className="use-account-col-4">
          <img
            src={register}
            alt=""
            // style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>
      <div className="row useaccount mt-4">
        <div className="use-account-col-8">
          <h4>{t('msg139')}?</h4>
          <ul className="useaccount-ul">
            <li>
            {t('msg140')}.
            </li>
            <li>
            {t('msg141')}.
            </li>
            <li>
            {t('msg142')}.
            </li>
          </ul>
        </div>
        <div className="use-account-col-4">
          <img
            src={account}
            alt=""
            // style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>
      <div className="row useaccount mt-4">
        <div className="use-account-col-8">
          <h4>{t('msg143')}?</h4>
          <ul className="useaccount-ul">
            <li>
            {t('msg144')}.
            </li>
            <li>
            {t('msg145')}.
            </li>
          </ul>
        </div>
        <div className="use-account-col-4">
          <img
            src={language}
            alt=""
            // style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>
      <div className="row useaccount mt-4">
        <div className="use-account-col-8">
          <h4>{t('changeP')}?</h4>
          <ul className="useaccount-ul">
            <li>
            {t('msg146')}.
            </li>
            <li>
            {t('msg147')}.
            </li>
            <li>
            {t('msg148')}.
            </li>
          </ul>
        </div>
        <div className="use-account-col-4">
          <img
            src={changePass}
            alt=""
            // style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>
      <div className="row useaccount mt-4">
        <div className="use-account-col-8">
          <h4>{t('msg149')}?</h4>
          <ul className="useaccount-ul">
            <li>
            {t('msg150')}.
            </li>
            <li>
            {t('msg151')}.
            </li>
            <li>
            {t('msg152')}.
            </li>
            <li>
            {t('msg153')}.
            </li>
            <li>
            {t('msg154')}.
            </li>
            <li>{t('msg155')}.</li>
          </ul>
        </div>
        <div className="use-account-col-4">
          <img
            src={resetPass}
            alt=""
            // style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>
      <div className="row useaccount mt-4">
        <div className="use-account-col-8">
          <h4>{t('msg156')}?</h4>
          <ul className="useaccount-ul">
            <li>
            {t('msg157')}.
            </li>
            <li>
            {t('msg158')}
            </li>
            <li>
            {t('msg159')}
            </li>
          </ul>
        </div>
        <div className="use-account-col-4">
          <img
            src={deleteAcc}
            alt=""
            // style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UseAccount;

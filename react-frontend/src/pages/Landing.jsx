import React from "react";
import "../assets/styles/Landing.css";
import video from "../assets/video/learn once, use anywhere.mp4";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="landing__video">
        <video classsName="landing__iframe" src={video} autoplay loop playsinline></video>
      </div>
      <div className="landing__ti text-center">
        <h2 className="heading__line">What is NihongoLevelUp?</h2>
        <p className="lead text-muted">
          NihongoLevelUp is a language learning tool specifically designed to
          support learners of the Japanese language. Its purpose is to help
          learners overcome difficulties encountered during the Japanese
          language learning process.
        </p>
      </div>
      <div className="landing__content">
        <div className="landing__description">
          <div className="landing__title">
            <h2 className="landing__assembly2">
              Memorize Faster with Flashcards, Study Sets, Quiz
            </h2>
          </div>
          <div className="landing-description2">
            <p className="landing__assembly paragraph"></p>
            <p className="landing__assembly paragraph2">
              Research shows that self-testing with flashcards is effective than
              rereading your notes. NihongoLevelUp is used by students in a
              variety of Japanese topics.
            </p>
            <p></p>
          </div>
          <div className="landing__link">
            <div className="landing__container">
              <Link
                className="landing__btn"
                role="button"
                tabindex="0"
                to="/login"
                onclick="return true"
              >
                <span>Start With Us</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="landing-image">
          <img
            alt=""
            srcset="https://images.prismic.io/quizlet-prod/130dc509-6919-47bc-b27d-17f600a41b0c_IntlFirstSlice.png"
          />
        </div>
      </div>
      <div className="landing__content">
        <div className="landing-image2">
          <img
            alt=""
            srcset="https://images.prismic.io/quizlet-prod/1d359d1f-be06-481d-af18-30a4d93b3b0f_commute-image.png"
          />
        </div>
        <div className="landing__description">
          <div className="landing__title">
            <h2 className="landing__assembly2">
              Yesterday's commute time, today is class again
            </h2>
          </div>
          <div className="landing-description2">
            <p className="landing__assembly paragraph"></p>
            <p className="landing__assembly paragraph2">
              Learning anywhere, anytime.
            </p>
            <p></p>
          </div>
          <div className="landing__link">
            <div className="landing__container">
              <Link
                className="landing__btn"
                role="button"
                tabindex="0"
                to="/sets"
                onclick="return true"
              >
                <span>Explore More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section-title">
        <h4 className="title mb-4 text-center">Have Question ? Get in touch!</h4>
        <p className="text-muted para-desc mx-auto text-center">
          Start working with <span class="text-primary fw-bold">NihongoLevelUp</span>{" "}
          that can provide everything you need about Japanese
        </p>
        <div className="landing__contact text-center">
        <a className="landing__btn" href="/">
          {" "}
          <span>Contact us</span>
        </a>
        </div>
      </div>
      <div className="landing__footer">
        
      </div>
    </>
  );
};
export default Landing;

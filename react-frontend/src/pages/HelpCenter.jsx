import React from "react";
import "../assets/styles/Helpcenter.css";
import { Link } from "react-router-dom";

function HelpCenter() {
  return (
    <div className="helpcenter__main">
      <div className="ht-container">
        <h2 className="site-header__title">Hi, How can we help you?</h2>

        <form className="hkb-site-search">
          <label className="hkb-screen-reader-text" for="hkb-search">
            Search For
          </label>
          <input
            className="hkb-site-search__field"
            type="text"
            value=""
            placeholder="Search help center..."
          />
          <button className="hkb-site-search__button" type="submit">
            <span>Search</span>
          </button>
        </form>
      </div>
      <div class="ht-container1">
        <div class="ht-page__content">
          <h2 class="hkb-archive__title">Help Topics</h2>

          <ul class="hkb-archive  hkb-archive--2cols">
            <li>
              <div class="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--4">
                <a
                  class="hkb-category__link"
                  href="/"
                >
                  <div class="hkb-category__iconwrap">
                    <img
                      src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/17-1.png"
                      class="hkb-category__icon lazyloading"
                      alt=""
                      data-was-processed="true"
                    />
                  </div>

                  <div class="hkb-category__content">
                    <h2 class="hkb-category__title">My Account </h2>

                    <div class="hkb-category__description">
                      How to manage your account and it's features.
                    </div>
                  </div>
                </a>
              </div>
            </li>
            <li>
              <div class="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--3">
                <a
                  class="hkb-category__link"
                  href="/"
                >
                  <div class="hkb-category__iconwrap">
                    <img
                      src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/04-1.png"
                      class="hkb-category__icon lazyloading"
                      alt=""
                      data-was-processed="true"
                    />
                  </div>

                  <div class="hkb-category__content">
                    <h2 class="hkb-category__title">Getting Started </h2>

                    <div class="hkb-category__description">
                      Articles to get you up and running, quick and easy.
                    </div>
                  </div>
                </a>
              </div>
            </li>
            <li>
              <div class="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--9">
                <a
                  class="hkb-category__link"
                  href="/"
                >
                  <div class="hkb-category__iconwrap">
                    <img
                      src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/02-1.png"
                      class="hkb-category__icon lazyloading"
                      alt=""
                      data-was-processed="true"
                    />
                  </div>

                  <div class="hkb-category__content">
                    <h2 class="hkb-category__title">Copyright &amp; Legal </h2>

                    <div class="hkb-category__description">
                      Important information about how we handle your privacy and
                      data.
                    </div>
                  </div>
                </a>
              </div>
            </li>
            <li>
              <div class="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--7">
                <a
                  class="hkb-category__link"
                  href="/"
                >
                  <div class="hkb-category__iconwrap">
                    <img
                      src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/13-1.png"
                      class="hkb-category__icon lazyloading"
                      alt=""
                      data-was-processed="true"
                    />
                  </div>

                  <div class="hkb-category__content">
                    <h2 class="hkb-category__title">Developers </h2>

                    <div class="hkb-category__description">
                      Developer documentation and integration features.
                    </div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>

        <aside
          class="sidebar"
          itemscope=""
          itemtype="https://schema.org/WPSideBar"
        >
          <section
            id="ht-kb-articles-widget-2"
            class="widget hkb_widget_articles"
          >
            <h3 class="widget__title">Popular Articles</h3>
            <ul>
              <li class="hkb-widget-article__format-standard">
                <a
                  class="hkb-widget__entry-title"
                  href="/"
                >
                  How to Create an Account?
                </a>
              </li>

              <li class="hkb-widget-article__format-standard">
                <a
                  class="hkb-widget__entry-title"
                  href="/"
                >
                  How to Join Class?
                </a>
              </li>

              <li class="hkb-widget-article__format-standard">
                <a
                  class="hkb-widget__entry-title"
                  href="/"
                >
                  What can I learn from joining the classroom?
                </a>
              </li>

              <li class="hkb-widget-article__format-standard">
                <a
                  class="hkb-widget__entry-title"
                  href="/"
                >
                  How secure is my account?
                </a>
              </li>
            </ul>
          </section>
          <section id="ht-kb-exit-widget-2" class="widget hkb_widget_exit">
            <h3 class="widget__title">Need Support or Feedback?</h3>
            <div class="hkb_widget_exit__content">
              Can't find the answer you're looking for? Don't worry we're here
              to help!
            </div>
            <Link class="hkb_widget_exit__btn" to="{sendfeedback}">
              Send Feedback
            </Link>
          </section>{" "}
        </aside>
      </div>
    </div>
  );
}

export default HelpCenter;

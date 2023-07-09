import React from "react";
import "../../assets/styles/studyset.css";
import img from "../../assets/images/avatar-default.jpg";

function OverViewSet() {
  return (
    <div className="container">
      <div className="setTitle">
        <h2>MLN 131</h2>
      </div>
      <div className="studySet__preview">
        <h5>Self-study activity</h5>
        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
          <ul className="StudyModesNavSectionList">
            <li className="StudyModesNavItem">
              <i className="bi bi-front text-info fs-2"></i>
              <a className="StudyModesNavItemName" href="/flashcard">
                Flashcards
              </a>
            </li>
            <li className="StudyModesNavItem">
              <i className="bi bi-files text-warning fs-2"></i>
              <a className="StudyModesNavItemName" href="/learn">
                Learn
              </a>
            </li>
            <li className="StudyModesNavItem">
              <i className="bi bi-file-text-fill text-danger fs-2"></i>
              <a className="StudyModesNavItemName" href="/test">
                Test
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="studyset_infor">
        <div className="UserLink-avatar">
          <a className="profile" href="/profile">
            <div className="avatarUser">
              <img
                alt="/"
                className="ava"
                src={img}
                style={{ height: "48px", width: "48px" }}
              />
            </div>
          </a>
        </div>

        <div className="UserLink-pill-badge">
          <a className="userprofile" href="/NongDanTrongLua">
            <span className="username">NongDanTrongLua</span>
          </a>
          <span className="userrole">Teacher</span>
        </div>
        <div className="list-option">
          <button type="button" className="icon">
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
      </div>

      <div className="termsListTitle">
        <span className="term">Terms in this set (408)</span>
        <div className="selection">
          <button type="button">
            <span>Your stats</span>
          </button>
        </div>
      </div>

      <div className="learning stu">
        <div className="multiple">
          <span>
            <h4>Still learning (25)</h4>
          </span>
          <span>You've begun learning these terms. Keep up the good work!</span>
        </div>
        <div className="stillStu">
          <div className="checkStu">
            <input type="checkbox" className="me-2 fs-3" />
            Select these 25
          </div>
        </div>
      </div>

      <div class="SetPageTerm-contentWrapper">
        <div class="SetPageTerm-content">
          <div class="SetPageTerm-side SetPageTerm-smallSide">
              <span class="termText">
                1. Câu trả lời sau đây, câu nào diễn đạt chưa chuẩn xác: <br />
                a) Chủ nghĩa Mác là học thuyết do C.Mác sáng lập <br />
                b) Chủ nghĩa Mác là học thuyết về sự nghiệp giải phóng giai cấp
                vô sản và nhân dân lao động <br />
                c) Chủ nghĩa Mác là thế giới quan và phương pháp luận chung của
                mọi nhận thức và thực tiễn <br />
                d) Chủ nghĩa mác là học thuyết được xây dựng trên cơ sở kế thừa
                những tinh hoa của lịch sử tư tưởng nhân loại và thực tiễn cách
                mạng
              </span>
          </div>
          <div class="SetPageTerm-sideContent"></div>
          <div class="SetPageTerm-side SetPageTerm-largeSide">
            <span class="TermText">C</span>
          </div>
        </div>
      </div>
      <div class="a1lo7mw1">
        <div class="d1frrovq">
          <div class="f1dpcrgz" data-testid="AssemblyTooltip--base"></div>
        </div>
      </div>
    </div>
  );
}

export default OverViewSet;

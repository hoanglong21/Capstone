import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import ClassService from "../../../services/ClassService";
import ClassLearnerService from "../../../services/ClassLearnerService";
import NotificationService from "../../../services/NotificationService";

import UpdateClass from "../UpdateClass";
import DeleteClass from "../DeleteClass";
import AssignSets from "../AssignSets";
import Report from "../../../components/report/Report";

import {
  AddCircleIcon,
  ClassIcon,
  DeleteIcon,
  EditIcon,
  MemberSolidIcon,
  OptionHorIcon,
  ReportIcon,
  StudySetIcon,
  UnenrollIcon,
} from "../../../components/icons";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import "./classLayout.css";
import { useTranslation } from "react-i18next";

const ClassLayout = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState({});
  const [hasAccess, setHasAccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [loadingUnenroll, setLoadingUnenroll] = useState(false);

  const [showUnenrollModal, setShowUnenrollModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMess, setToastMess] = useState("");
  const { userLanguage } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (userToken) {
      i18n.changeLanguage(userLanguage);
    }
  }, [userLanguage]);
  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        var isFilter = false;
        if (userInfo?.id) {
          const tempHasAccess = (
            await ClassService.checkUserClass(id, userInfo.id)
          ).data;
          setHasAccess(tempHasAccess);
          if (tempHasAccess) {
            isFilter = true;
          } else {
            const tempIsWaiting = (
              await ClassService.checkUserClassWaiting(id, userInfo.id)
            ).data;
            setIsWaiting(tempIsWaiting);
          }
        }
        if (isFilter) {
          const tempClass = (await ClassService.getClassroomById(id)).data;
          setClassroom(tempClass);
        } else {
          const tempClass = (
            await ClassService.getFilterList(
              `=${id}`,
              "=0",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "=1",
              "=1"
            )
          ).data.list[0];
          setClassroom(tempClass);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [userInfo, id]);

  useEffect(() => {
    if (
      userInfo?.id &&
      classroom?.id &&
      classroom?._deleted &&
      userInfo?.id !== classroom?.user?.id
    ) {
      navigate("/");
    }
  }, [classroom]);

  const handleRequest = async () => {
    try {
      ClassLearnerService.createClassLeaner({
        user: { id: userInfo.id, username: userInfo.username },
        classroom: {
          id: classroom.id,
        },
        status: "pending",
      });
      NotificationService.createNotification({
        title: "Request to join class",
        content: `You have a request to join class ${classroom.class_name} from ${userInfo?.username}`,
        user: {
          id: classroom.user.id,
          username: classroom.user.username,
        },
        url: `/class/${classroom.id}/people`,
      });
      setIsWaiting(true);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  const handleCancelRequest = async () => {
    try {
      ClassLearnerService.deleteClassLearner(userInfo.id, classroom.id);
      setIsWaiting(false);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  const handleUnenroll = async () => {
    setLoadingUnenroll(true);
    try {
      await ClassLearnerService.updateClassLeanerById(
        {
          user: { id: userInfo.id, username: userInfo.username },
          classroom: {
            id: classroom.id,
          },
          status: "unenrolled",
        },
        userInfo.id,
        classroom.id
      );
      setShowUnenrollModal(false);
      setHasAccess(false);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
    setLoadingUnenroll(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border mt-5"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="mainClass_container">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="d-flex align-items-center">
                <ClassIcon
                  size="3.125rem"
                  className="mainClassHeader_icon"
                  strokeWidth="2"
                />
                <h1 className="mainClass_title m-0 ms-3">
                  {classroom.class_name}
                  {classroom._deleted && " (Deleted)"}
                </h1>
              </div>
              {!hasAccess && <p className="mt-1">{classroom.description}</p>}
            </div>
            {hasAccess && !classroom?._deleted ? (
              <div className="dropdown align-self-start">
                <button
                  className="btn btn-outline-secondary icon-outline-secondary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <OptionHorIcon />
                </button>
                <ul className="dropdown-menu">
                  {userInfo?.id === classroom?.user?.id ? (
                    <>
                      <li>
                        <button
                          className="dropdown-item py-2 px-3 d-flex align-items-center"
                          type="button"
                          onClick={() => {
                            setShowEditModal(true);
                          }}
                        >
                          <EditIcon className="me-3" size="1.3rem" />
                          <span className="align-middle fw-semibold">{t('edit')}</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-2 px-3 d-flex align-items-center"
                          type="button"
                          onClick={() => {
                            setShowAssignModal(true);
                          }}
                        >
                          <AddCircleIcon className="me-3" size="1.3rem" />
                          <span className="align-middle fw-semibold">
                          {t('add')} {t('set')}
                          </span>
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                        type="button"
                        onClick={() => {
                          setShowReportModal(true);
                        }}
                      >
                        <ReportIcon
                          className="me-3"
                          size="1.3rem"
                          strokeWidth="2"
                        />
                        <span className="align-middle fw-semibold">{t('report')}</span>
                      </button>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {userInfo?.id === classroom?.user?.id ? (
                    <li>
                      <button
                        className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                        type="button"
                        onClick={() => {
                          setShowDeleteModal(true);
                        }}
                      >
                        <DeleteIcon
                          className="me-3"
                          size="1.3rem"
                          strokeWidth="2"
                        />
                        <span className="align-middle fw-semibold">{t('delete')}</span>
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                        type="button"
                        onClick={() => {
                          setShowUnenrollModal(true);
                        }}
                      >
                        <UnenrollIcon
                          className="me-3"
                          size="1.3rem"
                          strokeWidth="2"
                        />
                        <span className="align-middle fw-semibold">
                        {t('unenroll')}
                        </span>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            ) : classroom?._deleted ? (
              ""
            ) : (
              <div>
                {isWaiting ? (
                  <button
                    className="btn btn-outline-primary rounded"
                    type="button"
                    onClick={handleCancelRequest}
                  >
                   {t('canRe')}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-primary rounded"
                    type="button"
                    onClick={() => {
                      if (userInfo?.id) {
                        handleRequest();
                      } else {
                        setShowWarningModal(true);
                      }
                    }}
                  >
                    {t('requestClass')}
                  </button>
                )}
              </div>
            )}
          </div>
          {hasAccess ? (
            <div>
              <div className="mainClass_navbar mt-4">
                <ul className="nav mainClass-navLink">
                  <li>
                    <NavLink
                      to={`/class/${id}`}
                      end
                      className={
                        "mainClass_navlink " +
                        (({ isActive }) => (isActive ? "active" : ""))
                      }
                    >
                      <span className="align-middle">{t('stream')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/class/${id}/sets`}
                      end
                      className={
                        "mainClass_navlink " +
                        (({ isActive }) => (isActive ? "active" : ""))
                      }
                    >
                      <span className="align-middle">{t('set')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/class/${id}/assignments`}
                      className={
                        "mainClass_navlink " +
                        (({ isActive }) => (isActive ? "active" : ""))
                      }
                    >
                      <span className="align-middle">{t('assignment')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/class/${id}/tests`}
                      className={
                        "mainClass_navlink " +
                        (({ isActive }) => (isActive ? "active" : ""))
                      }
                    >
                      <span className="align-middle">{t('test')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/class/${id}/people`}
                      className={
                        "mainClass_navlink " +
                        (({ isActive }) => (isActive ? "active" : ""))
                      }
                    >
                      <span className="align-middle">{t('people')}</span>
                    </NavLink>
                  </li>
                  {userInfo?.id === classroom?.user?.id && (
                    <li>
                      <NavLink
                        to={`/class/${id}/statistics`}
                        className={
                          "mainClass_navlink " +
                          (({ isActive }) => (isActive ? "active" : ""))
                        }
                      >
                        <span className="align-middle">{t('statistics')}</span>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
              <div className="mt-4">
                <Outlet />
              </div>
            </div>
          ) : (
            <div className="row request-mt-5">
              {isWaiting ? (
                <div className="request-col-8 text-center">
                  <h3 className="mainClass_infoTitle">
                  {t('msg64')}
                  </h3>
                  <p>
                  {t('msg65')}
                  </p>
                </div>
              ) : (
                <div className="request-col-8 text-center">
                  <h3 className="mainClass_infoTitle">
                  {t('msg66')}
                  </h3>
                </div>
              )}
              <div className="request-col-4">
                <h6 className="mainClass_infoLabel">{t('classDetails')}</h6>
                <div className="d-flex align-items-center mt-2">
                  <img
                    src={classroom?.avatar || defaultAvatar}
                    className="mainClass_authorAvatar"
                  />
                  <div className="ms-3">{classroom?.author}</div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <StudySetIcon size="20px" />
                  <div className="ms-3">{classroom?.studyset} {t('set')}</div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <MemberSolidIcon size="20px" />
                  <div className="ms-3">{classroom?.member} {t('set')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Update class Modal */}
        <UpdateClass
          classroom={classroom}
          stateChanger={setClassroom}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
        />
        {/* Delete class modal */}
        <DeleteClass
          classroom={classroom}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
        {/* Unenroll class modal */}
        <Modal
          className="classUnenrollModal"
          show={showUnenrollModal}
          onHide={() => {
            setShowUnenrollModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="px-3">
              <h4 className="modal-title">{t('unroll')}?</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="classUnenrollModalHeading mb-3">
              {classroom?.class_name}
            </div>
            <p>{t('msg67')}.</p>
            <p className="fw-semibold">{t('msg68')}.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary classUnenrollModalBtn me-3"
              onClick={() => {
                setShowUnenrollModal(false);
              }}
            >
              {t('close')}
            </button>
            <button
              className="btn btn-danger classUnenrollModalBtn"
              onClick={handleUnenroll}
              disabled={loadingUnenroll}
            >
              {loadingUnenroll ? (
                <div
                  className="spinner-border text-secondary mx-auto mb-1"
                  role="status"
                  id="loading"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Yes, I'm sure"
              )}
            </button>
          </Modal.Footer>
        </Modal>
        {/* assign modal */}
        <AssignSets
          showAssignModal={showAssignModal}
          setShowAssignModal={setShowAssignModal}
          classroom={classroom}
          userInfo={userInfo}
          setShowToast={setShowToast}
          setToastMess={setToastMess}
        />
        {/* assign toast */}
        <ToastContainer
          className="p-3"
          position="top-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            bg="dark"
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white">{toastMess}</Toast.Body>
          </Toast>
        </ToastContainer>
        {/* report modal */}
        <Report
          showReportModal={showReportModal}
          setShowReportModal={setShowReportModal}
          userInfo={userInfo}
          destination={`class/${id}`}
        />
        {/* warning modal */}
        <Modal
          className="mt-5"
          show={showWarningModal}
          onHide={() => {
            setShowWarningModal(false);
          }}
        >
          <Modal.Header className="border-0" closeButton>
            <Modal.Title>{t('msg35')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {t('msg36')}?
          </Modal.Body>
          <Modal.Footer className="border-0">
            <button
              className="btn btn-light"
              onClick={() => {
                setShowWarningModal(false);
              }}
            >
             {t('later')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t('msg37')}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default ClassLayout;

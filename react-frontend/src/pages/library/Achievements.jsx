import React from 'react'
import nightowl from '../../assets/achievements/NightOwl.svg'
import activeLearner from "../../assets/achievements/activeLearner.svg"
import committedLearner from "../../assets/achievements/committedLearner.svg"
import createfirstset from "../../assets/achievements/CreatedFirstSet.svg"
import studywithtest from "../../assets/achievements/StudiedWithTest.svg"
import earkyBird from "../../assets/achievements/EarlyBird.svg"

function Achievements() {
  return (
    <div>
        <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Award
              </h5>
            </div>
            <div className="card-body ms-auto me-auto">
               <img src={nightowl} alt="nightowl" className='h-25 me-3'/>
               <img src={activeLearner} alt="nightowl" className='h-25 me-3'/>
               <img src={committedLearner} alt="nightowl" className='h-25 me-3'/>
               <img src={createfirstset} alt="nightowl" className='h-25 me-3'/>
               <img src={studywithtest} alt="nightowl" className='h-25 me-3'/>
               <img src={earkyBird} alt="nightowl" className='h-25'/>
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Streak
              </h5>
            </div>
            <div className="card-body">
             
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Studied
              </h5>
            </div>
            <div className="card-body">
             
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Member
              </h5>
            </div>
            <div className="card-body">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Achievements

import React from 'react'
import './sidebar.css'

function Sidebar() {
  return (
    <>
      <div className="sidebar bg-[rgb(240,240,240)] w-[300px] flex flex-col justify-between h-screen items-center">
        <div>
          <div className="logo font-[500] text-[30px] flex justify-center m-6 border-b-4 h-[52px]">
            <img src="/assets/hardwareicon.png" className='w-12 h-12 mb-0'/>
            <h1 className='font-roboto mt-3 ml-[0.5px] mr-[0.5px] mb-0 text-center'>Make-It-All</h1>
            <img src="/assets/hardwareicon.png" className='w-12 h-12 mb-0'/>
          </div>
          <div className="sidebaroptions text-[21px] font-open-sans ml-10 flex flex-col justify-between h-72 mt-13 w-50">
            <div id="option" className='flex items-center optiontransition'>
                <img src="/assets/homeicon.png" className='iconsize'/>
                <h3 className='ml-[10px] font-bold'>Dashboard</h3>
            </div>
            <div id="option" className='flex items-center optiontransition'>
                <img src="/assets/projecticon.png" className='iconsize'/>
                <h3 className='ml-[10px]'>Projects</h3>
            </div>
            <div id="option" className='flex items-center optiontransition'>
                <img src="/assets/forumsicon.png" className='iconsize'/>
                <h3 className='ml-[10px]'>Forums</h3>
            </div>
            <div id="option" className='flex items-center optiontransition'>
                <img src="/assets/homeicon.png" className='iconsize'/>
                <h3 className='ml-[10px]'>To-do List</h3>
            </div>
          </div>
        </div>
        <div className="bottom m-5 w-[280px]">
          <hr />
          <div id="help" className='ml-5 mb-2 mt-5 flex items-center optiontransition'>
            <img src="/assets/helpcion.png" className='w-7 h-7'/>
            <h1 className='text-[18px] ml-2'>Help</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

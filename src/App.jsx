//import React from 'react'

import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './Layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage from './pages/JobPage'
import { jobLoader } from './loaders/loaders'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'



const App = () => {

  const addJob = async (newJob) => {

    await fetch('http://localhost:8000/jobs',{

      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newJob)
    })

    return;
   
  }


  const deleteJob = async(id) => {

    await fetch(`http://localhost:8000/jobs/${id}`,{

      method  : 'DELETE'
    })

    return;

  }

  const updateJob = async (updatedJob) => {

    await fetch(`http://localhost:8000/jobs/${updatedJob.id}`,{

      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(updatedJob)
    })

    return;

  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
  
      <Route index element={<HomePage/>}/>
      <Route path='/jobs' element={<JobsPage/>}/>
      <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
      <Route path='/jobs/edit/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
      <Route path='*' element={<NotFoundPage/>}/>
  
  
    </Route>
  ))


  return  <RouterProvider router={router} />
}

export default App
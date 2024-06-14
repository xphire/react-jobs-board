import { useEffect, useState } from 'react'
import JobListing from './JobListing'
import Spinner from './Spinner';

const JobListings = ({isHome = false}) => {

  const [jobs, setJobs] = useState([]);

  /* eslint-disable no-unused-vars */
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchJobs= async () => {


      try {

        const res = await fetch('http://localhost:8000/jobs');
        const data = await res.json()
  
        setJobs (data)
        
      } catch (error) {

        console.log(error)
        
      }finally{
        setLoading(false)
      }

    }

    //fetchJobs()

    setTimeout(fetchJobs,4000)

  }, [])


   const jobsList = isHome ? jobs.slice(0,3) : jobs



  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'All Jobs'}
        </h2>
        {loading && <Spinner loading={loading}/>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {jobsList.map(job => <JobListing job={job} key={job.id}/>)}
          
        </div>
      </div>
    </section>
  )
}

export default JobListings
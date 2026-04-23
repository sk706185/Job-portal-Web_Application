import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiArrowLeft, FiBookmark } from 'react-icons/fi'
import PageHeader from '../../components/PageHeader'

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://mern-job-portal-website.vercel.app/all-jobs/${id}`)
      .then(res => res.json())
      .then(data => { setJob(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      title: 'Apply for this Job',
      input: 'url',
      inputLabel: 'Paste your Resume / Portfolio link',
      inputPlaceholder: 'https://drive.google.com/your-resume',
      showCancelButton: true,
      confirmButtonText: 'Submit Application',
      confirmButtonColor: '#3575E2',
    });
    if (url) {
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: `Successfully applied to Job ID: ${id}`,
        confirmButtonColor: '#3575E2',
      });
    }
  };

  const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() || 'JB';

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16 text-center">
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16 text-center">
        <p className="text-red-500">Job not found.</p>
        <Link to="/" className="text-blue underline mt-2 inline-block">Back to jobs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details"} path={'Job Details'} />

      <div className="py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue mb-6">
          <FiArrowLeft size={14}/> Back to all jobs
        </Link>

        {/* Job Header Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-5 shadow-sm">
          <div className="flex gap-5 items-start">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl bg-blue/10 flex items-center justify-center text-blue font-bold text-xl flex-shrink-0">
              {job.companyLogo
                ? <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain rounded-xl" onError={(e)=>e.target.style.display='none'} />
                : getInitials(job.companyName)
              }
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary mb-1">{job.jobTitle}</h1>
              <p className="text-gray-500 text-sm mb-3">{job.companyName}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue/10 text-blue text-xs font-medium px-3 py-1 rounded-full">{job.employmentType}</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{job.experienceLevel}</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{job.salaryType}</span>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Salary</p>
                  <p className="text-sm font-semibold text-blue flex items-center gap-1"><FiDollarSign size={12}/>${job.minPrice}k–${job.maxPrice}k</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-primary flex items-center gap-1"><FiMapPin size={12}/>{job.jobLocation}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Type</p>
                  <p className="text-sm font-semibold text-primary flex items-center gap-1"><FiClock size={12}/>{job.employmentType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Posted</p>
                  <p className="text-sm font-semibold text-primary flex items-center gap-1"><FiCalendar size={12}/>{job.postingDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body - Description + Apply */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left - Description */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary mb-3">About the Role</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{job.description}</p>

            <h2 className="text-lg font-bold text-primary mb-3">What You'll Do</h2>
            <ul className="space-y-2 mb-6">
              {["Collaborate with cross-functional teams to deliver features","Write clean, maintainable and well-tested code","Participate in code reviews and technical discussions","Contribute to product roadmap and technical decisions"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue font-bold mt-0.5">·</span> {item}
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-bold text-primary mb-3">Requirements</h2>
            <ul className="space-y-2">
              {["Relevant experience in the field","Strong communication skills","Team player with ownership mindset","Portfolio or previous work samples preferred"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue font-bold mt-0.5">·</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Apply Card */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Salary range</p>
              <p className="text-2xl font-bold text-blue mb-4">${job.minPrice}k – ${job.maxPrice}k<span className="text-sm font-normal text-gray-400">/{job.salaryType === 'Monthly' ? 'mo' : 'yr'}</span></p>
              <button
                onClick={handleApply}
                className="w-full bg-blue text-white font-semibold py-3 rounded-lg hover:opacity-90 transition mb-2"
              >
                Apply Now
              </button>
              <button
                onClick={() => Swal.fire({ icon: 'success', title: 'Job Saved!', confirmButtonColor: '#3575E2' })}
                className="w-full border border-blue text-blue font-semibold py-2.5 rounded-lg hover:bg-blue/5 transition flex items-center justify-center gap-2"
              >
                <FiBookmark size={14}/> Save Job
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-primary mb-3">About {job.companyName}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {job.companyName} is a leading company in the industry, committed to building innovative products and fostering an inclusive work environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

import React from 'react'
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

const Card = ({data}) => {
  const {_id, companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate, description} = data;

  const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() || 'JB';

  return (
    <section className="card hover:shadow-md transition-shadow duration-200">
      <Link to={`/job/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start no-underline'>

        {/* Company Logo / Initials */}
        <div className="flex-shrink-0">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="w-14 h-14 rounded-lg object-contain border border-gray-100 bg-white p-1"
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
          ) : null}
          <div
            style={{ display: companyLogo ? 'none' : 'flex' }}
            className="w-14 h-14 rounded-lg bg-blue/10 items-center justify-center text-blue font-bold text-lg"
          >
            {getInitials(companyName)}
          </div>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-primary/60 text-sm mb-0.5">{companyName}</h4>
          <h3 className="text-base font-semibold text-primary mb-2">{jobTitle}</h3>

          <div className="text-primary/60 text-sm flex flex-wrap gap-3 mb-2">
            <span className="flex items-center gap-1"><FiMapPin size={13}/> {jobLocation}</span>
            <span className="flex items-center gap-1"><FiClock size={13}/> {employmentType}</span>
            <span className="flex items-center gap-1 text-blue font-medium"><FiDollarSign size={13}/> ${minPrice}k–${maxPrice}k/{salaryType === 'Monthly' ? 'mo' : 'yr'}</span>
            <span className="flex items-center gap-1"><FiCalendar size={13}/> {postingDate}</span>
          </div>

          <p className="text-sm text-primary/60 line-clamp-2">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;

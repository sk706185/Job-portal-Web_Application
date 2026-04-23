import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.skills = selectedOption;

      const res = await fetch('http://localhost:3000/post-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.insertedId || result.acknowledged) {
        alert('Job Posted Successfully!');
        reset();
        setSelectedOption(null);
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      console.error(error);
      alert('Server error!');
    }
  };

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Express.js', label: 'Express.js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input
                type='text'
                placeholder='Enter Job Title'
                {...register('jobTitle', { required: true })}
                className='create-job-input'
              />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Name</label>
              <input
                type='text'
                placeholder='Ex: Google'
                {...register('companyName', { required: true })}
                className='create-job-input'
              />
            </div>
          </div>

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Minimum Salary</label>
              <input
                type='text'
                placeholder='Ex: 3LPA'
                {...register('minPrice')}
                className='create-job-input'
              />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Maximum Salary</label>
              <input
                type='text'
                placeholder='Ex: 20LPA'
                {...register('maxPrice', { required: true })}
                className='create-job-input'
              />
            </div>
          </div>

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Salary Type</label>
              <select {...register('salaryType', { required: true })} className='create-job-input'>
                <option value=''>Choose Salary Type</option>
                <option value='Hourly'>Hourly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Location</label>
              <input
                type='text'
                placeholder='Ex: Seattle'
                {...register('jobLocation', { required: true })}
                className='create-job-input'
              />
            </div>
          </div>

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Posting Date</label>
              <input type='date' {...register('postingDate')} className='create-job-input' />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Experience Level</label>
              <select {...register('experienceLevel', { required: true })} className='create-job-input'>
                <option value=''>Choose Experience Type</option>
                <option value='Fresher/No Experience'>Fresher</option>
                <option value='Internship'>Internship</option>
                <option value='Experienced'>Experienced</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block mb-2 text-lg'>Required Skill Sets</label>
            <CreatableSelect
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className='create-job-input py-4'
            />
          </div>

          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Logo</label>
              <input
                type='url'
                placeholder='Company Logo URL'
                {...register('companyLogo')}
                className='create-job-input'
              />
            </div>

            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Employment Type</label>
              <select {...register('employmentType', { required: true })} className='create-job-input'>
                <option value=''>Choose Employment Type</option>
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Temporary'>Temporary</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block mb-2 text-lg'>Job Description</label>
            <textarea
              rows={6}
              placeholder='Enter Job Description'
              {...register('description', { required: true })}
              className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'
              style={{ resize: 'none' }}
            />
          </div>

          <div>
            <label className='block mb-2 text-lg'>Employee Email</label>
            <input
              type='email'
              placeholder='Ex: employee@gmail.com'
              {...register('postedBy', { required: true })}
              className='create-job-input'
            />
          </div>

          <input
            type='submit'
            value='Submit'
            className='block bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
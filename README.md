
# Job Application Tracker - 

https://job-application-tracker-two.vercel.app/

## Overview

I've created this Job Application Tracker as a personal project to help manage and organise my job search more efficiently. Built with Next.js and Supabase, this web application provides me with a user-friendly interface for tracking job applications, including details such as company names, position titles, application dates and current status.

Foundation Tutorial is by Code Ryan https://www.youtube.com/@coderyan

  <img src="https://github.com/nickf33/job_application_tracker/raw/master/rmImages/signin.png" alt="Job Application Tracker Screenshot" width="600"/>
## Features

- Add new job applications
- View a list of all my job applications
- Edit existing job application details
- Delete job applications
- Add and manage notes for each application
- Filter and sort job applications
- Real-time updates using Supabase

  <img src="https://github.com/nickf33/job_application_tracker/blob/master/rmImages/addnew.png" alt="Job Application Tracker Screenshot" width="600"/>

## Tech Stack

- Frontend: Next.js with React
- Backend: Supabase
- Styling: Tailwind CSS
- State Management: React Context API

## Planned Improvements

As I continue to develop this project, here are some improvements I'm planning to implement:

1. **Enhanced State Management**: 
   - Implement a more robust state management solution using React Context API.
   - Create a centralised JobProvider to manage all job-related state and operations.

2. **Improved Data Fetching**:
   - Implement more efficient data fetching strategies, possibly using SWR or React Query.
   - Add pagination for better performance with a large number of job applications.

3. **Advanced Filtering and Sorting**:
   - Add more advanced filtering options (e.g., by date range, status, company).
   - Implement custom sorting functionality.
4. **Data Visualisation**:
   - Add charts and graphs to visualise my application status, response rates, etc.

5. **Email Notifications**:
   - Implement email notifications for application deadlines and status updates.

6. **Offline Support**:
   - Implement offline support using service workers for a progressive web app experience.

7. **Integration with Job Boards**:
   - Add functionality to import job listings from popular job boards.

8. **Accessibility Improvements**:
    - Ensure the application is fully accessible and compliant with WCAG guidelines.
  
  ## Known Issues

As this project is still in development, there are a few known issues that I'm actively working on:

- **Job List Refresh**: Adding a new job doesn't automatically refresh the page. This requires a reimplementation of the state handling mechanism.

- **Modal Behavior**: The modal doesn't close automatically after updating a job. This needs to be addressed in the update function.

- **Testing Coverage**: More comprehensive testing is required to ensure all components and functions are working as expected.

I'm prioritizing these issues and working on resolving them in upcoming updates. If you encounter any additional issues, please feel free to open an issue in the GitHub repository.


## Personal Learning Goals

This project serves as a practical application of my web development skills and a chance to learn new technologies. Through building and improving this application, I aim to:

- Deepen my understanding of React and Next.js
- Gain hands-on experience with SQL and Supabase for backend operations
- Improve my skills in state management and data fetching in React applications
- Enhance my knowledge of responsive design and accessibility in web applications

## Licence

This project is licensed under the MIT Licence - see the [LICENCE.md](LICENCE.md) file for details.

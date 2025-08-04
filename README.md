# School ERP System

This is a School ERP System built to manage the day-to-day operations of a school, providing a centralized platform for different stakeholders: Super Admin, Admin, Teacher, Parent, and Student. The system is designed to streamline school management by offering role-based access and specific functionalities for each user panel.



## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Roles and Panels](#roles-and-panels)
5. [Technologies](#technologies)
6. [License](#license)

## Installation

To install and run this project, follow the steps below:

### Clone the repository
```bash
git clone <repository-url>
cd school-erp
```

### Install dependencies
```bash
npm install
```

### Run the application
```bash
npm start
```

The application will run on `http://localhost:3000`.

## Usage

Once the application is running, you can access the respective panels based on your role:

1. **Super Admin Panel**: Full control over all school data, including managing admins and overall school settings.
2. **Admin Panel**: Administrative control over user management, courses, and other operational tasks.
3. **Teacher Panel**: Allows teachers to manage their class schedules, assignments, and student data.
4. **Parent Panel**: Allows parents to track their child’s progress, attendance, and other relevant updates.
5. **Student Panel**: Students can view their courses, grades, assignments, and attendance.

## Features

- **Role-based Access Control**: Different functionalities for Super Admin, Admin, Teacher, Parent, and Student.
- **Student Management**: Manage student records, grades, attendance, and assignments.
- **Class and Timetable Management**: Teachers and Admins can manage class schedules, timetables, and subject allocation.
- **Parent Access**: Parents can track their child's performance and attendance.
- **Assignment Tracking**: Teachers can upload and track student assignments and grades.
- **Notifications**: Notifications for assignments, results, and other important updates.

## Roles and Panels

### Super Admin
- Manage all users (Admin, Teacher, Parent, Student).
- Set system-wide settings, roles, and permissions.
- View reports and analytics for the school.

### Admin
- Manage student and teacher profiles.
- Create and manage classes and timetables.
- View reports for academic and operational purposes.

### Teacher
- View their timetable and assignments.
- Grade student assignments and manage student progress.
- Update attendance records.

### Parent
- View their child’s academic progress, grades, and attendance.
- Receive notifications about school activities and updates.

### Student
- View class schedules, assignments, and grades.
- Track their attendance and academic progress.

## Technologies

- **Frontend**: React.js, Bootstrap
- **Backend**: Java
- **Database**: MySQL, PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

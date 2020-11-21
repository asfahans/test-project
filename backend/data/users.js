import bcrypt from 'bcryptjs';

const users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('123456', 10),
    title: 'Mr.',
    name: 'Admin User',
    designation: 'Administrator',
    department: 'IT Department',
    assignedVessels: [
      {
        name: 'TU',
      },
      {
        name: 'TW',
      },
      {
        name: 'TF',
      },
    ],
    isAdmin: true,
    isActive: true,
  },

  {
    username: 'rahul',
    password: bcrypt.hashSync('123456', 10),
    title: 'Capt.',
    name: 'Rahul Gupta',
    designation: 'Crew Manager',
    department: 'Crew Department',
    assignedVessels: [
      {
        name: 'TP',
      },
      {
        name: 'TS',
      },
      {
        name: 'TG',
      },
    ],
    isAdmin: false,
    isActive: true,
  },
  {
    username: 'kolha',
    password: bcrypt.hashSync('123456', 10),
    title: 'Capt.',
    name: 'S. Kolha',
    designation: 'Master',
    department: 'Onboard',
    assignedVessels: [
      {
        name: 'TA',
      },
    ],
    isAdmin: false,
    isActive: true,
  },
];

export default users;

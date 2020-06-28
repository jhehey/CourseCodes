import React from 'react';
import { SignIn, SignUp, About, LandingHome } from '../components/landing';
import { StudentHome } from '../components/student';
import { InstructorHome } from '../components/instructor';

// TODO: create own component
const Courses = () => {
	return (
		<div>
			<h1>Common Courses</h1>
			<h1>Common Courses</h1>
			<h1>Common Courses</h1>
			<h1>Common Courses</h1>
		</div>
	);
};

const Students = () => {
	return (
		<div>
			<h1>Instructor Students</h1>
			<h1>Instructor Students</h1>
			<h1>Instructor Students</h1>
			<h1>Instructor Students</h1>
		</div>
	);
};

export const pageRoutes = {
	landing: [
		{ path: '/', component: LandingHome, isLink: true, value: 'Home' },
		{ path: '/about', component: About, isLink: true, value: 'About' },
		{ path: '/signin', component: SignIn, isLink: false, value: 'Sign In' },
		{ path: '/signup', component: SignUp, isLink: false, value: 'Sign Up' },
	],
	student: [
		{ path: '/', component: StudentHome, isLink: true, value: 'Home' },
		{ path: '/courses', component: Courses, isLink: true, value: 'Courses' },
	],
	instructor: [
		{ path: '/', component: InstructorHome, isLink: true, value: 'Home' },
		{ path: '/courses', component: Courses, isLink: true, value: 'Courses' },
		{ path: '/students', component: Students, isLink: true, value: 'Students' },
	],
};

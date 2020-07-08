import React from 'react';
import { SignIn, SignUp, About, LandingHome } from '../components/landing';
import { StudentHome } from '../components/student';
import { InstructorHome } from '../components/instructor';
import { Courses, CreateCourse, ViewCourse, CreateTopic } from '../components/courses';
import { Problems, CreateProblem, ViewProblem, SolveProblem } from '../components/problems';

// TODO: create own component
// const Courses = () => {
// 	return <Courses />;
// };

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
		{ path: '/courses/:courseId', component: ViewCourse, isLink: false, value: 'View Course' },
		{ path: '/problems/:problemId', component: ViewProblem, isLink: false, value: 'Problem' },
		{ path: '/problems/:problemId/solve', component: SolveProblem, isLink: false, value: 'Solve Problem' },
	],
	instructor: [
		{ path: '/', component: InstructorHome, isLink: true, value: 'Home' },
		{ path: '/courses', component: Courses, isLink: true, value: 'Courses' },
		{ path: '/students', component: Students, isLink: false, value: 'Students' },
		{ path: '/courses/create', component: CreateCourse, isLink: false, value: 'Create Course' },
		{ path: '/courses/:courseId', component: ViewCourse, isLink: false, value: 'View Course' },
		{ path: '/courses/:courseId/topics/create', component: CreateTopic, isLink: false, value: 'Create Topic' },
		{ path: '/problems', component: Problems, isLink: true, value: 'Problemset' },
		{ path: '/problems/create', component: CreateProblem, isLink: false, value: 'Create Problem' },
		{ path: '/problems/:problemId', component: ViewProblem, isLink: false, value: 'Problem' },
	],
};

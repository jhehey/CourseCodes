import React from 'react';
import { SignIn, SignUp, About, LandingHome } from '../components/landing';
import { StudentDashboard } from '../components/student';
import { InstructorDashboard, StudentList } from '../components/instructor';
import { CourseList, CreateCourse, ViewCourse, CreateTopic } from '../components/courses';
import { Problems, CreateProblem, ViewProblem, SolveProblem } from '../components/problems';
import { SignOut } from '../components/common/SignOut';
import { UserProfile } from '../components/common/UserProfile';
import { SolutionList, ViewSolution } from '../components/solutions';

export const pageRoutes = {
	landing: [
		{ path: '/', component: LandingHome, isLink: true, value: 'Home' },
		{ path: '/#about', component: About, isLink: true, value: 'About' },
		{ path: '/signin', component: SignIn, isLink: false, value: 'Sign In' },
		{ path: '/signup', component: SignUp, isLink: false, value: 'Sign Up' },
	],
	student: [
		{ path: '/', component: StudentDashboard },
		{ path: '/courses', component: CourseList },
		{ path: '/courses/:courseId', component: ViewCourse },
		{ path: '/courses/:courseId/problems', component: Problems },
		{ path: '/courses/:courseId/problems/:problemId', component: ViewProblem },
		{ path: '/courses/:courseId/problems/:problemId/solve', component: SolveProblem },
		{ path: '/courses/:courseId/students', component: StudentList },
		{ path: '/courses/:courseId/solutions', component: SolutionList },
		{ path: '/courses/:courseId/solutions/:solutionId', component: ViewSolution },
		{ path: '/profile', component: UserProfile },
		{ path: '/signout', component: SignOut },
	],
	instructor: [
		{ path: '/', component: InstructorDashboard },
		{ path: '/courses', component: CourseList },
		{ path: '/courses/create', component: CreateCourse },
		{ path: '/courses/:courseId', component: ViewCourse },
		{ path: '/courses/:courseId/topics/create', component: CreateTopic },
		{ path: '/courses/:courseId/problems', component: Problems },
		{ path: '/courses/:courseId/problems/create', component: CreateProblem },
		{ path: '/courses/:courseId/problems/:problemId', component: ViewProblem },
		{ path: '/courses/:courseId/students', component: StudentList },
		{ path: '/courses/:courseId/solutions', component: SolutionList },
		{ path: '/courses/:courseId/solutions/:solutionId', component: ViewSolution },
		{ path: '/profile', component: UserProfile },
		{ path: '/signout', component: SignOut },
	],
};

import React from 'react';
import { RequiredTextField } from '../common';
import { useForm, useFieldArray } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { ChipSelect } from '../common';
import { problemActions } from '../../redux/actions';
import { useGetCourses } from '../../hooks';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	main: {
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(10),
	},
}));

export const CreateProblem = () => {
	const classes = useStyles();

	// React Hook Form
	const { register, control, handleSubmit, errors } = useForm({
		defaultValues: { testCases: [{ sampleInput: '', expectedOutput: '' }] },
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'testCases',
	});

	const addTestCase = () => {
		append({ sampleInput: '', expectedOutput: '' });
	};

	const removeTestCase = (index) => {
		remove(index);
	};

	// for selecteing courses to assign this problem to
	const [assignedCourses, setAssignedCourses] = React.useState([]);
	const handleAssignCourses = (event) => {
		setAssignedCourses(event.target.value);
	};

	// submit the problem
	const author = useSelector((state) => state.account?.signedAccount);
	const dispatch = useDispatch();
	const onSubmit = (problemDetails) => {
		const courseIds = assignedCourses.map((course) => course.id);
		const problemToCreate = {
			...problemDetails,
			courseIds,
			authorId: author?.accountId,
		};
		console.log(problemToCreate);
		dispatch(problemActions.createProblem(problemToCreate));
	};

	// load the courses for the chip selector
	const instructor = useSelector((state) => state.account?.signedAccount);
	const courses = useGetCourses({ instructorId: instructor.id });

	// to determine if successful creation and redirect
	const problemCreated = useSelector((state) => state.problem?.problemCreated);

	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView.id;

	return (
		<Container maxWidth="md" className={classes.main}>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<h1>Create Assignment</h1>
				<h1>Title</h1>
				<RequiredTextField name="title" register={register} error={errors.title} />
				<h1>Statement</h1>
				<RequiredTextField
					name="statement"
					register={register}
					error={errors.statement}
					multiline={true}
					rows={12}
					rowsMax={12}
				/>
				<h1>Assign to courses</h1>
				<ChipSelect
					selectedItems={assignedCourses}
					handleItemSelected={handleAssignCourses}
					valueName="courseName"
					items={courses}
				/>

				<h1>Test Cases</h1>
				{fields.map((testCase, index) => (
					<Grid container key={testCase.id}>
						<Grid container>
							<Grid item xs={10}>
								<h2>Test Case {index + 1}</h2>
							</Grid>
							<Grid container item xs={2} justify="flex-end" alignItems="center">
								<Button variant="outlined" color="secondary" onClick={() => removeTestCase(index)} tabIndex={-1}>
									Remove
								</Button>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<RequiredTextField
									name={`testCases[${index}].sampleInput`}
									error={errors.testCases && errors.testCases[index]?.sampleInput}
									label="Sample Input"
									register={register}
									multiline={true}
									rows={5}
								/>
							</Grid>
							<Grid item xs={6}>
								<RequiredTextField
									name={`testCases[${index}].expectedOutput`}
									error={errors.testCases && errors.testCases[index]?.expectedOutput}
									label="Expected Output"
									register={register}
									multiline={true}
									rows={5}
								/>
							</Grid>
						</Grid>
					</Grid>
				))}

				<Button variant="outlined" color="primary" onClick={addTestCase}>
					Add Test Case
				</Button>

				<Button type="submit" variant="contained" color="primary">
					Submit
				</Button>
			</form>
			{problemCreated && <Redirect to={`/courses/${courseId}/problems`} />}
		</Container>
	);
};

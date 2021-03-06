import React from 'react';
import { Container, Grid, Card, Typography, CardContent, CardMedia, CardActionArea } from '@material-ui/core/';
import { Parallax } from 'react-parallax';
import { useStyles } from './useStyles';

export const LandingHome = () => {
	const classes = useStyles();

	return (
		<div>
			<Parallax
				strength={500}
				bgImage={
					'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'
				}
				className={classes.hero}
			>
				<Typography className={classes.header}>Sharpen your skills</Typography>
				<Typography className={classes.sub}>Practice C++ Programming </Typography>
			</Parallax>
			<Container maxWidth="lg" className={classes.features}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
									image="https://cdn.mos.cms.futurecdn.net/X5TyA8uvkGXoNyjFzxcowS-650-80.jpg.webp"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Experience
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										Experience a user-friendly environment for your learning
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
									image="https://cdn.mos.cms.futurecdn.net/X5TyA8uvkGXoNyjFzxcowS-650-80.jpg.webp"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Practice
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										Practice your C++ programming skills
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
									image="https://cdn.mos.cms.futurecdn.net/X5TyA8uvkGXoNyjFzxcowS-650-80.jpg.webp"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Collaborate
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										Join a code session with your instructor within a course
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Container>
			<div id="about">
				<Parallax
					blur={{ min: -1, max: 10 }}
					bgImage={
						'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
					}
					className={classes.about}
				>
					<Card className={classes.cardAbout}>
						<CardContent>
							<Typography variant="h2" inlineText="center" component="h2">
								About Us
							</Typography>
							<Typography variant="h5" component="p">
								Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou
								Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy
								a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make
								a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the
								house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at
								night.
							</Typography>
						</CardContent>
					</Card>
				</Parallax>
			</div>
		</div>
	);
};

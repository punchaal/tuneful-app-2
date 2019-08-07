import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import atoms from './instapaper/components/atoms';
import theme from './instapaper/theme/instapaper/theme';
import withTheme from './instapaper/pages/instapaper/withTheme';
import Box from '@material-ui/core/Box';
import Spotify from 'spotify-web-api-js';
import EditProfile from './EditProfile'
import Header from './Header';
import user_id from '../Services/get-user-id'
import Post from './Post'
import { useCookies, Cookies } from 'react-cookie';
import params from '../Services/get-spotify-token'

const spotifyWebApi = new Spotify();
const { Avatar, Typography } = atoms;

const ProfilePage = () => {

  const cookie_access_token = useCookies()[0].access_token;
  spotifyWebApi.setAccessToken(cookie_access_token)

  const upSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true });
  const [userProfileState, setUserProfileState] = useState(
    {
      loggedIn: params.access_token ? true : false,
      user: {
        name: '',
        email: '',
        image: '',
        description: ''
      }
    }
  )
  const [userPostsState, setUserPostsState] = useState(
    []
  )

  useEffect(() => {
    //with Hooks the useEffect repalces the componentDidMount. This stops the render from running this code eternally
    //get user data
    fetch(`https://murmuring-beyond-87321.herokuapp.com/api/users/${user_id}`)
      .then(results => {
        return results.json()
      })
      .then(data => {
        let theImage = data.image_url;
        if (theImage === undefined || theImage === null) {
          console.log("using default image")          
          theImage = "https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg"
        }
        setUserProfileState({
          user: {
            ...userProfileState.user,
            first_name: data[0].first_name,
            last_name: data[0].last_name,
            description: data[0].description,
            image: theImage
          }
        })
      })


    //get the users posts and display them
    fetch(`https://murmuring-beyond-87321.herokuapp.com/api/posts/author/${user_id}`)
      .then(results => {
        return results.json()
      })
      .then(posts => {
        setUserPostsState(posts)
      }
      )

    spotifyWebApi.getMe()
    .then((response) => {
     setUserProfileState({
        user: {
           ...userProfileState.user,
           name: response.display_name,
           email: response.email,
           image: response.images[0].url,
         }
       })
     })       

  }, []);

  useEffect(() => {


    try {
       userPostsState.map(item => console.log(item.id))
    }
    catch (e) {
        setUserPostsState([])
    }

  })

  const profileChange = (e) => {
    //grabs the data from EditProfile. It's an array, e[0] is the description text, and e[1] is the image file
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 30px">
        <Box mb="44px">
          <Grid container>
            <Grid item xs={4}>
              <Avatar
                ultraLarge={upSm}
                medium={!upSm}
                style={{ margin: 'auto' }}
                alt="Profile Pic"
                src={userProfileState.user.image}
              />
            </Grid>
            <Grid item xs={8}>
              <Box clone mb="20px">
                <Grid container alignItems="center">
                  <Typography component="h1" variant="h3" lightWeight>
                    
                    {userProfileState.user.first_name + " " + userProfileState.user.last_name }
                  </Typography>

                  <EditProfile
                    changed={profileChange}
                    desc={""}
                  />
                </Grid>
              </Box>
              <Typography variant="subtitle1">{userProfileState.user.description}</Typography>
              <Box mb="20px">
                <Grid container spacing={5}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>0</b> followers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>0</b> following
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ProfilePage);
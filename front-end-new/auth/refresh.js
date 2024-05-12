import createRefresh from 'react-auth-kit';
import axios from '../src/api/axiosconfig.ts';

const refresh = createRefresh({
  interval: 60, // The time in sec to refresh the Access token,
  refreshApiCallback: async ({
    authToken, 
    refreshToken,
    authUserState
  }) => {
    try {
      const response = await axios.post("/api/refresh", { refreshToken: refreshToken }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      if (response.status === 200) {
        console.log("Refreshing");
        return {
          isSuccess: true,
          newAuthToken: response.data.accessToken,
          newAuthTokenExpireIn: 300,
          newRefreshTokenExpiresIn: 600
        }
      } else {
        console.log("Did not refresh!");
      }
      // console.log("Refreshing")
      // return {
      //   isSuccess: true,
      //   newAuthToken: response.data.accessToken,
      //   newAuthTokenExpireIn: 300,
      //   newRefreshTokenExpiresIn: 600
      // }
    }
    catch(error){
      console.error(error)
      return {
        isSuccess: false
      } 
    }
  }
});

export default refresh;
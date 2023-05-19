import { useReducer, useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

const amplifyAuthReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.user
      };
    case "FETCH_USER_DATA_FAILURE":
      return { ...state, isLoading: false, isError: true };
    case "RESET_USER_DATA":
      return { ...state, user: null };
    default:
      throw new Error();
  }
};

const useAmplifyAuth = (navigate) => {
  const initialState = {
    isLoading: true,
    isError: false,
    user: null
  };
  const [state, dispatch] = useReducer(amplifyAuthReducer, initialState);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (isMounted) {
        dispatch({ type: "FETCH_USER_DATA_INIT" });
      }
      try {
        if (isMounted) {
          const data = await Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          });
          if (data) {
            dispatch({
              type: "FETCH_USER_DATA_SUCCESS",
              payload: { user: data }
            });
          }
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: "FETCH_USER_DATA_FAILURE" });
        }
      }
    };

    const HubListener = () => {
      Hub.listen("auth", data => {
        const { payload } = data;
        onAuthEvent(payload);
      });
    };

    const onAuthEvent = payload => {
      switch (payload.event) {
        case "signIn":
          if (isMounted) {
            navigate("/");
            setTriggerFetch(true);
          }
          break;
        case "signUp":
          if (isMounted) {
            navigate("/verify");
            setTriggerFetch(true);
          }
          break;
        default:
          return;
      }
    };

    HubListener();
    fetchUserData();

    return () => {
      Hub.remove("auth");
      isMounted = false;
    };
  }, [triggerFetch, navigate]);

  const handleSignout = async () => {
    try {
      await Auth.signOut();
      navigate(-1);
      setTriggerFetch(false);
      dispatch({ type: "RESET_USER_DATA" });
    } catch (error) {
    }
  };

  const handleSignIn = async (data) => {
    try {
      await Auth.signIn(data);
    } catch (error) {
      if (error.code === "UserNotConfirmedException") navigate("/verify");
      return error;
    }
  }

  const handleSignUp = async ({ nickname, ...data }) => {
    try {
      return await Auth.signUp({ ...data, attributes: { nickname } });
    } catch (error) {
      return error;
    }
  }

  const handleConfirmSignUp = async ({ username, code }) => {
    try {
      return await Auth.confirmSignUp(username, code);
    } catch (error) {
      return error;
    }
  }

  const handleResendSignUp = async (username) => {
    try {
      return await Auth.resendSignUp(username);
    } catch (error) {
      return error;
    }
  }
  return { state, handleSignout, handleSignIn, handleSignUp, handleConfirmSignUp, handleResendSignUp };
};

export default useAmplifyAuth;
import { gql } from "@apollo/client";

const signupSchema = gql`
  mutation CreateUserProfile($inputData: EmailAndPasswordInput!) {
    signUp(signUpInputData: $inputData) {
      code
      success
      message
      data {
        IdToken
        email
        exp
      }
    }
  }
`;

const loginSchema = gql`
  mutation EmailAndPasswordLogin($loginDetails: EmailAndPasswordInput!) {
    emailAndPasswordLogin(loginInputData: $loginDetails) {
      code
      success
      message
      data {
        IdToken
        email
        exp
      }
    }
  }
`;

export { signupSchema, loginSchema };

/* eslint-disable @next/next/no-img-element */
import {
  getProviders,
  signIn,
  getCsrfToken,
  getSession,
} from "next-auth/react";
import { Container } from "@mui/material";

const SignInPage = ({ providers, csrfToken, errorMessage }) => {
  return (
    <div className="min-h-screen w-screen box-border bg-gradient-to-br from-[#5D9F6B] via-[#3B7DE5] to-[#F097D1]">
      
      <div className="min-h-full min-w-screen flex justify-center items-center">
        <div className=" flex flex-col w-full box-border justify-center items-center py-12 lg:flex-none">
        <div className="relative text-white mb-24">
              <h1 className="text-5xl" style={{fontFamily: 'Righteous'}}> Healty Hive</h1>
                <h2 className="absolute right-0 text-m" style={{fontFamily: 'Roboto'}}>Crea la mejor versión de ti</h2>
              </div>
          <div className="box-border min-w-screen w-screen h-screen rounded-3xl px-4 bg-[#F0F0F0]">
            <div>
             
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Iniciar Sesión
              </h2>
            </div>

            <Container component="section">
              <div className="mt-6">
                <form
                  method="post"
                  action="/api/auth/signin/email"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={csrfToken}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mt-3 text-sm text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  //getting providers and csfr token
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const session = await getSession({ req: context.req });

  const { error } = context.query;
  let errorMessage = "";

  //if user is logged in, redirect to home
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (error) {
    const errors = {
      Signin: "Try using a different email address",
      OAuthSignin: "Try using a different email address",
      OAuthCallback: "Try using a different email address",
      OAuthCreateAccount: "Try using a different email address",
      EmailCreateAccount: "Try using a different email address",
      Callback: "Try using a different email address",
      OAuthAccountNotLinked:
        "Try using a different email address or sign in with a different provider",
      EmailSignin: "Check your email for a link to reset your password",
      default: "A unknown and misterious error happened",
    };

    errorMessage = errors[error] || errors.default;
  }

  return {
    props: { errorMessage, providers, csrfToken },
  };
}

export default SignInPage;

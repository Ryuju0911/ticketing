import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>ticketing.com</h1>;
};

// getInitialProps is executed either on the server or on the client.
// 
// Executed on the server
//  * Hard refresh of page
//  * Clicking link from different domain
//  * Typing URL into address bar
//
// Executed on the client
//  * Navigating from one page to another while in the app
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;

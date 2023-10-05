import axios from 'axios';

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
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server.
    //
    // We cannot perform a GET request to '/api/users/currentuser' because
    // 'getInitialProps' is executed in the Client container.
    // Instead, we need to determine the domain name of the Auth service,
    // which hosts the 'currentuser' API.
    // To achieve this, we send the request to Ingress Nginx once,
    // allowing it to resolve the routing for us.
    //
    // To send requests to Ingress Nginx, we utilize cross-namespace
    // communication, as our services are located in the 'default' namespace,
    // while Ingress Nginx resides in the 'ingress-nginx' namespace.
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers
      }
    );

    return data;
  } else {
    // We are on the browser.
    // Requests can be made with a base URL of ''.
    const { data } = await axios.get('/api/users/currentuser');

    return data;
  }
};

export default LandingPage;

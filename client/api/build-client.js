import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server.
    //
    // We cannot perform a request to API because
    // 'getInitialProps' is executed in the Client container.
    // Instead, we need to determine the domain name of the service,
    // which hosts the API.
    // To achieve this, we send the request to Ingress Nginx once,
    // allowing it to resolve the routing for us.
    //
    // To send requests to Ingress Nginx, we utilize cross-namespace
    // communication, as our services are located in the 'default' namespace,
    // while Ingress Nginx resides in the 'ingress-nginx' namespace.
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // We are on the browser.
    // Requests can be made with a base URL of ''.
    return axios.create({
      baseURL: '/'
    });
  }
};

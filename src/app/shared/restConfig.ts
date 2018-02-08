import { baseURL } from './baseurl';

//function for setting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
    RestangularProvider.setBaseUrl(baseURL);
}
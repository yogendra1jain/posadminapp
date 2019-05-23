const API_URL = 'http://13.126.59.19:20029/api';

export const convertGetCustomerByIdDataProviderRequestToHTTP = (type, resource, params) => {
    const reqBody = {
        id: params.id
      }
      return {
          url: `${API_URL}/Customer/Get`,
          options: {
              method: 'POST',
              body: JSON.stringify(reqBody)
          },
      };
}

export const convertGetZipCodeDataProviderRequestToHTTP = (type, resource, params) => {
    const reqBody = {...params};
      return {
          url: `${API_URL}${resource}`,
          options: {
              method: 'POST',
              body: JSON.stringify(reqBody)
          },
      };
}
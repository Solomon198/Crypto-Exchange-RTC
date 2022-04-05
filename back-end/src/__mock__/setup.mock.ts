import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import MockServer from './mock.server';

// Setting up mock server
export default function SetUpMockAxios(axios: AxiosInstance) {
  const $MockAdapter = new MockAdapter(axios);
  MockServer($MockAdapter);
}

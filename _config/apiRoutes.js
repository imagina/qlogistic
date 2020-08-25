const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const moduleName = 'ilogistics';
const moduleVersion = 'v1';
const urlBase = `${baseApiUrl}/${moduleName}/${moduleVersion}`;

export default {
  orders : `${urlBase}/orders`,
  orderStatuses : `${urlBase}/orderStatuses`,
  orderStatusHistories : `${urlBase}/order-status-histories`,
  business : `${baseApiUrl}/ibusiness/v1/business`,
  businessTypes : `${baseApiUrl}/ibusiness/v1/type`,
}

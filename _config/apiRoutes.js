const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const moduleName = 'ilogistics';
const moduleVersion = 'v1';
const urlBase = `${baseApiUrl}/${moduleName}/${moduleVersion}`;

export default {
  orders : `${urlBase}/orders`,
  orderItems : `${urlBase}/orderItems`,
  orderStatuses : `${urlBase}/orderStatuses`,
  orderStatusHistories : `${urlBase}/order-status-histories`,
  packagingTypes : `${urlBase}/packagingTypes`,
  business : `${baseApiUrl}/ibusiness/v1/business`,
  businessTypes : `${baseApiUrl}/ibusiness/v1/type`,
}

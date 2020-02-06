const axios = require('axios')

const httpPost = async (apiEndpoint, postData) => {
  await axios({
    method: 'POST',
    url: `https://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/wt-ec-api/${apiEndpoint}`,
    data: postData,
    config: {headers: {'Content-Type': 'application/json'}}
  })
}

const httpGet = async (apiEndpoint, params) => {
  const url = `https://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/wt-ec-api/${apiEndpoint}`
  const resp = await axios.get(url, {
    params
  })
  return resp.data
}

export {
  httpPost,
  httpGet
}

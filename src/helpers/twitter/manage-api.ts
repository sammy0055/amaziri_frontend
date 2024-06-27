// import crypto from 'crypto';
// import querystring from 'querystring';

// const CONSUMER_KEY = process.env.CONSUMER_KEY as string;
// const CONSUMER_SECRET = process.env.CONSUMER_SECRET as string;
// const CALLBACK_URL = 'http://localhost:3000/callback';

// const generateOAuthSignature = (
//   method: string,
//   url: string,
//   params: Record<string, string>,
//   consumerSecret: string,
//   tokenSecret: string = ''
// ): string => {
//   const sortedParams = Object.keys(params)
//     .sort()
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     .join('&');
//   const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;
//   const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
//   return crypto.createHmac('sha1', signingKey).update(signatureBaseString).digest('base64');
// };

// const getOAuthHeaders = (params: Record<string, string>): string => {
//   return 'OAuth ' + Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(params[key])}"`)
//     .join(', ');
// };

// const requestToken = async (): Promise<Record<string, string>> => {
//   const url = 'https://api.twitter.com/oauth/request_token';
//   const method = 'POST';
//   const oauthParams = {
//     oauth_consumer_key: CONSUMER_KEY,
//     oauth_nonce: crypto.randomBytes(16).toString('hex'),
//     oauth_signature_method: 'HMAC-SHA1',
//     oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
//     oauth_version: '1.0',
//     oauth_callback: CALLBACK_URL,
//   };
//   oauthParams.oauth_signature = generateOAuthSignature(method, url, oauthParams, CONSUMER_SECRET);

//   const headers = {
//     'Authorization': getOAuthHeaders(oauthParams),
//     'Content-Type': 'application/x-www-form-urlencoded'
//   };

//   const response = await fetch(url, {
//     method: method,
//     headers: headers
//   });

//   const responseText = await response.text();
//   return querystring.parse(responseText);
// };

// const redirectUserForAuthorization = (oauthToken: string) => {
//   const authUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`;
//   console.log(`Please open this URL in your browser to authorize: ${authUrl}`);
// };

// const getAccessToken = async (oauthToken: string, oauthVerifier: string): Promise<Record<string, string>> => {
//   const url = 'https://api.twitter.com/oauth/access_token';
//   const method = 'POST';
//   const oauthParams = {
//     oauth_consumer_key: CONSUMER_KEY,
//     oauth_token: oauthToken,
//     oauth_nonce: crypto.randomBytes(16).toString('hex'),
//     oauth_signature_method: 'HMAC-SHA1',
//     oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
//     oauth_version: '1.0',
//     oauth_verifier: oauthVerifier,
//   };
//   oauthParams.oauth_signature = generateOAuthSignature(method, url, oauthParams, CONSUMER_SECRET, oauthToken);

//   const headers = {
//     'Authorization': getOAuthHeaders(oauthParams),
//     'Content-Type': 'application/x-www-form-urlencoded'
//   };

//   const response = await fetch(url, {
//     method: method,
//     headers: headers
//   });

//   const responseText = await response.text();
//   return querystring.parse(responseText);
// };

// // Full flow example
// (async () => {
//   try {
//     const requestTokenData = await requestToken();
//     if (requestTokenData.oauth_token) {
//       redirectUserForAuthorization(requestTokenData.oauth_token);

//       // Here you would capture oauth_token and oauth_verifier from the callback URL
//       const oauthToken = 'OAUTH_TOKEN_FROM_CALLBACK';
//       const oauthVerifier = 'OAUTH_VERIFIER_FROM_CALLBACK';

//       const accessTokenData = await getAccessToken(oauthToken, oauthVerifier);
//       console.log('Access Token Response:', accessTokenData);
//     } else {
//       console.error('Failed to obtain request token');
//     }
//   } catch (error) {
//     console.error('Error during authentication flow:', error);
//   }
// })();

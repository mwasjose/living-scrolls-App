import * as functions from 'firebase-functions';

export const welcomeMessage = functions.https.onRequest((request, response) => {
  response.send('Living Scrolls Firebase Functions ready.');
});

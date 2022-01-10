const commonHeights = {
    navHeight: 72,
};

const LOCALSTORAGE_JWT = "okra_jwt";
const REALM_APP_ID = "okra-app-hfrzg";

const LOGIN_URL = `https://realm.mongodb.com/api/client/v2.0/app/${REALM_APP_ID}/auth/providers/local-userpass/login`;

const REALM_ENDPOINT = `https://realm.mongodb.com/api/client/v2.0/app/${REALM_APP_ID}/graphql`;

export {
    commonHeights,
    LOCALSTORAGE_JWT,
    LOGIN_URL,
    REALM_ENDPOINT,
    REALM_APP_ID,
};

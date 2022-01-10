import { createContext, Context } from "react";
import { REALM_APP_ID } from "./common";
import * as Realm from "realm-web";

const app: Realm.App = new Realm.App({ id: REALM_APP_ID });

const RealmContext: Context<Realm.App> = createContext(app);

export default RealmContext;

import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment.prod';
export const pb = new PocketBase(environment.pbBaseUrl);

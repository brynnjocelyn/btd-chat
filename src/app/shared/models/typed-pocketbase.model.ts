/*
 * This file is used to define the types of the collections in the database.
 *
 * This is an alternative to typing the collections in the service file.
 */

import PocketBase, { RecordService } from 'pocketbase';
import { User } from './user.model';

export interface TypedPocketBaseModel extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: 'users'): RecordService<User>;
}

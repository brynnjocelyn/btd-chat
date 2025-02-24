import { Injectable } from '@angular/core';
import PocketBase, {
  AuthModel,
  HealthCheckResponse,
  RecordAuthResponse,
  RecordModel,
  RecordOptions,
  RecordService,
} from 'pocketbase';
import { Observable, forkJoin, from, map, of } from 'rxjs';
/* import { TypedPocketBaseModel } from '../models/pocket-base/typed-pocket-base.model';
import { User } from '../models/user';
import { RegistrationPayload } from 'src/app/register/models/registration-payload.model'; */
/* import { environment } from 'src/environments/environment';
import { Location } from '../models/location/location.model';
import { myProfileFields, userProfileFields } from '../utils';
import { NotificationPreferences } from '../models/notification-preferences.model';
import { Message } from 'src/app/chat/models/message.model'; */
// import { Chat } from 'src/app/chat/models/chat.model';
import { ChatService } from './chat.service';
/* import { Like } from '../models/like.model';
import { Match } from '../models/matches.model'; */
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { TypedPocketBaseModel } from '../shared/models/typed-pocketbase.model';
import { Chat, Message } from '../shared/models/chat.model';
import {
  User,
  NotificationPreferences,
  Match,
  Like,
} from '../shared/models/user.model';
// import { setUserTokenAction } from '../state/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  private pb: PocketBase;
  private authStoreChanges: () => void;

  usersCollection: RecordService<User>;
  locationsCollection: RecordService<Location>;
  notificationsCollection: RecordService<NotificationPreferences>;
  chatsCollection: RecordService<Chat>;
  messagesCollection: RecordService<Message>;
  matchesCollection: RecordService<Match>;
  likesCollection: RecordService<Like>;
  authIsValid: boolean = false;

  apiUrl = environment.apiBaseUrl;
  imageUrlBase = `${environment.pbBaseUrl}/api/files/users/`;

  constructor(
    private chatService: ChatService,
    private store: Store,
  ) {
    // this.pb = new PocketBase('http://10.27.27.152:8080');
    this.pb = new PocketBase(environment.pbBaseUrl) as TypedPocketBaseModel;

    this.authStoreChanges = this.pb.authStore.onChange((token, model) => {
      console.log('authStore changed', token, model, this.pb.authStore.isValid);
      this.authIsValid = this.pb.authStore.isValid;
      // this.store.dispatch(setUserTokenAction({ token }));
    }, true);

    this.usersCollection = this.pb.collection('users'); // for convenience
    this.locationsCollection = this.pb.collection('locations'); // for convenience
    this.notificationsCollection = this.pb.collection(
      'notification_preferences',
    ); // for convenience
    this.chatsCollection = this.pb.collection('chats'); // for convenience
    this.messagesCollection = this.pb.collection('messages'); // for convenience
    this.matchesCollection = this.pb.collection('matches'); // for convenience
    this.likesCollection = this.pb.collection('likes'); // for convenience
    setInterval(
      () => {
        console.log('Checking auth validity', this.pb.authStore.isValid);
      },
      1000 * 60 * 5,
    );
  }

  // AUTH
  login(email: string, password: string): Observable<RecordAuthResponse<User>> {
    const fields = [
      'record.email',
      'record.name',
      'record.id',
      'record.profileImage',
      'record.matches',
      'record.location',
      'token',
    ];
    const options: RecordOptions = {
      fields: fields.join(','),
      expand: 'location, matches',
    };
    console.log('options', options);
    return from(
      this.usersCollection.authWithPassword(email, password, options),
    );
  }

  logout(): Observable<AuthModel | null> {
    this.pb.authStore.clear();
    return of(this.pb.authStore.record);
  }

  authRefresh(): Observable<RecordAuthResponse<User> | null> {
    return from(this.usersCollection.authRefresh());
  }

  sendVerificationEmail(email: string): Observable<boolean> {
    return from(this.usersCollection.requestVerification(email));
  }

  confirmVerification(token: string): Observable<boolean> {
    return from(this.usersCollection.confirmVerification(token));
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.pb.authStore.isValid);
  }

  destroyAuthStoreListener(): void {
    this.authStoreChanges();
  }

  apiHealthCheck(): Observable<HealthCheckResponse> {
    return from(this.pb.health.check());
  }

  // USER CRUD
  /* createUser(payload: RegistrationPayload): Observable<User> {
    return from(this.usersCollection.create(payload));
  } */

  loadUser(id: string): Observable<User> {
    return from(this.usersCollection.getOne<User>(id));
  }

  loadAllUsers(): Observable<User[]> {
    return from(
      this.usersCollection.getFullList({
        expand: 'location',
        sort: '-created',
      }),
    );
  }
  /* loadMyProfileData(): Observable<User> {
    const id = this.pb.authStore.model!['id']!;
    const options: RecordOptions = {
      fields: myProfileFields.join(','),
      expand: 'location, matches, notificationPreferences',
    };
    // options.fields = options.fields + ',user.email';
    console.log('id', id);
    console.log('options', options);
    return from(this.usersCollection.getOne(id, options));
  } */

  /* loadUserDetails(userId: string): Observable<User> {
    const options: RecordOptions = {
      fields: userProfileFields.join(','),
      expand: 'location',
    };
    return from(this.usersCollection.getOne(userId, options));
  } */

  updateUser(id: string, user: Partial<RecordModel>): Observable<User> {
    return from(this.usersCollection.update<User>(id, user));
  }

  // LOCATION CRUD
  createLocation(location: Location): Observable<Location> {
    return from(this.locationsCollection.create(location));
  }
  updateLocation(location: Partial<RecordModel>): Observable<Location> {
    return from(
      this.locationsCollection.update<Location>(location.id!, location),
    );
  }

  // NOTIFICATION PREFERENCES CRUD
  createNotificationPreferences(
    userId: string,
  ): Observable<NotificationPreferences> {
    return from(this.notificationsCollection.create({ userId }));
  }

  updateNotificationPreferences(
    notificationPreferences: Partial<NotificationPreferences>,
  ): Observable<NotificationPreferences> {
    console.log('notificationPreferences', notificationPreferences);
    return from(
      this.notificationsCollection.update<NotificationPreferences>(
        notificationPreferences.id!,
        notificationPreferences,
      ),
    );
  }
  // MATCHES CRUD
  matchWithUser(userId1: string, userId2: string): Observable<Match> {
    return from(this.matchesCollection.create({ userId1, userId2 }));
  }

  unmatchWithUser(
    matchId: string,
    likeId: string,
  ): Observable<{
    deletedMatch: boolean;
    deletedLikeForRequestingUser: boolean;
  }> {
    return forkJoin({
      deletedMatch: from(this.matchesCollection.delete(matchId)),
      deletedLikeForRequestingUser: from(this.likesCollection.delete(likeId)),
    });
  }

  loadMatches(userId: string): Observable<Match[]> {
    return from(
      this.matchesCollection.getFullList<Match>({
        filter: `userId1 = "${userId}" OR userId2 = "${userId}"`,
        expand: 'userId1, userId2',
      }),
    );
  }

  // CHAT/MESSAGES CRUD
  loadChat(id: string): Observable<Chat> {
    return from(this.chatsCollection.getOne(id));
  }

  loadMessages(chatId: string): Observable<Message[]> {
    return from(
      this.messagesCollection.getFullList<Message>({
        filter: `chatId = "${chatId}"`,
        expand: 'sender',
      }),
    ).pipe(map((messages) => this.calculateShouldShowTimestamp(messages)));
  }

  loadChats(): Observable<Chat[]> {
    return from(
      this.chatsCollection.getFullList<Chat>({
        sort: '-updated',
        expand: 'users, messages',
      }),
    );
  }

  createChat(users: {
    requestingUserId: string;
    targetUserId: string;
  }): Observable<Chat> {
    return from(this.chatsCollection.create<Chat>({ users }));
  }

  updateChat(chat: Partial<Chat>): Observable<Chat> {
    return from(this.chatsCollection.update<Chat>(chat.id!, chat));
  }

  sendMessage(message: Partial<Message>): Observable<Message> {
    return from(this.messagesCollection.create<Message>(message));
  }

  // BLOCKED USERS CRUD
  blockUser(
    requestingUserId: string,
    userIdToBlock: string,
  ): Observable<Partial<User>> {
    return from(
      this.usersCollection.create({
        userIdToBlock,
        blockedBy: requestingUserId,
      }),
    );
  }
  // LIKED USERS CRUD
  // LIKED BY USERS CRUD

  // IMAGE URL
  getImageurl(
    userId: string,
    filename: string,
    thumbnailSize?: string,
  ): string {
    return `${this.imageUrlBase}${userId}/${filename}${thumbnailSize ? `?thumb=${thumbnailSize}` : ''}`;
  }

  // REPORTED USERS CRUD
  // REPORTED MESSAGES CRUD
  // REPORTED LOCATIONS CRUD
  // REPORTED PHOTOS CRUD
  // REPORTED PROFILES CRUD
  // REALTIME SUBSCRIPTIONS
  /* subscribeToMessages(chatId: string): void {
    this.messagesCollection.subscribe(
      '*',
      (e) => {
        console.log('Messages subscription', e);
        this.chatService.updateMessages(chatId);
      },
      { filter: `chatId = "${chatId}"` },
    );
  } */

  // UTILS
  calculateShouldShowTimestamp(messages: Message[]): Message[] {
    console.log('MessagesWindowComponent.calculateShouldShowTimestamp');
    for (let i = 0; i < messages.length; i++) {
      const previousMessage = messages[i - 1];
      const currentMessage = messages[i];
      const previous = new Date(previousMessage?.updated);
      const current = new Date(currentMessage.updated);
      const diff = Math.abs(current.getTime() - previous?.getTime());
      const previousDate = previous.toDateString();
      const currentDate = current.toDateString();
      console.log(previousDate, currentDate);

      messages[i].firstOfDate = previousDate !== currentDate;

      const authorChanged = previousMessage?.sender !== currentMessage.sender;
      if (diff > 1000 * 60 * 5 || authorChanged) {
        messages[i].showTimestamp = true;
      }
    }
    return messages;
  }
}

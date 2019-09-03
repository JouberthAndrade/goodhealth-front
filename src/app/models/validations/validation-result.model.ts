export class ValidationResultModel<TModel> {
    [x: string]: any;
  constructor() {
    this.notifications = [];
    this.hasException = false;
    this.hasNotifications = false;
  }
  hasException: boolean;
  hasNotifications: boolean;
  notifications: NotificationModel[];
  result: TModel;
  exception: any;
}

export class NotificationModel {
  name: string;
  message: string;
  type: NotificationType;
}

export enum NotificationType {
  Success = 1,
  Alert = 2,
  Error = 3,
  Info = 4
}
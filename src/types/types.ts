export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
}

export interface EmailProvider {
  send(email: Email): Promise<void>;
}

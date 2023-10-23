import { ExpirationCompleteEvent, Publisher, Subjects } from '@ryuju-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

import { Publisher, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from '@ryuju-ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

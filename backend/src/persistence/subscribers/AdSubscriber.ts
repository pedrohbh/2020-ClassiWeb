import { Inject, Service } from "@tsed/di";
import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { Advertising } from "../../domain/Advertising";
import { EmailService } from "../../services/email/EmailService";

@EventSubscriber()
export class AdSubscriber implements EntitySubscriberInterface<Advertising> {
  // @Inject(EmailService)
  // private readonly emailService: EmailService;

  /**
   * Indicates that this subscriber only listen to Ad events.
   */
  listenTo() {
      return Advertising;
  }

  /**
   * Called after ad update.
   */
  afterUpdate(event: UpdateEvent<Advertising>) {
    console.log(`AFTER ENTITY UPDATED: `, event.entity);

    //Envia e-mail
    const emailService = new EmailService();
    emailService.send("ClassiWeb", "Update do Anúncio", "Mudou alguma coisa no anúncio ¯\\_(ツ)_/¯");
  }
}
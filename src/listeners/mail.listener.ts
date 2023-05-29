import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AccountCreationEvent } from "src/events/accountCreation.event";
import { PublishQuestionEvent } from "src/events/publishQuestion.event";

@Injectable()
export class MailListerner{

    constructor(private mailService: MailerService){}

    @OnEvent('welcome_mail_notification', { async: true })
    async sendWelcomeEmail(payload: AccountCreationEvent) {
    
      await this.mailService.sendMail({
        to:payload.user.email,
        from:"no-reply@hms.io",
        subject: 'Welcome Email',
        template:'account-creation',
        context: {
          data:payload.user
        }
      });
    }

    @OnEvent('publish_question_notification', {async: true})
    async publishQuestionEmail(payload: PublishQuestionEvent){
      await this.mailService.sendMail({
        to: payload.user,
        from: "no-reply@hms.io",
        subject: 'HMS Questions Publication',
        template:'publish-question',
        context: {
          // data:payload.user
        }
      });
    }
}
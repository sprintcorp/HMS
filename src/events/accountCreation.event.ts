import { AuthDTO } from "src/dtos/auth.dto";


export class AccountCreationEvent {
    constructor(public readonly user: AuthDTO) {}
}
export class Message {

    /**
     * Username
     */
    public username: string;

    /**
     * Message text
     */
    public text: string;

    public constructor(username: string, text: string) {
        this.username = username;
        this.text = text;
    }
}

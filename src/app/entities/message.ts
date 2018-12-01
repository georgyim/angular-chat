export class Message {

    /**
     * Username
     */
    public username: string;

    /**
     * Message text
     */
    public text: string;


    public room: string;

    public constructor(username: string, text: string, room?: string) {
        this.username = username;
        this.text = text;
        this.room = room;
    }
}

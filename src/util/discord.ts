class DiscordUser {
  constructor(
    public username: string,
    public id: string
  ) {}
}

export let user = new DiscordUser('airbauer', '549207539544227846');

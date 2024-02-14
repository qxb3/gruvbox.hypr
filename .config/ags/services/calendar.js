class CalendarService extends Service {
  static {
    Service.register(
      this,
      {
        'time-changed': ['string']
      }
    )
  }

  #time = 0

  constructor() {
    super()


  }

  get time() { return this.#time }
}

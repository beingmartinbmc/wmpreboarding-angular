export interface Schedule {
  schedule: {
    key: string,
    email: string,
    subject: string,
    body: string,
    timestamp: string,
    sent: boolean
  },
  connect: {
    id: number,
    joineeEmail: string,
    inviterEmail: string,
    occured: boolean,
    timestamp: string,
    feedback: string
  }
}

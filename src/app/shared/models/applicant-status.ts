export enum ApplicantStatus {
  applicantApplied = 'applicantApplied', // when someone applies or the FO adds an applicant to a position to Interview.
  interviewRequested = 'interviewRequested',// hiring manager requests interview
  interviewScheduled = 'interviewScheduled',// applicant selcted a time to come in for an interview
  pendingOnboarding = 'pendingOnboarding',
  onboardingComplete = 'onboardingComplete',
  applicantDeclined = 'applicantDeclined'
}

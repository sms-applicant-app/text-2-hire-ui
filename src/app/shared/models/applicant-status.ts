export enum ApplicantStatus {
  applicantApplied = 'applicantApplied', // when someone applies or the FO adds an applicant to a position to Interview.
  interviewRequested = 'interviewRequested',// hiring manager requests interview
  interviewScheduled = 'interviewScheduled',// applicant selcted a time to come in for an interview
  interviewComplete = 'interviewComplete',// the applicant arrived and did an interview. the interviewer enters notes into a typform
  pendingOnboarding = 'pendingOnboarding', // the hiring manager has decided to offer a position to the applicant and moves the applicant to the "Hire Apllicant" status in the UI
  onboardingComplete = 'onboardingComplete',// The applicant arrives on his start date with his Onboarding pappers filled out. The hiring manager marks him complete
  applicantDeclined = 'applicantDeclined'// they dont like him

}

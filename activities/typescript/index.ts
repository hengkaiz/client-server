export async function getCurrentActivity(activityName: string) {
  const currentActivity = await require(`./${activityName}`)

  return currentActivity
}

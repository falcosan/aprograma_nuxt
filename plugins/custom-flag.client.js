export default function ({ $device }) {
  $device.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

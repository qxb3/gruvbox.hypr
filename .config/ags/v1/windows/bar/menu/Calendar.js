export default function() {
  return Widget.Box({
    className: 'calendar menu',
    child: Widget.Calendar({
      className: 'widget',
      showDayNames: true,
      showWeekNumbers: false
    })
  })
}

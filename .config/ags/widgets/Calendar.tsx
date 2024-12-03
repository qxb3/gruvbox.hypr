import { Gtk } from 'astal/gtk3'
import { Variable } from 'astal'

import FlowBox from './FlowBox'

const currentDate = new Date()
const grid = Variable(
  generateGridDates(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  )
)

export default function Calendar() {
  return (
    <box
      className='calendar'
      vertical={true}
      spacing={8}>
      <box hexpand={true}>
        <label
          className='month_year'
          label='December 2024'
        />

        <box
          spacing={16}
          hexpand={true}
          halign={Gtk.Align.END}>
          <button
            className='control'
            cursor='pointer'>
            <label label='<' />
          </button>

          <button
            className='control'
            cursor='pointer'>
            <label label='>' />
          </button>
        </box>
      </box>

      <box
        spacing={8}
        hexpand={true}
        vexpand={true}
        homogeneous={true}>
        {['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day =>
          <label
            className='day_name'
            label={day}
          />
        )}
      </box>

      <box className='divider' />

      <FlowBox
        maxChildrenPerLine={7}
        columnSpacing={8}
        rowSpacing={8}
        homogeneous={true}
        hexpand={true}>
        {grid(grid =>
          grid.map(weeks =>
            weeks.map(day =>
              <label
                className={
                  !day.inCurrent
                    ? day.date.getDate() === currentDate.getDate() &&
                      day.date.getMonth() === currentDate.getMonth()
                        ? 'today not_incurrent day'
                        : 'not_incurrent day'
                    : day.date.getDate() === currentDate.getDate() &&
                      day.date.getMonth() === currentDate.getMonth()
                        ? 'today day'
                        : 'day'
                }
                label={day.date.getDate().toString()}
              />
            )
          )
        )}
      </FlowBox>
    </box>
  )
}

function generateGridDates(month: number, year: number) {
  function daysInMonth(month: number, year: number): Date[] {
    const days = []
    const lastDay = new Date(year, month, 0).getDate()

    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month - 1, i))
    }

    return days
  }

  const firstDayOfMonth = new Date(year, month - 1, 1)
  const lastDayOfMonth = new Date(year, month, 0)

  const weekStart = 1
  const daysOfWeek = 7

  const firstWeekDay = (firstDayOfMonth.getDay() - weekStart + daysOfWeek) % daysOfWeek
  const lastWeekDay = (lastDayOfMonth.getDay() - weekStart + daysOfWeek) % daysOfWeek

  const prevMonth = (month - 1) > 0 ? month - 1 : 12
  const nextMonth = (month + 1) <= 12 ? month + 1 : 1
  const prevYear = (month - 1) > 0 ? year : year - 1
  const nextYear = (month + 1) <= 12 ? year : year + 1

  const prevMonthDays = daysInMonth(prevMonth, prevYear)
  const nextMonthDays = daysInMonth(nextMonth, nextYear)

  const leadingDays = firstWeekDay
  const trailingDays = (daysOfWeek - 1 - lastWeekDay)

  const days = []

  if (leadingDays > 0) {
    days.push(
      ...prevMonthDays.slice(-leadingDays)
        .map(date => ({ inCurrent: false, date }))
    )
  }

  days.push(
    ...daysInMonth(month, year)
      .map(date => ({ inCurrent: true, date }))
  )

  if (trailingDays > 0) {
    days.push(
      ...nextMonthDays.slice(0, trailingDays)
        .map(date => ({ inCurrent: false, date }))
    )
  }

  const weeks = []
  for (let i = 0; i < days.length; i += daysOfWeek) {
    weeks.push(days.slice(i, i + daysOfWeek))
  }

  return weeks
}

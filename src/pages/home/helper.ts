import { Task } from 'src/interfaces/xer-types'
import addMonth from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

export const randomizeTaskSchedule = (tasks: Array<Task>) => {
  return tasks.map((task) => {
    // generate random number between -2 to 2
    const randomNumber = Math.floor(Math.random() * 4) - 2
    const sign = randomNumber > 0 ? 1 : -1
    const dateOperation = randomNumber > 0 ? addMonth : subMonths

    return {
      start: dateOperation(
        new Date(task.target_start_date),
        randomNumber * sign,
      ),
      end: dateOperation(
        new Date(task.target_end_date),
        (randomNumber + 1) * sign,
      ),
      targetStart: new Date(task.target_start_date),
      targetEnd: new Date(task.target_end_date),
      name: task.task_name,
    }
  })
}


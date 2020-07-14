import React, { useState } from 'react'

const TaskList = (props) => {
  const [newTask, setNewTask] = useState('')
  const [editingMode] = useState(false)
  return (
    <div>
      {props.tasks.map((el) => (
        <div key={el.taskId} className="flex mb-6 justify-between">
          {editingMode ? (
            <button type="button" className="bg-black text-white">
              Save
            </button>
          ) : (
            <button type="button" className="bg-black text-white">
              Edit
            </button>
          )}
          <div key={el.taskId}>{el.title}</div>
          <div className="switch-status">
            {el.status === 'in progress' && (
              <div>
                <button
                  type="button"
                  className="bg-teal-400 mr-3"
                  onClick={() => props.updateStatus(el.taskId, 'in progress')}
                >
                  In progress
                </button>
                <button
                  type="button"
                  className="bg-teal-400"
                  onClick={() => props.updateStatus(el.taskId, 'done')}
                >
                  Done
                </button>
              </div>
            )}
            {el.status === 'blocked' && (
              <button
                type="button"
                className="bg-teal-400"
                onClick={() => props.updateStatus(el.taskId, 'in progress')}
              >
                Unblock
              </button>
            )}
          </div>
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newTask}
          className="bg-teal-100"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" onClick={() => props.addTask(newTask)}>
          Add
        </button>
      </div>
    </div>
  )
}
export default TaskList

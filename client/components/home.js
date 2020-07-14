import React, { useState, useEffect } from 'react'
import { Route, useParams } from 'react-router-dom'
import axios from 'axios'
import Main from './main'
import TaskList from './task-list'

const Home = () => {
  const { category } = useParams()
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    axios('/api/v1/category').then(({ data }) => setCategories(data))
  }, [])
  useEffect(() => {
    if (typeof category !== 'undefined') {
      axios(`/api/v1/tasks/${category}`).then(({ data }) => setTasks(data))
    }
  }, [category])

  const addTask = (taskTitle) => {
    axios
      .post(`/api/v1/tasks/${category}`, { title: taskTitle })
      .then(({ data }) => setTasks([...tasks, data.newTask]))
  }
  const addCategory = (newCategory) => {
    axios.post(`/api/v1/tasks/${newCategory}`)
    setCategories([...categories, newCategory])
  }

  const updateStatus = (id, status) => {
    axios.patch(`/api/v1/tasks/${category}/${id}`, { status })
    setTasks(tasks.map((el) => (el.taskId === id ? { ...el, status } : el)))
  }

  return (
    <div className="bg-gray-400 h-screen flex">
      <div className="bg-white m-auto p-16">
        <Route
          exact
          path="/"
          component={() => <Main categories={categories} addCategory={addCategory} />}
        />
        <Route
          exact
          path="/:category"
          component={() => <TaskList tasks={tasks} addTask={addTask} updateStatus={updateStatus} />}
        />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home

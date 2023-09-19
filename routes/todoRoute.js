const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModels");

router.get("/todo", async (req, res) => {
  try {
    const allTodos = await Todo.findAll();
    return res.status(200).send(allTodos);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.get("/todo/:id", async (req, res) => {
  try {
    const exitingTodo = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (exitingTodo) {
      return res.status(200).json(exitingTodo);
    }

    if (!exitingTodo) {
      return res.status(404).json({ err: "todo not found" });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.post("/todo", async (req, res) => {
  try {
    const { title, description, dueDate, completed, priority } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ result: "Title Missing Please input a title " });
    }

    const todo = {
      title,
      description,
      completed,
      priority,
      dueDate,
    };
    const createdTodo = await Todo.create(todo);

    if (createdTodo) {
      return res.status(201).send(createdTodo);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.put("/todo/:id", async (req, res) => {
  try {
    const { title, description, dueDate, completed, priority } = req.body;

    const exitingTodo = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (!exitingTodo) {
      return res.status(404).send("Todo doesn't exits in database");
    }

    if (exitingTodo) {
      const updatedTodo = await exitingTodo.update({
        title,
        description,
        dueDate,
        completed,
        priority,
      });
      await updatedTodo.save();
      return res.status(200).send(updatedTodo);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const exitingTodo = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (!exitingTodo) {
      return res.status(404).json({ err: "Todo does'nt exits" });
    }

    if (exitingTodo) {
      const deletedTodo = await exitingTodo.destroy({
        where: { id: req.params.id },
      });

      await deletedTodo.save();

      return res.status(200).send({ deletedTodo });
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

module.exports = router;
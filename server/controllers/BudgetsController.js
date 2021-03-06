import _budgetsService from "../services/BudgetsService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class BudgetsController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/user", this.getByUserId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _budgetsService.getAll();
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getByUserId(req, res, next) {
    try {
      let data = await _budgetsService.getByUserId(req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _budgetsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _budgetsService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _budgetsService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}

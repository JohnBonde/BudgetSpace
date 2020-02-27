import mongoose from "mongoose";
import Budgets from "../models/Budget";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Budgets", Budgets);

class BudgetsService {
  async getAll(userId) {
    return await _repository.find({});
  }

  async getById(id, userId) {
    let data = await _repository.findOne({ _id: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this Budgets", 400);
    }
    return data;
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this Budgets", 400);
    }
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this Budgets", 400);
    }
  }
}

const _budgetsService = new BudgetsService();
export default _budgetsService;

import mongoose from "mongoose";
import Budgets from "../models/Budget";
import ApiError from "../utils/ApiError";
import { raw } from "body-parser";

const _repository = mongoose.model("Budgets", Budgets);

class BudgetsService {
  async getAll() {
    let res = await _repository.find({});
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      element.authorId = null;
      element._id = null;
      element.createdAt = null;
      element.updatedAt = null;
    }
    return res;
  }

  async getByUserId(userId) {
    let data = await _repository.findOne({ authorId: userId });
    if (!data) {
      throw new ApiError("Invalid UserID or you do not own this Budget", 400);
    }
    return data;
  }

  async create(rawData) {
    let authorId = rawData.authorId;
    let income = rawData.income;
    let costs =
      rawData.housing +
      rawData.trans +
      rawData.food +
      rawData.utils +
      rawData.insurance +
      rawData.medical +
      rawData.invest +
      rawData.savings +
      rawData.debtPay +
      rawData.recEnt +
      rawData.misc;
    let exists = await _repository.findOne({ authorId });
    if (income != costs) {
      throw new ApiError("Income must equal costs");
    } else if (exists) {
      throw new ApiError("You can only have one budget");
    } else {
      let data = await _repository.create(rawData);
      return data;
    }
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

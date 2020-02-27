import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Budget = new Schema({
  income: { type: Number, required: true },
  housing: { type: Number, required: true },
  trans: { type: Number, required: true },
  utils: { type: Number, required: true },
  insurance: { type: Number, required: true },
  medical: { type: Number, required: true },
  invest: { type: Number, required: true },
  savings: { type: Number, required: true },
  debtPay: { type: Number, required: true },
  recEnt: { type: Number, required: true },
  misc: { type: Number, required: true },
  income: { type: Number, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
// _schema.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     _listRepo.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Board
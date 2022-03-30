import { Schema } from 'mongoose';
import VerificationTypes from '../Types/verification';
import constants from '../constants/index';

const { ADMIN, USER } = constants.Enums.AccountType;

const Verification: Schema = new Schema(
  {
    phoneNumber: Schema.Types.String,
    pin: Schema.Types.String,
    pinTrialDuration: Schema.Types.Date,
    pinTrials: { type: Schema.Types.Number, default: 0 },
    lastTimePinRequested: Schema.Types.Date,
    token: Schema.Types.String,
    accountType: {
      type: Schema.Types.String,
      enum: [ADMIN, USER],
    },
    date: { type: Schema.Types.String, default: String },
  },
  { autoIndex: false },
);

Verification.methods.incrementPinTrial = async function lockAccount() {
  const documents = this as VerificationTypes;
  documents.pinTrials += 1;
  await documents.save();
};

Verification.methods.isPinValid = function isPinValid(pin: string) {
  const doc = this as VerificationTypes;
  return doc.pin === pin;
};

Verification.methods.selfDestruct = function selfDestruct() {
  const doc = this as VerificationTypes;
  doc.deleteOne();
};

export default Verification;
// Verification

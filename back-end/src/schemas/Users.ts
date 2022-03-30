/// <reference path="../Types/interfaces.ts"/>
import { Schema, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate-v2';
import moment from 'moment';
import Constants from '../constants/index';
import { UserProps } from '../Types/interfaces';

export default function UsersSchema(skillsRef: any) {
  const Users: Schema = new Schema(
    {
      userId: Schema.Types.String,

      firstName: Schema.Types.String,

      lastName: Schema.Types.String,

      phoneNumber: Schema.Types.String,

      email: {
        type: Schema.Types.String,
        required: false,
        default: '',
      },

      sex: {
        type: Schema.Types.String,
        enum: ['male', 'female'],
        required: true,
      },

      bio: {
        type: Schema.Types.String,
        required: false,
        default: '',
      },

      showPhoneNumber: {
        type: Schema.Types.Boolean,
        default: true,
      },

      showEmail: {
        type: Schema.Types.Boolean,
        default: true,
      },

      avatar: {
        thumbnail: {
          type: Schema.Types.String,
          default: '',
        },
        url: {
          type: Schema.Types.String,
          default: '',
        },
      },

      coverPhoto: {
        thumbnail: {
          type: Schema.Types.String,
          default: '',
        },
        url: {
          type: Schema.Types.String,
          default: '',
        },
      },

      address: {
        type: Schema.Types.String,
        default: '',
      },

      addressCoords: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },

      businessAddressCoords: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },

      interests: [{ type: Types.ObjectId, ref: skillsRef }],

      skills: [{ type: Types.ObjectId, ref: skillsRef }],

      businessAddress: {
        type: Schema.Types.String,
        default: '',
      },

      businessAddressDescription: {
        type: Schema.Types.String,
        default: '',
      },

      businessPhotos: [
        {
          type: Schema.Types.String,
          default: '',
        },
      ],

      hash: Schema.Types.String,

      isVerified: {
        type: Boolean,
        default: false,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      salt: Schema.Types.String,

      loginAttempts: { type: Schema.Types.Number, default: 0 },
      attemptsDuration: { type: Schema.Types.Date },
      tillUnlocked: { type: Schema.Types.Date },
    },
    { autoIndex: false },
  );

  Users.methods.setPassword = function setPassword(password) {
    const documents = this as UserProps;
    documents.salt = bcrypt.genSaltSync(10);
    documents.hash = bcrypt.hashSync(password, documents.salt);
  };

  Users.methods.isAccountLocked = function isAccountLocked() {
    const documents = this as UserProps;

    if (documents.tillUnlocked) {
      const now = new Date();
      if (documents.tillUnlocked > now) {
        return true;
      }
      return false;
    }
    return false;
  };

  Users.methods.lockAccount = async function lockAccount() {
    const documents = this as UserProps;

    const now = new Date();
    if (documents.attemptsDuration > now) {
      documents.loginAttempts += 1;
      if (
        documents.loginAttempts >= Constants.Timers.LOGIN_ATTEMPTS
      ) {
        documents.tillUnlocked = moment(new Date()).add(
          Constants.Timers.UNITLL_UNBLOCK_DURATION,
          'minutes',
        );
      }
    } else {
      documents.attemptsDuration = moment(new Date()).add(
        Constants.Timers.DURATION_TO_FAIL_ATTEMPTS,
        'minutes',
      );
      documents.loginAttempts = 1;
    }

    await documents.save();
  };

  Users.methods.validatePassword = function validatePassword(
    password,
  ) {
    const documents = this as UserProps;
    const hash = bcrypt.compareSync(password, documents.hash);
    return hash;
  };

  Users.methods.setSex = function setSex(sex: string) {
    const doc = this as UserProps;

    if (sex === 'male' || sex === 'female') {
      doc.sex = sex;
    } else {
      throw new Error('Invalid Gender');
    }
  };

  Users.plugin(mongoosePaginate);

  return Users;
}

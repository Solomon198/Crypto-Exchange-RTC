import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Skill = new Schema({
  skillId: Schema.Types.ObjectId,
  name: Schema.Types.String,
  description: Schema.Types.String,
  avatar: Schema.Types.String,
});

Skill.plugin(mongoosePaginate);

export default Skill;

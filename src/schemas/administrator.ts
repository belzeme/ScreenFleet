import { Schema } from 'mongoose';

export const administratorSchema: Schema = new Schema({
    createdAt: Date,
    hash: String,
    name: String

});

administratorSchema.pre('save', function(next) {
    if (!this.get('createdAt')) {
        this.set('createdAt', new Date());
    }
    next();
});


import { Schema } from 'mongoose';

export const tvSchema: Schema = new Schema({
    composition: Array,
    createdAt: Date,
    ip: String,
    name: String
});

tvSchema.pre('save', function(next) {
    if (!this.get('createdAt')) {
        this.set('createdAt', new Date());
    }
    next();
})

import { Schema } from 'mongoose';

export const tvSchema: Schema = new Schema({
    assets: Array,
    createdAt: Date,
    html: String,
    ip: String,
    name: String
});

tvSchema.pre('save', function(next) {
    if (!this.get('createdAt')) {
        this.set('createdAt', new Date());
    }
    next();
})

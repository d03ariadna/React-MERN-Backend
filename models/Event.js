const {Schema, model} = require('mongoose');

const EventSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        //Referencia a otro tipo de modelo
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id
    return object;
})

module.exports = model('Event', EventSchema);
const { response } = require('express');
const Event = require('../models/Event'); 

const getEvents = async(req, res=response) => {

    const events = await Event.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async(req, res) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const savedEvent = await event.save();

        res.json({
            ok: true,
            evento: savedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        })
    }


}

const updateEvent = async(req, res) => {

    const eventID = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventID);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'There is any event with that ID'
            })
        }

        if (event.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'You can not edit events from other people'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {new: true});

        res.json({
            ok: true,
            event: updatedEvent
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).jason({
            ok: false,
            msg: 'Contact the admin'
        });
    }

}

const deleteEvent = async(req, res) => {

    const eventID = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventID);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'There is any event with that ID'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You can not delete events from other people'
            });
        }


        const result = await Event.findByIdAndDelete(eventID);

        res.json({
            ok: true
        });
        

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact the admin'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
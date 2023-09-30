const User = require('../models/User');
const Channel = require('../models/Channel')
const Message = require('../models/Message')

const getChannelMessages = async (channelId) => {
    try {
        const messages = await Message.find({ toChannel: channelId })
            .populate('from', 'username') // Populate the 'from' field and include the 'username' field
            .exec();

        return {
            data: messages,
            error: false,
            message: 'Channel Messages Recieved'
        };

    } catch (error) {
        throw error
    }
};

const getUserMessages = async (userId, companionId) => {
    try {
        const messages = await Message.find({
            $or: [
                { toUser: userId, from: companionId },
                { toUser: companionId, from: userId },
            ],
        })
            .populate('from', 'username')
            .populate('toUser', 'username')
            .exec();

        return {
            data: messages,
            error: false,
            message: 'User Messages Recieved'
        };

    } catch (error) {
        throw error
    }
};

const createMessage = async (username, userId, toUser, toChannel, message) => {
    try {
        await Message.create({
            content: message,
            from: userId,
            toUser,
            toChannel,
        });

        return {
            data: { content: message, from: { username } },
            error: false,
            message: 'Message Created'
        };

    } catch (error) {
        throw error
    }
};

const updateMessage = async (userId, messageId, message) => {
    try {
        let rMessage = ''
        const filter = { _id: messageId, from: userId };
        const update = { content: message };

        const result = await Message.updateOne(filter, update);
        if (result.modifiedCount > 0) {
            rMessage = 'Message updated successfully.';
        } else {
            rMessage = 'No messages matching the criteria were updated.';
        }

        return {
            data: null,
            error: false,
            message: rMessage
        };

    } catch (error) {
        throw error
    }
};

const deleteMessage = async (userId, messageId) => {
    try {
        let rMessage = ''
        const filter = { _id: messageId, from: userId };
        const result = await Message.deleteOne(filter);

        if (result.deletedCount > 0) {
            rMessage = 'Message deleted successfully.';
        } else {
            rMessage = 'No messages matching the criteria were deleted.';
        }
        return {
            data: null,
            error: false,
            message: rMessage
        };
    } catch (error) {
        throw error
    }
};

module.exports = { getChannelMessages, getUserMessages, createMessage, updateMessage, deleteMessage }
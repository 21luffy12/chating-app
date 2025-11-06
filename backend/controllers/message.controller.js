import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] }
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId]
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//       res.status(201).json(newMessage);
//     } 
//     else {
//         res.status(400).json({ error: "Invalid message data" });
//     }

//     // SOCKET IO FUNCTIONLITY WILL GO HERE

//     await conversation.save();
//     await newMessage.save()

//     // this will in parallel
//     // await promise.all([conversation.save(), newMessage.save()])
//   } catch (error) {
//     console.log("Error in sendMessage controller:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("senderId:", senderId);
    console.log("userToChatId:", userToChatId);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    console.log("conversation:", conversation);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    console.log("Message:", message); // Log the message
    console.log("Receiver ID:", receiverId); // Log the receiver ID
    console.log("Sender ID:", senderId); // Log the sender ID

    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }

    if (!senderId) {
      return res.status(400).json({ error: "Sender ID not found" });
    }

    // Find or create a conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    console.log("Conversation found:", conversation);

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [],
      });
      await conversation.save();
      console.log("New conversation created:", conversation);
    }

    // Create and save a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();
    console.log("New message created:", newMessage);

    // Add message to conversation and save
    conversation.messages.push(newMessage._id);
    await conversation.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

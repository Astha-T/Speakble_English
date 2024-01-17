import { createChatBotMessage } from 'react-chatbot-kit';
import MyAvatar from '../chatbotcomponent/MyAvatar';
import MyCustomAvatar from '../chatbotcomponent/MyCustomAvatar';
import Startbtn from '../chatbotcomponent/Startbtn';
const botName = 'Mxpertz Bot system';





const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm a bot created by ${botName}`,{
    widget:"startbtn"
  })],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#33906c',
    },
    chatButton: {
      backgroundColor: '#33906c',
    },
  },

  customComponents: {
    // Replaces the default header
   header: () =>( <div style={{ backgroundColor: '#33906c',color:'white',fontSize:"20px", padding: "5px", borderRadius: "3px" }}>Welcome to Mxpertz Bot System</div>),
   // Replaces the default bot avatar
   botAvatar: (props) => <MyAvatar {...props} />,
//    // Replaces the default user icon
   userAvatar: (props) => <MyCustomAvatar {...props} />,
 },

 state: {
  
  },


 widgets: [
    {
      widgetName: 'startbtn',
      widgetFunc: (props) => <Startbtn {...props} />,
    },
 
  ],

};

export default config;
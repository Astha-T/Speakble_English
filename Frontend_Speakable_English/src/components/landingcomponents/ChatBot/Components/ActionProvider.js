
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');
        updatestate(botMessage)
      };

      const handlebtn1request = () => {
        const botMessage = createChatBotMessage(' Many businesses use chatbots to handle customer inquiries, provide support, and assist with common issues. They can handle routine tasks, freeing up human agents to focus on more complex issues.          Chatbots can help users navigate through product catalogs, recommend products, and facilitate the purchasing process.');
        updatestate(botMessage)
      };

      const updatestate = (botMessage) => {    
        setState((prev) => ({...prev,messages: [...prev.messages, botMessage],}));
      };


       // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handlebtn1request
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
import React, { useState } from "react";
import "./CubicleBot.css";

import Bot from "../../assets/Cubicle/bot.svg";
import User from "../../assets/Cubicle/user.svg";
import { PortUrl } from "../../PORTURL";

const CubicleBot = () => {
  let loadInterval;
  const chatContainer = document.getElementById("chat__container");
  const form = document.getElementById("form__container");

  const url = PortUrl;

  //   text loading
  const loader = (elem) => {
    elem.textContent = " ";

    loadInterval = setInterval(() => {
      elem.textContent += ".";

      if (elem.textContent.length === 4) {
        elem.textContent = " ";
      }
    }, 300);
  };

  // query solving
  const typeText = (elem, text) => {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        elem.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  //   generate unique id
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const random = Math.random();
    const hexadecimalstring = random.toString(16);

    return `id-${timestamp}-${hexadecimalstring}`;
  };

  //   chat stripe
  const chatStripe = (isAi, value, uniqueId) => {
    return `
        <div class="cubiclebot-wrapper ${
          isAi ? "cubiclebot-ai" : "cubiclebot-user"
        }">
            <div class="cubiclebot-chat">
                <div class="cubiclebot-profile">
                    <img src="${isAi ? Bot : User}" alt="${
      isAi ? "bot" : "user"
    }" />
    </div>
                    <div class="cubiclebot-message" id="${uniqueId}">${value}</div>
            </div>
        </div>
        `;
  };

  const [textarea, setTextarea] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // user message
    chatContainer.innerHTML += chatStripe(false, textarea.prompt);

    form.reset();
    // bots message
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const botMessage = document.getElementById(uniqueId);

    loader(botMessage);

    const response = await fetch(`${url}/cubicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: textarea.prompt,
      }),
    });

    clearInterval(loadInterval);

    botMessage.innerHTML = " ";

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim();

      typeText(botMessage, parsedData);
    } else {
      const err = await response.text();

      botMessage.innerHTML = "Something went wrong!";
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTextarea({ ...textarea, [e.target.name]: e.target.value });
  };

  return (
    <div className="cubiclebot">
      <div className="cubiclebot__container" id="chat__container"></div>

      <form onSubmit={handleSubmit} id="form__container">
        <textarea
          name="prompt"
          rows="1"
          cols="1"
          placeholder="Ask your query..."
          required
          onChange={handleChange}
        ></textarea>

        <button type="submit">Ask</button>
      </form>
    </div>
  );
};

export default CubicleBot;
